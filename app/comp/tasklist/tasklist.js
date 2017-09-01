/*!
 * taskis.github.io
 * Copyright(c) 2016-2017 Javanile.org
 * MIT Licensed
 */

angular
    .module("app")
    .component("tasklist", {
        bindings: {
            project: "<",
            projectIndex: "<",
            projectLayout: "<"
        },
        templateUrl: "app/comp/tasklist/tasklist.html",
        controller: function($scope, $rootScope) {
            this.$onInit = function() {
                var project = $scope.$ctrl.project;
                var projectIndex = $scope.$ctrl.projectIndex;
                var projectLayout = $scope.$ctrl.projectLayout;
                $scope.project = project;
                $scope.projectIndex = projectIndex;
                $scope.projectLayout = projectLayout;

                gapi.client.tasks.tasks.list({
                    tasklist: project.id,
                    //maxResults: 10
                }).execute(function(resp) {
                    $scope.$apply(function() {
                        console.log('tasklist:', resp.items);
                        $scope.tasklist = resp.items;
                        for (var i in $scope.tasklist) {
                            var task = $scope.tasklist[i];
                            task.score = 0;
                            if (task.notes) {
                                var score = task.notes.trim().match(/(?:\r\n|\r|\n)/g);
                                task.score += score ? score.length : 1;
                            }
                            var score = task.title.trim().match(/(?:\r\n|\r|\n)/g);
                            task.score += score ? score.length : 1;
                        }
                        $rootScope.boardScores[projectIndex] = resp.items.length;
                    });
                });
            };
        }
    });
