(function() {
    'use strict';
    
    angular
        .module('lecturer')
        .service('lecturerService', lecturerService);
    
    /* @ngInject */
    function lecturerService($resource, CONSTANT) {
        console.log('Ready (Lecturer Service)');
        
        /* jshint validthis: true */
        this.login = $resource(CONSTANT.baseURL + '/auth/login');
        this.logout = $resource(CONSTANT.baseURL + '/auth/logout');
    }
})();