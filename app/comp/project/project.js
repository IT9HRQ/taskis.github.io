/**
 *
 */

angular
    .module("app")
    .component("project", {
        bindings: { project: "<", projectIndex: "<" },
        templateUrl: "app/comp/project/project.html",
        controller: function($scope) {
            this.$onInit = function() {
                console.log("progect:", $scope.$ctrl.project);
                $scope.project = $scope.$ctrl.project;
                $scope.projectIndex = $scope.$ctrl.projectIndex;
            }
        }
    });
