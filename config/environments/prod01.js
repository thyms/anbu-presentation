var config = require('./config');

module.exports = function (compound) {
  var app = compound.app;

  var environment = 'prod01';
  app.configure(environment, function () {
    app.enable('watch');
    app.disable('assets timestamps');
    app.use(require('express').errorHandler());
    app.settings.quiet = true;

    app.set('config', config[environment]);
  });
};
