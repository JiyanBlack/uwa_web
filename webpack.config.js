var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

console.log(debug);

module.exports = {
  context: __dirname + "/app/web",
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
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + "/app/web/",
    filename: "client.bundle.js"
  },
  plugins: debug
    ? []
    : [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': '"production"'
        }
      }),
      new webpack
        .optimize
        .DedupePlugin(),
      new webpack
        .optimize
        .UglifyJsPlugin({
          mangle: false, sourcemap: false, output: {
            comments: false,
          },
          compress: {
            warnings: false
          }
        })
    ]
};