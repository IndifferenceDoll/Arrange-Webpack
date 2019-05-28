const webpackDevServer = require('webpack-dev-server');//引入webpack-dev-server构造函数
const webpack = require('webpack');//引入webpack构造函数

const config = require('./webpack.config.js');//获取webpack编译配置
const options = {//devServer的配置对象
    contenBase:'./dist',
    hot:true,
    host:'localhost',
}
webpackDevServer.addDevServerEntrypoints(config, options);//修改 webpack 配置对象，使其包含 HMR 入口起点
const compiler = webpack(config);//获取根据webpack配置编译后的文件

const server = new webpackDevServer(compiler);//根据配置生成服务，并把webpack配置编译后的文件传递给启动的服务

server.listen(9999,'localhost',()=>{//将服务启动在9999端口下
    console.log('示例服务器的端口为9999');
});