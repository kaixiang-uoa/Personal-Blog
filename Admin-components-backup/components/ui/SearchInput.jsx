import { Search } from "lucide-react"
import { useState } from "react"

/**
 * 可复用的搜索输入框组件 - 使用flex布局分离图标和输入框
 * @param {Object} props - 组件属性
 * @param {string} props.value - 输入框的值
 * @param {function} props.onChange - 值变化的回调函数
 * @param {string} props.placeholder - 占位符文本
 * @param {string} props.className - 附加的CSS类
 * @returns {JSX.Element} 搜索输入框组件
 */
export function SearchInput({ value, onChange, placeholder = "搜索...", className = "" }) {
  const [isFocused, setIsFocused] = useState(false)
  
  return (
    <div 
      className={`flex items-center w-full max-w-sm rounded-md overflow-hidden bg-white shadow-sm
      ${isFocused ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-300 hover:border-gray-400'} 
      border transition-all ${className}`}
    >
      <div className="flex-shrink-0 flex items-center justify-center px-3 h-10 text-gray-400">
        <Search className="h-4 w-4" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className="flex-grow h-10 w-full py-2 pr-4 text-sm bg-transparent focus:outline-none border-none placeholder-gray-400"
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  )
} 