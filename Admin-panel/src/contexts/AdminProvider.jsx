import React, { useState } from 'react';
import { AdminContext } from './admin-utils';
import { fetchMockData } from '../services/mockApi';
import { useAuth } from './auth-utils';

export function AdminProvider({ children }) {
  const [stats, setStats] = useState(null);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [media, setMedia] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isGuestMode } = useAuth();
  
  // 访客模式的临时数据存储
  const [guestData, setGuestData] = useState({
    stats: null,
    posts: [],
    categories: [],
    tags: [],
    media: [],
    settings: null
  });
  
  // 获取仪表盘数据
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const data = await fetchMockData('dashboard');
      
      // 根据是否为访客模式决定数据存储位置
      if (isGuestMode) {
        setGuestData(prev => ({ ...prev, stats: data.stats }));
      } else {
        setStats(data.stats);
      }
      return data;
    } catch (err) {
      setError('获取仪表盘数据失败');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 获取内容数据
  const fetchContentData = async () => {
    setLoading(true);
    try {
      const data = await fetchMockData('content');
      setPosts(data.posts || []);
      setCategories(data.categories || []);
      setTags(data.tags || []);
      return data;
    } catch (err) {
      setError('获取内容数据失败');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 获取媒体数据
  const fetchMediaData = async () => {
    setLoading(true);
    try {
      const data = await fetchMockData('media');
      setMedia(data.media || []);
      return data;
    } catch (err) {
      setError('获取媒体数据失败');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 获取系统设置
  const fetchSettings = async () => {
    setLoading(true);
    try {
      const data = await fetchMockData('settings');
      setSettings(data);
      return data;
    } catch (err) {
      setError('获取系统设置失败');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 保存系统设置
  const saveSettings = async (updatedSettings) => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (isGuestMode) {
        // 访客模式下只更新临时数据
        setGuestData(prev => ({ ...prev, settings: updatedSettings }));
        return { success: true, message: '设置已保存（访客模式：仅临时保存）' };
      } else {
        // 正常模式下更新真实数据
        setSettings(updatedSettings);
        return { success: true, message: '设置已保存' };
      }
    } catch (err) {
      setError('保存设置失败');
      console.error(err);
      return { success: false, message: '保存设置失败' };
    } finally {
      setLoading(false);
    }
  };

  // 提供当前数据（根据模式选择真实数据或访客数据）
  const currentStats = isGuestMode ? guestData.stats : stats;
  const currentPosts = isGuestMode ? guestData.posts : posts;
  const currentCategories = isGuestMode ? guestData.categories : categories;
  const currentTags = isGuestMode ? guestData.tags : tags;
  const currentMedia = isGuestMode ? guestData.media : media;
  const currentSettings = isGuestMode ? guestData.settings : settings;

  const value = {
    stats: currentStats,
    posts: currentPosts,
    categories: currentCategories,
    tags: currentTags,
    media: currentMedia,
    settings: currentSettings,
    loading,
    error,
    fetchDashboardData,
    fetchContentData,
    fetchMediaData,
    fetchSettings,
    saveSettings,
    isGuestMode
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}