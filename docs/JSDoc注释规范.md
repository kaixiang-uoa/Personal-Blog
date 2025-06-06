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
 * 提供与useState类似的API，但会自动保存到localStorage并在组件重新加载时恢复
 *
 * @param key - localStorage中使用的键名
 * @param initialValue - 初始值，当localStorage中不存在数据时使用
 * @returns 
 *   - value: 当前状态值
 *   - setValue: 更新状态的函数，同时会更新localStorage
 * 
 * @example
 * ```tsx
 * const [theme, setTheme] = useLocalStorage('theme', 'light');
 * // 改变主题时，会自动保存到localStorage
 * setTheme('dark');
 * ```
 */
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Hook 实现
}
```

## 代码审查检查点

在代码审查过程中，审查者应检查以下几点：

1. 所有公共组件、函数和钩子是否有适当的 JSDoc 注释
2. Props 定义是否包含每个属性的注释
3. 复杂的业务逻辑是否有行内注释解释
4. 是否使用了适当的 JSDoc 标签
5. 注释是否与实际代码匹配（特别是在代码更改后）

## 工具集成

### ESLint 配置

我们使用 ESLint 来确保注释规范的一致性：

```json
{
  "plugins": ["eslint-plugin-jsdoc"],
  "rules": {
    "jsdoc/require-jsdoc": ["warn", {
      "publicOnly": true,
      "require": {
        "FunctionDeclaration": true,
        "MethodDefinition": true,
        "ClassDeclaration": true,
        "ArrowFunctionExpression": true,
        "FunctionExpression": true
      }
    }],
    "jsdoc/require-description": "warn",
    "jsdoc/require-param-description": "warn",
    "jsdoc/require-returns-description": "warn"
  }
}
```

### 自动文档生成

使用 TypeDoc 或 JSDoc 工具生成项目文档：

```bash
# 安装TypeDoc
npm install typedoc --save-dev

# 生成文档
npx typedoc src/index.ts
```

## 总结

良好的注释不仅能提高代码的可读性，还能为新团队成员快速上手项目提供帮助。这些规范应作为团队共同遵守的标准，而不应视为可选项。始终记住，代码可能比预期存在更长时间，未来的你（或其他开发者）会感谢现在花时间写注释的自己。 