'use client';
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * 错误边界组件
 *
 * 用于捕获子组件树中的 JavaScript 错误，记录错误并显示备用 UI
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 只在开发环境中详细记录错误
    if (process.env.NODE_ENV === 'development') {
      console.error('组件错误:', error);
      console.error('错误信息:', errorInfo);
    } else {
      // 生产环境中可以发送到错误跟踪服务
      console.error('应用发生错误');
    }
  }

  render() {
    if (this.state.hasError) {
      // 自定义备用 UI
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center min-h-[200px] p-6 bg-gray-800 rounded-lg text-center">
            <svg
              className="w-16 h-16 text-gray-500 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="text-xl font-medium text-gray-300">内容加载失败</h3>
            <p className="text-gray-400 mt-2">请稍后再试</p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
