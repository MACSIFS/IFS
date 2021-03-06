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
    function LecturerHeaderController($scope, $location, lecturerFactory) {
        console.log('Ready (Header Controller)');
 
        var vm = this;
        vm.title = 'Interactive Feedback System';
        vm.homeRoute = '#/';
        vm.username = '';
        vm.isLoggedIn = false;
        vm.logout = logout;
        
        lecturerFactory.registerObserverCallback(updateHeader);
        
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
        
        function updateHeader(loggedIn, username) {
            if (loggedIn) {
                vm.username = username;
                vm.isLoggedIn = loggedIn;
                vm.homeRoute = '#/courses';
            } else {
                vm.username = '';
                vm.isLoggedIn = false;
                vm.homeRoute = '#/';
            }
        }
        
        function logout() {
            lecturerFactory.logout();
        }
    }
    
    function getButtonElement(path) {
        switch(path) {
            case '/': {
                return angular.element('#login-btn');
            } break;
            case '/register': {
                return angular.element('#register-btn');
            } break;
            case '/courses': {
                return angular.element('#courses-btn');
            } break;
            default: {
                return false;
            }
        }
    }
    
})();
