const helpers = require('./helpers');
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const webpackMergeDll = webpackMerge.strategy({plugins: 'replace'});
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

// Webpack Plugins
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Webpack Constants
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';


const DllBundlesPlugin = require('webpack-dll-bundles-plugin').DllBundlesPlugin;


module.exports = function (options) {
  return webpackMerge(commonConfig({env: ENV}), {
    devtool: 'cheap-module-source-map', // cheap-module-eval-source-map or eval-source-map

    output: {
      path: helpers.root('dist'),
      publicPath: 'http://localhost:3003/',
      filename: 'js/[name].js',
      sourceMapFilename: '[file].map',
      chunkFilename: '[id].chunk.js'
    },

    module: {
      rules: [
        // Support for .ts files.
        {
          test: /\.ts$/,
          use: [
            {
              loader: '@angularclass/hmr-loader',
              options: {
                pretty: true,
                prod: false
              }
            }, {
              // MAKE SURE TO CHAIN VANILLA JS CODE, I.E. TS COMPILATION OUTPUT.
              loader: 'ng-router-loader',
              options: {
                loader: 'async-import',
                genDir: 'compiled',
              }
            }, {
              loader: 'awesome-typescript-loader',
              options: {
                configFileName: 'tsconfig.webpack.json'
              }                        
            }, {
              loader: 'angular2-template-loader'
            }
          ],
          exclude: [/\.(spec|e2e)\.ts$/]
        },
        // Support for CSS as raw text
        // all css in src/styles will be bundled in an external css file
        {
          test: /\.css$/,
          include: helpers.root('src', 'styles'),
          loader: ['style-loader', 'css-loader']
        },
        // all css required in src/app files will be merged in js files
        {
          test: /\.css$/,
          include: helpers.root('src', 'app'),
          loader: 'raw-loader'
        },

        // support for .scss files
        // all css in src/styles will be bundled in an external css file
        {
          test: /\.(scss|sass)$/,
          include: helpers.root('src', 'styles'),
          loader: [
            {loader: 'style-loader'},
            {
              loader: 'css-loader',
              // options: {
              //     sourceMap: true
              // }
            },
            {
              loader: 'sass-loader',
              // options: {
              //     sourceMap: true
              // }
            }
          ]
        },
        // all css required in src/app files will be merged in js files
        {
          test: /\.(scss|sass)$/,
          include: helpers.root('src', 'app'),
          loader: 'raw-loader!sass-loader'
        },
      ]
    },

    plugins: [
      new webpack.LoaderOptionsPlugin({
        debug: true,
        options: {
          // Reference: https://github.com/jtangelder/sass-loader
          sassLoader: {
            includePaths: [path.resolve(__dirname, 'src')]
          },
          context: '/'
        }
      }),

      new DllBundlesPlugin({
        bundles: {
          polyfills: [
            'core-js',
            {
              name: 'zone.js',
              path: 'zone.js/dist/zone.js'
            },
            {
              name: 'zone.js',
              path: 'zone.js/dist/long-stack-trace-zone.js'
            },
          ],
          vendor: [
            '@angular/platform-browser',
            '@angular/platform-browser-dynamic',
            '@angular/core',
            '@angular/common',
            '@angular/forms',
            '@angular/http',
            '@angular/router',
            'rxjs',
            '@angularclass/hmr',
          ]
        },
        dllDir: helpers.root('dll'),
        webpackConfig: webpackMergeDll(commonConfig({env: ENV}), {
          devtool: 'cheap-module-source-map',
          plugins: []
        })
      }),

      new AddAssetHtmlPlugin([
        { filepath: helpers.root(`dll/${DllBundlesPlugin.resolveFile('polyfills')}`) },
        { filepath: helpers.root(`dll/${DllBundlesPlugin.resolveFile('vendor')}`) }
      ]),
    ]
  });
}
