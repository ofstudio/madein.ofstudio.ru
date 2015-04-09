'use strict';

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        src: 'src',
        dist: 'content/themes/madein.ofstudio.theme',

        sass: {
            options: {
                includePaths: ['<%= src %>/assets/bower_components/materialize/sass']
            },
            dist: {
                options: {
                    outputStyle: 'extended'
                },
                files: {
                    '<%= src %>/assets/css/madein.css': '<%= src %>/assets/scss/madein.scss'
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= src %>/assets/js/**/*.js'
            ]
        },

        clean: {
            theme: {
                src: ['<%= dist %>/*']
            }
        },

        copy: {
            theme: {
                files: [{
                    expand: true,
                    cwd: '<%= src %>/',
                    src: [
                        'assets/font/**',
                        'assets/img/**/*',
                        '**/*.hbs',
                        '**/*.json',
                        '!assets/**/*.scss',
                        '!assets/bower_components/**'
                    ],
                    dest: '<%= dist %>'
                }, {
                    expand: true,
                    flatten: false,
                    cwd: '<%= src %>/assets/bower_components/materialize/font/',
                    src: ['**'],
                    dest: '<%= dist %>/assets/font/',
                    filter: 'isFile'
                }]
            }
        },

        uglify: {
            options: {
                preserveComments: 'some',
                mangle: false
            }
        },

        useminPrepare: {
            hbs: ['<%= src %>/default.hbs'],
            options: {
                dest: '<%= dist %>'
            }
        },

        usemin: {
            hbs: ['<%= dist %>/**/*.hbs', '!<%= src %>/assets/bower_components/**'],
            css: ['<%= dist %>/assets/css/**/*.css'],
            options: {
                dirs: ['<%= dist %>'],
                blockReplacements: {
                    css: function (block) {
                        return '<link rel="stylesheet" href="{{asset "' +
                            block.dest.replace('assets/', '') + '"}}">';
                    },
                    js: function (block) {
                        return '<script src="{{asset "' +
                            block.dest.replace('assets/', '') + '"}}"></script>';
                    }
                }
            }
        },

        watch: {
            livereload: {
                files: [
                    '<%= src %>/assets/scss/**/*.scss',
                    '<%= src %>/**/*.hbs',
                    '!<%= src %>/assets/bower_components/**',
                    '<%= src %>/assets/js/**/*.js',
                    '<%= src %>/assets/css/**/*.css',
                    '<%= src %>/assets/img/**/*'
                ],
                tasks: ['build-theme']
            }
        },

        wiredep: {
            target: {
                src: [
                    '<%= src %>/default.hbs'
                ],
                exclude: [
                    'materialize'
                ]
            }
        },

        shell: {
            ghost_start: {
                command: 'npm start'
            },
            deploy_theme: {
                command: './deploy.sh'
            }
        }

    });

    grunt.registerTask('bower-install', ['wiredep']);
    grunt.registerTask('build-theme', ['sass', 'clean:theme', 'jshint', 'useminPrepare',
        'copy:theme', 'concat', 'cssmin', 'uglify', 'usemin']);
    grunt.registerTask('deploy', ['build-theme', 'shell:deploy_theme']);
    grunt.registerTask('start-ghost', ['shell:ghost_start']);
    grunt.registerTask('default', ['build-theme', 'watch']);

};
