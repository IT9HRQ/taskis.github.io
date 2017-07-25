/**
 * 
 * 
 */



//
function init() 
{
    //
    gapi.auth.authorize({
        client_id: APP_ID,
        scope: SCOPES.join(' '),
        immediate: true
    }, handleAuthResult);
}

//
function handleAuthResult(authResult) 
{        
    // registred user load api
    if (authResult && !authResult.error) {
        UIkit.modal('#signin').hide();
        loadGoogleTasksApi();  
    } 
    
    // not registred guess to sign in
    else 
    {
        UIkit.modal('#signin').show();
    }
}

//
function handleAuthClick(event) 
{
    //
    gapi.auth.authorize({
        client_id: APP_ID, 
        scope: SCOPES, 
        immediate: false
    }, handleAuthResult);
  
    //
    return false;
}

//
function loadGoogleTasksApi() 
{
    gapi.client.load('tasks', 'v1', loadProjects);
}

//
function loadProjects(cb) 
{
    //
    $('#widgets').html('');
    
    //
    var request = gapi.client.tasks.tasklists.list({
        'maxResults': 10
    });

    //
    request.execute(function(resp)
    {
        //
        //console.log('loadProjects: ', resp);
        
        //
        var projects = resp.items;
        
        //
        if (projects && projects.length > 0) 
        {
            //
            for (var i = 0; i < projects.length; i++) 
            {                
                //
                loadWidget(projects[i]);
            }
        } 
        
        //
        else
        {
            //console.log('No task lists found.');
        }
        
        //
        $('#widgets').append($('#backbones .widget-plus').clone());    
        
        //
        if (typeof cb === 'function') { cb(); }
    });
}

//
function loadWidget(project)
{
    //
    var widget = $('#backbones .widget').clone();                

    //
    widget.attr('id', project.id);

    //
    var request = gapi.client.tasks.tasks.list({
        tasklist: project.id,
        //maxResults: 10
    });

    //
    request.execute(function(resp)
    {
        //
        var tasks = resp.items;

        //
        if (tasks && tasks.length > 0) 
        {
            //
            for (var i = 0; i < tasks.length; i++) 
            {                
                //
                loadWidgetItem(tasks[i], widget);
            }
        } 
        
        //
        else
        {
            console.log('No tasks found.');
        }
    });

    //
    $('.uk-panel-title', widget).text(project.title);

    //
    $('#widgets').append(widget);
}

//
function loadWidgetItem(task, widget) 
{
    //
    //console.log('task:', task.title);
    
    //
    var widget_item = $('#backbones .widget-item').clone();                
    
    //
    $('.title', widget_item).text(task.title);           
    
    //
    $('.items', widget).append(widget_item);    
}

//
$(document).on('click','.hook-project-create',function()
{
    //
    UIkit.modal.prompt('Project name:', '', function(title)
    {
        var request = gapi.client.tasks.tasklists.insert({
            title: title
        });

        request.execute(function(project) 
        {
            console.log(project.id);
            loadProjects(function(){
                
                
            });
        });
    });        
});

//
$(document).on('click','.hook-project-delete',function(e)
{
    //
    var projectid = $(e.target).parents('.widget').attr('id');
    
    //
    //console.log('project delete', projectid);
    
    //
    UIkit.modal.confirm("Are you sure?", function()
    {   
        //
        var request = gapi.client.tasks.tasklists.delete({tasklist:projectid});

        //
        request.execute(function(resp) 
        {            
            loadProjects();
        });
    });    
});

//
$(document).on('click','.hook-project-modify',function(e)
{
    //
    var widget = $(e.target).parents('.widget');
    
    //
    var projectid = widget.attr('id');
           
    //
    var items_editor = $('#backbones .items-editor').clone();                
    
    //
    var request = gapi.client.tasks.tasks.list({tasklist: projectid});
    
     //
    request.execute(function(resp)
    {
        //
        var tasks = resp.items;
        
        //
        var wiki = '';
        
        //
        if (tasks && tasks.length > 0) 
        {
            //
            for (var i = 0; i < tasks.length; i++) 
            {      
                //
                wiki += tasks[i].title + "\n";
            }
        }
        
        //
        console.log('wiki:', wiki);
        
        //
        $('.edit', items_editor).val(wiki);
        
        //
        $('.items', widget).html(items_editor);

        //
        $('.buttons', widget).html($('#backbones .buttons-editor').clone());

        //
        $('.edit', widget).focus();
    });    
});

//
$(document).on('click','.hook-project-modify-update',function(e)
{
    //
    var widget = $(e.target).parents('.widget');
    
    //
    var projectid = widget.attr('id');
    
    //
    var wiki = $('.edit', widget).val();
    
    //
    var lines = wiki.split(/\n/);
   
    //
    var request = gapi.client.tasks.tasks.list({tasklist: projectid});

    //
    request.execute(function(resp)
    {
        //
        var tasks = resp.items;

        //
        var currents = [];

        //
        if (tasks && tasks.length > 0) 
        {
            //
            for (var i = 0; i < tasks.length; i++) 
            {      
                
            }
        }                 
        
        //
        for (var i in lines)
        {
            // not in array create task
            if (jQuery.inArray(lines[i], currents) === -1) 
            {
                //
                console.log('insert task:', lines[i]);
                
                //
                var request = gapi.client.tasks.tasks.insert({
                    title: lines[i],
                    tasklist: projectid
                });

                //
                request.execute(function(resp){ console.log(resp); });
            }            
        }
        
        //
        setTimeout('loadProjects();', 500);
    });
});

//
$(document).on('click','.hook-project-modify-cancel',function(e)
{
    loadProjects();    
});
