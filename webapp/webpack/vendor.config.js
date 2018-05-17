var path = require('path');
var webpack = require('webpack');
var projectRootPath = path.resolve(__dirname, '../');

module.exports = {
  devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  output: {
    path: path.join(projectRootPath, 'static/dist/dlls'),
    filename: 'dll__[name].js',
    library: 'DLL_[name]_[hash]'
  },

  performance: {
    hints: false
  },

  entry: {
    vendor: [
      '@babel/polyfill',

      //
      // Generate this list using the following command against the stdout of
      // webpack running against the source bundle config (dev/prod.js):
      //
      //    webpack --config webpack/dev.config.js --display-modules | egrep -o 'babel-runtime/\S+' | sed 's/\.js$//' | sort | uniq

      // <babel-runtime>
      '@babel/runtime/core-js/object/assign',
      '@babel/runtime/core-js/object/create',
      '@babel/runtime/core-js/object/define-property',
      '@babel/runtime/core-js/object/entries',
      '@babel/runtime/core-js/object/get-own-property-descriptor',
      '@babel/runtime/core-js/object/get-own-property-symbols',
      '@babel/runtime/core-js/object/keys',
      '@babel/runtime/core-js/promise',
      '@babel/runtime/helpers/assertThisInitialized',
      '@babel/runtime/helpers/asyncToGenerator',
      '@babel/runtime/helpers/defineProperty',
      '@babel/runtime/helpers/extends',
      '@babel/runtime/helpers/inheritsLoose',
      '@babel/runtime/helpers/interopRequireDefault',
      '@babel/runtime/helpers/interopRequireWildcard',
      '@babel/runtime/helpers/objectSpread',
      '@babel/runtime/regenerator/index',
      // </babel-runtime>

      'react',
      'react-dom'
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),

    new webpack.DllPlugin({
      path: path.join(projectRootPath, 'webpack/dlls/[name].json'),
      name: 'DLL_[name]_[hash]'
    })
  ]
};
