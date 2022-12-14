const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('dotenv').config();

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-transform-runtime', '@babel/transform-async-to-generator'],
        },
      },
      {
        test: /.(css|scss)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  require('autoprefixer')
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.png|svg|jpg|gif$/,
        type: 'asset/resource',
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: '/public',
              outputPath: '/public/assets',
            },
          },
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'answer.ing',
      template: './public/index.html',
      inject: false,
      minify: true,
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
      publicPath: '/public'
    },
    port: 8080,
    compress: true,
    hot: true,
    proxy: {
      '/**': {
        target: 'http://localhost:3000/',
        secure: false,
        changeOrigin: true,
      },
      '/assets/**': {
        target: 'http://localhost:3000/',
        secure: false,
        changeOrigin: true,
      },
      '/login/**': {
        target: 'http://localhost:3000/',
        secure: false,
        changeOrigin: true,
      },
      '/login': {
        target: 'http://localhost:3000/',
        secure: false,
        changeOrigin: true,
      },
      '/verifyuser': {
        target: 'http://localhost:3000/verifyuser',
        secure: false,
        changeOrigin: true,
      },
    },
  },
};
