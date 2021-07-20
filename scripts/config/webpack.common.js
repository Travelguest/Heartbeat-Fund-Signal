const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const paths = require('../paths');
const { PROJECT_PATH } = require('../constants');
const { isDevelopment, isProduction } = require('../env');
const { imageInlineSizeLimit } = require('../conf');

const getCssLoaders = (importLoaders) => [
  isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      modules: false,
      sourceMap: isDevelopment,
      importLoaders,
    },
  },
];
module.exports = {
  // Webpack 5
  // entry: {
  //   app: paths.appIndex,
  // },

  entry: {
    app: resolve(PROJECT_PATH, './src/app.js'),
  },
  output: {
    filename: `js/[name]${isDevelopment ? '' : '.[hash:8]'}.js`,
    path: resolve(PROJECT_PATH, './dist'),
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: getCssLoaders(0),
      },
      {
        test: /\.less$/,
        use: [
          ...getCssLoaders(1),
          {
            loader: 'less-loader',
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          ...getCssLoaders(1),
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: imageInlineSizeLimit,
          },
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2?)$/,
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      cache: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
      ignoreOrder: false,
    }),
  ],
};
