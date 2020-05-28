const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.pug$/,
                use: ['pug-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: ["@babel/plugin-transform-runtime", "@babel/plugin-proposal-class-properties"],
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ],
    },
    plugins: [
        new webpack.ProgressPlugin((percentage, message) => {
            console.log(`${(percentage * 100).toFixed()}% ${message}`);
        }),
        new CopyPlugin({
            patterns: [
                { from: 'index.pug', to: '' },
                { from: 'static', to: 'static' },
            ],
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.pug'
        })
    ],
    devtool: 'source-map',
    devServer: {
        // https: true,
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true,
        liveReload: true,
        port: 8080,
    }
};