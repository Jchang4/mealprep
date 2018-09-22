const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.ts'),
    target: 'node',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            // {
            //   test: /\.js$/,
            //   exclude: /(node_modules|bower_components)/,
            //   use: {
            //     loader: 'babel-loader',
            //     options: {
            //       presets: ['@babel/preset-env'],
            //       plugins: [require('@babel/plugin-proposal-object-rest-spread')]
            //     }
            //   }
            // }
        ]        
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.js'
    },
    // plugins: [],
    // optimization: {
    //     minimizer: [
    //         new UglifyJsPlugin({ 
    //             parallel: true,
    //             sourceMap: true,
    //         })
    //     ]
    // }    
};