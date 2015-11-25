(function() {
    'use strict';
    
    angular
        .module('lecturer')
        .service('apiInterceptor', apiInterceptor);

    /* @ngInject */
    function apiInterceptor($q, $location) {
        
        /* jshint validthis: true */
        var service = this;
        service.responseError = responseError;
        
        function responseError(rejection) {
            console.log('%c UNAUTHORIZED', 'color: #8B0000');
            
            if (rejection.status == 403) {
                $location.path('/');
            }
            
            return $q.reject(rejection);
        }
    }
})();
