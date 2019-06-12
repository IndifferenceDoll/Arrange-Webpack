const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemp = require('html-webpack-template');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");//从webpack4开始，extract-text-webpack-plugin不再用于处理css，使用mini-css-extract-plugin代替
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry:{
        app:'./src/index.js'
    },
    plugins:[
        new CleanWebpackPlugin(),
        // new ExtractTextPlugin('style.css'),//从webpack4开始，extract-text-webpack-plugin不再用于处理css，使用mini-css-extract-plugin代替
        new MiniCssExtractPlugin({
            // 类似于webpackOptions.output
            // 选项均可选
            filename: '[name].css',
            chunkFilename: '[id].css',
          }),
        new HtmlWebpackPlugin({
            inject:false,
            template:HtmlWebpackTemp,
            appMountId:'app',
            title:'Production',
        })
    ],
    output:{
        filename:process.env.NODE_ENV === 'production' ? '[name].[hash].bundle.js' : '[name].bundle.js',
        path:path.resolve(__dirname,'dist')
    },
    resolve:{
        alias:{
            $assets:path.resolve(__dirname,'src/assets'),
        },
    },
    module:{
        rules:[
            {
                test:/\.txt$/,
                use:{
                    loader:path.resolve(__dirname,'./src/loader/txt-loader.js'),
                    options:{
                        name:'HELLOW WORLD!'
                    }
                }
            },
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader" 
            },
            {
                test:/\.css$/,
                // use:ExtractTextPlugin.extract({
                //     fallback:'style-loader',//表示编译后用什么loader去提取css文件
                //     use:[//表示用什么loader去编译，css就用css-loader，less就用less-loader编译
                //         {
                //             loader:'css-loader',
                //             options: {
                //               sourcemap: true,
                //               modules: true,
                //               localIdentName: '[path]__[name]__[local]-[hash:base64:5]',
                //             },
                //         },
                //         {
                //             loader: 'postcss-loader',
                //             options: {
                //               ident: 'postcss',
                //               plugins: () => [
                //                 autoprefixer(),
                //               ],
                //             },
                //           }
                //     ]
                // }),
                use: [
                    {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // you can specify a publicPath here
                        // by default it uses publicPath in webpackOptions.output
                        publicPath: path.resolve(__dirname,'dist'),
                        hmr: process.env.NODE_ENV === 'development',
                        // reloadAll: true,//如果上面的hmr热重载失效，这个是替代方式
                    },
                    },
                    'css-loader',
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                // use:ExtractTextPlugin.extract({
                //     fallback:'style-loader',//表示编译后用什么loader去提取css文件
                //     use:[//表示用什么loader去编译，css就用css-loader，less就用less-loader编译
                //         {
                //             loader:'css-loader',
                //         },
                //         {
                //             loader: 'postcss-loader',
                //             options: {
                //               ident: 'postcss',
                //               plugins: () => [
                //                 autoprefixer(),
                //               ],
                //             },
                //           },
                //           {
                //             loader: 'less-loader',
                //           }
                //     ]
                // }),

                use: [
                    {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: process.env.NODE_ENV === 'development',
                    },
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                        ident: 'postcss',
                        plugins: () => [
                            autoprefixer(),
                        ],
                        },
                    },
                    'less-loader',
                ],
                exclude: /node_modules/,
            },
            {
                // test: /\.(sass|scss)$/,
                // use:ExtractTextPlugin.extract({
                //     fallback:'style-loader',//表示编译后用什么loader去提取css文件
                //     use:[//表示用什么loader去编译，css就用css-loader，less就用less-loader编译
                //         {
                //             loader:'css-loader',
                //         },
                //         {
                //             loader: 'postcss-loader',
                //             options: {
                //               ident: 'postcss',
                //               plugins: () => [
                //                 autoprefixer(),
                //               ],
                //             },
                //           },
                //           {
                //             loader: 'sass-loader',
                //           }
                //     ]
                // }),

                test: /\.(sa|sc)ss$/,
                use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                    hmr: process.env.NODE_ENV === 'development',
                    },
                },
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                    ident: 'postcss',
                    plugins: () => [
                        autoprefixer(),
                    ],
                    },
                },
                'sass-loader',
                ],
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
    }
}