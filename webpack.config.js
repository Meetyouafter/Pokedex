const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const optimization = () => {
  const config = {
    minimize: true,
    splitChunks: {
      chunks: 'all',
    },
  };
  if (isProd) {
    config.minimizer = [
      new TerserWebpackPlugin(),
      new MiniCssExtractPlugin(),
    ];
  }
  return config;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  target: 'web',
  entry: './index.jsx',
  devtool: isDev ? 'source-map' : 'eval-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: filename('js'),
    clean: true,
    publicPath: '/',
  },
  optimization: optimization(),
  devServer: {
    static: './dist',
    hot: isDev,
    port: 8080,
    open: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: 'index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.s?css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'scoped-css-loader', 'sass-loader'],
      },
      {
        test: /\.js|jsx$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name].[ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[ext]',
        },
      },
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              [
                '@babel/preset-react',
              ],
            ],
          },
        },
      },
    ],
  },
};
