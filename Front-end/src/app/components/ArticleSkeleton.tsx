import React from 'react';

/**
 * 文章骨架屏组件
 *
 * 在文章数据加载过程中显示，提供视觉上的内容占位
 * 减少用户等待焦虑，提升用户体验
 */
export default function ArticleSkeleton() {
  return (
    <div className="flex flex-col gap-3 pb-4 h-full animate-pulse">
      <div className="w-full bg-[#f0f2f5] aspect-[16/10] rounded-lg"></div>
      <div className="flex-1 flex flex-col">
        <div className="h-5 bg-[#f0f2f5] rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-[#f0f2f5] rounded w-1/2 mt-auto"></div>
      </div>
    </div>
  );
}
