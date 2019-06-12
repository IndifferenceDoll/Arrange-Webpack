process.env.NODE_ENV = 'development';
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common,{
    plugins:[
        // new UglifyJSPlugin()
        new MinifyPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV)
        })
    ],
    devtool:'inline-source-map',
    devServer:{
        contentBase:'./dist'
    },
    mode:'development',
})