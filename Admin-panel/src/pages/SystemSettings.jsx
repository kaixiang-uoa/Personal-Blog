import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
// 引入模拟API
import { fetchMockData } from '../services/mockApi';

const SystemSettings = () => {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState(null);
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    // 使用模拟API获取系统设置数据
    // TODO: 后期替换为真实API调用
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const data = await fetchMockData('settings');
        setSettings(data);
      } catch (error) {
        console.error('获取系统设置失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSaveSettings = () => {
    // TODO: 后期替换为真实API调用，保存设置
    alert('设置已保存（模拟）');
    console.log('保存的设置:', settings);
  };

  // 处理设置变更
  const handleSettingChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  if (loading || !settings) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">系统设置</h1>
        <div className="bg-muted/50 p-8 rounded-lg flex items-center justify-center">
          <p>加载设置中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">系统设置</h1>
        <Button onClick={handleSaveSettings}>保存设置</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-6 mb-6">
          <TabsTrigger value="general">常规</TabsTrigger>
          <TabsTrigger value="content">内容</TabsTrigger>
          <TabsTrigger value="users">用户</TabsTrigger>
          <TabsTrigger value="media">媒体</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="security">安全</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>常规设置</CardTitle>
              <CardDescription>配置网站的基本信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">网站名称</Label>
                  <Input 
                    id="siteName" 
                    value={settings.general.siteName} 
                    onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteUrl">网站地址</Label>
                  <Input 
                    id="siteUrl" 
                    value={settings.general.siteUrl} 
                    onChange={(e) => handleSettingChange('general', 'siteUrl', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminEmail">管理员邮箱</Label>
                  <Input 
                    id="adminEmail" 
                    value={settings.general.adminEmail} 
                    onChange={(e) => handleSettingChange('general', 'adminEmail', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">时区</Label>
                  <Select 
                    value={settings.general.timezone}
                    onValueChange={(value) => handleSettingChange('general', 'timezone', value)}
                  >
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="选择时区" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Shanghai">中国标准时间 (UTC+8)</SelectItem>
                      <SelectItem value="America/New_York">美国东部时间 (UTC-5)</SelectItem>
                      <SelectItem value="Europe/London">格林威治标准时间 (UTC+0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">网站语言</Label>
                  <Select 
                    value={settings.general.language}
                    onValueChange={(value) => handleSettingChange('general', 'language', value)}
                  >
                    <SelectTrigger id="language">
                      <SelectValue placeholder="选择语言" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zh-CN">简体中文</SelectItem>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="ja-JP">日本語</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">日期格式</Label>
                  <Select 
                    value={settings.general.dateFormat}
                    onValueChange={(value) => handleSettingChange('general', 'dateFormat', value)}
                  >
                    <SelectTrigger id="dateFormat">
                      <SelectValue placeholder="选择日期格式" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">网站描述</Label>
                <Input 
                  id="siteDescription" 
                  value={settings.general.siteDescription} 
                  onChange={(e) => handleSettingChange('general', 'siteDescription', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>用户设置</CardTitle>
              <CardDescription>配置用户注册和权限</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="allowRegistration" className="block mb-1">允许用户注册</Label>
                  <p className="text-sm text-muted-foreground">开启后，访客可以自行注册账号</p>
                </div>
                <Switch 
                  id="allowRegistration" 
                  checked={settings.users.allowRegistration}
                  onCheckedChange={(checked) => handleSettingChange('users', 'allowRegistration', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="requireEmailVerification" className="block mb-1">要求邮箱验证</Label>
                  <p className="text-sm text-muted-foreground">用户注册后需要验证邮箱才能登录</p>
                </div>
                <Switch 
                  id="requireEmailVerification" 
                  checked={settings.users.requireEmailVerification}
                  onCheckedChange={(checked) => handleSettingChange('users', 'requireEmailVerification', checked)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="defaultUserRole">默认用户角色</Label>
                <Select 
                  value={settings.users.defaultUserRole}
                  onValueChange={(value) => handleSettingChange('users', 'defaultUserRole', value)}
                >
                  <SelectTrigger id="defaultUserRole">
                    <SelectValue placeholder="选择默认角色" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="subscriber">订阅者</SelectItem>
                    <SelectItem value="contributor">贡献者</SelectItem>
                    <SelectItem value="author">作者</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 其他标签页内容类似，根据settings对象的结构添加 */}
        {/* 这里省略了其他标签页的内容，实际开发中需要添加 */}
      </Tabs>
    </div>
  );
};

export default SystemSettings;