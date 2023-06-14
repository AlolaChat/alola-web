module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-alola`
  extends: ['alola'],
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
}
