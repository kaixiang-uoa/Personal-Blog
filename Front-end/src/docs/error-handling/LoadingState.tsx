/**
 * loading state component example
 *
 * this file shows how to create a simple loading state component
 * when data is loading, display a friendly loading animation
 */

import React from 'react';

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-16 h-16 border-t-4 border-b-4 border-cyan-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-xl text-cyan-400">Data is loading, please wait...</p>
    </div>
  );
}
