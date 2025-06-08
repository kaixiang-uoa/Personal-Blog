# JSDoc 注释规范

## 简介

JSDoc 是一种用于 JavaScript 代码文档的标记语言，通过在代码中添加特定格式的注释，开发者可以生成 API 文档，同时获得更好的编辑器支持和类型提示。本规范定义了项目中使用 JSDoc 的标准和最佳实践。

## 目标

1. 提高代码可读性和可维护性
2. 为团队成员提供清晰的组件和函数文档
3. 增强 TypeScript 的类型检查能力
4. 支持自动生成 API 文档

## 注释规范

### 组件注释

所有的 React 组件应该包含以下注释：

```tsx
/**
 * 组件名称 - 简短描述
 * 更详细的组件功能说明，可以跨多行
 * 
 * @example
 * ```tsx
 * <ComponentName prop1="value" prop2={42} />
 * ```
 */
export function ComponentName(props: ComponentProps) {
  // 组件实现
}
```

### Props 接口注释

组件的 Props 类型定义应该有详细注释：

```tsx
/**
 * ComponentName 的 props
 */
interface ComponentProps {
  /**
   * 第一个属性的描述
   * 可以提供更多详细信息
   * @default "默认值"（如果有）
   */
  prop1: string;

  /**
   * 第二个属性的描述
   * @required
   */
  prop2: number;

  /**
   * 可选属性的描述
   */
  optionalProp?: boolean;

  /**
   * 回调函数的描述
   * @param value - 参数描述
   * @returns 返回值描述
   */
  onSomething?: (value: string) => void;
}
```

### 函数注释

所有的工具函数和 Hooks 应该包含以下注释：

```tsx
/**
 * 函数名 - 简短描述
 * 更详细的功能说明
 * 
 * @param param1 - 第一个参数的描述
 * @param param2 - 第二个参数的描述
 * @returns 返回值的描述
 * 
 * @example
 * ```ts
 * const result = functionName('input', 42);
 * ```
 */
function functionName(param1: string, param2: number): ReturnType {
  // 函数实现
}
```

### Hooks 注释

自定义 Hooks 应该特别注明其用途和依赖项：

```tsx
/**
 * 自定义 Hook 名称 - 简短描述
 * 详细说明这个 Hook 的作用和使用场景
 * 
 * @param param - 参数描述
 * @returns 
 *   - value: 返回值的第一部分描述
 *   - setValue: 返回值的第二部分描述
 * 
 * @example
 * ```tsx
 * const { value, setValue } = useCustomHook('initialValue');
 * ```
 * 
 * @dependency 列出主要依赖项和副作用
 */
function useCustomHook<T>(initialValue: T) {
  // Hook 实现
}
```

### 配置文件注释

配置文件需要详细的顶级注释和内部配置项说明：

```ts
/**
 * 配置文件名称
 * 详细描述此配置文件的用途
 * 
 * @see 引用相关文档的链接
 */

export default {
  // 主要配置部分的简要说明
  mainConfig: {
    // 具体配置项的详细说明
    option1: 'value',
    // 另一个配置项的说明
    option2: true,
  },
};
```

### 复杂逻辑行内注释

对于复杂的业务逻辑，应该添加行内注释：

```tsx
// 这里不使用 JSDoc 格式，而是简单的行注释
// 说明这段代码的目的和处理逻辑
if (condition && anotherCondition) {
  // 特殊情况处理：当两个条件都满足时，执行特定逻辑
  doSomething();
}
```

## 常用 JSDoc 标签

| 标签 | 描述 | 使用场景 |
|------|------|---------|
| `@param` | 描述函数参数 | 函数、方法、Hook |
| `@returns` | 描述返回值 | 函数、方法、Hook |
| `@example` | 提供使用示例 | 所有公共 API |
| `@default` | 描述默认值 | Props、配置项 |
| `@required` | 标记必须项 | 必须的 Props |
| `@deprecated` | 标记已废弃 | 废弃的函数或组件 |
| `@see` | 引用相关文档 | 复杂功能的补充说明 |
| `@todo` | 标记待办项 | 未完成的功能 |

## 示例

### 组件示例

```tsx
/**
 * Button - 可自定义样式的按钮组件
 * 支持多种预设风格和尺寸，可用于表单提交、操作触发等场景
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   提交
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
  // 组件实现
}
```

### Hook 示例

```tsx
/**
 * useLocalStorage - 将状态持久化到localStorage的Hook
 * 提供类似useState的API，但会自动将状态同步到localStorage
 *
 * @param key - localStorage存储的键名
 * @param initialValue - 初始值，当localStorage中不存在对应值时使用
 * @returns
 *   - value: 当前存储的值
 *   - setValue: 更新值的函数，会同时更新状态和localStorage
 *
 * @example
 * ```tsx
 * const [theme, setTheme] = useLocalStorage('theme', 'light');
 * // 更改主题并持久化
 * setTheme('dark');
 * ```
 *
 * @dependency 依赖window.localStorage API
 */
function useLocalStorage<T>(key: string, initialValue: T) {
  // Hook实现
}
```

### 工具函数示例

```tsx
/**
 * formatDate - 格式化日期为指定格式的字符串
 * 支持多种常见日期格式，默认使用本地化显示
 *
 * @param date - 要格式化的日期对象或时间戳
 * @param format - 格式化模板，默认为'YYYY-MM-DD'
 * @param locale - 地区设置，默认使用浏览器语言
 * @returns 格式化后的日期字符串
 *
 * @example
 * ```ts
 * // 返回 '2023-05-15'
 * formatDate(new Date(2023, 4, 15));
 * // 返回 '15/05/2023'
 * formatDate(new Date(2023, 4, 15), 'DD/MM/YYYY');
 * ```
 */
function formatDate(
  date: Date | number,
  format: string = 'YYYY-MM-DD',
  locale?: string
): string {
  // 函数实现
}
```

## 编辑器配置

为确保团队成员能够一致地编写JSDoc注释，建议在项目中添加以下配置：

### VS Code设置

在项目的`.vscode/settings.json`中添加：

```json
{
  "editor.formatOnSave": true,
  "javascript.format.enable": true,
  "typescript.format.enable": true,
  "javascript.suggestionActions.enabled": true,
  "typescript.suggestionActions.enabled": true,
  "javascript.format.semicolons": "insert",
  "typescript.format.semicolons": "insert"
}
```

### ESLint规则

在`.eslintrc.js`中添加JSDoc相关规则：

```js
module.exports = {
  // 其他配置...
  extends: [
    // 其他扩展...
    "plugin:jsdoc/recommended"
  ],
  plugins: [
    // 其他插件...
    "jsdoc"
  ],
  rules: {
    // 其他规则...
    "jsdoc/require-description": 1,
    "jsdoc/require-param-description": 1,
    "jsdoc/require-returns-description": 1
  }
};
```

## 自动生成文档

可以使用以下工具自动从JSDoc注释生成API文档：

- **TypeDoc**: 适用于TypeScript项目，可以从类型定义和JSDoc注释生成文档
- **Documentation.js**: 简单易用的JSDoc文档生成器
- **JSDoc**: 原始的JSDoc工具，适用于JavaScript项目

## 结论

遵循本规范编写JSDoc注释，将显著提高代码的可读性和可维护性，同时为开发者提供更好的类型提示和自动完成支持。随着项目的发展，这些文档将成为新开发者快速了解代码的宝贵资源。 