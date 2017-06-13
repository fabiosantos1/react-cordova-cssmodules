const webpack = require('webpack')
const path = require('path')

const BabiliPlugin = require("babili-webpack-plugin");

module.exports = {
    devtool: 'source-map',
    entry: {
        'app': [
            'babel-polyfill',
            'react-hot-loader/patch',
            './src/index'
        ]
  },
    output: {
        path: path.resolve(__dirname, './www'),
        filename: '[name].js',
        libraryTarget: 'umd'
  },
  module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            { 
                test: /\.scss$/, 
                use: [
                    'style-loader', 'postcss-loader'
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "./www")
    }/*,
    plugins: [
        new BabiliPlugin()
    ]*/
}
