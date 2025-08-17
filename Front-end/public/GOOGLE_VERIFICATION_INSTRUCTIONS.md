# Google Search Console 验证说明

## 📋 验证步骤

### 1. 获取验证文件

在 Google Search Console 中选择"HTML文件"验证方式后，会得到一个类似这样的文件：

```
google[random-string].html
```

### 2. 放置验证文件

将验证文件放在这个文件夹中：

```
Front-end/public/google[random-string].html
```

### 3. 部署到生产环境

```bash
git add Front-end/public/google[random-string].html
git commit -m "add: Google Search Console verification file"
git push origin main
```

### 4. 验证访问

确保文件可以通过以下URL访问：

```
https://www.kxzhang.online/google[random-string].html
```

### 5. 在GSC中点击"验证"

返回 Google Search Console，点击"验证"按钮。

## 🔧 其他验证方式

### HTML标签验证

如果选择HTML标签验证，需要在 `Front-end/src/app/layout.tsx` 中添加meta标签：

```html
<meta name="google-site-verification" content="your-verification-code" />
```

### DNS验证

如果你有域名DNS控制权，可以添加TXT记录。

## 📊 验证成功后的操作

1. **提交Sitemap**
   - URL: `https://www.kxzhang.online/sitemap.xml`
2. **检查索引状态**
   - 查看"覆盖率"报告
3. **监控搜索性能**
   - 查看"效果"报告

## 🎯 重要提醒

- 验证文件必须保持在线状态
- 不要删除验证文件
- 定期检查GSC报告和建议
