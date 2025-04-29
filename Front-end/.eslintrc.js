module.exports = {
  extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
  rules: {
    // 将未使用变量警告降级为警告而非错误
    '@typescript-eslint/no-unused-vars': 'warn',
    // 允许在特定情况下使用 any，但发出警告
    '@typescript-eslint/no-explicit-any': 'warn',
    // 关闭未转义实体的规则
    'react/no-unescaped-entities': 'off',
    // 确保 React Hooks 规则被强制执行
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
