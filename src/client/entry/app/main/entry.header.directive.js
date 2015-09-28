(function() {
    'use strict';
    
    angular
        .module('entry')
        .directive('entryHeader', entryHeader);
        
    function entryHeader() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/main/entry.header.html',
            link: link,
            controller: EntryHeaderController,
            controllerAs: 'vm',
            bindToController: true
        };
        
        return directive;
        
        function link(scope, element, attrs, vm) {
            console.log('Entry Header Directive Link online');
        }
    }
    
    /* @ngInject */
    function EntryHeaderController($scope, $location) {
        console.log('Entry Header Directive Controller online');
 
        var vm = this;
        vm.title = 'Interactive Feedback System';
        
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
            case '/archive': {
                return $('#archive-btn');
            } break;
            case '/about': {
                return $('#about-btn');
            } break;
            default: {
                return $('#home-btn');
            }
        }
    }
    
})();