var http = require('http');

function httpListen(ctx, cbs){
    var server = http.createServer(function(req, res){
        //this is where we need to handle requests, but we also need to allow this to continue...so we can't just replace it
        //so we need to think of another way of handling it, or sdetting the request function later on
        if(ctx.request_pipe){
            var newCTX = {
                request: req,
                response: res
            };

            ctx._pipes.publish(ctx.request_pipe, newCTX, cbs);
        }
    });

    ctx.server = server;

    if(cbs && cbs.success){
        cbs.success(ctx);
    }
}

httpCreateServer.flux_pipe = {
    name: 'HTTP : Listen',
    description: 'Starts the NodeJS http server listening on the supplied port and host',
    configs:[
        {
            name: 'port',
            description: 'The port the HTTP Server should listen on'
        },
        {
            name: 'host',
            description: 'The host the HTTP Server should accept connections for'
        }
    ]
};

module.exports = httpCreateServer;