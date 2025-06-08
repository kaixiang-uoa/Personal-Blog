# Code Comment Migration Guide

This guide outlines the process for migrating all code comments in our project from Chinese to English. This change aims to improve code accessibility, collaboration, and maintainability across our development team.

## Why English Comments?

1. **International Collaboration**: Makes the codebase accessible to developers who don't read Chinese
2. **Industry Standard**: Aligns with international development practices
3. **Tool Compatibility**: Better compatibility with development tools and documentation generators
4. **Maintainability**: Ensures consistent comment style throughout the codebase

## Migration Process

### Step 1: Run the Automated Translation Tool

We've created a tool to assist with the initial translation process:

```bash
npm run translate:comments
```

This will:
- Scan all JavaScript files in the `src` directory
- Identify Chinese comments
- Attempt to translate them to English
- Mark any incomplete translations with `[INCOMPLETE TRANSLATION]`

### Step 2: Manual Review and Correction

After running the automated tool:

1. Search for `[INCOMPLETE TRANSLATION]` in the codebase
2. Review each translation for accuracy and completeness
3. Fix translations ensuring they follow our [comment guidelines](./Code_Comment_Guidelines.md)
4. Pay special attention to technical terms and domain-specific language

### Step 3: Apply Comment Style Guidelines

Ensure all comments follow our style guidelines:

1. Start with lowercase letters (except for proper nouns)
2. Omit periods at the end of comments
3. Use present tense verbs (e.g., "get user data" not "gets user data")
4. Add space after comment markers (`// ` and `* `)
5. Keep comments concise and focused

### Step 4: Validate with the Comment Linter

Use our comment linter to validate your changes:

```bash
npm run lint:comments
```

Fix any issues flagged by the linter.

## Reference Example

### Before:

```javascript
/**
 * User authentication controller
 * Handles login, registration and password reset functionality
 */

// validate user credentials
function authenticate(email, password) {
  // check if user exists
  const user = findUserByEmail(email);
  
  // verify password hash
  return comparePassword(password, user.passwordHash);
}
```

### After:

```javascript
/**
 * Authentication controller
 * Handles login, registration and password reset functionality
 */

// validate user credentials
function authenticate(email, password) {
  // check if user exists
  const user = findUserByEmail(email);
  
  // verify password hash
  return comparePassword(password, user.passwordHash);
}
```

## File-by-File Progress Tracking

To track migration progress, we recommend adding a comment at the top of each file once its comments have been fully migrated:

```javascript
/**
 * Authentication controller
 * Handles login, registration and password reset functionality
 * 
 * @comment-migration-status complete
 */
```

## Common Translations

For consistency, use these standard translations for common terms:

| Chinese | English |
|---------|---------|
| 控制器 | controller |
| 中间件 | middleware |
| 路由 | router |
| 模型 | model |
| 验证 | validate/validation |
| 认证 | authentication |
| 授权 | authorization |
| 用户 | user |
| 文章 | post/article |
| 分类 | category |
| 标签 | tag |
| 评论 | comment |
| 设置 | settings |
| 查询 | query |
| 创建 | create |
| 更新 | update |
| 删除 | delete |
| 获取 | get/retrieve |
| 处理 | process/handle |
| 配置 | configure/configuration |
| 错误处理 | error handling |
| 请求 | request |
| 响应 | response |
| 缓存 | cache |
| 数据库 | database |
| 分页 | pagination |
| 安全 | security |
| 权限 | permission |

## Timeline

- **Phase 1**: Core models and utilities (1 week)
- **Phase 2**: Controllers and middleware (1 week)
- **Phase 3**: Routes and tests (1 week)
- **Phase 4**: Documentation and scripts (1 week)

## Support

If you have questions about the migration process, please contact the architecture team or refer to our code comment guidelines document. 