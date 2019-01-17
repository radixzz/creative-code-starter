const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlShaderPlugin = require('html-shader-plugin');

module.exports = {
    devtool: 'eval-cheap-module-source-map',
    entry: {
        main: './src/main.js',
    },
    devServer: {
        port: 8080,
        watchContentBase: true,
        contentBase: path.join(__dirname, "dist"),
    },
    stats: 'errors-only',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            },
            {
                test: /\.(styl|css)$/,
                use: [
                    {
                        // creates style nodes from JS strings
                        loader: "style-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    MiniCssExtractPlugin.loader,
                    {
                        // translates CSS into CommonJS
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "stylus-loader",
                    },
                ]
            },
            {
                // Load all images as base64 encoding if they are smaller than 8192 bytes
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // On development we want to see where the file is coming from, hence we preserve the [path]
                            name: '[path][name].[ext]?hash=[hash:20]',
                            limit: 192
                        }
                    }
                ]
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            template: 'index.ejs',
            inject: true,
        }),
        new HtmlShaderPlugin({
            path: './src/shaders',
        }),
        // Comment this line to avoid inlining the CSS
        new HTMLInlineCSSWebpackPlugin(),
    ]
};
