var http = require('http');

function httpCreateServer(ctx, cbs){

    var server = http.createServer(function(req, res){
        var newCTX = {
            request: req,
            response: res
        };

        //if a request pipe has been configured, publish to it
        if(ctx.request_pipe){
            ctx._pipes.publish(ctx.request_pipe, newCTX, {
                success: ctx.success,
                error: ctx.error
            });
        }else{ //otherwise return a http 404 error
            newCTX.response.writeHead(404, {'Content-Type': 'text/plain'});
            newCTX.response.end();
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