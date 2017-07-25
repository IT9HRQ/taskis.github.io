


//
function signin() {
    
    //
    gapi.auth.authorize({
        client_id: CLIENT_ID,
        discoveryDocs: DISCOVERY,
        scope: SCOPES.join(" "),
        immediate: false
    }, function (authResult) {
        
        //
        if (authResult && !authResult.error) {            
            gapi.client.load('tasks', 'v1', function() {                
                UIkit.modal("#signin").hide();
                angular.bootstrap(document, ["taskis"]);
            });
        }
    });    
}

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
                    gapi.client.tasks.tasklists.list({
                        'maxResults': 10
                    }).execute(function(resp) {                         
                        $scope.$apply(function() {
                            $scope.projects = resp.items;
                        });
                    });
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
    .filter("taskline", function($sce) {

        function urlify(text) {
            var urlRegex = /(https?:\/\/[^\s]+)/g;
            return text.replace(urlRegex, function(url) {
                return '<a href="' + url + '" target="_blank"><i class="uk-icon-bookmark"></i></a>';
            })
        }

        return function(input) {
            return $sce.trustAs('html', urlify(input));
        };
    })

    