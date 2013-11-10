controllers =
  StatusController: ($scope) ->
#    console.log "value: #{$scope.value}"

app = angular.module('main-app', [])
app.controller("StatusController", controllers.StatusController)
app.directive "duplicate", ->
  restrict: "E"
  scope:
    value: "=ngModel"
  controller: "StatusController"
  templateUrl: "/partials/duplicate"
