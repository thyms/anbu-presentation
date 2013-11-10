var express = require('express'),
    config = require('./config');

module.exports = function (compound) {
  var app = compound.app;

  var environment = 'development';
  app.configure(environment, function () {
    app.enable('log actions');
    app.enable('env info');
    app.enable('watch');
    app.enable('force assets compilation');
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

    app.set('config', config[environment]);
  });
};
