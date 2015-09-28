module.exports = function (grunt) {
    'use strict'; 
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat:  {
            js: {
                src: ['src/client/app/app.module.js', 'release/concat/<%= pkg.name %>.js'],
                dest: 'release/concat/<%= pkg.name %>.js'
            },
            css: {
                src: ['src/client/content/css/*.css'],
                dest: 'release/concat/<%= pkg.name %>.css'
            },
            deps: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/bootstrap/dist/js/bootstrap.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-route/angular-route.js'
                ],
                dest: 'release/concat/<%= pkg.name %>-deps.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            js: {
                files: {
                    'release/minified/<%= pkg.name %>.min.js': 'release/concat/<%= pkg.name %>.js'
                }
            },
            deps: {
                files: {
                    'release/minified/<%= pkg.name %>-deps.min.js': ['<%= concat.deps.dest %>']
                }
            }
        },
        cssmin: {
            css: {
                files: {
                    'release/minified/<%= pkg.name %>.min.css': ['<%= concat.css.dest %>']
                }
            }
        },
        jshint: {
            files: ['gruntfile.js', 'src/client/app/**/*.js']
        },
        watch: {
            js: {
                files: ['src/client/app/**/*.js'],
                tasks: ['jshint']
            },
            html: {
                files: ['src/client/index.html'],
                tasks: ['tags:debugScripts', 'tags:debugLinks']
            }
        },
        tags: {
            devScripts: {
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
                    'src/client/app/app.module.js',
                    'src/client/app/app.route.js',
                    'src/client/app/**/*.js'
                ],
                dest: 'src/client/index.html'
            },
            devLinks: {
                options: {
                    linkTemplate: '<link rel="stylesheet" href="{{ path }}"/>',
                    openTag: '<!-- Start of generated css tag -->',
                    closeTag: '<!-- End of generated css tag -->'
                },
                src: [
                    'bower_components/bootstrap/dist/css/bootstrap.css',
                    'src/client/content/css/*.css'
                ],
                dest: 'src/client/index.html'
            },
            releaseScripts: {
                options: {
                    scriptTemplate: '<script src="{{ path }}"></script>',
                    openTag: '<!-- Start of generated js tag -->',
                    closeTag: '<!-- End of generated js tag -->'
                },
                src: [
                    'release/minified/<%= pkg.name %>-deps.min.js',
                    'release/minified/<%= pkg.name %>.min.js'
                ],
                dest: 'src/client/index.html',
            },
            releaseLinks: {
                options: {
                    linkTemplate: '<link rel="stylesheet" href="{{ path }}"/>',
                    openTag: '<!-- Start of generated css tag -->',
                    closeTag: '<!-- End of generated css tag -->'
                },
                src: [
                    'bower_components/bootstrap/dist/css/bootstrap.min.css',
                    'release/minified/<%= pkg.name %>.min.css'
                ],
                dest: 'src/client/index.html'
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            app: {
                files: {
                    'release/concat/<%= pkg.name %>.js': ['src/client/app/**/*.js','!src/client/app/app.module.js']
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-script-link-tags');
    grunt.loadNpmTasks('grunt-ng-annotate');
    
    grunt.registerTask('release', [
        'jshint',
        'ngAnnotate',
        'concat', 
        'uglify', 
        'cssmin', 
        'tags:releaseScripts',
        'tags:releaseLinks'
    ]); 
    grunt.registerTask('dev', [
        'jshint',
        'tags:devScripts',
        'tags:devLinks',
        'watch'
    ]);
    
    grunt.registerTask('default', ['dev']);
};