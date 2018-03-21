const webpack=require('webpack');
const path=require('path');
const BUILD_DIR=path.resolve(__dirname,'./public/build');
const APP_DIR=path.resolve(__dirname,'./src');
module.exports={
    entry:APP_DIR+"/index.js",
    output:{
        filename:"bundle.js",
        path:BUILD_DIR
    },

    module:{
    rules:[
        {
            test:/\.css$/,
            use:[{
                loader:'style-loader'
            },{
                loader:'css-loader'
            }]
        },
        {
            test:/\.js$/,
            exclude:/node_modules/,
            use:[
                {
                    loader:'babel-loader',
                    options:{
                        cacheDirectory:true,
                        presets:['react','es2015','stage-2']
                    }
                }
            ]
        }
    ]
    }
}