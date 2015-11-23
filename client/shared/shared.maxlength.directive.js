(function() {
    'use strict';
    
    angular
        .module('ifsShared')
        .directive('maxlength', maxlengthDir);
    
    //prevent further input when reaching maxlength
    function maxlengthDir() {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
              var maxlength = Number(attrs.myMaxlength);
              function fromUser(text) {
                  if (text.length > maxlength) {
                    var transformedInput = text.substring(0, maxlength);
                    ngModelCtrl.$setViewValue(transformedInput);
                    ngModelCtrl.$render();
                    return transformedInput;
                  } 
                  return text;
              }
              ngModelCtrl.$parsers.push(fromUser);
            }
        };
    }
    
    /* @ngInject */
    function IfsFeedbackController() {
        console.log('Ready (Ifs maxlength Controller)');
    }
})();