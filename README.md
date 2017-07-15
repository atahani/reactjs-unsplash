## webpack and hot module replacement

1.initial git 

```
git init
```

2.add `.gitignore` file , get rules from [https://www.gitignore.io/](gitignore.io)

3.initial node packages with [https://yarnpkg.com/en/](yarn)

```
yarn init
```

4.add `react` `react-dom` and `prop-types` as dependencies

```
yarn add react@^15.4.2 react-dom@^15.4.2 prop-types@^15.5.10
```

5.add these packages as dev dependencies

```
yarn add babel-core@^6.23.1 babel-loader@^6.3.2 babel-preset-es2015@^6.22.0 babel-preset-react@^6.23.0 webpack@^2.2.1 webpack-dev-server@^2.4.1 file-loader@^0.11.2 react-hot-loader@next --dev
```

6.add `script` in package.json

```
"scripts": {
    "start": "webpack-dev-server",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```

7.add `webpack.config.js` file

```
const path = require('path');
const webpack = require('webpack');

const sourcePath = path.join(__dirname, './client');
const destinationPath = path.join(__dirname, './dist');

const isInProduction = process.env.NODE_ENV === 'production';

let entry = [];

if (isInProduction) {
  entry = [
    './index.jsx'
  ];
} else {
  entry = [
    'webpack-dev-server/client?http://localhost:3030',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './index.jsx'
  ];
}

let plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  })
];

// add these plugins in development 
if (isInProduction) {
  plugins = plugins.concat([
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
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
    new webpack.HotModuleReplacementPlugin(),
  ]);
}

module.exports = {
  devtool: isInProduction ? 'cheap-module-source-map' : 'source-map',
  context: sourcePath,
  entry,
  output: {
    filename: isInProduction ? 'bundle.min.js' : 'bundle.js',
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
          },
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      sourcePath
    ],
  },

  plugins,

  devServer: {
    contentBase: './',
    historyApiFallback: true,
    port: 3030,
    hot: true,
    publicPath: '/',
  }
};
```

8.create `.babelrc` file

```
{
  "presets": [
    ["es2015", {"modules": false}],
    "react"
  ],
  "plugins": [
    "react-hot-loader/babel"
  ]
}
```

9.create `client/index.jsx` file

```
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';

const run = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component  />
    </AppContainer>,
    document.getElementById('app')
  );
};

run(App);


/**
 * hot module replacement in development
 */

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./components/App', () => {
    run(App);
  });
}
```

10.add `components/App/index.jsx` file

```
import React from 'react';

const App = () => (
  <div>webpack and hot module replacement</div>
);

export default App;
```