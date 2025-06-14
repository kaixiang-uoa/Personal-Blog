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
      "no-unused-vars": ["error", { 
        "vars": "all",
        "args": "after-used",
        "ignoreRestSiblings": true,
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }],
      "no-unused-expressions": "error",
      "no-unused-private-class-members": "error",
      "no-unreachable": "error",
      "no-constant-condition": "error",
      "no-duplicate-imports": "error",
      "no-multiple-empty-lines": ["error", { "max": 1 }],
      "no-trailing-spaces": "error",
      "no-whitespace-before-property": "error",
      "semi": ["error", "always"],
      "quotes": ["error", "single", { "avoidEscape": true }],
      "comma-dangle": ["error", "always-multiline"],
      "arrow-parens": ["error", "always"],
      "arrow-spacing": ["error", { "before": true, "after": true }],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "comma-spacing": ["error", { "before": false, "after": true }],
      "key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
      "keyword-spacing": ["error", { "before": true, "after": true }],
      "space-before-blocks": ["error", "always"],
      "space-before-function-paren": ["error", {
        "anonymous": "always",
        "named": "never",
        "asyncArrow": "always"
      }],
      "space-in-parens": ["error", "never"],
      "space-infix-ops": "error",
      "space-unary-ops": ["error", {
        "words": true,
        "nonwords": false
      }],
      "spaced-comment": ["error", "always"],
      "template-curly-spacing": ["error", "never"],
      "yoda": ["error", "never"],
    },
  },
];
