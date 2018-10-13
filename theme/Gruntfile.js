const sass = require('node-sass')

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt)

  grunt.initConfig({
    source: 'src',
    build: '../app/content/themes/build',

    sass: {
      options: {
        // implementation: sass,
        includePaths: ['<%= source %>/assets/bower_components/materialize/sass']
      },
      build: {
        options: {
          outputStyle: 'extended'
        },
        files: {
          '<%= source %>/assets/css/madein.css': '<%= source %>/assets/scss/madein.scss'
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['<%= source %>/assets/js/**/*.js']
    },

    clean: {
      build: ['<%= build %>/*'],
      tmp: ['.tmp'],
      options: {
        force: true
      }
    },

    copy: {
      theme: {
        files: [{
          expand: true,
          cwd: '<%= source %>/',
          src: [
            'assets/font/**',
            'assets/img/**/*',
            '**/*.hbs',
            '**/*.json',
            '!assets/**/*.scss',
            '!assets/bower_components/**',
            '!templates/**'
          ],
          dest: '<%= build %>'
        }, {
          expand: true,
          flatten: false,
          cwd: '<%= source %>/assets/bower_components/materialize/font/',
          src: ['**'],
          dest: '<%= build %>/assets/font/',
          filter: 'isFile'
        }, {
          src: ['package.json'],
          dest: '<%= build %>/'
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
      hbs: ['<%= source %>/default.hbs'],
      options: {
        dest: '<%= build %>'
      }
    },

    usemin: {
      hbs: ['<%= build %>/**/*.hbs', '!<%= source %>/assets/bower_components/**'],
      css: ['<%= build %>/assets/css/**/*.css'],
      options: {
        dirs: ['<%= build %>'],
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
          processName: function (filePath) { // input:  templates/_header.hbs
            var pieces = filePath.split('/');
            return pieces[pieces.length - 1]; // output: _header.hbs
          }
        },
        files: {
          '<%= source %>/assets/js/templates.js': ['<%= source %>/templates/**/*.hbs']
        }
      }
    },

    watch: {
      livereload: {
        files: [
          '<%= source %>/assets/scss/**/*.scss',
          '<%= source %>/**/*.hbs',
          '!<%= source %>/assets/bower_components/**',
          '<%= source %>/assets/js/**/*.js',
          '<%= source %>/assets/css/**/*.css',
          '<%= source %>/assets/img/**/*',
          'Gruntfile.js',
          'package.json'
        ],
        tasks: ['build']
      }
    },

    wiredep: {
      target: {
        src: [
          '<%= source %>/default.hbs'
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

  })


  grunt.registerTask('bower-install', ['wiredep'])
  grunt.registerTask('build', [
    'sass',
    'clean:build',
    'handlebars',
    'jshint',
    'useminPrepare',
    'copy:theme',
    'concat',
    'cssmin',
    'uglify',
    'usemin',
    'clean:tmp'
  ])

  grunt.registerTask('default', ['build', 'watch'])

}
