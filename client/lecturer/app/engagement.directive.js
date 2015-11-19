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

            engagementCanvas.canvas = element[0];
            engagementCanvas.ctx = engagementCanvas.canvas.getContext('2d');

            engagementCanvas.drawBackground(engagementCanvas.padding);
            engagementCanvas.pollEngagements(1000);
        }
    }

    /* @ngInject */
    function EngagementCanvasController(lecturesFactory) {
        console.log('Ready (Engagement Canvas Controller)');

        var engagementCanvas = this;
        engagementCanvas.padding = 30;
        engagementCanvas.canvas = {};
        engagementCanvas.ctx = {};

        engagementCanvas.drawBackground = drawBackground;
        engagementCanvas.drawDot = drawDot;
        engagementCanvas.pollEngagements = pollEngagements;

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
            engagementCanvas.ctx.fillText('Interest', 200, 390);
            engagementCanvas.ctx.save();
            engagementCanvas.ctx.rotate(-Math.PI/2);
            engagementCanvas.ctx.fillText('Challenge', -200, 20);
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
                    engagement.interest,
                    engagement.challenge,
                    engagementCanvas.padding
                );
            });
        }
        
        function pollEngagements(interval) {
            setInterval(function() {

                lecturesFactory
                    .getEngagements(function(response) {
                        drawBackground(engagementCanvas.padding);
                        drawDots(response.engagements);
                    });

            }, interval);
        }
    }
})();