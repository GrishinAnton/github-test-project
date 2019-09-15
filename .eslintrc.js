module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    "plugin:vue/essential",
    "@vue/prettier",
    "eslint:recommended",
    "plugin:vue/recommended"
  ],

  rules: {
    "no-console": "off",
    "no-debugger": "off"
  },

  parserOptions: {
    parser: "babel-eslint"
  }
};
