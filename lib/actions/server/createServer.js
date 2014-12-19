var http = require('http');

function httpCreateServer(ctx, cbs){
    var server = http.createServer(function(){
        //this is where we need to handle requests, but we also need to allow this to continue...so we can't just replace it
        //so we need to think of another way of handling it, or sdetting the request function later on
        if(ctx.request_pipe){
            ctx._pipes.publish(ctx.request_pipe, ctx, cbs);
        }
    });

    ctx.server = server;

    if(cbs && cbs.success){
        cbs.success(ctx);
    }
}

httpCreateServer.flux_pipe = {
    name: 'HTTP : CreateServer',
    description: 'Creates a NodeJS HTTP Server',
    configs:[
        {
            name: 'request_pipe',
            description: 'The name of the pipe to publish http requests to'
        }
    ]
};

module.exports = httpCreateServer;