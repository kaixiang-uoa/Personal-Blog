"use client"

import { useState } from "react"
import { Save, Moon, Sun, Users, Bell, Shield, Globe, Key } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    general: {
      siteName: "个人用户管理系统",
      description: "管理您的内容、用户和网站设置",
      language: "zh-CN",
      timezone: "Asia/Shanghai",
      isPublic: true,
    },
    appearance: {
      theme: "light",
      primaryColor: "#3b82f6",
      fontSize: "medium",
    },
    notifications: {
      emailNotifications: true,
      commentNotifications: true,
      marketingEmails: false,
    },
    security: {
      twoFactorAuth: false,
      passwordExpiry: "never",
      sessionTimeout: "2_hours",
    },
  })

  // 当前设置标签页
  const [activeTab, setActiveTab] = useState("general")

  // 修改设置
  const handleSettingChange = (section, key, value) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [key]: value,
      },
    })
  }

  // 保存设置
  const handleSaveSettings = () => {
    // 在实际应用中，这里会发送API请求保存设置
    alert("设置已保存！")
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* 侧边栏 */}
      <div className="lg:col-span-1 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">设置</h3>
        </div>
        <nav className="p-2">
          <button
            className={`w-full flex items-center p-2 rounded-md mb-1 ${activeTab === "general" ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100 text-gray-700"}`}
            onClick={() => setActiveTab("general")}
          >
            <Globe className="mr-2 h-4 w-4" />
            <span>基本设置</span>
          </button>
          <button
            className={`w-full flex items-center p-2 rounded-md mb-1 ${activeTab === "appearance" ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100 text-gray-700"}`}
            onClick={() => setActiveTab("appearance")}
          >
            <Sun className="mr-2 h-4 w-4" />
            <span>外观</span>
          </button>
          <button
            className={`w-full flex items-center p-2 rounded-md mb-1 ${activeTab === "notifications" ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100 text-gray-700"}`}
            onClick={() => setActiveTab("notifications")}
          >
            <Bell className="mr-2 h-4 w-4" />
            <span>通知</span>
          </button>
          <button
            className={`w-full flex items-center p-2 rounded-md mb-1 ${activeTab === "security" ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100 text-gray-700"}`}
            onClick={() => setActiveTab("security")}
          >
            <Shield className="mr-2 h-4 w-4" />
            <span>安全</span>
          </button>
          <button
            className={`w-full flex items-center p-2 rounded-md mb-1 ${activeTab === "profile" ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100 text-gray-700"}`}
            onClick={() => setActiveTab("profile")}
          >
            <Users className="mr-2 h-4 w-4" />
            <span>个人资料</span>
          </button>
        </nav>
      </div>

      {/* 设置内容 */}
      <div className="lg:col-span-3 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {activeTab === "general" && "基本设置"}
            {activeTab === "appearance" && "外观设置"}
            {activeTab === "notifications" && "通知设置"}
            {activeTab === "security" && "安全设置"}
            {activeTab === "profile" && "个人资料"}
          </h3>
          <button
            className="flex items-center px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium"
            onClick={handleSaveSettings}
          >
            <Save className="mr-2 h-4 w-4" />
            保存设置
          </button>
        </div>

        <div className="p-4">
          {/* 基本设置 */}
          {activeTab === "general" && (
            <div className="space-y-4">
              <div>
                <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">
                  站点名称
                </label>
                <input
                  type="text"
                  id="siteName"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={settings.general.siteName}
                  onChange={(e) => handleSettingChange("general", "siteName", e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  站点描述
                </label>
                <textarea
                  id="description"
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={settings.general.description}
                  onChange={(e) => handleSettingChange("general", "description", e.target.value)}
                ></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                    语言
                  </label>
                  <select
                    id="language"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={settings.general.language}
                    onChange={(e) => handleSettingChange("general", "language", e.target.value)}
                  >
                    <option value="zh-CN">简体中文</option>
                    <option value="en-US">English (US)</option>
                    <option value="ja-JP">日本語</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
                    时区
                  </label>
                  <select
                    id="timezone"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={settings.general.timezone}
                    onChange={(e) => handleSettingChange("general", "timezone", e.target.value)}
                  >
                    <option value="Asia/Shanghai">中国标准时间 (UTC+8)</option>
                    <option value="America/New_York">美国东部时间 (UTC-5)</option>
                    <option value="Europe/London">格林威治标准时间 (UTC+0)</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="isPublic"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                  checked={settings.general.isPublic}
                  onChange={(e) => handleSettingChange("general", "isPublic", e.target.checked)}
                />
                <label htmlFor="isPublic" className="text-sm text-gray-700">
                  设置网站为公开
                </label>
              </div>
            </div>
          )}

          {/* 外观设置 */}
          {activeTab === "appearance" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">主题</label>
                <div className="flex space-x-4">
                  <div
                    className={`flex flex-col items-center p-4 border rounded-md cursor-pointer ${
                      settings.appearance.theme === "light" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                    }`}
                  >
                    <Sun className="h-8 w-8 text-gray-700 mb-2" />
                    <span className="text-sm">浅色主题</span>
                    <button
                      className="mt-2 text-xs px-2 py-1 bg-blue-600 text-white rounded"
                      onClick={() => handleSettingChange("appearance", "theme", "light")}
                    >
                      选择
                    </button>
                  </div>
                  <div
                    className={`flex flex-col items-center p-4 border rounded-md cursor-pointer ${
                      settings.appearance.theme === "dark" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                    }`}
                  >
                    <Moon className="h-8 w-8 text-gray-700 mb-2" />
                    <span className="text-sm">深色主题</span>
                    <button
                      className="mt-2 text-xs px-2 py-1 bg-blue-600 text-white rounded"
                      onClick={() => handleSettingChange("appearance", "theme", "dark")}
                    >
                      选择
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700 mb-1">
                  主题色
                </label>
                <div className="flex items-center">
                  <input
                    type="color"
                    id="primaryColor"
                    className="p-1 border border-gray-300 rounded-md mr-2 h-8 w-16"
                    value={settings.appearance.primaryColor}
                    onChange={(e) => handleSettingChange("appearance", "primaryColor", e.target.value)}
                  />
                  <span className="text-sm text-gray-500">{settings.appearance.primaryColor}</span>
                </div>
              </div>
              <div>
                <label htmlFor="fontSize" className="block text-sm font-medium text-gray-700 mb-1">
                  字体大小
                </label>
                <select
                  id="fontSize"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={settings.appearance.fontSize}
                  onChange={(e) => handleSettingChange("appearance", "fontSize", e.target.value)}
                >
                  <option value="small">小</option>
                  <option value="medium">中</option>
                  <option value="large">大</option>
                </select>
              </div>
            </div>
          )}

          {/* 通知设置 */}
          {activeTab === "notifications" && (
            <div className="space-y-4">
              <div className="flex items-center py-3 border-b border-gray-100">
                <input
                  type="checkbox"
                  id="emailNotifications"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={settings.notifications.emailNotifications}
                  onChange={(e) => handleSettingChange("notifications", "emailNotifications", e.target.checked)}
                />
                <div className="ml-3">
                  <label htmlFor="emailNotifications" className="text-sm font-medium text-gray-700">
                    电子邮件通知
                  </label>
                  <p className="text-xs text-gray-500">当有重要更新时通过电子邮件通知您</p>
                </div>
              </div>
              <div className="flex items-center py-3 border-b border-gray-100">
                <input
                  type="checkbox"
                  id="commentNotifications"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={settings.notifications.commentNotifications}
                  onChange={(e) => handleSettingChange("notifications", "commentNotifications", e.target.checked)}
                />
                <div className="ml-3">
                  <label htmlFor="commentNotifications" className="text-sm font-medium text-gray-700">
                    评论通知
                  </label>
                  <p className="text-xs text-gray-500">当有人评论您的内容时通知您</p>
                </div>
              </div>
              <div className="flex items-center py-3">
                <input
                  type="checkbox"
                  id="marketingEmails"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={settings.notifications.marketingEmails}
                  onChange={(e) => handleSettingChange("notifications", "marketingEmails", e.target.checked)}
                />
                <div className="ml-3">
                  <label htmlFor="marketingEmails" className="text-sm font-medium text-gray-700">
                    营销邮件
                  </label>
                  <p className="text-xs text-gray-500">接收有关新功能和特别优惠的电子邮件</p>
                </div>
              </div>
            </div>
          )}

          {/* 安全设置 */}
          {activeTab === "security" && (
            <div className="space-y-4">
              <div className="flex items-center py-3 border-b border-gray-100">
                <input
                  type="checkbox"
                  id="twoFactorAuth"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={settings.security.twoFactorAuth}
                  onChange={(e) => handleSettingChange("security", "twoFactorAuth", e.target.checked)}
                />
                <div className="ml-3">
                  <label htmlFor="twoFactorAuth" className="text-sm font-medium text-gray-700">
                    两步验证
                  </label>
                  <p className="text-xs text-gray-500">启用两步验证以提高账户安全性</p>
                </div>
              </div>
              <div className="py-3 border-b border-gray-100">
                <label htmlFor="passwordExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                  密码过期
                </label>
                <select
                  id="passwordExpiry"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={settings.security.passwordExpiry}
                  onChange={(e) => handleSettingChange("security", "passwordExpiry", e.target.value)}
                >
                  <option value="never">永不过期</option>
                  <option value="30_days">30天</option>
                  <option value="60_days">60天</option>
                  <option value="90_days">90天</option>
                </select>
              </div>
              <div className="py-3">
                <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700 mb-1">
                  会话超时
                </label>
                <select
                  id="sessionTimeout"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => handleSettingChange("security", "sessionTimeout", e.target.value)}
                >
                  <option value="30_mins">30分钟</option>
                  <option value="1_hour">1小时</option>
                  <option value="2_hours">2小时</option>
                  <option value="4_hours">4小时</option>
                  <option value="8_hours">8小时</option>
                </select>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="flex items-center px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 text-gray-700">
                  <Key className="mr-2 h-4 w-4" />
                  更改密码
                </button>
              </div>
            </div>
          )}

          {/* 个人资料 */}
          {activeTab === "profile" && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                  <Users className="h-10 w-10 text-gray-500" />
                </div>
                <div>
                  <button className="px-3 py-1 text-sm rounded-md bg-blue-600 hover:bg-blue-700 text-white">
                    更换头像
                  </button>
                  <p className="text-xs text-gray-500 mt-1">支持 JPG, PNG, GIF 格式，最大 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    姓
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="请输入姓"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    名
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="请输入名"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  电子邮箱
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                  个人简介
                </label>
                <textarea
                  id="bio"
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="请输入您的个人简介"
                ></textarea>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
