module.exports = {
  customSyntax: 'postcss-html',
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind']
      }
    ]
  },
  extends: ['stylelint-config-recommended-vue/scss']
}
