# 主页结构与样式指南

## 概述

本文档详细解释了博客主页 (`[locale]/page.tsx`) 的结构、布局和样式，旨在帮助你理解如何修改页面的各个部分，同时学习 Tailwind CSS 和组件设计原则。

## 页面整体结构

主页总体分为以下几个主要部分：

1. **导航栏 (Navbar)** - 页面顶部的导航组件
2. **英雄区域 (Hero Section)** - 带有渐变背景的标题区域
3. **分类导航区 (Categories Section)** - 显示所有文章分类的区域
4. **搜索区域 (Search Section)** - 允许用户搜索文章的表单
5. **标签过滤区 (Mobile Tags Filter)** - 仅在移动设备上显示的标签过滤器
6. **主内容区域 (Main Content)** - 包含侧边栏过滤器和文章卡片列表的网格布局

## 如何修改背景颜色

### 1. 导航栏背景

导航栏背景是在 `Navbar` 组件中定义的，你需要查看并修改 `../components/Navbar.tsx` 文件。

### 2. 英雄区域背景

```jsx
<section className="bg-gradient-to-r from-gray-800 to-gray-700 text-white py-20 px-4 sm:px-6 lg:px-8">
```

要修改英雄区域的渐变背景，更改 `from-gray-800` 和 `to-gray-700` 类。例如，使用蓝色渐变：

```jsx
<section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-20 px-4 sm:px-6 lg:px-8">
```

### 3. 主内容区域背景

```jsx
<main className="min-h-screen bg-gray-900 text-gray-200">
```

要修改整个页面的背景颜色，更改 `bg-gray-900` 类。例如：

```jsx
<main className="min-h-screen bg-slate-900 text-gray-200">
```

### 4. 分类按钮背景

```jsx
<Link
  ...
  className={`px-4 py-2 rounded-md ${!category ? 'bg-cyan-600' : 'bg-gray-700'} hover:bg-cyan-700`}
>
```

- 活动分类: `bg-cyan-600`
- 非活动分类: `bg-gray-700`
- 悬停状态: `hover:bg-cyan-700`

### 5. 筛选条件背景

```jsx
<div className="bg-gray-800 rounded-lg p-4 flex justify-between items-center mb-6">
```

要修改筛选条件面板的背景，更改 `bg-gray-800` 类。

### 6. 标签和筛选器背景

```jsx
<span className="bg-cyan-600 text-white px-2 py-1 rounded text-sm">
```

要修改标签背景，更改 `bg-cyan-600` 类。

## 如何修改布局

### 整体宽度

页面各部分使用了 `max-w-[95%]` 来控制内容的最大宽度，确保页面在各种屏幕尺寸下都有适当的边距。如果需要调整内容宽度，可以修改这些值：

```jsx
<section className="max-w-[95%] mx-auto py-6 px-4 sm:px-6 lg:px-8">
```

### 文章卡片网格布局

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

这个网格布局用于显示文章卡片：
- 移动设备: 单列 (`grid-cols-1`)
- 中等屏幕: 双列 (`md:grid-cols-2`)
- 大屏幕: 三列 (`lg:grid-cols-3`)
- 卡片间距: `gap-6`

要修改列数或间距，请调整这些类。

### 侧边栏与主内容的网格布局

```jsx
<div className="grid md:grid-cols-[280px_1fr] gap-8">
```

这设置了一个两列网格，其中:
- 第一列 (侧边栏) 固定 280px 宽
- 第二列 (文章列表) 占据剩余空间 (`1fr`)
- 列间距为 `gap-8`

要调整侧边栏宽度，修改 `md:grid-cols-[280px_1fr]` 中的 `280px` 值。

## 响应式设计

页面使用了 Tailwind 的响应式前缀来在不同屏幕尺寸上调整布局：

- `sm:` - 小屏幕 (640px 及以上)
- `md:` - 中等屏幕 (768px 及以上)
- `lg:` - 大屏幕 (1024px 及以上)

例如，在移动设备上隐藏侧边栏，在中等屏幕上显示:

```jsx
<div className="hidden md:block">
  <FilterSidebar ... />
</div>
```

## 组件说明

### 1. Navbar 组件

位于 `../components/Navbar.tsx`，提供网站顶部导航功能。

### 2. ArticleCard 组件

位于 `../components/ArticleCard.tsx`，定义单个文章卡片的外观和行为。

### 3. TagFilter 组件

位于 `../components/TagFilter.tsx`，仅在移动设备上显示，用于按标签筛选文章。

### 4. FilterSidebar 组件

位于 `../components/FilterSidebar.tsx`，在中等及更大屏幕上显示，提供更完整的筛选选项。

### 5. SortSelector 组件

位于 `../components/SortSelector.tsx`，用于改变文章的排序方式。

### 6. ArticleSkeleton 组件

位于 `../components/ArticleSkeleton.tsx`，在加载文章时显示骨架屏效果。

## Tailwind CSS 关键概念

### 1. 间距和排版

- `px-4`, `py-2` - 水平内边距4单位，垂直内边距2单位
- `mb-6`, `mt-10` - 底部外边距6单位，顶部外边距10单位
- `gap-6` - 网格或flexbox中元素间的间距为6单位
- `text-3xl`, `text-sm` - 文本大小为超大号(3xl)或小号(sm)

### 2. Flexbox 和 Grid

- `flex` - 启用flexbox布局
- `justify-center`, `justify-between` - 水平居中对齐或两端对齐
- `items-center` - 垂直居中对齐
- `grid` - 启用网格布局
- `grid-cols-1` - 单列网格
- `md:grid-cols-2` - 中等屏幕上为双列网格

### 3. 颜色

Tailwind使用一个命名约定来指定颜色和强度:
- `bg-gray-900` - 背景颜色为深灰色(900强度)
- `text-white` - 文本颜色为白色
- `from-gray-800 to-gray-700` - 渐变起点为深灰色，终点为稍浅的灰色

### 4. 圆角和边框

- `rounded-md` - 中等圆角
- `rounded-lg` - 大圆角
- `border border-gray-700` - 添加边框并设置颜色

## 使用本指南学习

通过修改上述样式和布局类，你可以：

1. **实验颜色组合** - 尝试不同的背景、文本和边框颜色
2. **调整响应式布局** - 修改网格列数、flexbox属性，并在不同屏幕尺寸上测试
3. **学习组件设计** - 分析每个组件的功能和样式，了解它们如何共同构建界面
4. **实践间距系统** - 尝试不同的外边距、内边距和间距值，理解Tailwind的间距系统

## 下一步

1. 选取一个部分进行修改，例如更改英雄区域的渐变颜色
2. 使用浏览器开发者工具查看更改效果
3. 尝试调整网格布局，看看响应式设计如何变化
4. 查看各个组件文件，了解它们的内部实现

通过这种实践学习方法，你将逐渐掌握Tailwind CSS和现代前端组件设计。 