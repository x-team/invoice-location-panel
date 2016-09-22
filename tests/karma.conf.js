var RewirePlugin = require('rewire-webpack');
var webpack = require('webpack');
var path = require('path');

var CI = process.env.NODE_ENV !== 'development';
var WATCH = !!process.env.WATCH_TESTS;

  var babelConf = {
    "presets": ["es2015", "react" ],
    "plugins": [
      "transform-object-rest-spread",
      "transform-async-to-generator",
      "transform-class-properties"
    ]
  };

var conf = {
  cache: true,
  devtool: 'inline-source-map',
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx', '.json', '.css', '.scss']
  },
  module: {
    loaders: [
      { test: /\.(js?|jsx?)$/,
        exclude: /node_modules|(spec\.js)$/,
        loader: 'isparta',
        query: {
          babel: babelConf
        }
      },
      { test: /spec\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        plugins: ["babel-plugin-rewire"],
        query: babelConf
      },
      {
        test: /\.(css|scss)$/,
        loaders: ['style', 'css?sourceMap&modules&importLoaders=1','postcss','sass']
      }
    ]
  },
  plugins: [
    new RewirePlugin(),
    new webpack.PrefetchPlugin('react')
  ],
  node: {
   net: 'empty',
   tls: 'empty',
   dns: 'empty',
   fs: 'empty'
  }
};

module.exports = function(config) {
  config.set({
    singleRun: !WATCH,
    autoWatch: true,
    browsers: [ 'PhantomJS2'],
    browserNoActivityTimeout: 60000,
    browserDisconnectTimeout: 10000,
    frameworks: ['mocha', 'chai', 'sinon'],
    reporters: ['mocha', 'coverage'],
    client: { mocha: { timeout: 5000 } },
    files: [ { pattern: '../tests/webpack.tests.js', watched: false } ],
    preprocessors: { '../tests/webpack.tests.js': ['webpack', 'sourcemap'] },
    webpack: conf,
    webpackServer: { noInfo: true },
    webpackMiddleware: { noInfo: true },
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'lcov', subdir: 'report-lcov' },
        { type: 'text-summary' },
        { type: 'cobertura', subdir: 'cobertura'}

      ]
    }
  });
};
