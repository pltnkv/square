const path = require('path');

module.exports = {
	entry: './src/index.ts',
	// entry: './src/index2.tsx',
	// devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	optimization: {
		runtimeChunk: 'single',
		minimize: false,
		splitChunks: {
			chunks: 'all',
		},
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		modules: [
			path.resolve('./src'),
			path.resolve('./node_modules'),
		]
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
	},
};
