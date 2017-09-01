/*!
 * taskis.github.io
 * Copyright(c) 2016-2017 Javanile.org
 * MIT Licensed
 */

angular
    .module("app")
    .component("task", {
        bindings: {
            task: "<"
        },
        templateUrl: "app/comp/task/task.html",
        controller: function($scope, $rootScope) {
            this.$onInit = function() {
                var task = $scope.$ctrl.task;
                $scope.task = task;
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
