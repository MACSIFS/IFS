(function() {
    'use strict';

    angular
        .module('lecturer')
        .directive('engagementCanvas', engagementCanvas);

    function engagementCanvas() {
        var directive = {
            restrict: 'A',
            link: link,
            controller: EngagementCanvasController,
            controllerAs: 'engagementCanvas',
            bindToController: true
        };

        return directive;

        function link(scope, element, attrs, engagementCanvas) {
            console.log('Ready (Engagement Canvas link)');

            engagementCanvas.canvas = document.createElement('canvas');
            element.append(engagementCanvas.canvas);
            engagementCanvas.ctx = engagementCanvas.canvas.getContext('2d');

            engagementCanvas.canvas.width = element.width();
            engagementCanvas.canvas.height = element.height();

            engagementCanvas.heatmap = h337.create({
                container: element[0],
                radius: 50,
                blur: 1.0,
                minOpacity: 0.0,
                maxOpacity: 0.8,
                gradient: {
                    '0.20': 'lightblue',
                    '0.30': 'blue',
                    '0.40': 'green',
                    '0.55': 'yellow',
                    '0.70': 'orange',
                    '0.95': 'red'
                }
            });

            engagementCanvas.container = element;

            engagementCanvas.drawBackground(engagementCanvas.padding);
            engagementCanvas.pollEngagements(1000);
        }
    }

    /* @ngInject */
    function EngagementCanvasController(lecturesFactory, $scope) {
        console.log('Ready (Engagement Canvas Controller)');

        var engagementCanvas = this;
        engagementCanvas.pollId = undefined;
        engagementCanvas.padding = 30;
        engagementCanvas.canvas = {};
        engagementCanvas.ctx = {};

        engagementCanvas.drawBackground = drawBackground;
        engagementCanvas.drawDot = drawDot;
        engagementCanvas.pollEngagements = pollEngagements;

        $scope.$on('$destroy', function(){
            if (engagementCanvas.pollId) {
                clearInterval(engagementCanvas.pollId);
            }
        });

        function drawBackground(padding) {
            engagementCanvas.ctx.clearRect(
                0,
                0,
                engagementCanvas.canvas.width,
                engagementCanvas.canvas.height
            );

            engagementCanvas.ctx.beginPath();
            engagementCanvas.ctx.moveTo(padding,padding);
            engagementCanvas.ctx.lineTo(padding, engagementCanvas.canvas.height - padding);
            engagementCanvas.ctx.lineTo(
                engagementCanvas.canvas.width - padding,
                engagementCanvas.canvas.height - padding
            );
            engagementCanvas.ctx.lineWidth = 3;
            engagementCanvas.ctx.lineCap = 'round';
            engagementCanvas.ctx.stroke();

            engagementCanvas.ctx.fillStyle = 'black';
            engagementCanvas.ctx.textAlign = 'center';
            engagementCanvas.ctx.font = '18pt Calibri';
            engagementCanvas.ctx.fillText('Challenge', 200, 390);
            engagementCanvas.ctx.save();
            engagementCanvas.ctx.rotate(-Math.PI/2);
            engagementCanvas.ctx.fillText('Interest', -200, 20);
            engagementCanvas.ctx.restore();
        }

        function drawDot(x, y, padding) {
            if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
                var cartesianWidth = (engagementCanvas.canvas.width - 2*padding);
                var cartesianHeight = (engagementCanvas.canvas.height - 2*padding);
                var drawableX = (cartesianWidth*x + padding);
                var drawableY = (engagementCanvas.canvas.width - (cartesianHeight*y + padding));

                engagementCanvas.ctx.beginPath();
                engagementCanvas.ctx.fillStyle = 'rgba(0,0,0,0.5)';
                engagementCanvas.ctx.arc(drawableX, drawableY, 10, 0, 2*Math.PI);
                engagementCanvas.ctx.fill();
            }
        }

        function drawDots(engagements) {
            angular.forEach(engagements, function(engagement) {
                drawDot(
                    engagement.challenge,
                    engagement.interest,
                    engagementCanvas.padding
                );
            });
        }

        function updateHeatmap(engagements) {
            var padding = engagementCanvas.padding;
            var cartesianWidth = (engagementCanvas.container.width() - 2*padding);
            var cartesianHeight = (engagementCanvas.container.height() - 2*padding);

            var points = engagements.map(function(engagement) {
                var x = engagement.challenge;
                var y = engagement.interest;

                if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
                    var drawableX = (cartesianWidth*x + padding);
                    var drawableY = (engagementCanvas.container.height() - (cartesianHeight*y + padding));

                    return {
                        x: drawableX,
                        y: drawableY,
                        value: 0.4
                    };
                }
            });
            engagementCanvas.heatmap.setData({
                min: 0,
                max: 1,
                data: points
            });
        }

        function pollEngagements(interval) {
            if (angular.isUndefined(engagementCanvas.pollId)) {
                engagementCanvas.pollId = setInterval(function() {

                    lecturesFactory
                        .getEngagements(function(engagements) {
                            drawBackground(engagementCanvas.padding);
                            updateHeatmap(engagements);
                        });

                }, interval);
            }
        }
    }
})();
