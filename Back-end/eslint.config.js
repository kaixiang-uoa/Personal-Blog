// eslint.config.js
import js from "@eslint/js";

export default [
  // 加载官方的 JavaScript 基础推荐配置（自动带 node 环境）
  js.configs.recommended,

  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
    },
    rules: {
      "no-console": "off", // 允许使用 console
      "no-undef": "off", // process不会再因为node环境报错
    },
  },
];
