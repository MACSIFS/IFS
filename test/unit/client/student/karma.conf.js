module.exports = function(config) {
    config.set({
        singleRun: true,
        browsers: [
            'Firefox',
            'Chrome'
        ],
        logLevel: 'INFO',
        basePath: '../../../..',
        frameworks: ['jasmine'],
		plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-ng-html2js-preprocessor'
		],
        preprocessors: {
            'client/student/**/*.html': ['ng-html2js']
        },
        ngHtml2JsPreprocessor: {
            moduleName: 'templates',
            stripPrefix: 'client/student/'
        },
        files: [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'client/student/app/student.module.js',
            'client/student/app/**/*.js',
            'client/student/app/*.html',
            'test/unit/client/student/**/*.js'
        ]
    });
};

