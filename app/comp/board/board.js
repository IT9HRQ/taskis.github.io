/**
 *
 */

angular
    .module("app")
    .component("board", {
        templateUrl: "app/comp/board/board.html",
        controller: function($scope) {
            gapi.client.tasks.tasklists.list({
                'maxResults': 10
            }).execute(function(resp) {
                $scope.$apply(function() {
                    console.log(resp);
                    $scope.projects = resp.items;
                });
            });
        }
    });
