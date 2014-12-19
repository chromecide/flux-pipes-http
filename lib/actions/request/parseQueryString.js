function parseQueryString(ctx, cbs){
    var request = ctx.request;

    if(!request){
        if(cbs && cbs.error){
            cbs.error(new Exception("No Request Context Found"));
        }
    }else{
        console.log(request);
        if(cbs && cbs.success){
            cbs.success(ctx);
        }
    }
}

parseQueryString.flux_pipe = {
    name: 'HTTP : Request : Parse Query String',
    description: 'Parses the Request Query String and attaches it to ctx.query',
    configs:[]
};

module.exports = parseQueryString;