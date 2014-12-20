

function responseEnd(ctx, cbs){
    try{
        ctx.response.end();
        if(cbs && cbs.success){
            cbs.success(ctx);
        }
    }catch(e){
        if(cbs && cbs.error){
            cbs.error(e);
        }
    }
}

responseEnd.flux_pipe = {
    name: 'HTTP : Response : End',
    description: 'Ends the response.',
    configs:[]
};

module.exports = responseEnd;