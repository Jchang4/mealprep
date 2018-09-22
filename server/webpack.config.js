const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.ts'),
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        hot: true
    },
    module: {
        rules: []
    },
    plugins: [],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({ 
                parallel: true,
                sourceMap: true,
            })
        ]
    }    
};