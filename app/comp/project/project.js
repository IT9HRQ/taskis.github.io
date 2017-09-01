/*!
 * taskis.github.io
 * Copyright(c) 2016-2017 Javanile.org
 * MIT Licensed
 */

angular
    .module("app")
    .component("project", {
        bindings: {
            project: "<",
            projectIndex: "<",
            projectLayout: "<"
        },
        templateUrl: "app/comp/project/project.html",
        controller: function($scope) {
            this.$onInit = function() {
                console.log("progect:", $scope.$ctrl.project);
                $scope.project = $scope.$ctrl.project;
                $scope.projectIndex = $scope.$ctrl.projectIndex;
                $scope.projectLayout = $scope.$ctrl.projectLayout;
            }
        }
    });
