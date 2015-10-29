(function() {
    'use strict';
    
    angular
        .module('lecturer')
        .directive('lecturerHeader', lecturerHeader);
        
    function lecturerHeader() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/lecturer.header.html',
            link: link,
            controller: LecturerHeaderController,
            controllerAs: 'vm',
            bindToController: true
        };
        
        return directive;
        
        function link(scope, element, attrs, vm) {
            console.log('Ready (Header Link)');
        }
    }
    
    /* @ngInject */
    function LecturerHeaderController($scope) {
        console.log('Ready (Header Controller)');
 
        var vm = this;
        vm.title = 'Lecturer';
        
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
                return $('#login-btn');
            } break;
            case '/register': {
                return $('#register-btn');
            } break;
            default: {
                return false;
            }
        }
    }
    
})();