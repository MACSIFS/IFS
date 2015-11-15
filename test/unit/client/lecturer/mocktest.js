'use strict';

/*
 * This is only a test to make sure that Karma with Jasmine is working properly,
 * it does not actually test the application and should thus be removed at a later time.
 */

angular.module('testapp', [])
    .controller('TestController', function TestController($scope) {
        $scope.number = 0;
        $scope.increaseWith = function(num) {
            $scope.number += num;
        }
    });

describe('TestController', function() {
    beforeEach(module('testapp'));

    var $controller;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));

    describe('$scope.number', function() {
        var $scope;
        var controller;

        beforeEach(function() {
            $scope = {};
            controller = $controller('TestController', { $scope: $scope });
        });

        it('Starts as 0', function() {
            expect($scope.number).toEqual(0);
        });

        it('Increases the number with num when callling increaseBy', function() {
            var prev = $scope.number;
            $scope.increaseWith(5);
            expect($scope.number).toEqual(prev + 5);
        });
    });
});
