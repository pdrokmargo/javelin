const helpers = require('./helpers');
const path = require('path');
const webpack = require('webpack');

// Webpack Plugins
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
const ENV = process.env.npm_lifecycle_event;
const HMR = helpers.hasProcessFlag('hot');
const METADATA = {
  isDevServer: helpers.isWebpackDevServer(),
  baseUrl: '/'
};

module.exports = function makeWebpackConfig(options) {
  // This is the object where all configuration gets set
  var config = {};

  config.entry = {
    'polyfills': './src/polyfills.ts',
    'main': './src/main.ts'
  };

  /**
   * Resolve
   * Reference: http://webpack.github.io/docs/configuration.html#resolve
   */
  config.resolve = {
    // only discover files that have those extensions
    extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html'],

    // An array of directory names to be resolved to the current directory
    modules: [helpers.root('src'), helpers.root('node_modules')],
  };


  /**
   * Loaders
   * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
   * List: http://webpack.github.io/docs/list-of-loaders.html
   * This handles most of the magic responsible for converting modules
   */
  config.module = {
    rules: [
      // copy those assets to output
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=fonts/[name].[hash].[ext]?'
      },

      // Support for *.json files.
      {
        test: /\.json$/,
        loader: 'json-loader'
      },

      // support for .html as raw text
      // todo: change the loader to something that adds a hash to images
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: helpers.root('src/index.html')
      }
    ]
  };


  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  config.plugins = [
    // Define env variables to help with builds
    // Reference: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
    new webpack.DefinePlugin({
      // Environment helpers
      'process.env': {
        ENV: JSON.stringify(ENV)
      }
    }),
    
    // Workaround needed for angular 2 angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('./src') // location of your src
    ),

    // Inject script and link tags into html files
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunksSortMode: 'dependency',
      metadata: METADATA,
    }),

    // Generate common chunks if necessary
    new CommonsChunkPlugin({
      name: 'polyfills',
      chunks: ['polyfills']
    }),
    new CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['main'],
      minChunks: module => /node_modules/.test(module.resource)
    }),
    // Specify the correct order the scripts will be injected in
    new CommonsChunkPlugin({
      name: ['polyfills', 'vendor'].reverse()
    }),

    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery',
    }),
  ];


  /**
   * Dev server configuration
   * Reference: http://webpack.github.io/docs/configuration.html#devserver
   * Reference: http://webpack.github.io/docs/webpack-dev-server.html
   */
  config.devServer = {
    contentBase: './src',
    historyApiFallback: true,
    quiet: true,
    stats: 'minimal' // none (or false), errors-only, minimal, normal (or true) and verbose
  };

  return config;
};
