var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
  context: __dirname+"/web",
  devtool: debug
    ? "inline-sourcemap"
    : null,
  entry: "./client.js",
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  output: {
    path: __dirname+"/web/",
    filename: "client.bundle.js"
  },
  plugins: debug
    ? []
    : [
      new webpack
        .optimize
        .DedupePlugin(),
      new webpack
        .optimize
        .OccurenceOrderPlugin(),
      new webpack
        .optimize
        .UglifyJsPlugin({mangle: false, sourcemap: false})
    ]
};