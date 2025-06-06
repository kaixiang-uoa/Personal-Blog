'use client';

import { useSettings } from '@/contexts/SettingsContext';
import { useEffect } from 'react';

export function SEOHead() {
  const { getSetting } = useSettings();
  
  const siteName = getSetting('general.siteName', 'Modern Blog');
  const siteDescription = getSetting('general.siteDescription', 'A trendy blog for web development enthusiasts');
  const keywords = getSetting('general.metaKeywords', '');
  const favicon = getSetting('general.favicon', '/favicon.ico');
  
  useEffect(() => {
    // 更新网站标题
    document.title = siteName;
    
    // 更新描述标签
    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', siteDescription);
    } else {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.setAttribute('name', 'description');
      descriptionMeta.setAttribute('content', siteDescription);
      document.head.appendChild(descriptionMeta);
    }
    
    // 更新关键词标签
    if (keywords) {
      let keywordsMeta = document.querySelector('meta[name="keywords"]');
      if (keywordsMeta) {
        keywordsMeta.setAttribute('content', keywords);
      } else {
        keywordsMeta = document.createElement('meta');
        keywordsMeta.setAttribute('name', 'keywords');
        keywordsMeta.setAttribute('content', keywords);
        document.head.appendChild(keywordsMeta);
      }
    }
    
    // 更新favicon
    if (favicon) {
      let faviconLink = document.querySelector('link[rel="icon"]');
      if (faviconLink) {
        faviconLink.setAttribute('href', favicon);
      } else {
        faviconLink = document.createElement('link');
        faviconLink.setAttribute('rel', 'icon');
        faviconLink.setAttribute('href', favicon);
        document.head.appendChild(faviconLink);
      }
    }
  }, [siteName, siteDescription, keywords, favicon]);
  
  // 这个组件不渲染任何内容，只在客户端修改文档头部
  return null;
} 