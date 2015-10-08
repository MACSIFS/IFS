(function() {
    'use strict';
    
    angular
        .module('dashboard')
        .directive('dashboardHeader', dashboardHeader);
        
    function dashboardHeader() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/main/dashboard.header.html',
            link: link,
            controller: DashboardHeaderController,
            controllerAs: 'vm',
            bindToController: true
        };
        
        return directive;
        
        function link(scope, element, attrs, vm) {
            console.log('Entry Header Directive Link online');
        }
    }
    
    /* @ngInject */
    function DashboardHeaderController($scope) {
        console.log('Entry Header Directive Controller online');
 
        var vm = this;
        vm.title = 'Dashboard';
        
        $scope.$on("$locationChangeStart", function(event, next, current) {
            var nextPath = next.split('#')[1];
            var currentPath = current.split('#')[1];
                        
            var buttonNext = getButton(nextPath);
            var buttonCurrent = getButton(currentPath);
            
            buttonCurrent.removeClass('active');
            buttonNext.addClass('active');
            //event.preventDefault();
        });
    }
    
    function getButton(path) {
        switch(path) {
            case '/register': {
                return $('#register-btn');
            } break;
            default: {
                return $('#home-btn');
            }
        }
    }
    
})();