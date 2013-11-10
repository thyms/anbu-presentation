"use strict";

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    testFiles: {
      regex: 'test/**/*.coffee'
    },
    concat: {
      options: {
        stripBanners: true
      },
      dist: {
        src: ['public/javascripts/app/**/*.js', 'public/javascripts/vendor/**/*.js'],
        dest: 'public/javascripts/app.js'
      }
    },
    uglify: {
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'public/javascripts/app.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        unused: true,
        boss: true,
        eqnull: true,
        node: true,
        trailing: true,
        laxcomma: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      app: {
        src: ['app/**/*.js', 'config/**/*.js', 'db/**/*.js']
      },
      publics: {
        files: { src: 'public/javascripts/app/*.js' },
        options: {
          browser: true,
          undef: true
        }
      }
    },
    coffeelint: {
      assets: { src: ['app/assets/**/*.coffee'] },
      tests: { src: ['<%= testFiles.regex %>'] }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      app: {
        files: '<%= jshint.app.src %>',
        tasks: ['jshint:app']
      },
      publics: {
        files: '<%= jshint.publics.files.src %>',
        tasks: ['jshint:publics']
      },
      assets: {
        files: '<%= coffeelint.assets.src %>',
        tasks: ['coffeelint:assets']
      },
      tests: {
        files: '<%= testFiles.regex %>',
        tasks: ['coffeelint:tests', 'mochacli:spec']
      }
    },
    mochacli: {
      options: {
        files: '<%= testFiles.regex %>'
      },
      spec: {
        options: {
          reporter: 'spec',
          compilers: ['coffee:coffee-script']
        }
      },
      tap: {
        options: {
          reporter: 'tap',
          compilers: ['coffee:coffee-script']
        }
      }
    }
  });
  var env = process.env.NODE_ENV || 'development';

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-coffeelint');
  grunt.loadNpmTasks('grunt-mocha-cli');

  grunt.registerTask('default', ['jshint', 'coffeelint', 'concat', 'uglify']);

  var testTask = ['mochacli:spec'];
  if (env !== 'development') { testTask = ['mochacli:tap']; }
  grunt.registerTask('test', testTask);
};
