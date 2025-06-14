'use client';
import React, { Component, ErrorInfo, ReactNode } from 'react';

/**
 * Props interface for the ErrorBoundary component
 * @interface Props
 * @property {ReactNode} children - Child components to be wrapped
 * @property {ReactNode} [fallback] - Optional custom fallback UI
 */
interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * State interface for the ErrorBoundary component
 * @interface State
 * @property {boolean} hasError - Indicates if an error has occurred
 */
interface State {
  hasError: boolean;
}

/**
 * ErrorBoundary Component
 * 
 * A class component that catches JavaScript errors in its child component tree.
 * Provides error logging and displays a fallback UI when errors occur.
 * 
 * @component
 * @example
 * ```tsx
 * <ErrorBoundary fallback={<CustomErrorUI />}>
 *   <YourComponent />
 * </ErrorBoundary>
 * ```
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * Static lifecycle method to update state when an error occurs
   * @returns {State} Updated state with hasError set to true
   */
  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  /**
   * Lifecycle method to handle errors after they occur
   * @param {Error} error - The error that was thrown
   * @param {ErrorInfo} errorInfo - Additional error information
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log errors only in development environment
    if (process.env.NODE_ENV === 'development') {
      console.error('component error:', error);
      console.error('error info:', errorInfo);
    } else {
      // In production, log minimal information
      console.error('application error');
    }
  }

  /**
   * Render method that displays either the children or fallback UI
   * @returns {ReactNode} The rendered component
   */
  render() {
    if (this.state.hasError) {
      // Display custom fallback UI or default error UI
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center min-h-[200px] p-6 bg-gray-800 rounded-lg text-center">
            {/* Warning icon */}
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
            {/* Error message */}
            <h3 className="text-xl font-medium text-gray-300">Content Loading Failed</h3>
            <p className="text-gray-400 mt-2">Please try again later</p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
