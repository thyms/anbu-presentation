app = angular.module('admin-app', ['ngResource'])
app.config ['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) ->
  $routeProvider
    .when "/admin/status/:section",
      templateUrl: "/partials/admin_status"
      controller: "StatusController"
    .when "/admin/status",
      templateUrl: "/partials/admin_status"
      controller: "StatusController"
    .otherwise redirecTo: "/admin/status"

  $locationProvider.html5Mode(true)
]

app.factory 'Status', ['$resource', ($resource) ->
  $resource '/api/1/status/:section'
]

controllers =
  StatusController: ($scope, $routeParams, Status) ->
    $scope.params = Status.get(section: $routeParams.section)

app.controller "StatusController", ['$scope', '$routeParams', 'Status', controllers.StatusController]
