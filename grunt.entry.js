console.log('Evaluating grunt.entry.js');

exports.concat = {
    js: {
        src: [
            'client/entry/app/entry.module.js',
            'release/concat/entry.js'
        ],
        dest: 'release/concat/entry.js'
    },
    css: {
        src: ['client/entry/content/css/*.css'],
        dest: 'release/concat/entry.css'
    }
};

exports.uglify = {
    files: {
        'release/min/entry.min.js': ['release/concat/entry.js']
    }
};

exports.cssmin = {
    files: {
        'release/min/entry.min.css': ['release/concat/entry.css']
    }
};

exports.jshint = 'client/entry/**/*.js';

exports.watch = {
    change: {
        files: ['client/entry/app/**/*.js'],
        tasks: ['jshint:entry']
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
                'client/entry/app/entry.module.js',
                'client/entry/app/**/*.js'
            ],
            dest: 'client/entry/index.html'
        },
        release: {
            options: {
                scriptTemplate: '<script src="{{ path }}"></script>',
                openTag: '<!-- Start of generated js tag -->',
                closeTag: '<!-- End of generated js tag -->'
            },
            src: [
                'release/min/IFS-deps.min.js',
                'release/min/entry.min.js'
            ],
            dest: 'client/entry/index.html'
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
                'client/entry/content/css/*.css'
            ],
            dest: 'client/entry/index.html'
        },
        release: {
            options: {
                linkTemplate: '<link rel="stylesheet" href="{{ path }}"/>',
                openTag: '<!-- Start of generated css tag -->',
                closeTag: '<!-- End of generated css tag -->'
            },
            src: [
                'bower_components/bootstrap/dist/css/bootstrap.css',
                'release/min/entry.min.css'
            ],
            dest: 'client/entry/index.html'
        }
    }
};

exports.ngAnnotate = {
    files: {
        'release/concat/entry.js': ['client/entry/app/**/*.js', '!client/entry/app/entry.module.js']
    }
};
