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
            engagementCanvas.drawBackground(30);
            engagementCanvas.drawDot(0.0, 0.0, 30);
        }
    }

    /* @ngInject */
    function EngagementCanvasController() {
        console.log('Ready (Engagement Canvas Controller)');

        var engagementCanvas = this;
        engagementCanvas.canvas = {};
        engagementCanvas.ctx = {};

        engagementCanvas.drawBackground = drawBackground;
        engagementCanvas.drawDot = drawDot;

        function drawBackground(padding) {
            engagementCanvas.ctx.beginPath();
            engagementCanvas.ctx.moveTo(padding,padding);
            engagementCanvas.ctx.lineTo(padding,400 - padding);
            engagementCanvas.ctx.lineTo(400 - padding, 400 - padding);
            engagementCanvas.ctx.lineWidth = 3;
            engagementCanvas.ctx.lineCap = 'round';
            engagementCanvas.ctx.stroke();

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

                engagementCanvas.ctx.beginPath();
                engagementCanvas.ctx.fillStyle = 'rgba(0,0,0,0.5)';
                engagementCanvas.ctx.arc(
                    (cartesianWidth*x + padding),
                    (engagementCanvas.canvas.width - (cartesianHeight*y + padding)),
                    10,
                    0,
                    2*Math.PI
                );
                engagementCanvas.ctx.fill();
            }
        }
    }
})();