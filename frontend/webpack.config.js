const webpack = require('webpack');
const path = require('path');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.js',
    './src/components/Weather.js',
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    contentBase: 'src/public',
    historyApiFallback: true,
    port: 8000,
    host: '0.0.0.0',
  },
  devtool: 'eval',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'Weather.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
        }],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new TransferWebpackPlugin([
      { from: 'src/public/' },
    ], '.'),
    new HtmlWebpackPlugin({
      template: './src/public/index.html',
      filename: './index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        ENDPOINT: JSON.stringify(process.env.ENDPOINT || 'http://0.0.0.0:9000/api'),
      },
    }),
  ],
};
