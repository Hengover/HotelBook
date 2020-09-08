const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');  

const { config } = require('process');

const isDev = process.env.NODE_ENV === 'development'; //the build mode project
const isProd = !isDev;

const cssLoaders = extra => {
    const loaders = [
        MiniCssExtractPlugin.loader, 'css-loader'
    ];

    if(extra) {
        loaders.push(extra);
    }

    return loaders;
}

module.exports = {
    context: path.resolve(__dirname, 'src'), //Directory where webpack is working
    entry: ['@babel/polyfill', './js/index.js'],   //entry: ['@babel/polyfill', './js/index.js']
    output: {
        path: path.resolve(__dirname, 'dist'), //Directory
        filename: 'js/bundle.js', //File
    },
    devServer: { //Object which should serve our files
        contentBase: './dist',
    },
    plugins: [ 
        new HtmlWebpackPlugin({ //Receive html file from src folder to dist folder when bundle.js reload
            filename: 'index.html',
            template: './index.html', //Starting html file
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new HtmlWebpackPlugin({ //Receive html file from src folder to dist folder when bundle.js reload
            filename: 'search.html',
            template: './search.html', //Starting html file
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new MiniCssExtractPlugin({ //Seperate css file from js file
            filename: './css/style.css'
        }),
        new CopyPlugin({ patterns: [{ from: path.resolve(__dirname, 'src/img'), to: path.resolve(__dirname, 'dist/img') }] })
    ],
    module: { //loader allow webpack understand another type files except js files
        rules: [
          {
            test: /\.css$/, 
            use: cssLoaders()  //css-loader allow webpack understand import files with .css      style-loader add style css in style tag html file
          },
          {
            test: /\.(sass|scss)$/, 
            use: cssLoaders('sass-loader')  //css-loader allow webpack understand import files with .css      style-loader add style css in style tag html file
          },
          {
            test: /\.(png|jpg|svg|gif)$/, 
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                    }
                }
            ]
          },
          {
            test: /\.js$/, 
            exclude: /node_modules/,
            loader: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env'
                    ],
                    plugins: [
                        '@babel/plugin-proposal-class-properties'
                    ]
                }
            }
          }
        ]
      }
}