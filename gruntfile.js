var entry = require('./grunt.entry.js');
var dashboard = require('./grunt.dashboard.js');

module.exports = function (grunt) {
    'use strict'; 
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat:  {
            jsEntry: entry.concat.js,
            jsDashboard: dashboard.concat.js,
            cssEntry: entry.concat.css,
            cssDashboard: dashboard.concat.css,
            depsScripts: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/bootstrap/dist/js/bootstrap.js',
                    'bower_components/angular/angular.js',
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
            entry: entry.uglify,
            dashboard: dashboard.uglify,
            deps: {
                files: {
                    'release/min/<%= pkg.name %>-deps.min.js': ['<%= concat.depsScripts.dest %>']
                }
            }
        },
        cssmin: {
            entry: entry.cssmin,
            dashboard: dashboard.cssmin,
            deps: {
                files: {
                    'release/min/<%= pkg.name %>-deps.min.css': ['<%= concat.depsLinks.dest %>']
                }
            }
        },
        jshint: {
            entry: ['*.js', entry.jshint],
            dashboard: ['*.js', dashboard.jshint],
            all: ['*.js', 'src/**/*.js']
        },
        watch: {
            entry: entry.watch.change,
            dashboard: dashboard.watch.change,
        },
        tags: {
            devScriptsEntry: entry.tags.scripts.dev,
            devScriptsDashboard: dashboard.tags.scripts.dev,
            devLinksEntry: entry.tags.links.dev,
            devLinksDashboard: dashboard.tags.links.dev,
            releaseScriptsEntry: entry.tags.scripts.release,
            releaseScriptsDashboard: dashboard.tags.scripts.release,
            releaseLinksEntry: entry.tags.links.release,
            releaseLinksDashboard: dashboard.tags.links.release
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            entry: entry.ngAnnotate,
            dashboard: dashboard.ngAnnotate
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-script-link-tags');
    grunt.loadNpmTasks('grunt-ng-annotate');
    
    grunt.registerTask('dev:entry', [
        'jshint:entry',
        'tags:devScriptsEntry',
        'tags:devLinksEntry',
        'watch:entry',
    ]);
    
    grunt.registerTask('release:entry', [
        'jshint:entry',
        'ngAnnotate:entry',
        'concat:depsLinks',
        'concat:depsScripts',
        'concat:jsEntry',
        'concat:cssEntry',
        'uglify:deps',
        'uglify:entry',
        'cssmin:deps',
        'cssmin:entry',
        'tags:releaseScriptsEntry',
        'tags:releaseLinksEntry'
    ]);
    
    grunt.registerTask('dev:dashboard', [
        'jshint:dashboard',
        'tags:devScriptsDashboard',
        'tags:devLinksDashboard',
        'watch:dashboard'
    ]);
    
    grunt.registerTask('release:dashboard', [
        'jshint:dashboard',
        'ngAnnotate:dashboard',
        'concat:depsLinks',
        'concat:depsScripts',
        'concat:jsDashboard',
        'concat:cssDashboard',
        'uglify:deps',
        'uglify:dashboard',
        'cssmin:deps',
        'cssmin:dashboard',
        'tags:releaseScriptsDashboard',
        'tags:releaseLinksDashboard'
    ]);
    
    grunt.registerTask('release:all', [
        'release:entry',
        'release:dashboard'
    ]);
    
    grunt.registerTask('default', function() {
        console.log('');
        console.log('*************************');
        console.log('Please specify what to do:');
        console.log('');
        console.log('$ grunt <type>:<module> ');
        console.log('Example: grunt dev:entry');
        console.log('Example: grunt release:dashboard');
        console.log('');
        console.log('*************************');
    });
};
