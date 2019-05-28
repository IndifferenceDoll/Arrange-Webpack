const express = require('express');//引入express构造函数
const webpack = require('webpack');//引入webpack构造函数
const webpackDevMiddleware = require('webpack-dev-middleware');//引入文件传递容器（中间件）
const webpackHotMiddleware = require("webpack-hot-middleware");//引入热替换的中间件

const app = express();//生成服务对象
const config = require('./webpack.config.js');//获取webpack编译配置
const compiler = webpack(config);//获取根据webpack配置编译后的文件

app.use(webpackDevMiddleware(compiler,{//执行webpackDevMiddleware的node中间件，将webpack配置编译后的文件传递给启动的服务
    publicPath:config.output.publicPath,//设置文件可访问的公开地址
}))

app.use(webpackHotMiddleware(compiler));


app.listen(9999,function(){//将服务启动在9999端口下
    console.log('示例服务器的端口为9999');
});