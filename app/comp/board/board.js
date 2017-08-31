/**
 *
 */

angular
    .module("app")
    .run(function($rootScope){
        $rootScope.boardScores = [];
    })
    .component("board", {
        templateUrl: "app/comp/board/board.html",
        controller: function($scope, $rootScope) {
            this.$onInit = function() {
                gapi.client.tasks.tasklists.list({
                    'maxResults': 10
                }).execute(function(resp) {
                    $scope.$apply(function() {
                        console.log('projects:', resp);
                        $scope.projects = resp.items;
                    });
                });
            }

            $scope.updateBoardLayout = function(s) {

            }

            $scope.updateBoardClasses = function(s) {
                var n = s.length;
                if (n == 3) {
                    if (s[0] > 20 && s[1] < 5 && s[2] < 5) {
                        return ["uk-width-medium-2-4", "uk-width-medium-1-4", "uk-width-medium-1-4"];
                    }
                    return ["uk-width-medium-1-3", "uk-width-medium-1-3", "uk-width-medium-1-3"];
                }
            }
        }
    });
