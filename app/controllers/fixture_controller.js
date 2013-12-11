var q = require('q')
  , YAML = require('yamljs')
  , exec = q.denodeify(require('child_process').exec)
  , rootDir = require('path').dirname(process.mainModule.filename)
  , applicationProperties = YAML.load(rootDir +'/application_properties.yaml');

var config = compound.app.get('config'),
    configOriginal = compound.app.get('configOriginal');

if(!configOriginal) {
  configOriginal = JSON.parse(JSON.stringify(config));
  compound.app.set('configOriginal', configOriginal);
}

var application = {
  reset: function() {
    compound.app.set('config', JSON.parse(JSON.stringify(configOriginal)));
    send(compound.app.get('config'));
  },
  statusApplicationVersion: function() {
    send({ applicationVersion: applicationProperties.applicationVersion });
  },
  statusCommitHash: function() {
    send({ commitHash: applicationProperties.commitHash });
  }
};

action('reset', application.reset);
action('statusApplicationVersion', application.statusApplicationVersion);
action('statusCommitHash', application.statusCommitHash);