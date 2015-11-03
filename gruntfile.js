var student = require('./grunt.student.js');
var lecturer = require('./grunt.lecturer.js');

module.exports = function (grunt) {
    'use strict'; 
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat:  {
            jsStudent: student.concat.js,
            jsLecturer: lecturer.concat.js,
            cssStudent: student.concat.css,
            cssLecturer: lecturer.concat.css,
            depsScripts: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/bootstrap/dist/js/bootstrap.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-resource/angular-resource.js',
                    'bower_components/angular-route/angular-route.js'
                ],
                dest: 'release/concat/<%= pkg.name %>-deps.js'
            },
            depsLinks: {
                src: ['bower_components/bootstrap/dist/css/bootstrap.css'],
                dest: 'release/concat/<%= pkg.name %>-deps.css'
            }
        },
        uglify: {
            student: student.uglify,
            lecturer: lecturer.uglify,
            deps: {
                files: {
                    'release/min/<%= pkg.name %>-deps.min.js': ['<%= concat.depsScripts.dest %>']
                }
            }
        },
        cssmin: {
            student: student.cssmin,
            lecturer: lecturer.cssmin,
            deps: {
                files: {
                    'release/min/<%= pkg.name %>-deps.min.css': ['<%= concat.depsLinks.dest %>']
                }
            }
        },
        jshint: {
            student: ['*.js', student.jshint],
            lecturer: ['*.js', lecturer.jshint],
            all: ['*.js', 'src/**/*.js']
        },
        watch: {
            student: student.watch.change,
            lecturer: lecturer.watch.change,
        },
        tags: {
            devScriptsStudent: student.tags.scripts.dev,
            devScriptsLecturer: lecturer.tags.scripts.dev,
            devLinksStudent: student.tags.links.dev,
            devLinksLecturer: lecturer.tags.links.dev,
            releaseScriptsStudent: student.tags.scripts.release,
            releaseScriptsLecturer: lecturer.tags.scripts.release,
            releaseLinksStudent: student.tags.links.release,
            releaseLinksLecturer: lecturer.tags.links.release
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            student: student.ngAnnotate,
            lecturer: lecturer.ngAnnotate
        },
        karma: {
            options: {
            },
            lecturer: {
                configFile: 'test/unit/client/lecturer/karma.conf.js',
            },
            student: {
                configFile: 'test/unit/client/student/karma.conf.js',
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
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('test:lecturer', [
        'karma:lecturer'
    ]);

    grunt.registerTask('test:student', [
        'karma:student'
    ]);

    // Fails when there are no tests, so add test:student later
    grunt.registerTask('test:all', [
        'test:lecturer'
    ]);
    
    grunt.registerTask('dev:student', [
        'jshint:student',
        'tags:devScriptsStudent',
        'tags:devLinksStudent',
        'watch:student',
    ]);
    
    grunt.registerTask('release:student', [
        'jshint:student',
        'ngAnnotate:student',
        'concat:depsLinks',
        'concat:depsScripts',
        'concat:jsStudent',
        'concat:cssStudent',
        'uglify:deps',
        'uglify:student',
        'cssmin:deps',
        'cssmin:student',
        'tags:releaseScriptsStudent',
        'tags:releaseLinksStudent'
    ]);
    
    grunt.registerTask('dev:lecturer', [
        'jshint:lecturer',
        'tags:devScriptsLecturer',
        'tags:devLinksLecturer',
        'watch:lecturer'
    ]);
    
    grunt.registerTask('release:lecturer', [
        'jshint:lecturer',
        'ngAnnotate:lecturer',
        'concat:depsLinks',
        'concat:depsScripts',
        'concat:jsLecturer',
        'concat:cssLecturer',
        'uglify:deps',
        'uglify:lecturer',
        'cssmin:deps',
        'cssmin:lecturer',
        'tags:releaseScriptsLecturer',
        'tags:releaseLinksLecturer'
    ]);
    
    grunt.registerTask('release:all', [
        'release:student',
        'release:lecturer'
    ]);
    
    grunt.registerTask('default', function() {
        console.log('');
        console.log('*************************');
        console.log('Please specify what to do:');
        console.log('');
        console.log('$ grunt <type>:<module> ');
        console.log('Example: grunt dev:student');
        console.log('Example: grunt release:lecturer');
        console.log('');
        console.log('Available types:');
        console.log('test:');
        console.log('  :lecturer - Run unit tests for lecture module');
        console.log('  :student - Run unit tests for student module');
        console.log('  :all - Run all unit tests');
        console.log('');
        console.log('*************************');
    });
};
