const nested = require('postcss-nested')
const mixins = require('postcss-mixins')
const remEm = require('./postcss-rem-em')
const filters = require('./postcss-filters')
const lightDark = require('./postcss-light-dark')

function colorSchemeMixin(colorScheme: 'light' | 'dark') {
  return {
    [`[data-alola-color-scheme='${colorScheme}'] &`]: {
      '@mixin-content': {},
    },
  }
}

const hoverMixin = {
  '@media (hover: hover)': {
    '&:hover': {
      '@mixin-content': {},
    },
  },
  '@media (hover: none)': {
    '&:active': {
      '@mixin-content': {},
    },
  },
}

const rtlMixin = {
  '[dir="rtl"] &': {
    '@mixin-content': {},
  },
}

const notRtlMixin = {
  ':root:not([dir="rtl"]) &': {
    '@mixin-content': {},
  },
}

module.exports = () => {
  return {
    postcssPlugin: 'postcss-preset-alola',
    plugins: [
      lightDark(),
      nested(),
      remEm(),
      filters(),
      mixins({
        mixins: {
          light: colorSchemeMixin('light'),
          dark: colorSchemeMixin('dark'),
          hover: hoverMixin,
          rtl: rtlMixin,
          'not-rtl': notRtlMixin,
        },
      }),
    ],
  }
}

module.exports.postcss = true
