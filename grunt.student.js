console.log('Evaluating grunt.student.js');

exports.concat = {
    js: {
        src: [
            'client/student/app/student.module.js',
            'client/shared/shared.module.js',
            'release/concat/student.js',
        ],
        dest: 'release/concat/student.js'
    },
    css: {
        src: ['client/student/content/css/*.css'],
        dest: 'release/concat/student.css'
    }
};

exports.uglify = {
    files: {
        'release/min/student.min.js': ['release/concat/student.js']
    }
};

exports.cssmin = {
    files: {
        'release/min/student.min.css': ['release/concat/student.css']
    }
};

exports.jshint = 'client/student/**/*.js';

exports.watch = {
    change: {
        files: ['client/student/app/**/*.js'],
        tasks: ['jshint:student']
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
                'client/student/app/student.module.js',
                'client/student/app/**/*.js',
                'client/shared/shared.module.js',
                'client/shared/**/*.js'
            ],
            dest: 'client/student/index.html'
        },
        release: {
            options: {
                scriptTemplate: '<script src="{{ path }}"></script>',
                openTag: '<!-- Start of generated js tag -->',
                closeTag: '<!-- End of generated js tag -->'
            },
            src: [
                'release/min/IFS-deps.min.js',
                'release/min/student.min.js'
            ],
            dest: 'client/student/index.html'
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
                'client/student/content/css/*.css'
            ],
            dest: 'client/student/index.html'
        },
        release: {
            options: {
                linkTemplate: '<link rel="stylesheet" href="{{ path }}"/>',
                openTag: '<!-- Start of generated css tag -->',
                closeTag: '<!-- End of generated css tag -->'
            },
            src: [
                'bower_components/bootstrap/dist/css/bootstrap.css',
                'release/min/student.min.css'
            ],
            dest: 'client/student/index.html'
        }
    }
};

exports.ngAnnotate = {
    files: {
        'release/concat/student.js': [
            'client/student/app/**/*.js', 
            '!client/student/app/student.module.js',
            'client/shared/**/*.js',
            '!client/shared/shared.module.js'
        ]
    }
};
