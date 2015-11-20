(function() {
    'use strict';
    
    angular
        .module('student')
        .directive('engagementCanvas', engagementCanvas);
    
    function engagementCanvas() {
        var directive = {
            restrict: 'E',
            scope: {
                currentPosition: '=',
                lastPosition: '=',
            },
            templateUrl: 'app/lecture/engagement.canvas.html',
            link: link,
            controller: EngagementCanvasController,
            controllerAs: 'engagementCanvas',
            bindToController: true
        };
        
        return directive;
        
        function link(scope, element, attrs, engagementCanvas) {
            console.log('Ready (Engagement Canvas Link)');
            
            engagementCanvas.canvas = element.children()[0];
            engagementCanvas.ctx = engagementCanvas.canvas.getContext('2d');

            engagementCanvas.drawBackground();

            engagementCanvas.canvas.addEventListener('mouseup', engagementCanvas.mouseUpListener, false);
            engagementCanvas.canvas.addEventListener('mousedown', engagementCanvas.mouseDownListener, false);
            engagementCanvas.canvas.addEventListener('mousemove', engagementCanvas.mouseMoveListener, false);
            engagementCanvas.canvas.addEventListener('touchmove', engagementCanvas.touchMoveListener, false);
            engagementCanvas.canvas.addEventListener('touchend', engagementCanvas.touchendListener, false);
            
        }
    }
    
    /* @ngInject */
    function EngagementCanvasController($scope, $timeout, lectureFactory) {
        console.log('Ready (Engagement Canvas Controller)');
        
        var engagementCanvas = this;
        engagementCanvas.canvas = {};
        engagementCanvas.ctx = {};
        engagementCanvas.rect = {};
        engagementCanvas.currentMousePos = {};
        
        engagementCanvas.mouseUpListener = mouseUpListener;
        engagementCanvas.mouseDownListener = mouseDownListener;
        engagementCanvas.mouseMoveListener = mouseMoveListener;
        engagementCanvas.touchMoveListener = touchMoveListener;
        engagementCanvas.touchendListener = touchendListener;
        
        engagementCanvas.drawBackground = drawBackground;
        engagementCanvas.drawMovement = drawMovement;
        
        var trackMovement = false;
        
        function mouseDownListener(event) {
            trackMovement = true;

            engagementCanvas.rect = engagementCanvas.canvas.getBoundingClientRect();
            engagementCanvas.currentMousePos = {
                x: event.clientX - engagementCanvas.rect.left,
                y: event.clientY - engagementCanvas.rect.top,
                t: event.timeStamp
            };

            updateMovement();
        }
        
        function mouseUpListener(event) {
            trackMovement = false;
        }
        
        function mouseMoveListener(event) {
            engagementCanvas.rect = engagementCanvas.canvas.getBoundingClientRect();
            engagementCanvas.currentMousePos = {
                x: event.clientX - engagementCanvas.rect.left,
                y: event.clientY - engagementCanvas.rect.top,
                t: event.timeStamp
            };
            
            if (trackMovement) {
                updateMovement();
            } else {
                drawMovement();
            }
        }
        
        function touchMoveListener(event) {
            event.preventDefault();
            
            engagementCanvas.rect = engagementCanvas.canvas.getBoundingClientRect();
            engagementCanvas.currentMousePos = {
                x: event.targetTouches[0].clientX - engagementCanvas.rect.left,
                y: event.targetTouches[0].clientY - engagementCanvas.rect.top,
                t: event.timeStamp
            };
            
            updateMovement();
        }
        
        function touchendListener(event) {
            event.preventDefault();
            
            engagementCanvas.rect = engagementCanvas.canvas.getBoundingClientRect();
            engagementCanvas.currentMousePos = {
                x: event.changedTouches[0].clientX - engagementCanvas.rect.left,
                y: event.changedTouches[0].clientY - engagementCanvas.rect.top,
                t: event.timeStamp
            };
            
            updateMovement();
        }
        
        function updateMovement() {
            var xBoundry = (engagementCanvas.currentMousePos.x >= 30 && engagementCanvas.currentMousePos.x <= 270);
            var yBoundry = (engagementCanvas.currentMousePos.y >= 30 && engagementCanvas.currentMousePos.y <= 270);
            if (xBoundry && yBoundry) {

                $scope.$apply(function() {
                    engagementCanvas.currentPosition = engagementCanvas.currentMousePos;
                });

                drawMovement();
            }
        }
        
        function drawMovement() {
            engagementCanvas.ctx.clearRect(
                0,
                0,
                engagementCanvas.canvas.width, 
                engagementCanvas.canvas.height
            );
            
            drawBackground(engagementCanvas.ctx);
            
            drawDot();
        }
        
        function drawBackground() {
            engagementCanvas.ctx.beginPath();
            engagementCanvas.ctx.moveTo(30,30);
            engagementCanvas.ctx.lineTo(30,270);
            engagementCanvas.ctx.lineTo(270,270);
            engagementCanvas.ctx.lineWidth = 3;
            engagementCanvas.ctx.lineCap = 'round';
            engagementCanvas.ctx.stroke();
            
            engagementCanvas.ctx.textAlign = 'center';
            engagementCanvas.ctx.font = '18pt Calibri';
            engagementCanvas.ctx.fillText('Challenge', 140, 290);
            engagementCanvas.ctx.save();
            engagementCanvas.ctx.rotate(-Math.PI/2);
            engagementCanvas.ctx.fillText('Interest', -140, 20);
            engagementCanvas.ctx.restore();
        }
        
        function drawDot() {
            engagementCanvas.ctx.beginPath();
            engagementCanvas.ctx.fillStyle = 'black';
            engagementCanvas.ctx.arc(
                engagementCanvas.currentPosition.x, 
                engagementCanvas.currentPosition.y, 
                10, 0, 2*Math.PI
            );
            engagementCanvas.ctx.fill();
        }
    }
})();
