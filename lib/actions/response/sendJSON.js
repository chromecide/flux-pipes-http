function responseSendJSON(ctx, cbs){
    try{
        var objectToSend = {};
        if(this.cfg.target){
            objectToSend = ctx.getObjectValueByString(ctx, this.cfg.target);
        }else{
            objectToSend = ctx;
        }

        try{
            var sendString = JSON.stringify(objectToSend);
            ctx.response.write(sendString);
            if(cbs && cbs.success){
                cbs.success(ctx);
            }
        }catch(e){

        }
    }catch(e){
        if(cbs && cbs.error){
            cbs.error(e);
        }
    }
}

responseSendJSON.flux_pipe = {
    name: 'HTTP:Response:SendJSON',
    description: 'Sends the value of cfg.target as a JSON String.  Any required Headers should be sent before using this action.',
    configs:[
        {
            name: 'target',
            description: 'Target Attribute to Send. If blank the action will attempt to send the ctx object.'
        }
    ]
};

module.exports = responseSendJSON;