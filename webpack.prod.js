process.env.NODE_ENV = 'production';

const merge = require('webpack-merge');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const webpack = require('webpack');//引入webpack构造函数

module.exports = merge(common,{
    devtool:'source-map',
    plugins:[
        // new UglifyJSPlugin()
        new MinifyPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV)
        })
    ],
    mode:'production',
});