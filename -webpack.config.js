const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const ENV = require('./env');

const PATHS = {
    src: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'www'),
};

process.env.BABEL_ENV = ENV;

const common = {
    output: {
        path: PATHS.build,
        filename: 'bundle.js',
    },
    module: {
        loaders: [/*{
            test: /\.css$/,
            loaders: ['style', 'css?url=false'],
            include: PATHS.src,
        },*/
        {
            test: /\.jsx?$/,
            loader: 'babel-loader',
            include: PATHS.src
        }]
    }
};

if (ENV === 'development') {
    module.exports = merge(common, {
        devServer: {
            contentBase: PATHS.build,
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            stats: 'errors-only',
            host: process.env.HOST,
            port: process.env.PORT,
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
        ],
        devtool: 'source-map',
        entry: {
            'app': [
                'babel-polyfill',
                'react-hot-loader/patch',
                './src/index'
            ]
        }
    });
} else {
  // config can be added here for minifying / etc
  module.exports = merge(common, {});
}

<!-- CSS SEPARADO -->
use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
        { 
            loader: 'css-loader', 
            options: { 
                importLoaders: 1,
                modules: true,
                minimize: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
            } 
        },
        'postcss-loader'
    ]
})
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
/*,
    plugins: [
        new ExtractTextPlugin('[name].css')
    ]
	
	{ test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000' },
            { test: /\.(ttf|eot)$/, loader: 'file-loader' }
*/