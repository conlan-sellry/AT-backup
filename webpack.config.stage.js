const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  // Expose __dirname to allow automatically setting basename.
  context: __dirname,
  node: {
    __dirname: true
  },

  mode: 'production',//for staging & production

  entry: [//??
    './src/index.js'
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i,
        uglifyOptions: {
          extractComments: true,
          warnings: false,
          parse: {},
          compress: {},
          mangle: true, // Note `mangle.properties` is `false` by default.
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_fnames: false,
        },
      }),
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'staging'
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[id].chunk.js'
  },
  devtool : '#source-map',
};
