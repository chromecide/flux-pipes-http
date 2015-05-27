function responseSendText(ctx, cbs){
    try{
        var valueToSend = "";
        if(this.cfg.target){
            valueToSend = ctx.getObjectValueByString(ctx, this.cfg.target);
        }

        try{
            var sendString = valueToSend;
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

responseSendText.flux_pipe = {
    name: 'HTTP:Response:SendText',
    description: 'Sends the value of cfg.target as a text String.  Any required Headers should be sent before using this action.',
    configs:[
        {
            name: 'target',
            description: 'Target Attribute to Send.'
        }
    ]
};

module.exports = responseSendText;