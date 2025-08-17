module.exports = {
  extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
  rules: {
    // downgrade unused variable warnings to warnings instead of errors
    '@typescript-eslint/no-unused-vars': 'warn',
    // allow any in specific cases, but emit warnings
    '@typescript-eslint/no-explicit-any': 'warn',
    // turn off the rule of unescaped entities
    'react/no-unescaped-entities': 'off',
    //ensure react hooks rules are enforced
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
