"use strict";

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    files: {
      src: {
        app: {
          regex: 'app/**/*.js',
          config: {
            regex: 'config/**/*.js'
          },
          db: {
            regex: 'db/**/*.js'
          }
        },
        config: {
          gruntFile: 'Gruntfile.js',
          karmaFile: 'karma.conf.js'
        },
        assets: {
          regex: 'app/assets/**/*.coffee'
        },
        public: {
          javascript: {
            output: 'public/javascripts/vendor-app.min.js',
            app: {
              output: 'public/javascripts/app.js',
              regex: 'public/javascripts/app/**/*.js'
            },
            vendor: {
              output: 'public/javascripts/vendor.js',
              regex: 'public/javascripts/vendor/**/*.js'
            }
          }
        }
      },
      test: {
        frontend: {
          regex: 'test/frontend/**/*.coffee'
        },
        backend: {
          regex: 'test/backend/**/*.coffee'
        }
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
        src: '<%= files.src.config.gruntFile %>'
      },
      backend: {
        src: ['<%= files.src.app.regex %>', '<%= files.src.app.config.regex %>', '<%= files.src.app.db.regex %>']
      }
    },
    coffeelint: {
      options: {
        'max_line_length': {
          'level': 'ignore'
        }
      },
      frontend: { src: ['<%= files.src.assets.regex %>', '<%= files.test.frontend.regex %>'] },
      backend: { src: ['<%= files.test.backend.regex %>'] }
    },
    concat: {
      options: {
        stripBanners: true
      },
      app_and_vendor: {
        files: {
          '<%= files.src.public.javascript.app.output %>': ['<%= files.src.public.javascript.app.regex %>'],
          '<%= files.src.public.javascript.vendor.output %>': ['<%= files.src.public.javascript.vendor.regex %>']
        }
      }
    },
    uglify: {
      dist: {
        src: ['<%= files.src.public.javascript.vendor.output %>', '<%= files.src.public.javascript.app.output %>'],
        dest: '<%= files.src.public.javascript.output %>'
      }
    },
    clean: {
      frontend: ['<%= files.src.public.javascript.vendor.output %>', '<%= files.src.public.javascript.app.output %>'],
      backend: ['<%= files.src.public.javascript.vendor.output %>', '<%= files.src.public.javascript.app.output %>']
    },
    mochacli: {
      options: {
        files: '<%= files.test.backend.regex %>'
      },
      spec: {
        options: {
          reporter: 'progress',
          compilers: ['coffee:coffee-script']
        }
      },
      tap: {
        options: {
          reporter: 'tap',
          compilers: ['coffee:coffee-script']
        }
      }
    },
    karma: {
      test: {
        configFile: '<%= files.src.config.karmaFile %>'
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      backend: {
        files: ['<%= jshint.backend.src %>', '<%= coffeelint.backend.src %>'],
        tasks: ['jshint:backend', 'coffeelint:backend', 'test:backend']
      },
      frontend: {
        files: ['<%= coffeelint.frontend.src %>'],
        tasks: ['coffeelint:frontend', 'test:frontend']
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
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('build', ['jshint', 'coffeelint', 'concat', 'uglify', 'clean']);

  var testTask = ['mochacli:spec'];
  if (env !== 'development') { testTask = ['mochacli:tap']; }
  grunt.registerTask('test:frontend', ['karma:test']);
  grunt.registerTask('test:backend', testTask);
  grunt.registerTask('test', ['test:frontend', 'test:backend']);
};
