const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const srcFolder = path.join(__dirname, '/client/src/');

module.exports = () => {
  const env = dotenv.config().parsed;

  return {
    entry: {
      main: [path.join(srcFolder, 'index.jsx')]
    },
    resolve: { extensions: ['.js', '.jsx'] },
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: '[name].js',
      publicPath: '/'
    },
    devtool: 'eval-source-map',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                {
                  plugins: ['@babel/plugin-proposal-class-properties']
                }
              ]
            }
          }
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader']
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: { minimize: true }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.GHOSTBUSTER_BASE_URL': JSON.stringify(process.env.GHOSTBUSTER_BASE_URL)
      }),
      new HtmlWebpackPlugin({
        template: path.join(srcFolder, 'index.html'),
        filename: './index.html'
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css'
      })
    ]
  };
};
