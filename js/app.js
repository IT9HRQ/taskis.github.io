/**
 *
 */
angular
    .module("taskis", ["ui.router"])
    .config(function() {

    });

/**
 *
 */
var config = {
    client_id: "989152715769-5dmdgb43mtqhup9vfglu00qagguqstn4.apps.googleusercontent.com",
    discovery: ["https://people.googleapis.com/$discovery/rest"],
    scopes: [
        "profile",
        "https://www.googleapis.com/auth/tasks",
        "https://www.googleapis.com/auth/contacts.readonly"
    ]
}

/**
 *
 */
function taskis() {
    gapi.auth.authorize({
        client_id: config.client_id,
        discoveryDocs: config.discovery,
        scope: config.scopes.join(" "),
        immediate: true
    }, function (authResult) {
        if (authResult && !authResult.error) {
            gapi.client.load("tasks", "v1", function() {
                gapi.client.load("plus", "v1", function() {
                    gapi.client.plus.people.get({
                        "userId": "me"
                    }).execute(function(resp) {
                        console.log("Retrieved profile for:" ,resp);
                    });
                    angular.bootstrap(document, ["taskis"]);
                });
            });
        } else {
            jQuery.get("signin.html", function(html){
                jQuery("body").append(html);
                UIkit.modal("#signin").show();
            });
        }
    });
}


/**
 *
 *
 */

angular
    .module("app")
    .component("footer", {
        templateUrl: "app/components/footer/footer.html",
        controller: function($scope) {}
    });


/**
 *
 *
 */

angular
    .module("app")
    .component("layout", {
        templateUrl: "app/components/layout/layout.html",
        controller: function($scope) {}
    });

/**
 *
 *
 */

angular
    .module("app")
    .component("mobnav", {
        templateUrl: "app/components/layout/layout.html",
        controller: function($scope) {}
    });


/**
 *
 *
 */

angular
    .module("app")
    .component("sidebar", {
        templateUrl: "app/components/layout/layout.html",
        controller: function($scope) {}
    });

/**
 *
 *
 */

angular
    .module("app")
    .component("topbar", {
        templateUrl: "app/components/topbar/topbar.html",
        controller: function($scope) {}
    });
