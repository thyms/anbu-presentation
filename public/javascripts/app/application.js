(function() {
  var app, controllers;

  controllers = {
    StatusController: function($scope) {}
  };

  app = angular.module('main-app', []);

  app.controller("StatusController", controllers.StatusController);

  app.directive("duplicate", function() {
    return {
      restrict: "E",
      scope: {
        value: "=ngModel"
      },
      controller: "StatusController",
      templateUrl: "/partials/duplicate"
    };
  });

}).call(this);
