var YAML = require('yamljs')
  , rootDir = require('path').dirname(process.mainModule.filename)
  , applicationProperties = YAML.load(rootDir + "/application_properties.yaml");

var statusService = function () {
  var statusFunctions = {
    application: function () {
      return [
        {
          name: "application",
          properties: {
            applicationVersion: applicationProperties.applicationVersion,
            commitHash: applicationProperties.commitHash
          }
        }
      ];
    },
    health: function() {
      return [
        {
          name: "health",
          properties: {
            up: 'OK'
          }
        }
      ];
    }
  }

  var service = {
    getStatus: function (section) {
      var status = [];
      if (section) {
        status = statusFunctions[section] ? statusFunctions[section].apply() : [{name: 'Unknown section'}];
      } else {
        for (var section in statusFunctions) {
          if (statusFunctions.hasOwnProperty(section)) {
            status  = status.concat(statusFunctions[section].apply())
          }
        }
      }

      return status;
    }
  };

  return service;
}

module.exports = statusService()
