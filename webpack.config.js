var path = require('path');
var HtmlWebpackPlugin  = require('html-webpack-plugin');

var plugins = [];


function isProduction(){
  return process.env.NODE_ENV == 'PRODUCTION';
}

if (!isProduction()){
  plugins.push(new HtmlWebpackPlugin());
}


module.exports = {

  entry: path.join(__dirname, '/src'),
  output: {
      path: path.join(__dirname, '/dist'),
      filename: 'bundle.js',
  },
  plugins: plugins,
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/
      },
      {
        test: /\.jsx$/,
        loaders: isProduction() ? ['babel'] : ['react-hot', 'babel'],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.(css|scss)$/,
        loaders: ['style','css','sass']
      },
      {
         test: /\.(woff2?|svg)$/,
         loader: 'url?limit=10000'
      },
      {
        test: /\.(ttf|eot)$/,
        loader: 'file'
      }
    ]
  },
  resolve: {
    alias: {},
    extensions: ['', '.js', '.jsx', '.json', '.css', '.scss']
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
    fs: 'empty'
  }
};
