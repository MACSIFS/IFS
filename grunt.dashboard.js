console.log('Evaluating grunt.dashboard.js');

exports.concat = {
    js: {
        src: [
            'src/client/dashboard/app/dashboard.module.js',
            'release/concat/dashboard.js'
        ],
        dest: 'release/concat/dashboard.js'
    },
    css: {
        src: ['src/client/dashboard/content/css/*.css'],
        dest: 'release/concat/dashboard.css'
    }
};

exports.uglify = {
    files: {
        'release/min/dashboard.min.js': ['release/concat/dashboard.js']
    }
};

exports.cssmin = {
    files: {
        'release/min/dashboard.min.css': ['release/concat/dashboard.css']
    }
};

exports.jshint = 'src/client/dashboard/**/*.js';

exports.watch = {
    change: {
        files: ['src/client/dashboard/app/**/*.js'],
        tasks: ['jshint:dashboard']
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
                'bower_components/angular-route/angular-route.js',
                'src/client/dashboard/app/dashboard.module.js',
                'src/client/dashboard/app/**/*.js'
            ],
            dest: 'src/client/dashboard/index.html'
        },
        release: {
            options: {
                scriptTemplate: '<script src="{{ path }}"></script>',
                openTag: '<!-- Start of generated js tag -->',
                closeTag: '<!-- End of generated js tag -->'
            },
            src: [
                'release/min/IFS-deps.min.js',
                'release/min/dashboard.min.js'
            ],
            dest: 'src/client/dashboard/index.html'
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
                'src/client/dashboard/content/css/*.css'
            ],
            dest: 'src/client/dashboard/index.html'
        },
        release: {
            options: {
                linkTemplate: '<link rel="stylesheet" href="{{ path }}"/>',
                openTag: '<!-- Start of generated css tag -->',
                closeTag: '<!-- End of generated css tag -->'
            },
            src: [
                'bower_components/bootstrap/dist/css/bootstrap.css',
                'release/min/dashboard.min.css'
            ],
            dest: 'src/client/dashboard/index.html'
        }
    }
};

exports.ngAnnotate = {
    files: {
        'release/concat/dashboard.js': ['src/client/dashboard/app/**/*.js', '!src/client/dashboard/app/dashboard.module.js']
    }
};

