import React from 'react';

/**
 * 文章骨架屏组件
 * 
 * 在文章数据加载过程中显示，提供视觉上的内容占位
 * 减少用户等待焦虑，提升用户体验
 */
export default function ArticleSkeleton() {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg animate-pulse">
      <div className="h-48 bg-gray-700"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-5/6 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-4/6 mb-4"></div>
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-gray-700 rounded-full"></div>
            <div className="h-4 bg-gray-700 rounded w-24 ml-2"></div>
          </div>
          <div className="h-4 bg-gray-700 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
}