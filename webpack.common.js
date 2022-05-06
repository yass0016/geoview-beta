/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LodashWebpackPlugin = require('lodash-webpack-plugin');
const package = require('./package.json');

// get version numbers and the hash of the current commit
const [major, minor, patch] = package.version.split('.');
// eslint-disable-next-line no-console
console.log(`Build CGP Viewer: ${major}.${minor}.${patch}`);

const config = {
  entry: {
    'cgpv-main': './src/app.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  resolve: {
    extensions: ['.mjs', '.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new LodashWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'Canadian Geospatial Platform Viewer',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: './public/img', to: 'img' }, { from: './public/css', to: 'css' }, { from: './public/favicon.ico' }],
    }),
    new webpack.DefinePlugin({
      __VERSION__: {
        major,
        minor,
        patch,
        timestamp: Date.now(),
      },
    }),
  ],
};

module.exports = config;
