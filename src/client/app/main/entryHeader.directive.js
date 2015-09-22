(function() {
    'use strict';
    
    angular
        .module('app')
        .directive('entryHeader', entryHeader);
        
    function entryHeader() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/main/entryHeader.html',
            link: link,
            controller: EntryHeaderController,
            controllerAs: 'vm',
            bindToController: true
        };
        
        return directive;
        
        function link(scope, element, attrs, vm) {
            console.log('Entry Header Directive Link online');
            
            var wrapper = element.find('nav ul > li');
            
            var buttons = [];
            var currentButton;

            wrapper.each(function(index, elem) {
                
                buttons[index] = elem;
                $(elem).click(function() {
                    console.log('click');
                    
                    buttons.forEach(function(button) {
                        $(button).removeClass('active');
                        
                        console.log('path', scope.location.path());
                        
                    });
                    
                });
            });
        }
    }
    
    /* @ngInject */
    function EntryHeaderController($scope, $location) {
        console.log('Entry Header Directive Controller online');
 
        var vm = this;
        vm.title = 'Interactive Feedback System';
                
        $scope.location = $location;
       
    }
})();