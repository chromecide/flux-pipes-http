function responseSendHeaders(ctx, cbs){
    try{
        try{
            if(!ctx.response.headersSent){
                ctx.response.writeHead(ctx.response.statusCode);
            }
            if(cbs && cbs.success){
                cbs.success(ctx);
            }
        }catch(err){
            if(cbs && cbs.error){
                cbs.error(err, ctx);
            }
        }
    }catch(e){
        if(cbs && cbs.error){
            cbs.error(e, ctx);
        }
    }
}

responseSendHeaders.flux_pipe = {
    name: 'HTTP : Response : SendHeaders',
    description: 'Sends the Response HTTP Headers',
    configs:[]
};

module.exports = responseSendHeaders;