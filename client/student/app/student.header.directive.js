(function() {
    'use strict';
    
    angular
        .module('student')
        .directive('studentHeader', studentHeader);
        
    function studentHeader() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/student.header.html',
            link: link,
            controller: StudentHeaderController,
            controllerAs: 'headerVm',
            bindToController: true
        };
        
        return directive;
        
        function link(scope, element, attrs, headerVm) {
            console.log('Ready (Header Link)');
        }
    }
    
    /* @ngInject */
    function StudentHeaderController($scope, $location, lectureFactory) {
        console.log('Ready (Header Controller)');
        lectureFactory.registerObserverCallback(updateHeader);
 
        var headerVm = this;
        headerVm.showComments = lectureFactory.linkShowComment;
        headerVm.showEngagement = lectureFactory.linkShowEngagement;
        resetHeader(headerVm);
        
        // Catch location change in order to change highligting:
        $scope.$on("$routeChangeStart", function(event, next, current) {
            console.log('Route change (Header Controller)');
            
            // Current route exists (does not exist on page refresh):
            if (angular.isDefined(current)  &&  angular.isDefined(current.$$route)) {
                var currentButton = getButtonElement(current.$$route.originalPath);
                if (currentButton) {
                    currentButton.removeClass('active');
                }
            }
            
            if (angular.isDefined(next)  &&  angular.isDefined(next.$$route)) {
                if (angular.equals(next.$$route.originalPath, '/')) {
                    resetHeader(headerVm);
                }
            }
        });
        
        function updateHeader(lecture) {
            if (angular.isDefined(lecture.id)) {
                headerVm.lectureId = lecture.id;
                headerVm.hasJoined = true;
                headerVm.title = '';
                headerVm.icon = 'glyphicon-circle-arrow-left';
                headerVm.lectureTitle = lecture.name;
                headerVm.lectureIcon = 'glyphicon-blackboard';
            } else {
                resetHeader(headerVm);
            }
        }
    }
    
    function resetHeader(headerVm) {
        headerVm.hasJoined = false;
        headerVm.title = 'Interactive Feedback System';
        headerVm.icon = 'glyphicon-globe';
        headerVm.lectureTitle = '';
        headerVm.lectureIcon = '';
    }
    
    function getButtonElement(path) {
        switch(path) {
            case '/': {
                return angular.element('#join-btn');
            } break;
            case '/archive': {
                return angular.element('#archive-btn');
            } break;
            case '/about': {
                return angular.element('#about-btn');
            } break;
            default: {
                return false;
            }
        }
    }    
})();