const webpack=require('webpack');
const path=require('path');
module.exports={
    context:__dirname,
    entry:"./src/main.js",
    output:{
        filename:"./build/bundle.js"
    },
    devServer:{
        inline:true,
        contentBase:'./src',
        port:8080
    },
    watch:true,
    module:{
        loaders:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:'babel-loader'
            }
        ]
    }
}