# Code Comment Guidelines

This document outlines the comment guidelines to improve code readability and maintainability while avoiding excessive comments.

## General Principles

1. **Code as Documentation**: Write self-explanatory code rather than relying on comments to explain complex logic
2. **Necessity Principle**: Add comments only when necessary, avoid redundant comments
3. **Consistency Principle**: Maintain consistent comment style throughout the codebase

## Comment Types and Use Cases

### 1. File Header Comments

File header comments should be concise and only include the main functionality description.

```javascript
/**
 * Authentication controller
 * Handles login, registration, password reset and other auth functions
 */
```

### 2. Function/Method Comments

For API endpoints and key functions, use JSDoc style comments including description, parameters, and return values:

```javascript
/**
 * @desc Get user information
 * @route GET /api/users/:id
 * @access Private
 */
```

For internal utility functions:

```javascript
/**
 * Verify user token
 * @param {string} token - JWT token
 * @returns {Object|null} Decoded user data or null
 */
```

### 3. Code Block Comments

For complex logic, provide brief explanations using single-line comments:

```javascript
// execute queries in parallel for better performance
const [posts, count] = await Promise.all([...]);
```

### 4. Variables and Constants

Provide brief explanations for non-self-explanatory variables and important constants:

```javascript
// prevent more than 100 requests from same IP in 15 minutes
const RATE_LIMIT = 100;
```

## Comment Style Guidelines

1. **Language**: All comments should be in English
2. **Capitalization**: Start comments with lowercase letters
3. **Punctuation**: No period at the end of comments
4. **Spacing**: Add one space after `//`
5. **Alignment**: Comments in the same code block should be aligned

## When Not to Add Comments

1. Obvious code:
   ```javascript
   // Don't do this
   const user = new User(); // create user instance
   ```

2. Information that can be expressed through variable naming:
   ```javascript
   // Don't do this
   const d = 24 * 60 * 60 * 1000; // milliseconds in a day
   
   // Do this instead
   const ONE_DAY_MS = 24 * 60 * 60 * 1000;
   ```

3. Commented-out code blocks (should be deleted, not commented out)

## Comment Checklist

Before committing code, check:

1. Are comments necessary and provide valuable information?
2. Do they follow the specified style and format?
3. Are comments in sync with the code (avoid outdated comments)?
4. Have commented-out code blocks and debug comments been removed?

---

Following these guidelines will help maintain code readability while avoiding excessive comments, making the codebase clearer and more professional. 