const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const output = () => ({
  filename: '[name].js',
  path: path.resolve(__dirname, '../build'),
  publicPath: '/',
  libraryTarget: 'umd',
  globalObject: 'this'
});

const externals = () => ({
  'browser-image-size': 'browser-image-size',
  react: 'react',
  'prop-types': 'prop-types',
  'react-progressive-image': 'react-progressive-image',
  'window-or-global': 'window-or-global'
});

const jsLoader = () => ({
  test: /\.js$/,
  include: path.resolve(__dirname, '../src'),
  exclude: ['node_modules', 'public'],
  use: 'babel-loader'
});

const plugins = () => [
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': 'production'
  }),
  new webpack.optimize.ModuleConcatenationPlugin(),
  new UglifyJSPlugin()
];

module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),
  mode: 'production',
  output: output(),
  target: 'web',
  externals: externals(),
  devtool: 'inline-source-map',
  module: {
    rules: [jsLoader()]
  },
  plugins: plugins()
};
