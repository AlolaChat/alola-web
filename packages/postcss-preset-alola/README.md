# postcss-preset-alola

## Usage

Add `postcss-preset-alola` to your `postcss.config.js` config:

```js
module.exports = {
  plugins: {
    'postcss-preset-alola': {},
    'postcss-simple-vars': {
      variables: {
        'alola-breakpoint-xs': '36em',
        'alola-breakpoint-sm': '48em',
        'alola-breakpoint-md': '62em',
        'alola-breakpoint-lg': '75em',
        'alola-breakpoint-xl': '88em',
      },
    },
  },
};
```

## License

MIT License
