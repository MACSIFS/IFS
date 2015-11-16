(function() {
    'use strict';
    
    angular
        .module('student')
        .directive('engagementCanvas', engagementCanvas);
    
    function engagementCanvas() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/lecture/engagement.canvas.html',
            link: link,
            controller: EngagementCanvasController,
            controllerAs: 'engagementCanvas',
            bindToController: true
        };
        
        return directive;
        
        function link(scope, element, attrs, commentForm) {
            console.log('Ready (Engagement Canvas Link)');
        }
    }
    
    /* @ngInject */
    function EngagementCanvasController(lectureFactory) {
        console.log('Ready (Engagement Canvas Controller)');
        
        var engagementCanvas = this;
        
        var canvas = document.getElementById('engagement-canvas');
        var ctx = canvas.getContext('2d');
        var rect = {};
        var currentTimestamp = null;
        var currentMousePos = {};
        var currentClickPos = {x: -100, y: -100};
        var lastClickPos = {x: -100, y: -100};
        
        drawBackground(ctx);
        canvas.addEventListener('mousemove', mouseMoveListener, false);
        canvas.addEventListener('click', clickListener, false);
        canvas.addEventListener('touchmove', touchMoveListener, false);
        canvas.addEventListener('touchend', touchendListener, false);
        
        function touchMoveListener(event) {
            rect = canvas.getBoundingClientRect();
            currentMousePos = {
                x: event.targetTouches[0].clientX - rect.left,
                y: event.targetTouches[0].clientY - rect.top
            };
            
            var xBoundry = (currentMousePos.x >= 30 && currentMousePos.x <= 270);
            var yBoundry = (currentMousePos.y >= 30 && currentMousePos.y <= 270);
            if (xBoundry && yBoundry) {
                drawMovement(ctx, currentMousePos, true);
            }
        }
        
        function touchendListener(event) {
            event.preventDefault();
    
            rect = canvas.getBoundingClientRect();
            currentMousePos = {
                x: event.changedTouches[0].clientX - rect.left,
                y: event.changedTouches[0].clientY - rect.top
            };
            
            currentClickPos = currentMousePos;
            
            var xBoundry = (currentMousePos.x >= 30 && currentMousePos.x <= 270);
            var yBoundry = (currentMousePos.y >= 30 && currentMousePos.y <= 270);
            if (xBoundry && yBoundry) {
                
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawMovement(ctx, currentMousePos, true);
                
                ctx.beginPath();
                ctx.fillStyle = 'black';
                ctx.arc(currentMousePos.x, currentMousePos.y, 10, 0, 2*Math.PI);
                ctx.fill();
                
                currentTimestamp = event.timeStamp;
            }
        }
        
        function mouseMoveListener(event) {
            rect = canvas.getBoundingClientRect();
            currentMousePos = {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            };
            
            var xBoundry = (currentMousePos.x >= 30 && currentMousePos.x <= 270);
            var yBoundry = (currentMousePos.y >= 30 && currentMousePos.y <= 270);
            
            drawMovement(ctx, currentMousePos, false);
            
            ctx.beginPath();
            ctx.fillStyle = 'black';
            ctx.arc(currentClickPos.x, currentClickPos.y, 10, 0, 2*Math.PI);
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(currentMousePos.x, currentMousePos.y, 10, 0, 2*Math.PI);
            ctx.fillStyle = (xBoundry && yBoundry)? "rgba(0, 255, 0, 0.5)": "rgba(255, 0, 0, 0.5)";
            ctx.fill();
        }
        
        function clickListener(event) {
            var xBoundry = (currentMousePos.x >= 30 && currentMousePos.x <= 270);
            var yBoundry = (currentMousePos.y >= 30 && currentMousePos.y <= 270);
            if (xBoundry && yBoundry) {

                currentClickPos = {
                    x: event.pageX - rect.left,
                    y: event.pageY - rect.top
                };
                
                ctx.beginPath();
                ctx.fillStyle = 'black';
                ctx.arc(currentClickPos.x, currentClickPos.y, 10, 0, 2*Math.PI);
                ctx.fill();
                
                currentTimestamp = event.timeStamp;
            }
        }
        
        function drawMovement(ctx, position, onThouch) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBackground(ctx);
            
            if (onThouch) {
                ctx.beginPath();
                ctx.fillStyle = 'black';
                ctx.arc(position.x, position.y, 10, 0, 2*Math.PI);
                ctx.fill();
            }
        }
        
        function drawBackground(ctx) {
            ctx.beginPath();
            ctx.moveTo(30,30);
            ctx.lineTo(30,270);
            ctx.lineTo(270,270);
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.stroke();
            
            ctx.textAlign = 'center';
            ctx.font = '18pt Calibri';
            ctx.fillText('Interest', 140, 290);
            ctx.save();
            ctx.rotate(-Math.PI/2);
            ctx.fillText('Challenge', -140, 20);
            ctx.restore();
        }
        
        setInterval(function() {
            if (lastClickPos.x != currentClickPos.x || lastClickPos.y != currentClickPos.y) {
                lastClickPos = currentClickPos;
                
                lectureFactory.submitEngagement({
                    challenge: ((currentClickPos.x - 30)/240).toFixed(2),
                    interest: ((currentClickPos.y - 30)/240).toFixed(2),
                    time: (new Date(currentTimestamp)).toISOString()
                }, function() { console.log('submit engagement'); },
                function() { console.log('error'); });
            }
        }, 1000);
    }
})();