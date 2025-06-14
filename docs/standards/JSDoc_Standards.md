# Code Documentation and Comment Standards

## Introduction

This document defines the standards and best practices for code documentation and comments in the project, including JSDoc comment standards and general code comment guidelines. By following these standards, we can improve code readability, maintainability, and provide clear documentation for team members.

## Goals

1. Improve code readability and maintainability
2. Provide clear component and function documentation for team members
3. Enhance TypeScript type checking capabilities
4. Support automatic API documentation generation
5. Maintain consistency across the codebase

## Basic Principles

1. **Code as Documentation**: Prioritize writing self-explanatory code over relying on comments to explain complex logic
2. **Necessity Principle**: Add comments only when necessary, avoid redundant comments
3. **Consistency Principle**: Maintain consistent comment style throughout the codebase
4. **Timely Updates**: Ensure comments stay in sync with code, avoid outdated comments

## Comment Types and Usage Scenarios

### 1. File Header Comments

File header comments should be concise, containing only the main functionality description:

```javascript
/**
 * Authentication controller
 * Handles login, registration, password reset and other auth functions
 */
```

### 2. Component Comments

All React components should include the following comments:

```tsx
/**
 * Component Name - Brief description
 * More detailed component functionality description, can span multiple lines
 * 
 * @example
 * ```tsx
 * <ComponentName prop1="value" prop2={42} />
 * ```
 */
export function ComponentName(props: ComponentProps) {
  // Component implementation
}
```

### 3. Props Interface Comments

Component Props type definitions should have detailed comments:

```tsx
/**
 * Props for ComponentName
 */
interface ComponentProps {
  /**
   * Description of the first property
   * Can provide more detailed information
   * @default "default value" (if any)
   */
  prop1: string;

  /**
   * Description of the second property
   * @required
   */
  prop2: number;

  /**
   * Description of optional property
   */
  optionalProp?: boolean;

  /**
   * Description of callback function
   * @param value - Parameter description
   * @returns Return value description
   */
  onSomething?: (value: string) => void;
}
```

### 4. Function Comments

All utility functions and Hooks should include the following comments:

```tsx
/**
 * Function name - Brief description
 * More detailed functionality description
 * 
 * @param param1 - Description of first parameter
 * @param param2 - Description of second parameter
 * @returns Description of return value
 * 
 * @example
 * ```ts
 * const result = functionName('input', 42);
 * ```
 */
function functionName(param1: string, param2: number): ReturnType {
  // Function implementation
}
```

### 5. Hooks Comments

Custom Hooks should specifically note their purpose and dependencies:

```tsx
/**
 * Custom Hook name - Brief description
 * Detailed explanation of this Hook's purpose and usage scenarios
 * 
 * @param param - Parameter description
 * @returns 
 *   - value: Description of first return value
 *   - setValue: Description of second return value
 * 
 * @example
 * ```tsx
 * const { value, setValue } = useCustomHook('initialValue');
 * ```
 * 
 * @dependency List main dependencies and side effects
 */
function useCustomHook<T>(initialValue: T) {
  // Hook implementation
}
```

### 6. Code Block Comments

For complex business logic, inline comments should be added:

```tsx
// Here we don't use JSDoc format, but simple line comments
// Explain the purpose and processing logic of this code
if (condition && anotherCondition) {
  // Special case handling: when both conditions are met, execute specific logic
  doSomething();
}
```

### 7. Variable and Constant Comments

Provide brief explanations for non-self-explanatory variables and important constants:

```javascript
// prevent more than 100 requests from same IP in 15 minutes
const RATE_LIMIT = 100;
```

## Comment Style Guide

1. **Language**: All comments should be in English
2. **Capitalization**: Comments should start with lowercase letters
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

## Common JSDoc Tags

| Tag | Description | Usage Scenarios |
|------|------|---------|
| `@param` | Describe function parameters | Functions, methods, Hooks |
| `@returns` | Describe return value | Functions, methods, Hooks |
| `@example` | Provide usage examples | All public APIs |
| `@default` | Describe default value | Props, configuration items |
| `@required` | Mark required items | Required Props |
| `@deprecated` | Mark deprecated items | Deprecated functions or components |
| `@see` | Reference related documentation | Supplementary explanation for complex features |
| `@todo` | Mark todo items | Unfinished features |

## Comment Checklist

Before submitting code, check:

1. Are comments necessary and provide valuable information?
2. Do comments follow the specified style and format?
3. Are comments in sync with code (avoid outdated comments)?
4. Have commented-out code blocks and debug comments been removed?

## Examples

### Component Example

```tsx
/**
 * Button - Customizable button component
 * Supports multiple preset styles and sizes, can be used for form submission, action triggering, etc.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Submit
 * </Button>
 * ```
 */
export function Button({ 
  children, 
  variant = 'default',
  size = 'md',
  disabled = false,
  onClick
}: ButtonProps) {
  // Component implementation
}
```

### Hook Example

```tsx
/**
 * useLocalStorage - Hook for persisting state to localStorage
 * Provides a useState-like API but automatically syncs state to localStorage
 *
 * @param key - localStorage storage key
 * @param initialValue - Initial value, used when no corresponding value exists in localStorage
 * @returns
 *   - value: Currently stored value
 *   - setValue: Function to update value, updates both state and localStorage
 *
 * @example
 * ```tsx
 * const [value, setValue] = useLocalStorage('key', 'initial');
 * ```
 */
function useLocalStorage<T>(key: string, initialValue: T) {
  // Hook implementation
}
```

### Tool Function Example

```tsx
/**
 * formatDate - Format date to specified string format
 * Supports multiple common date formats, default uses localized display
 *
 * @param date - Date object or timestamp to format
 * @param format - Format template, default 'YYYY-MM-DD'
 * @param locale - Region setting, default uses browser language
 * @returns Formatted date string
 *
 * @example
 * ```ts
 * // Returns '2023-05-15'
 * formatDate(new Date(2023, 4, 15));
 * // Returns '15/05/2023'
 * formatDate(new Date(2023, 4, 15), 'DD/MM/YYYY');
 * ```
 */
function formatDate(
  date: Date | number,
  format: string = 'YYYY-MM-DD',
  locale?: string
): string {
  // Function implementation
}
```

---

Following these standards will help maintain code readability while avoiding excessive comments, making the codebase clearer and more professional. 