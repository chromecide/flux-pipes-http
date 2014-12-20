function responseSendHeaders(ctx, cbs){
    try{
        try{
            console.log('SENDING HEADERS');
            if(!ctx.response.headersSent){
                ctx.response.writeHead(ctx.response.statusCode);
            }
            if(cbs && cbs.success){
                console.log('HEADERS SENT');
                cbs.success(ctx);
            }
        }catch(e){
            console.log(e);
        }
    }catch(e){
        if(cbs && cbs.error){
            cbs.error(e);
        }
    }
}

responseSendHeaders.flux_pipe = {
    name: 'HTTP : Response : SendHeaders',
    description: 'Sends the Response HTTP Headers',
    configs:[]
};

module.exports = responseSendHeaders;