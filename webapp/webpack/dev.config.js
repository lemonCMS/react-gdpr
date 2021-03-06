require('@babel/polyfill');

// Webpack config for development
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var helpers = require('./helpers');

var assetsPath = path.resolve(__dirname, '../static/dist');
var host = (process.env.HOST || 'localhost');
var port = (+process.env.PORT + 1) || 3001;

var ReactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin;

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

var babelrc = fs.readFileSync('./.babelrc');
var babelrcObject = {};

try {
  babelrcObject = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

var babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {};

// merge global and dev-only plugins
var combinedPlugins = babelrcObject.plugins || [];
combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins);

var babelLoaderQuery = Object.assign({}, babelrcObject, babelrcObjectDevelopment, {plugins: combinedPlugins});
delete babelLoaderQuery.env;

var validDLLs = helpers.isValidDLLs('vendor', assetsPath);
if (process.env.WEBPACK_DLLS === '1' && !validDLLs) {
  process.env.WEBPACK_DLLS = '0';
  console.warn('webpack dlls disabled');
}

var webpackConfig = module.exports = {
  devtool: 'inline-source-map',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': [
      '@babel/polyfill',
      'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
      'react-hot-loader/patch',
      'bootstrap-loader',
      './src/client.js'
    ]
  },
  output: {
    path: assetsPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: 'http://' + host + ':' + port + '/dist/'
  },
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        loader: 'raw-loader'
      },
      {
        test: /\.jsx?$/,
        loader: 'happypack/loader?id=jsx',
        include: [path.resolve(__dirname, '../src')]
      }, {
        test: /\.json$/,
        loader: 'happypack/loader?id=json',
        include: [path.resolve(__dirname, '../src')]
      }, {
        test: /\.less$/,
        loader: 'happypack/loader?id=less',
        include: [path.resolve(__dirname, '../src')]
      }, {
        test: /\.scss$/,
        loader: 'happypack/loader?id=sass',
        include: [path.resolve(__dirname, '../src')]
      }, {
        test: /\.css$/,
        loader: 'happypack/loader?id=css',
        include: [path.resolve(__dirname, '../src'), 'node_modules']
      }, {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          mimetype: 'application/font-woff'
        }
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          mimetype: 'application/octet-stream'
        }
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          mimetype: 'image/svg+xml'
        }
      }, {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url-loader',
        options: {
          limit: 10240
        }
      }
    ]
  },
  resolve: {
    modules: [
      'src',
      'node_modules'
    ],
    extensions: ['.json', '.js', '.jsx']
  },
  plugins: [
    // hot reload
    new webpack.HotModuleReplacementPlugin(),

    new webpack.IgnorePlugin(/webpack-stats\.json$/),

    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true,  // <-------- DISABLE redux-devtools HERE
      __SERVICEWORKER__: false
    }),

    webpackIsomorphicToolsPlugin.development(),

    new ReactLoadablePlugin({
      filename: path.join(assetsPath, 'loadable-chunks.json')
    }),

    helpers.createHappyPlugin('jsx', [
      {
        loader: 'babel-loader',
        options: babelLoaderQuery
      }, {
        loader: 'eslint-loader',
        options: {emitWarning: true}
      }
    ]),
    helpers.createHappyPlugin('less', [
      {
        loader: 'style-loader',
        options: {sourceMap: true}
      }, {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 2,
          sourceMap: true,
          // localIdentName: '[local]___[hash:base64:5]'
          localIdentName: '[local]'
        }
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          config: {
            path: 'postcss.config.js'
          }
        }
      }, {
        loader: 'less-loader',
        options: {
          outputStyle: 'expanded',
          sourceMap: true
        }
      }
    ]),
    helpers.createHappyPlugin('sass', [
      {
        loader: 'style-loader',
        options: {sourceMap: true}
      }, {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 2,
          sourceMap: true,
          localIdentName: '[local]___[hash:base64:5]'
        }
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          config: {
            path: 'postcss.config.js'
          }

        }
      }, {
        loader: 'sass-loader',
        options: {
          outputStyle: 'expanded',
          sourceMap: true
        }
      }
    ]),
    helpers.createHappyPlugin('css', [
      {
        loader: 'style-loader',
        options: {sourceMap: true}
      }, {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 1,
          sourceMap: true,
          /* localIdentName: '[local]___[hash:base64:5]' */
          localIdentName: '[local]'
        }
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          config: {
            path: 'postcss.config.js'
          }
        }
      }, {
        loader: 'sass-loader',
        options: {
          outputStyle: 'expanded',
          sourceMap: true
        }
      }
    ])
  ]
};

if (process.env.WEBPACK_DLLS === '1' && validDLLs) {
  helpers.installVendorDLL(webpackConfig, 'vendor');
}
