function responseSetContentType(ctx, cbs){
    if(!this.cfg.target){
        this.cfg.target = 'text/plain';
    }

    ctx.response.setHeader('Content-Type', this.cfg.target);

    if(cbs && cbs.success){
        cbs.success(ctx);
    }
}

responseSetContentType.flux_pipe = {
    name: 'HTTP : Response : SetContentType',
    description: 'Sets the Content-Type header for the response.',
    configs:[
        {
            name: 'content_type',
            description: 'The new Content-Type value.'
        }
    ]
};

module.exports = responseSetContentType;