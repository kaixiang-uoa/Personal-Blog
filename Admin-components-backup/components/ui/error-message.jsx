export function ErrorMessage({ 
  message, 
  type = "error", 
  className = "",
  onClose = null 
}) {
  if (!message) return null
  
  const types = {
    error: "bg-red-50 border-red-200 text-red-700",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-700",
    success: "bg-green-50 border-green-200 text-green-700",
    info: "bg-blue-50 border-blue-200 text-blue-700"
  }
  
  const typeLabel = {
    error: "错误",
    warning: "警告",
    success: "成功",
    info: "信息"
  }
  
  return (
    <div className={`${types[type]} border px-4 py-3 rounded relative mb-4 ${className}`} role="alert">
      <strong className="font-bold">{typeLabel[type]}: </strong>
      <span className="block sm:inline">{message}</span>
      {onClose && (
        <button 
          className="absolute top-0 right-0 px-4 py-3"
          onClick={onClose}
        >
          <span className="sr-only">关闭</span>
          <svg 
            className="h-4 w-4 fill-current" 
            viewBox="0 0 20 20"
          >
            <path 
              d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
            />
          </svg>
        </button>
      )}
    </div>
  )
} 