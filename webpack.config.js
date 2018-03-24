const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const port = process.env.SERVER_PORT || '3001';
const BUILD_DIR = path.resolve(__dirname, './build');
const APP_DIR = path.resolve(__dirname, './src');

module.exports = {
    entry: APP_DIR + "/index.js",
    output: {
        filename: "bundle.[hash].js",
        path:BUILD_DIR
    },

    module: {
        rules: [
            {
                test: /.css$/,
                use: [{
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader'
                }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
            filename: 'index.html'
        })
    ],
    devServer: {
        host: 'localhost',
        port: port,
        historyApiFallback: true,
        open: true
    }
}