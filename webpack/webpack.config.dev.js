const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, '../public/App.js'),
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: ['node_modules'],
        use: 'babel-loader'
      }
    ]
  }
};
