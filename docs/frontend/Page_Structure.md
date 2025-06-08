# 页面结构指南

## 页面组织

当前应用使用Next.js的App Router结构组织页面，遵循以下约定：

```
src/app/
├── [locale]/            # 多语言路由
│   ├── page.tsx         # 首页
│   ├── about/           # 关于页面
│   │   └── page.tsx
│   ├── articles/        # 文章列表
│   │   └── page.tsx
│   ├── article/         # 文章详情
│   │   └── [slug]/
│   │       └── page.tsx
│   └── contact/         # 联系页面
│       └── page.tsx
└── api/                 # API路由
    ├── articles/
    │   └── route.ts
    └── settings/
        └── route.ts
```

## About页面实现方案

### 概述
About页面内容集成到Setting系统中，实现内容的动态管理和多语言支持。

### 后端实现

当前Setting模型已满足需求，无需修改。使用设置API实现内容管理：

- 使用`Setting.js`模型 (key-value存储)
- 利用`settingController.js`提供的CRUD操作
- 分组功能(`group`字段)设置为"social"
- 使用"about."前缀区分About页面设置

**数据结构**:
```javascript
// About页面相关设置
{
  "about.intro": "<p>English introduction...</p>",
  "about.intro_zh": "<p>中文介绍...</p>",
  "about.contact": JSON.stringify({
    email: "example@email.com",
    twitter: "@handle",
    github: "username"
  }),
  "about.skills": JSON.stringify([
    { name: "JavaScript", level: 90 },
    { name: "React", level: 85 },
    { name: "Node.js", level: 80 }
  ])
}
```

### 管理面板实现

在`admin-panel/app/(admin)/settings/page.tsx`添加About页面选项卡：

1. **表单Schema**:
```typescript
const aboutFormSchema = z.object({
  intro: z.string().optional(),
  intro_zh: z.string().optional(),
  contact: z.string().optional(),
  skills: z.string().optional(),
  education: z.string().optional()
});
```

2. **表单组件**:
```tsx
<Tabs defaultValue="general">
  <TabsList>
    <TabsTrigger value="general">General</TabsTrigger>
    <TabsTrigger value="posts">Posts</TabsTrigger>
    <TabsTrigger value="appearance">Appearance</TabsTrigger>
    <TabsTrigger value="about">About</TabsTrigger> {/* 新增 */}
  </TabsList>
  
  {/* 其他标签页内容 */}
  
  <TabsContent value="about">
    <AboutSettingsForm 
      settings={settings} 
      onSave={handleSave} 
    />
  </TabsContent>
</Tabs>
```

3. **批量更新实现**:
```typescript
// 收集所有About设置
const aboutSettings = {
  "about.intro": formData.intro,
  "about.intro_zh": formData.intro_zh,
  "about.contact": formData.contact,
  "about.skills": formData.skills,
  "about.education": formData.education
};

// 使用批量更新API
await ApiService.settings.batchUpdate(aboutSettings);
```

### 前端展示实现

`Front-end/src/app/[locale]/about/page.tsx`从API获取内容：

```tsx
'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function AboutMe() {
  const params = useParams();
  const locale = params.locale as string || 'en';
  const [aboutData, setAboutData] = useState({
    intro: '',
    contact: {},
    skills: [],
    education: []
  });
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
            skills: JSON.parse(data['about.skills'] || '[]'),
            education: JSON.parse(data['about.education'] || '[]')
          });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching about data:', err);
        setLoading(false);
      });
  }, [locale]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="about-container">
      <section className="intro">
        <div dangerouslySetInnerHTML={{ __html: aboutData.intro }} />
      </section>
      
      {aboutData.skills.length > 0 && (
        <section className="skills">
          <h2>Skills</h2>
          <div className="skills-grid">
            {aboutData.skills.map((skill, index) => (
              <div key={index} className="skill-item">
                <span className="skill-name">{skill.name}</span>
                <div className="skill-bar">
                  <div 
                    className="skill-level" 
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* 教育经历、联系方式等其他部分 */}
    </div>
  );
}
```

### 多语言支持

利用Setting模型的多语言支持，为主要内容字段提供多语言版本：

1. 后端使用单独的键存储不同语言内容（如`about.intro_zh`存储中文）
2. 前端根据URL中的locale参数选择对应的内容
3. 默认使用英文内容，当有对应语言内容时优先显示

### 最佳实践

1. **安全注意事项**:
   - 使用HTML净化库处理富文本内容，防止XSS攻击
   - 使用验证函数确保JSON数据格式正确

2. **性能优化**:
   - 将所有about设置缓存在前端Context中
   - 使用SWR或React Query进行数据获取和缓存

3. **扩展建议**:
   - 添加预览功能
   - 为长文本内容提供Markdown支持
   - 添加版本历史记录功能
