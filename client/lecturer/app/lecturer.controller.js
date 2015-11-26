(function() {
    'use strict';
    
    angular
        .module('lecturer')
        .controller('LecturerCtrl', LecturerController);
    
    /* @ngInject */
    function LecturerController($scope, lecturerFactory) {
        console.log('Ready (Lecturer Controller)');
        lecturerFactory.checkUserToken();
        
        var vm = this;

        $scope.$on('$routeChangeStart', function(event, next, current) {
            console.log('Route change');
            if (angular.isDefined(next)  &&  angular.isDefined(next.$$route)) {
                
                if (next.$$route.loginRequired) {
                    lecturerFactory.checkUserToken(null, function() {
                        // Prevent access to next route on error.
                        event.preventDefault();
                    });
                }
            }
        });
    }
})();
