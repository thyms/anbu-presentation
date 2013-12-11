var statusService = require('./app/service/StatusService');

var actions = {
  index: function () {
    send({status: statusService.getStatus()});
  },
  show: function() {
    send({status: statusService.getStatus(req.params.id)});
  }
}

action('index', actions.index);
action('show', actions.show);