const path = require('path');
const webpack = require('webpack');

const sourcePath = path.join(__dirname, './client');
const destinationPath = path.join(__dirname, './dist');

const isInProduction = process.env.NODE_ENV === 'production';

let entry = [];

if (isInProduction) {
  entry = ['./index.jsx'];
} else {
  entry = ['webpack-dev-server/client?http://localhost:3030', 'webpack/hot/only-dev-server', 'react-hot-loader/patch', './index.jsx'];
}

let plugins = [new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      ROOT_URL: JSON.stringify(process.env.ROOT_URL),
      API_ROOT: JSON.stringify(process.env.API_ROOT),
      CLIENT_ID: JSON.stringify(process.env.CLIENT_ID),
      CLIENT_SECRET: JSON.stringify(process.env.CLIENT_SECRET),
      OAUTH_PATH: JSON.stringify(process.env.OAUTH_PATH),
      REDIRECT_URI: JSON.stringify(process.env.REDIRECT_URI)
    }
  })];

// add these plugins in development
if (isInProduction) {
  plugins = plugins.concat([
    new webpack.LoaderOptionsPlugin({minimize: true, debug: false}),
    new webpack
      .optimize
      .UglifyJsPlugin({
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true
        },
        compress: {
          screw_ie8: true
        },
        comments: false
      })
  ]);
} else {
  plugins = plugins.concat([
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]);
}

module.exports = {
  devtool: isInProduction
    ? 'cheap-module-source-map'
    : 'source-map',
  context: sourcePath,
  entry,
  output: {
    filename: isInProduction
      ? 'bundle.min.js'
      : 'bundle.js',
    path: destinationPath,
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.(pdf|ico|jpg|eot|otf|woff2|woff|ttf|mp4|webm)$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          query: {
            name: '[name].[ext]'
          }
        }
      }, {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: [
      '.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'
    ],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      sourcePath
    ]
  },

  plugins,

  devServer: {
    contentBase: './',
    historyApiFallback: true,
    port: 3030,
    hot: true,
    publicPath: '/'
  }
};