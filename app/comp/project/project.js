/**
 *
 */

angular
    .module("app")
    .component("project", {
        bindings: { project: "<" },
        templateUrl: "app/comp/project/project.html",
        controller: function($scope) {
            this.$onInit = function() {
                console.log("progect:", $scope.$ctrl.project);
                $scope.project = $scope.$ctrl.project;
            }
        }
    });
