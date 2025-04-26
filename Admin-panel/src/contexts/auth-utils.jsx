import { createContext, useContext } from "react";

// 创建上下文
export const AuthContext = createContext(null);

// 创建 useAuth hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}