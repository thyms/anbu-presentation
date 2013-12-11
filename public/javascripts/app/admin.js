(function() {
  var app, controllers;

  app = angular.module('admin-app', ['ngResource']);

  app.config([
    '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
      $routeProvider.when("/admin/status/:section", {
        templateUrl: "/partials/admin_status",
        controller: "StatusController"
      }).when("/admin/status", {
        templateUrl: "/partials/admin_status",
        controller: "StatusController"
      }).otherwise({
        redirecTo: "/admin/status"
      });
      return $locationProvider.html5Mode(true);
    }
  ]);

  app.factory('Status', [
    '$resource', function($resource) {
      return $resource('/api/1/status/:section');
    }
  ]);

  controllers = {
    StatusController: function($scope, $routeParams, Status) {
      return $scope.params = Status.get({
        section: $routeParams.section
      });
    }
  };

  app.controller("StatusController", ['$scope', '$routeParams', 'Status', controllers.StatusController]);

}).call(this);
