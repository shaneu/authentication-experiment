const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: ['webpack/hot/poll?1000', './src/index'],
  target: 'node',
  node: {
    __filename: true,
    __dirname: true,
  },
  watch: true,
  devtool: 'sourcemap',
  externals: [nodeExternals({ whitelist: ['webpack/hot/poll?1000'] })],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new StartServerPlugin('main.js'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    }),
  ],
  optimization: {
    namedModules: true,
  },
};
