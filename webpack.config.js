const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemp = require('html-webpack-template');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');//引入webpack构造函数

module.exports = {
    entry:{
        app:'./src/index.js',
        print:'./src/print.js',
        commons:['lodash','webpack-hot-middleware/client?noInfo=true&reload=true'],
    },
    output:{
        // filename:'[name].bundle@[chunkhash].js',//最终build到生产模式下时，使用chunkhash，用于更新生成对应打包块的文件后缀
        filename:'[name].bundle@[hash].js',//开发模式下的启动了热替换时，用hash，否则报错
        path:path.resolve(__dirname,'dist'),
        publicPath:'/',
    },
    resolve:{
        alias:{
            $assets:path.resolve(__dirname,'src/assets'),
        },
    },
    devtool:'inline-source-map',
    // devServer: {
    //     contentBase: './dist',//表示启动的服务器公开dist文件夹
    //     compress:true,//表示dist文件夹下的文件做gzip压缩
    //     port:9999,//表示端口配置
    //     hot:true,//启动模块热替换
    // },
    plugins:[
        new ManifestPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject:false,
            template:HtmlWebpackTemp,
            
            appMountId:'app',
            title:'输出管理',
        }),
        new webpack.NamedModulesPlugin(),//使查看要修补的依赖变得更容易
        new webpack.HotModuleReplacementPlugin(),//模块热替换的插件
    ],
    optimization: {
        runtimeChunk: {
            name: () =>  "manifest"
        },
        splitChunks: {
            cacheGroups: {
                venders: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "venders",
                    chunks: "all",
                    minChunks: 2,
                    priority: 10,
                },
            }
        }
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader'],
            },
            {
                test:/\.(png|svg|jpg|gif)$/,
                use:[
                    {
                    loader: 'image-webpack-loader',
                    options: {
                        mozjpeg: {
                            progressive: true,
                            quality: 65
                        },
                        // optipng.enabled: false will disable optipng
                        optipng: {
                            enabled: false,
                        },
                        pngquant: {
                            quality: '65-90',
                            speed: 4
                        },
                        gifsicle: {
                            interlaced: false,
                        },
                        // the webp option will enable WEBP
                        webp: {
                            quality: 75
                        }
                        }
                    },
                    {
                        loader:'url-loader',
                        options:{
                            limit:204800,
                        }
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [
                // 'url-loader',
                'file-loader'
                ]
            },
            {
                test:/\.(csv|tsv)$/,
                use:[
                    'csv-loader'
                ]
            },
            {
                test:/\.xml$/,
                use:[
                    'xml-loader'
                ]
            }
        ]
    },
};