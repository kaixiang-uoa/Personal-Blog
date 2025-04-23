/**
 * 加载状态组件示例
 * 
 * 这个文件展示了如何创建一个简单的加载状态组件
 * 在数据加载过程中显示友好的加载动画
 */

import React from 'react';

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-16 h-16 border-t-4 border-b-4 border-cyan-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-xl text-cyan-400">数据加载中，请稍候...</p>
    </div>
  );
}