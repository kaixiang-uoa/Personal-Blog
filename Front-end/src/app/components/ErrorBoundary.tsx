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
 * error boundary component
 *
 * used to capture JavaScript errors in the child component tree, record errors and display fallback UI
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
    // only record errors in development environment
    if (process.env.NODE_ENV === 'development') {
      console.error('component error:', error);
      console.error('error info:', errorInfo);
    } else {
      // in production environment, can send to error tracking service
      console.error('application error');
    }
  }

  render() {
    if (this.state.hasError) {
      // custom fallback UI
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
            <h3 className="text-xl font-medium text-gray-300">content loading failed</h3>
            <p className="text-gray-400 mt-2">please try again later</p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
