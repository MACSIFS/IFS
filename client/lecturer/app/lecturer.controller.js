(function() {
    'use strict';
    
    angular
        .module('lecturer')
        .controller('LecturerCtrl', LecturerController);
    
    /* @ngInject */
    function LecturerController($scope, $location, userFactory) {
        console.log('Ready (Lecturer Controller)');
        
        var vm = this;
        
        $scope.$on("$routeChangeStart", function(event, next, current) {
            console.log('Route change (Lecture Controller)');
            if (angular.isDefined(next)  &&  angular.isDefined(next.$$route)) {
                if (!userFactory.isLoggedIn()  &&  next.$$route.loginRequired) {
                    event.preventDefault();
                    $location.path('/');
                }
            }
        });
    }
})();