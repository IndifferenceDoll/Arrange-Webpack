process.env.NODE_ENV = 'development';
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const webpack = require('webpack');//引入webpack构造函数
const CompileTemp = require('./src/plugins/compileTemp.js');
const path = require('path');

module.exports = merge(common,{
    plugins:[
        // new UglifyJSPlugin()
        new MinifyPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV)
        }),
        new CompileTemp({
            template: './src/assets/testTemplate.html',
            filename: path.resolve(__dirname, './src/afterCompileTemp.html'),
            params: {
            title: 'HELLOW WORLD!',
            name: 'HELLOW'
            }
        })
    ],
    devtool:'inline-source-map',
    devServer:{
        contentBase:'./dist',
            compress:true,//表示dist文件夹下的文件做gzip压缩
            port:9988,//表示端口配置
            hot:true,//启动模块热替换
    },
    mode:'development',
})