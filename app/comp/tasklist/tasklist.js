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
                        var projectScore = 0;
                        for (var i in $scope.tasklist) {
                            var task = $scope.tasklist[i];
                            task.score = getTaskScore(task);
                            projectScore += task.score;
                        }
                        $rootScope.boardScores[projectIndex] = projectScore;

                        $scope.tasklist12 = [];
                        $scope.tasklist22 = [];

                        var currentScore = 0;
                        var projectScore2 = projectScore / 2;
                        for (var i in $scope.tasklist) {
                            var task = $scope.tasklist[i];
                            if (currentScore < projectScore2) {
                                $scope.tasklist12.push(task);
                            } else {
                                $scope.tasklist22.push(task);
                            }
                            currentScore += task.score;
                        }
                    });
                });
            };
        }
    });

/**
 * Get score of a task.
 *
 * @param task
 */
function getTaskScore(task)
{
    var score = 0;

    if (task.notes) {
        var notes = task.notes.trim();
        var newline = notes.match(/(?:\r\n|\r|\n)/g);
        score += Math.max(
            newline ? newline.length : 1,
            Math.floor(notes.length / 40) + 1
        );
    }

    var title = task.title.trim();
    var newline = title.match(/(?:\r\n|\r|\n)/g);
    score += Math.max(
        newline ? newline.length : 1,
        Math.floor(title.length / 40) + 1
    );

    return score;
}
