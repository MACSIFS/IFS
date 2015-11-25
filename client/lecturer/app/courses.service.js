(function() {
    'use strict';

    angular
        .module('lecturer')
        .service('coursesService', coursesService);

    /* @ngInject */
    function coursesService($resource, CONSTANT) {
        console.log('Ready (Courses Service)');
        
        /* jshint validthis: true */
        this.course = $resource(CONSTANT.baseURL + '/courses');
    }
})();