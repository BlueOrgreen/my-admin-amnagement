const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
  entry: {
    app: [
      path.join(__dirname, '../src'),
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 1,
      cacheGroups: {
        // config: {
        //   test: /(src\/config\.ts)$/,
        //   priority: 100,
        //   name: 'config',
        //   chunks: 'all',
        // },
      },
      // cacheGroups: {
      //   vendor: { // 抽离第三插件
      //     test: /node_module/,
      //     chunks: 'initial',
      //     name: 'vendor',
      //     minSize: 0, // 超出0字节就生成新的公共的包
      //     minChunks: 2,
      //     priority: 10, // 优先级
      //   },
      //   commons: { // 抽离公共的js
      //     chunks: 'initial',
      //     name: 'commons',
      //     minSize: 0, // 超出0字节就生成新的公共的包
      //     minChunks: 2,
      //   },
      // },
    },
  },
  output: {
    filename: 'static/js/[name].[contenthash].js', // name代表entry对应的名字; hash代表 整个app打包完成后根据内容加上hash。一旦整个文件内容变更，hash就会变化
    chunkFilename: 'static/js/[name].[chunkhash].js',
    path: path.join(__dirname, '../dist'), // 打包好之后的输出路径
    publicPath: '/', // 静态资源文件引用时的路径（加在引用静态资源前面的）
    assetModuleFilename: 'static/assets/images/[hash][ext][query]',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        include: [path.resolve('node_modules/nats.ws')],
        use: {
          loader: 'babel-loader',
        },
      },
      // {
      //   enforce: 'pre',
      //   test: /\.(ts|tsx|js|jsx)$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader',
      //   // options: {
      //   //   cache: true,
      //   // },
      // },
      // {
      //   test: /\.(png|jpg|jpeg|gif|svg)$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 10000,
      //         name: 'static/assets/images/[name].[contenthash:8].[ext]',
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../src/template.html'),
      minify: {
        html5: true,
      },
      favicon: path.join(__dirname, '../src/assets/images/favicon.png'),
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV),
    }),
    new ESLintPlugin({
      extensions: ['ts', 'tsx', 'js', 'jsx'],
      emitError: true,
      emitWarning: true,
      quiet: true,
    }),
    // new LodashModuleReplacementPlugin({
    //   'collections': true,
    //   'paths': true,
    // }),
  ],
};
