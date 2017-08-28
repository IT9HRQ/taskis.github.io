/**
 *
 */
angular
    .module("app", ["ui.router"])
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state("home", {
                url: "/",
                template: "<board/>"
            });
    })
    .run(function(){
        $("body").removeClass("uk-loading");
    });
