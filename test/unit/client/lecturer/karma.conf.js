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
            'client/lecturer/**/*.html': ['ng-html2js']
        },
        ngHtml2JsPreprocessor: {
            moduleName: 'templates',
            stripPrefix: 'client/lecturer/'
        },
        files: [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'client/lecturer/app/lecturer.module.js',
            'client/lecturer/app/**/*.js',
            'client/lecturer/app/*.html',
            'test/unit/client/lecturer/**/*.js'
        ]
    });
};

