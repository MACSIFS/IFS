(function() {
    'use strict';
    
    angular
        .module('lecturer')
        .controller('LecturerCtrl', LecturerController);
    
    /* @ngInject */
    function LecturerController($scope, lecturerFactory) {
        console.log('Ready (Lecturer Controller)');
        
        var vm = this;

        $scope.$on('locationChangeStart', function() {
            console.log('location change');
            if (angular.isDefined(next)  &&  angular.isDefined(next.$$route)) {
                lecturerFactory.checkUserToken(function() {
                    console.log('success');
                    if (next.$$route.loginRequired) {
                        event.preventDefault();
                    }
                });
            }
        });
    }
})();