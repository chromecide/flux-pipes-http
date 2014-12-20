var http = require('http');

function httpListen(ctx, cbs){
    var server = ctx.server;
    server.listen(ctx.port, ctx.port);

    if(cbs && cbs.success){
        cbs.success(ctx);
    }
}

httpListen.flux_pipe = {
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

module.exports = httpListen;