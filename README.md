## Button Component

we use `...others` syntax so we need `babel-preset-stage-2` and set this as `presets`

1.add `babel-preset-stage-2` package

```
yarn add babel-preset-stage-2@^6.22.0 --dev
```

2.add `stage-2` as presets in `.babelrc`

```
{
  "presets": [
    ["es2015", {"modules": false}],
    "stage-2",
    "react"
  ],
  "plugins": [
    "react-hot-loader/babel"
  ]
}
```