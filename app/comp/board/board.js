/**
 *
 */

angular
    .module("app")
    .component("board", {
        templateUrl: "app/comp/board/board.html",
        controller: function($scope) {
            console.log(">>");
            gapi.client.tasks.tasklists.list({
                'maxResults': 10
            }).execute(function(resp) {
                $scope.$apply(function() {
                    $scope.projects = resp.items;
                });
            });
        }
    });
