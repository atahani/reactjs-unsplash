## configure jest for testing

1.add these packages

```
yarn add jest@^20.0.4 eslint-plugin-jest@^20.0.3 babel-jest@^20.0.3 @types/jest@^20.0.2 --dev
```

2.edit `.babelrc`

```
{
  "presets": [
    [
      "es2015",
      {
        "modules": false
      }
    ],
    "stage-2",
    "react"
  ],
  "plugins": [
    "react-hot-loader/babel"
  ],
  "env": {
    "test": {
      "presets": [
        "es2015"
      ]
    }
  }
}
```

3.add these scripts into `package.json`

```
"test": "NODE_ENV=test jest",
"test-w": "NODE_ENV=test jest --watch --no-cache",
"build": "NODE_ENV=production webpack --progress"
```

4.edit `.eslintrc`

```
"env": {
    "browser": true,
    "jest/globals": true
},
"plugins": [
  "react",
  "jsx-a11y",
  "import",
  "jest"
],
```