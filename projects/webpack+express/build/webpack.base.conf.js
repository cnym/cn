var path = require('path');
var webpack = require('webpack');
module.exports = {
	entry:  './src/index.js',
	output: {
		path:     path.resolve(__dirname, '../output'),
		publicPath: "/",
		filename: '[name].js',
		chunkFilename: "[name]-[chunkhash].js"
	},
	resolve: {
		extensions: ['.js', '.less', '.html']
	},
	module: {
		rules: [
			{
				test:   /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.less$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'less-loader' }
				]
			},
			{
				test: /\.html$/,
				loader: 'html-loader'
			}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name:      'main', // Move dependencies to our main file
			children:  true, // Look for common dependencies in all children,
			minChunks: 2 // How many times a dependency must come up before being extracted
		})
	]
};