const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = webType => ({
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: [
    `webpack-hot-middleware/client?path=${webType.route}/__webpack_hmr`,
    'babel-polyfill',
    path.resolve(__dirname, `src/${webType.name}`)
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'assets/webpack.html'),
      title: webType.title,
      filename: 'index.html',
      inject: 'body',
      minify: { collapseWhitespace: true, minifyCSS: true, minifyJS: true, removeComments: true }
    }),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.ts$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'ts-loader'
      },
      {
        test: /\.vue$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'vue-loader',
      },
      {
        test: /\.pug$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'pug-plain-loader'
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif|woff|woff2|ttf|eot|ico)$/,
        include: [
          path.resolve(__dirname, 'src')
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