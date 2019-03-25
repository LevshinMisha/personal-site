const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const dotenv = require('dotenv');

dotenv.config();

const config = webType => ({
  mode: 'production',
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, `src/${webType.name}`)
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, `build/webpack/${webType.name}`)
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'assets/webpack.html'),
      title: webType.title,
      filename: 'index.html',
      inject: 'body',
      minify: { collapseWhitespace: true, minifyCSS: true, minifyJS: true, removeComments: true }
    }),
    new ExtractTextPlugin('styles.css'),
    new VueLoaderPlugin(),
    new MinifyPlugin()
  ],
  resolve: {
    extensions: ['.js', '.ts', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src', webType.name)
        ],
        use: 'babel-loader'
      },
      {
        test: /\.ts$/,
        include: [
          path.resolve(__dirname, 'src', webType.name)
        ],
        loader: 'ts-loader'
      },
      {
        test: /\.vue$/,
        include: [
          path.resolve(__dirname, 'src', webType.name)
        ],
        loader: 'vue-loader',
      },
      {
        test: /\.pug$/,
        include: [
          path.resolve(__dirname, 'src', webType.name)
        ],
        loader: 'pug-plain-loader'
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif|woff|woff2|ttf|eot|ico)$/,
        include: [
          path.resolve(__dirname, 'src', webType.name)
        ],
        loader: 'file-loader?name=files/[path][name].[ext]'
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
          }
        },
        {
          loader: 'postcss-loader'
        }]
      },
    ]
  }
});

const { FRAMEWORKS } = require('./src/common/frameworks');

module.exports = FRAMEWORKS.map(config);