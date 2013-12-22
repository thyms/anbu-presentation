module.exports = function (config) {
  config.set({
    basePath: '',
    autoWatch: true,
    frameworks: ['mocha'],
    files: [
      'public/javascripts/vendor/angular-min.js',
      'public/javascripts/vendor/angular-resource-min.js',
      'public/javascripts/vendor/jquery-min.js',
      'public/javascripts/vendor/bootstrap.js',
      'app/**/*.coffee',
      'test/lib/**/*.js',
      'test/frontend/**/*.coffee'
    ],
    browsers: ['PhantomJS'],

    reporters: ['progress', 'coverage'],
    preprocessors: {
      'app/**/*.coffee': ['coffee'],
      'test/**/*.coffee': ['coffee']
    },

    singleRun: true
  });
};
