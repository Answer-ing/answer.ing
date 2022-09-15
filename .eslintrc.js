module.exports = {
  plugins: [
    "jest",
  ],
  extends: [
    'airbnb',
    'airbnb/whitespace',
    'plugin:jest/recommended',
  ],
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
    es2022: true,
  },
  rules: {
    'arrow-parens': 'off',
    'consistent-return': 'off',
    'func-names': 'off',
    'import/extensions': [0, 'ignorePackages'],
    'no-console': 'off',
    'no-plusplus': 'off',
    radix: 'off',
    'react/button-has-type': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
  },
};
