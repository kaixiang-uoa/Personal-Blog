export function Loading({ size = "medium", text = "加载中..." }) {
  const sizeClasses = {
    small: "h-4 w-4",
    medium: "h-8 w-8",
    large: "h-12 w-12"
  }
  
  return (
    <div className="flex justify-center items-center py-8">
      <div className={`animate-spin rounded-full border-t-2 border-b-2 border-blue-500 ${sizeClasses[size]}`}></div>
      {text && <span className="ml-2">{text}</span>}
    </div>
  )
}

// 全屏加载组件
export function FullScreenLoading() {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
        <span className="mt-4 text-blue-600 font-medium">加载中...</span>
      </div>
    </div>
  )
} 