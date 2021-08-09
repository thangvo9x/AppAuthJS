module.exports = {
  root: true,
  plugins: [
    //'@typescript-eslint',
    'promise',
    //'import',
  ],
  extends: ['@react-native-community', 'eslint:recommended'],
  rules: {
    'max-len': ['warn', { code: 120 }],
    'no-console': 2,
    'no-var': 2,
    eqeqeq: 2,
    'no-prototype-builtins': 1,
    'no-empty': 1,
    'no-case-declarations': 1,
    'react-native/no-inline-styles': 2,
    'react-native/no-unused-styles': 2,
    // 'react-native/no-color-literals': 2,
    'react/jsx-no-bind': [
      2,
      {
        ignoreRefs: false,
        allowArrowFunctions: true,
        allowBind: false,
      },
    ],
    //promisee
    // 'promise/prefer-await-to-then': 2,
    // 'promise/prefer-await-to-callbacks': 2,
    // 'promise/no-return-wrap': 2,
  },
};
