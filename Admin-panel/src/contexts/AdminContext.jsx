import React, { useState } from "react";
import { AdminContext } from "./admin-utils";

function AdminProvider({ children }) {
  const [siteSettings, setSiteSettings] = useState({
    general: {
      siteTitle: '我的个人博客',
      tagline: '分享技术与生活',
      description: '这是一个关于技术、生活和思考的个人博客。',
      siteUrl: 'https://example.com',
      adminEmail: 'admin@example.com',
      timezone: 'Asia/Shanghai',
      dateFormat: 'YYYY-MM-DD',
      timeFormat: '24小时制',
      weekStartsOn: '星期一',
      language: 'zh-CN',
    },
    appearance: {
      theme: 'light',
      primaryColor: '#3b82f6',
      accentColor: '#10b981',
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSize: 'medium',
      enableDarkMode: true,
    },
  });

  const [siteStats, setSiteStats] = useState({
    totalPosts: 24,
    newPosts: 3,
    totalViews: 12453,
    viewsGrowth: 8.5,
    totalComments: 89,
    newComments: 12,
    conversionRate: 3.2,
    conversionChange: 0.8,
    popularPosts: [
      { title: "React 18 新特性解析", views: 1245 },
      { title: "使用 Tailwind CSS 构建现代界面", views: 986 },
      { title: "Next.js 13 应用路由详解", views: 1532 }
    ]
  });

  const updateSiteSettings = (section, newValues) => {
    setSiteSettings(prevSettings => ({
      ...prevSettings,
      [section]: {
        ...prevSettings[section],
        ...newValues
      }
    }));
  };

  const value = {
    siteSettings,
    updateSiteSettings,
    siteStats,
    setSiteStats
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export { AdminProvider };
