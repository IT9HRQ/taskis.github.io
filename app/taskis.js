/*!
 * taskis.github.io
 * Copyright(c) 2016-2017 Javanile.org
 * MIT Licensed
 */

angular.module("taskis", ["app"]);

/**
 * Page onload script.
 */
function taskis() {
    gapi.auth.authorize({
        client_id: config.client_id,
        discoveryDocs: config.discovery,
        scope: config.scopes.join(" "),
        immediate: true
    }, function (resp) {
        if (resp && !resp.error) {
            gapi.client.load("tasks", "v1", function() {
                gapi.client.load("plus", "v1", function() {
                    gapi.client.plus.people.get({
                        "userId": "me"
                    }).execute(function(resp) {
                        console.log("user:", resp);
                        angular.bootstrap(document, ["taskis"]);
                    });
                });
            });
        } else {
            window.location = "wellcome.html";
        }
    });
}
