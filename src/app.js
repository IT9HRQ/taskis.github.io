

//
angular
    .module("taskis", ["ui.router"])
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/board");
        $stateProvider
            .state("board", {
                url: "/board",
                templateUrl: "view/board.html",
                controller: function($scope) {

                }
            })
            .state("about", {});
    })
    .component("layout", {
        templateUrl: "view/layout.html" 
    })
    .component("tasks", {
        templateUrl: "view/tasks.html",
        bindToController: true,
        transclude: true,
        bindings: { project: '<' },
        controller: function($scope) {                
            var args = this;            
            this.$onInit = function() {
                gapi.client.tasks.tasks.list({
                    tasklist: args.project.id
                    //maxResults: 10
                }).execute(function(resp) {
                    $scope.$apply(function() {    
                        $scope.tasks = resp.items;
                    });
                });                                
            };
            $scope.change = function(task) {
                
                if (task.status !== 'completed') {
                    task.status = 'completed';
                    task.completed = new Date().toISOString();
                } else {
                    task.status = 'needsAction';
                    task.completed = null;                    
                }
                                
                gapi.client.tasks.tasks.update({
                    tasklist: args.project.id,
                    task: task.id
                },task).execute(function(resp) {   
                    console.log(task.status);
                    console.log(resp);
                });  
            };
            $scope.remove = function(task) {
                console.log(task);
            };
        }
    })


    