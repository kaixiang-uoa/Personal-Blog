"use client";

import React, { ReactNode } from 'react';
import { useVirtualizedList, getItemStyle } from '@/hooks/use-virtualized-list';

/**
 * VirtualizedList 组件属性
 */
interface VirtualizedListProps<T> {
  items: T[];                                // 列表项数据
  height: string | number;                   // 容器高度
  itemHeight: number;                        // 每项高度（像素）
  renderItem: (item: T, index: number) => ReactNode; // 渲染每项的函数
  overscan?: number;                         // 可见区域外预渲染的项数
  className?: string;                        // 容器CSS类名
  onVisibleItemsChange?: (range: { start: number; end: number }) => void; // 可见项变化回调
  initialIndex?: number;                     // 初始滚动位置（项索引）
  loadingComponent?: ReactNode;              // 滚动时显示的加载组件
}

/**
 * 高性能虚拟化列表组件
 * 
 * 用于高效渲染大型列表，只渲染视口内可见的项目
 */
export function VirtualizedList<T>({
  items,
  height,
  itemHeight,
  renderItem,
  overscan = 5,
  className = '',
  onVisibleItemsChange,
  initialIndex = 0,
  loadingComponent
}: VirtualizedListProps<T>) {
  const {
    virtualItems,
    containerProps,
    innerProps,
    scrollToIndex,
    isScrolling
  } = useVirtualizedList(items, {
    itemHeight,
    overscan,
    initialIndex,
    onVisibleItemsChange
  });

  return (
    <div
      {...containerProps}
      className={`virtualized-list-container ${className}`}
      style={{
        ...containerProps.style,
        height,
        position: 'relative'
      }}
    >
      <div {...innerProps}>
        {virtualItems.map(({ index, item }) => (
          <div
            key={index}
            style={getItemStyle(index, itemHeight)}
            className="virtualized-list-item"
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
      
      {isScrolling && loadingComponent && (
        <div className="virtualized-list-loading">
          {loadingComponent}
        </div>
      )}
    </div>
  );
}

/**
 * 列表项数据示例
 */
interface ExampleItem {
  id: number;
  title: string;
  description: string;
}

/**
 * 示例数据生成函数
 */
function generateExampleItems(count: number): ExampleItem[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    description: `This is the description for item ${i + 1}`
  }));
}

/**
 * 虚拟化列表使用示例
 */
export function VirtualizedListExample() {
  // 生成1000个示例项
  const exampleItems = generateExampleItems(1000);
  
  // 渲染单个列表项
  const renderExampleItem = (item: ExampleItem, index: number) => (
    <div className="example-item p-4 border-b hover:bg-gray-50">
      <h3 className="text-lg font-medium">{item.title}</h3>
      <p className="text-gray-600">{item.description}</p>
      <span className="text-xs text-gray-400">Index: {index}</span>
    </div>
  );
  
  // 滚动加载指示器
  const loadingIndicator = (
    <div className="flex justify-center items-center p-2 bg-white bg-opacity-80 rounded-md shadow-sm">
      <span className="text-sm text-gray-600">Scrolling...</span>
    </div>
  );
  
  // 可见项变化处理
  const handleVisibleItemsChange = (range: { start: number; end: number }) => {
    console.log('Visible items range:', range);
  };
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Virtualized List Example</h2>
      <p className="mb-4 text-gray-700">
        This list efficiently renders 1,000 items but only creates DOM nodes for visible items.
      </p>
      
      <div className="border rounded-lg shadow-sm overflow-hidden">
        <VirtualizedList
          items={exampleItems}
          height={400}
          itemHeight={80}
          renderItem={renderExampleItem}
          overscan={3}
          className="bg-white"
          onVisibleItemsChange={handleVisibleItemsChange}
          loadingComponent={loadingIndicator}
        />
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>Total items: {exampleItems.length}</p>
        <p>Only the visible items (plus a small buffer) are actually rendered in the DOM.</p>
      </div>
    </div>
  );
} 