/**
 *
 */

angular
    .module("app")
    .component("tasklist", {
        bindings: { project: "<", projectIndex: "<" },
        templateUrl: "app/comp/tasklist/tasklist.html",
        controller: function($scope, $rootScope) {
            this.$onInit = function() {
                var projectIndex = $scope.$ctrl.projectIndex;
                console.log("progect:", $scope.$ctrl.project);
                $scope.project = $scope.$ctrl.project;
                $scope.projectIndex = projectIndex;
                gapi.client.tasks.tasks.list({
                    tasklist: $scope.project.id,
                    //maxResults: 10
                }).execute(function(resp) {
                    $scope.$apply(function() {
                        console.log('tasklist:', resp.items);
                        $scope.tasklist = resp.items;
                        $rootScope.boardScores[projectIndex] = resp.items.length;
                    });
                });
            }
            $scope.taskline = function(task) {
                var taskline = task.notes ? (task.title + "\n" + task.notes).trim() : task.title;
                return taskline ? taskline : "nothing special";
            };
        }
    })
    .filter("taskline", function($sce) {
        function urlify(text) {
            var urlRegex = /(https?:\/\/[^\s]+)/g;
            return text.replace(urlRegex, function(url) {
                return '<a href="' + url + '" target="_blank"><i class="uk-icon-bookmark"></i></a>';
            })
        }
        function nl2br(text) {
            if (typeof text == "string") {
                return text.replace(/(?:\r\n|\r|\n)/g, "<br/>");
            }
            return text;
        }
        return function(input) {
            return $sce.trustAs("html", nl2br(urlify(input)));
        };
    })
