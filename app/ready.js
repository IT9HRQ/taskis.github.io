/**
 *
 */
function ready() {
    gapi.auth.authorize({
        client_id: CLIENT_ID,
        discoveryDocs: DISCOVERY,
        scope: SCOPES.join(" "),
        immediate: true
    }, function (authResult) {
        if (authResult && !authResult.error) {
            gapi.client.load('tasks', 'v1', function() {
                gapi.client.load('plus', 'v1', function() {
                    gapi.client.plus.people.get({
                        'userId': 'me'
                    }).execute(function(resp) {
                        console.log('Retrieved profile for:' ,resp);
                    });

                    //
                    angular.bootstrap(document, ["taskis"]);
                });
            });
        } else {
            jQuery.get("view/signin.html", function(html){
                jQuery("body").append(html);
                UIkit.modal("#signin").show();
            });
        }
    });
}
