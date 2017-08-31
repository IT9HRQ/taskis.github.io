/**
 *
 */

angular
    .module("app")
    .component("tasklist", {
        bindings: { project: "<" },
        templateUrl: "app/comp/tasklist/tasklist.html",
        controller: function($scope) {
            this.$onInit = function() {
                console.log("progect:", $scope.$ctrl.project);
                $scope.project = $scope.$ctrl.project;
                gapi.client.tasks.tasks.list({
                    tasklist: $scope.project.id,
                    //maxResults: 10
                }).execute(function(resp) {
                    $scope.$apply(function() {
                        console.log('tasklist:', resp.items);
                        $scope.tasklist = resp.items;
                    });
                });
            }
        }
    });
