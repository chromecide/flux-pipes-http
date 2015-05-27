function ObjectToFilter(ctx, cbs){
    try{
        var sourceAttr = this.cfg.source;
        var targetAttr = this.cfg.target;
        
        var filter = false;

        if(sourceAttr && targetAttr){
            var source = ctx.getObjectValueByString(ctx, sourceAttr);
            var parsed = {};

            for(var key in source){
                if(key.indexOf('[')>-1){
                    var part, parts = key.split('[');



                    for(part=0;part<parts.length;part++){
                        parts[part] = parts[part].replace(']','');
                    }

                    //if(isNaN())
                }else{
                    parsed[key] = source[key];
                }
            }
            if(cbs && cbs.success){
                cbs.success(ctx);
            }
            
        }else{
            if(cbs && cbs.success){
                cbs.success(ctx);
            }
        }
    }catch(e){
        if(cbs && cbs.error){
            cbs.error(e);
        }
    }
}

ObjectToFilter.flux_pipe = {
    name: 'API:Data:ObjectToFilter',
    description: 'Converts the suplied object into a query filter',
    configs:[
        {
            name: 'source',
            description: 'The source object attribute'
        },
        {
            name: 'target',
            description: 'The attribute to save the filter to.'
        },
        {
            name: 'model_source',
            description: 'The attribute that contains the name of the model to filter.'
        }
    ]
};

module.exports = ObjectToFilter;