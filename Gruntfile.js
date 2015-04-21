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
                        '!assets/bower_components/**',
                        '!templates/**'
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

        handlebars: {
            compile: {
                options: {
                    namespace: 'Handlebars.templates',
                    processName: function(filePath) { // input:  templates/_header.hbs
                        var pieces = filePath.split('/');
                        return pieces[pieces.length - 1]; // output: _header.hbs
                    }
                },
                files: {
                    '<%= src %>/assets/js/templates.js': ['<%= src %>/templates/**/*.hbs']
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
                    'materialize' // use custom build. See .materialize-js-concat-order.html and madein.scss
                ],
                overrides: {
                    'jquery': {
                        main: 'dist/jquery.min.js'
                    },
                    'handlebars': {
                        main: 'handlebars.runtime.min.js'
                    }
                }
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
    grunt.registerTask('build-theme', ['sass', 'clean:theme', 'handlebars', 'jshint', 'useminPrepare',
        'copy:theme', 'concat', 'cssmin', 'uglify', 'usemin']);
    grunt.registerTask('deploy', ['build-theme', 'shell:deploy_theme']);
    grunt.registerTask('start-ghost', ['shell:ghost_start']);
    grunt.registerTask('default', ['build-theme', 'watch']);

};
