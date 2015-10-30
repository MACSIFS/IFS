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
            controllerAs: 'vm',
            bindToController: true
        };
        
        return directive;
        
        function link(scope, element, attrs, vm) {
            console.log('Ready (Header Link)');
        }
    }
    
    /* @ngInject */
    function StudentHeaderController($scope, $location) {
        console.log('Ready (Header Controller)');
 
        var vm = this;
        vm.title = 'Interactive Feedback System';
        
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
        });
    }
    
    function getButtonElement(path) {
        switch(path) {
            case '/': {
                return $('#join-btn');
            } break;
            case '/archive': {
                return $('#archive-btn');
            } break;
            case '/about': {
                return $('#about-btn');
            } break;
            default: {
                return false;
            }
        }
    }
})();