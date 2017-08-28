var webpack = require('webpack');
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CleanWebpackPlugin = require('clean-webpack-plugin');
var path = require('path');

module.exports = merge(baseWebpackConfig, {
	output: {
		filename: '[name]-[hash].js',
	},
	plugins: [
		// This plugins optimizes chunks and modules by
		// how much they are used in your app
		new webpack.optimize.OccurrenceOrderPlugin(),
		// This plugin prevents Webpack from creating chunks
		// that would be too small to be worth loading separately
		/*new webpack.optimize.MinChunkSizePlugin({
			minChunkSize: 51200, // ~50kb
		}),*/
		// This plugin minifies all the Javascript code of the final bundle
		new webpack.optimize.UglifyJsPlugin({
			mangle:   true,
			compress: {
				warnings: false, // Suppress uglification warnings
			}
		}),
		// Cleanup the output/ folder before
		// compiling our final assets
		new CleanWebpackPlugin(['output'], {
			root: path.resolve(__dirname, '../'),
			verbose: true,
			dry: false
		})
	]
});