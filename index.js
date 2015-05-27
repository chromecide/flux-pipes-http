//load the actions

var fluxPipesHTTP = {
    actions:{
        server: {
            createServer: require(__dirname+'/lib/actions/server/createServer.js'),
            listen: require(__dirname+'/lib/actions/server/listen.js')
        },
        request:{
            parseQueryString: require(__dirname+'/lib/actions/request/parseQueryString.js'),
            FormToJSON: require(__dirname+'/lib/actions/request/FormToJSON.js')
        },
        response: {
            setContentType: require(__dirname+'/lib/actions/response/setContentType.js'),
            sendHeaders: require(__dirname+'/lib/actions/response/sendHeaders.js'),
            sendJSON: require(__dirname+'/lib/actions/response/sendJSON.js'),
            SendText: require(__dirname+'/lib/actions/response/SendText.js'),
            end: require(__dirname+'/lib/actions/response/end.js'),
        }
    },
    pipes:{
        
    },
    init: function(fPipes){
        fPipes.actions.register('HTTP:Request:FormToJSON', this.actions.request.FormToJSON);

        fPipes.actions.register('HTTP:Server:CreateServer', this.actions.server.createServer);
        fPipes.actions.register('HTTP:Server:Listen', this.actions.server.listen);

        fPipes.actions.register('HTTP:Response:SendHeaders', this.actions.response.sendHeaders);
        fPipes.actions.register('HTTP:Response:SendJSON', this.actions.response.sendJSON);
        fPipes.actions.register('HTTP:Response:SendText', this.actions.response.SendText);
        fPipes.actions.register('HTTP:Response:End', this.actions.response.end);
        fPipes.actions.register('HTTP:Response:SetContentType', this.actions.response.setContentType);
        fPipes.actions.register('HTTP:Response:SetContentType:JSON', {content_type: 'application/json'}, this.actions.response.setContentType);
        fPipes.actions.register('HTTP:Response:SetContentType:HTML', {content_type: 'text/html'}, this.actions.response.setContentType);
        fPipes.actions.register('HTTP:Response:SetContentType:XML', {content_type: 'application/xml'}, this.actions.response.setContentType);
        fPipes.actions.register('HTTP:Response:SetContentType:Text', {content_type: 'text/plain'}, this.actions.response.setContentType);
        fPipes.actions.register('HTTP:Response:SetContentType:Javascript', {content_type: 'text/javascript'}, this.actions.response.setContentType);

        fPipes.actions.register('HTTP:Response:SendCTXHTTPResponse:JSON', {target: 'HTTPResponse'}, this.actions.response.sendJSON);
        fPipes.actions.register('HTTP:Response:SendCTXHTTPResponse:Text', {target: 'HTTPResponse'}, this.actions.response.SendText);

        //register a basic http server pipe
        var createServerPipe = new fPipes.pipe();
        createServerPipe.use(this.actions.server.createServer);
        createServerPipe.use(this.actions.server.listen);
        fPipes.pipes.register('HTTP:Server:CreateAndListen', createServerPipe);

        //register a basic JSON response sender
        var sendJSONPipe = new fPipes.pipe();
        sendJSONPipe.use('HTTP:Response:SetContentType:JSON');
        sendJSONPipe.use('HTTP:Response:SendHeaders');
        sendJSONPipe.use('HTTP:Response:SendCTXHTTPResponse:JSON');
        sendJSONPipe.use('HTTP:Response:End');
        
        fPipes.pipes.register('HTTP:SendResponse:JSON', sendJSONPipe);

        var sendTextPipe = new fPipes.pipe();
        sendTextPipe.use('HTTP:Response:SetContentType:Text');
        sendTextPipe.use('HTTP:Response:SendHeaders');
        sendTextPipe.use('HTTP:Response:SendCTXHTTPResponse:Text');
        sendTextPipe.use('HTTP:Response:End');
        
        fPipes.pipes.register('HTTP:SendResponse:Text', sendTextPipe);

        var sendHTMLPipe = new fPipes.pipe();
        sendHTMLPipe.use('HTTP:Response:SetContentType:HTML');
        sendHTMLPipe.use('HTTP:Response:SendHeaders');
        sendHTMLPipe.use('HTTP:Response:SendCTXHTTPResponse:Text');
        sendHTMLPipe.use('HTTP:Response:End');
        
        fPipes.pipes.register('HTTP:SendResponse:HTML', sendHTMLPipe);

        var sendJavascriptPipe = new fPipes.pipe();
        sendJavascriptPipe.use('HTTP:Response:SetContentType:Javascript');
        sendJavascriptPipe.use('HTTP:Response:SendHeaders');
        sendJavascriptPipe.use('HTTP:Response:SendCTXHTTPResponse:Text');
        sendJavascriptPipe.use('HTTP:Response:End');
        
        fPipes.pipes.register('HTTP:SendResponse:Javascript', sendJavascriptPipe);
    }
};

module.exports = fluxPipesHTTP;