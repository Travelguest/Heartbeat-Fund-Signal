const { merge } = require('webpack-merge');
const { resolve } = require('path');
const glob = require('glob');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack');
const common = require('./webpack.common');
const { PROJECT_PATH } = require('../conf');

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  plugins: [
    // 打包编译前清理 dist 目录
    new CleanWebpackPlugin(),
    // 去除无用样式,glob 是用来查找文件路径的
    new PurgeCSSPlugin({
      paths: glob.sync(`${resolve(PROJECT_PATH, './src')}/**/*.{tsx,scss,less,css}`, { nodir: true }),
      whitelist: ['html', 'body'],
    }),
    // css 压缩
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].chunk.css',
    }),
    // 添加包注释
    new webpack.BannerPlugin({
      raw: true,
      banner:
        '/** @preserve Powered by Heartbeat-Fund-Signal (https://github.com/Travelguest/Heartbeat-Fund-Signal) */',
    }),
  ],
  optimization: {
    minimize: true, // 指定压缩器，如果我们设为 true ，就默认使用 terser-webpack-plugin ，设为 false 即不压缩代码
    minimizer: [
      // js 代码压缩神器
      new TerserPlugin({
        extractComments: false, // 去除所有注释
        terserOptions: {
          compress: { pure_funcs: ['console.log'] }, // 设置我们想要去除的函数console.log
        },
      }),
      // css 压缩
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 0,
    },
  },
});
