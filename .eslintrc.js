module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true
  },
  extends: [
    "taro/vue3",
    "eslint:recommended",
    "plugin:vue/vue3-recommended",  // Changed from vue3-essential to vue3-recommended
    "plugin:prettier/recommended"
  ],
  parserOptions: {
    ecmaVersion: 2020,  // Updated from 2015 to 2020
    sourceType: "module"
  },
  rules: {
    "prettier/prettier": "error",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/multi-word-component-names": "off",
    "indent": ["error", 2] // 确保使用2个空格缩进
  }
}
