const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const devMode = NODE_ENV === 'development';
const proMode = NODE_ENV === 'production';

const config = {
  entry: {
      app: './src/app',
  },
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: proMode ? '[name].[hash].js' : '[name].js',
  },
  resolve: {
      extensions: [
          '.js',
          '.jsx',
          '.sass',
          '.scss',
      ],
  },
  mode: NODE_ENV,
  target: 'web',
	watch: devMode,
	devtool: devMode ? 'source-map' : false,
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		index: 'index.html',
		publicPath: '/',
		open: true,
		compress: true,
		port: 9000,
		https: false,
	},
	optimization: {
		splitChunks: {
			// include all types of chunks
			chunks: 'all'
		}
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: 'babel-loader',
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: {
							minimize: true
						}
					}
				],
			},
			{
				test: /\.(jpe?g|png|gif)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: 'img/[name].[hash].[ext]',
					},
				},
			},
			{
				test: /\.(ttf|eot|svg|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: {
					loader: 'file-loader',
					options: {
						name: 'fonts/[name].[hash].[ext]',
					},
				},
			},
			{
				test: /\.(scss|sass)$/,
        use: proMode ?
        [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: path.resolve(__dirname, 'dist'),
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ] :
        [
					'style-loader',
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/templates/index.html',
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(NODE_ENV),
      },
      devMode: devMode,
      proMode: proMode,
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			'window.$': 'jquery',
			Popper: 'popper.js',
			_: 'lodash'
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new CleanWebpackPlugin(['dist']),
		/*
		new FaviconsWebpackPlugin({
			logo: './src/logo/logo.svg',
			prefix: 'img/favicons/icons-[hash]', // Output directory
			persistentCache: false,
			inject: true,
			icons: {
				android: true,
				appleIcon: true,
				appleStartup: true,
				coast: false,
				favicons: true,
				firefox: true,
				opengraph: false,
				twitter: false,
				yandex: false,
				windows: false
			}
		}),
		*/
	],
}

if(proMode) {
	config.plugins.push(new UglifyJsPlugin({
		sourceMap: devMode
	}));
	config.plugins.push(new MiniCssExtractPlugin({
		filename: '[name].[hash].css',
		chunkFilename: '[id].css'
	}));
	config.plugins.push(new OptimizeCSSAssetsPlugin());
}

module.exports = config;
