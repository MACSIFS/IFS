console.log('Evaluating grunt.lecturer.js');

exports.concat = {
    js: {
        src: [
            'client/lecturer/app/lecturer.module.js',
            'client/shared/shared.module.js',
            'release/concat/lecturer.js'
        ],
        dest: 'release/concat/lecturer.js'
    },
    css: {
        src: ['client/lecturer/content/css/*.css'],
        dest: 'release/concat/lecturer.css'
    }
};

exports.uglify = {
    files: {
        'release/min/lecturer.min.js': ['release/concat/lecturer.js']
    }
};

exports.cssmin = {
    files: {
        'release/min/lecturer.min.css': ['release/concat/lecturer.css']
    }
};

exports.jshint = 'client/lecturer/**/*.js';

exports.watch = {
    change: {
        files: ['client/lecturer/app/**/*.js'],
        tasks: ['jshint:lecturer']
    }
};

exports.tags = {
    scripts: {
        dev: {
            options: {
                scriptTemplate: '<script src="{{ path }}"></script>',
                openTag: '<!-- Start of generated js tag -->',
                closeTag: '<!-- End of generated js tag -->'
            },
            src: [
                'bower_components/jquery/dist/jquery.js',
                'bower_components/bootstrap/dist/js/bootstrap.js',
                'bower_components/angular/angular.js',
                'bower_components/angular-resource/angular-resource.js',
                'bower_components/angular-route/angular-route.js',
                'client/lecturer/app/lecturer.module.js',
                'client/lecturer/app/**/*.js',
                'client/shared/shared.module.js',
                'client/shared/**/*.js'
            ],
            dest: 'client/lecturer/index.html'
        },
        release: {
            options: {
                scriptTemplate: '<script src="{{ path }}"></script>',
                openTag: '<!-- Start of generated js tag -->',
                closeTag: '<!-- End of generated js tag -->'
            },
            src: [
                'release/min/IFS-deps.min.js',
                'release/min/lecturer.min.js'
            ],
            dest: 'client/lecturer/index.html'
        }
    },
    links: {
        dev: {
            options: {
                linkTemplate: '<link rel="stylesheet" href="{{ path }}"/>',
                openTag: '<!-- Start of generated css tag -->',
                closeTag: '<!-- End of generated css tag -->'
            },
            src: [
                'bower_components/bootstrap/dist/css/bootstrap.css',
                'client/lecturer/content/css/*.css'
            ],
            dest: 'client/lecturer/index.html'
        },
        release: {
            options: {
                linkTemplate: '<link rel="stylesheet" href="{{ path }}"/>',
                openTag: '<!-- Start of generated css tag -->',
                closeTag: '<!-- End of generated css tag -->'
            },
            src: [
                'bower_components/bootstrap/dist/css/bootstrap.css',
                'release/min/lecturer.min.css'
            ],
            dest: 'client/lecturer/index.html'
        }
    }
};

exports.ngAnnotate = {
    files: {
        'release/concat/lecturer.js': [
            'client/lecturer/app/**/*.js', 
            '!client/lecturer/app/lecturer.module.js',
            'client/shared/**/*.js'
        ]
    }
};
