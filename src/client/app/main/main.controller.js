(function() {
    'use strict';
    
    angular
        .module('app')
        .controller('MainCtrl', MainController);

    /* @ngInject */
    function MainController($scope) {
        console.log('Main Controller online');
        
        var vm = this;
        
        vm.lectureCode = '';
        
        $scope.$watch('vm.lectureCode', function(current, old) {
            console.log(vm.lectureCode);
        });
    }
})();