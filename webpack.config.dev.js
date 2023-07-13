'use strict';
const path = require('path');

const { VueLoaderPlugin } = require('vue-loader');
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//const HtmlWebpackInjector = require('html-webpack-injector');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: process.env.APP_ENV || 'development',
    entry: ['./src/main.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'assets/js/[name].bundle.js',
        chunkFilename: 'assets/js/[id].chunk.js'
    },
    context: __dirname,
    node: {
        __dirname: true
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                //test: /\.scss$/,
                test: /\.s(a|c)ss$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader',
                    },
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/',
                            //publicPath: 'assets/fonts/',
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            /*{
                test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '/fonts/'+'[name].[ext]',
                            outputPath: 'dist/fonts/',
                           // publicPath: 'assets',
                        }
                    }
                ]
            },*/
            /*{
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            //hmr: process.env.NODE_ENV === 'development',
                            //publicPath: '/public/path/to/',
                        },
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
*/


            /* {
                 test: /\.s?[ac]ss$/,
                 use: [
                    // MiniCssExtractPlugin.loader,
                     { loader: 'css-loader', options: { url: false, sourceMap: true } },
                     {
                         loader: 'sass-loader',
                         options:{
                             sassOptions: {
                                 indentWidth: 4,
                                 includePaths: [path.resolve(__dirname, "./src/assets/base/variables.scss")],
                             },
                             sourceMap: true,
                         }
                     }
                 ],
             },
 */










            /* {//webpack
                 test: /\.s(c|a)ss$/,
                 use: [
                     'style-loader',
                     'css-loader',
                     {
                         loader: 'sass-loader',
                         // Requires sass-loader@^8.0.0
                         options: {
                             implementation: require('sass'),
                             sassOptions: {
                                 fiber: require('fibers'),
                                 indentedSyntax: false // optional
                             },
                         },
                     },
                 ],
             },
 */

            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader'
                    },
                ]
            },


        ]
    },
    /* vue: {
      loaders: {
        scss: 'style!css!sass'
      }
    },*/
    plugins: [
        new VueLoaderPlugin(),
        /*new MiniCssExtractPlugin({
            filename: 'assets/css/[name].[hash].css',
            chunkFilename: 'assets/css/[id].[hash].css',
        }),*/
        new HtmlWebpackPlugin({
            template: 'public/index.html'
        }),
        new CopyPlugin([
            { from: 'public/favicon.ico', to: './' },
            { from: 'public/_redirects', to: './' },
            { from: 'public/fonts/', to: 'assets/fonts/' },
            { from: 'public/img/', to: 'assets/img/' },
            //{ from: 'public/assets/js/evt.js', to: 'assets/js/' },
            //

        ]),
    ],
    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm.js',
            //'vue-router': path.join(__dirname, '..', 'src'),
            //fallback: path.join(__dirname, './node_modules'),
            //'vue$': 'vue/dist/vue.common.js',
            //Mixins: path.resolve(__dirname, './mixins'),
            //plugins: path.resolve(__dirname, './plugins'),
            //Assets: path.resolve(__dirname, './assets'),
            //Components: path.resolve(__dirname, './components'),

            '@': path.dirname(path.resolve(__dirname)),
            '~': path.dirname(path.resolve(__dirname)),
        },

        //extensions: ['*', '.js', '.vue', '.json', '.styl', '.scss'],//???
        extensions: ['*', '.js', '.vue', '.json', '.styl'],
    },
    devtool : '#source-map',
};
/*
module.exports = {
    mode: process.env.APP_ENV || 'development',
    entry: ['./public/assets/js/evt.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'assets/js/evt.js',
    },
    context: __dirname,
    node: {
        __dirname: true
    },
    module: {
        rules: [

        ]
    },
};
*/
