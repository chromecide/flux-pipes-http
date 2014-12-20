//load the actions

var fluxPipesHTTP = {
    actions:{
        server: {
            createServer: require(__dirname+'/lib/actions/server/createServer.js'),
            listen: require(__dirname+'/lib/actions/server/listen.js')
        },
        requests:{
            parseQueryString: require(__dirname+'/lib/actions/request/parseQueryString.js')
        },
        response: {
            setContentType: require(__dirname+'/lib/actions/response/setContentType.js'),
            sendHeaders: require(__dirname+'/lib/actions/response/sendHeaders.js'),
            sendJSON: require(__dirname+'/lib/actions/response/sendJSON.js'),
            end: require(__dirname+'/lib/actions/response/end.js'),
        }
    },
    pipes:{
        
    },
    init: function(fPipes){
        fPipes.actions.register('HTTP:Response:SetContentType:JSON', {content_type: 'application/json'}, this.actions.response.setContentType);
        fPipes.actions.register('HTTP:Response:SetContentType:HTML', {content_type: 'text/html'}, this.actions.response.setContentType);
        fPipes.actions.register('HTTP:Response:SetContentType:XML', {content_type: 'application/xml'}, this.actions.response.setContentType);
        fPipes.actions.register('HTTP:Response:SetContentType:Text', {content_type: 'text/plain'}, this.actions.response.setContentType);

        fPipes.actions.register('HTTP:Response:SendCTXHTTPResponse:JSON', {target: 'HTTPResponse'}, this.actions.response.sendJSON);

        //register a basic http server pipe
        var createServerPipe = new fPipes.pipe();
        createServerPipe.use(this.actions.server.createServer);
        createServerPipe.use(this.actions.server.listen);
        fPipes.pipes.register('HTTP:Server:CreateAndListen', createServerPipe);

        //register a basic JSON response sender
        var sendJSONPipe = new fPipes.pipe();
        sendJSONPipe.use('HTTP:Response:SetContentType:JSON');
        sendJSONPipe.use(this.actions.response.sendHeaders);
        sendJSONPipe.use('HTTP:Response:SendCTXHTTPResponse:JSON');
        sendJSONPipe.use(this.actions.response.end);
        fPipes.pipes.register('HTTP:SendResponse:JSON', sendJSONPipe);
    }
};

module.exports = fluxPipesHTTP;