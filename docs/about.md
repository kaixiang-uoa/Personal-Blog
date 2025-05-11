# About页面管理方案

## 概述
将About页面内容集成到现有的Setting系统中，实现内容的动态管理和多语言支持。

## 实施计划

### 1. 后端准备工作 [已完成]
当前Setting模型已满足需求，无需修改。确保设置API正常工作：
- 使用`Setting.js`模型 (key-value存储)
- 利用`settingController.js`提供的CRUD操作
- 分组功能(`group`字段)设置为"social"（注意：没有"about"组，用"social"替代）

**步骤**:
- [x] 启动后端服务
- [x] 验证设置API可用
- [x] 创建初始化About设置的脚本
- [x] 成功保存About设置到数据库

**注意事项**:
- 由于Setting模型的约束，我们使用了"social"组而不是"about"组
- 使用了以"about."开头的键名来区分About页面的设置
- 为复杂数据如数组和对象使用了JSON字符串存储

### 2. 管理面板实现 [已完成]
在`admin-panel/app/(admin)/settings/page.tsx`添加About页面选项卡：

**步骤**:
- [x] 添加About表单Schema
- [x] 设置页面添加About选项卡
- [x] 创建表单组件
- [x] 实现表单提交功能

**实现详情**:
1. 添加了About相关的表单和状态
2. 更新了设置页面UI，添加了About标签页
3. 使用了`batchUpdate` API更新所有About设置
4. 表单支持多语言内容，使用独立字段如 `intro_zh`

**注意事项**:
- 设置数据以字符串形式展示，对于JSON内容需在前端显示时解析
- 使用了批量更新API以便一次性更新多个设置项

### 3. API服务集成 [已完成]
API调用已在`api-service.ts`中定义，使用现有的方法：
- `ApiService.settings.getAll()` - 获取所有设置
- `ApiService.settings.batchUpdate()` - 批量更新设置

### 4. 前端展示实现 [已完成]
修改`Front-end/src/app/[locale]/about/page.tsx`从API获取内容：

**步骤**:
- [x] 创建API路由获取设置数据
- [x] 修改About页面动态展示数据
- [x] 添加多语言支持
- [x] 添加加载状态

**实现详情**:
1. 创建了 `/api/settings` 路由，代理后端设置API
2. 实现了动态数据渲染，包括HTML内容和JSON数据
3. 根据当前语言环境选择合适的内容
4. 添加了错误处理和加载状态

**代码示例**:
```tsx
'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function AboutMe() {
  const params = useParams();
  const locale = params.locale as string || 'en';
  const [aboutData, setAboutData] = useState({...});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(response => {
        if (response.success && response.data) {
          const data = response.data;
          
          // 根据当前语言选择合适的内容
          const intro = locale === 'zh' && data['about.intro_zh'] 
            ? data['about.intro_zh'] 
            : data['about.intro'] || '';
            
          setAboutData({
            intro,
            contact: JSON.parse(data['about.contact'] || '{}'),
            // ...其他字段
          });
        }
        setLoading(false);
      });
  }, [locale]);

  // 渲染UI
}
```

### 5. 多语言支持 [已完成]
利用Setting模型的多语言支持：
- [x] 创建`about.intro_zh`键存储中文内容
- [x] 前端根据当前语言环境请求对应内容

**实现方式**:
1. 后端使用单独的键存储不同语言内容
2. 前端根据URL中的locale参数选择对应的内容
3. 默认使用英文内容，当有中文内容时优先显示

### 6. 测试计划
1. 创建管理员用户并登录管理面板
2. 在设置页面的About选项卡填写内容并保存
3. 访问前台About页面验证内容是否正确显示
4. 测试多语言切换功能

### 7. 注意事项
- 富文本内容需要进行XSS防护
- 确保图片上传功能与媒体库集成
- 考虑添加预览功能
- 为长文本内容提供Markdown支持
