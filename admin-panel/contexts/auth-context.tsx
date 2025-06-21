"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";

import { User } from "@/types";
import { authService } from "@/lib/services/auth-service";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // check if already logged in
  useEffect(() => {
    async function checkAuth() {
      try {
        const token = authService.getToken();
        if (!token) {
          setLoading(false);
          return;
        }

        // verify token validity using service
        const response = await authService.getCurrentUser();

        if (response && response.success && response.data) {
          setUser(response.data);
        } else {
          // token invalid, clear local storage
          authService.clearAuthData();
        }
      } catch (error) {
        authService.clearAuthData();
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  // login method
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);

      // use authService for login
      const response = await authService.login({ email, password, rememberMe: false });

      // if success, save token and user info
      if (response && response.success) {
        // get token and user info from response
        const { token, user, refreshToken } = response;

        // store auth data using service
        authService.storeAuthData(token, refreshToken);

        // update user state
        setUser({
          _id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        });
      } else {
        throw new Error(response?.message || "Login failed");
      }
    } catch (error: any) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // logout method
  const logout = () => {
    // use service to clear auth data
    authService.clearAuthData();
    setUser(null);

    // 增强登出逻辑，防止后退按钮绕过认证
    // 1. 清除sessionStorage中的重定向信息
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("redirectAfterLogin");
      // 2. 清除Remember Me数据（可选，取决于设计需求）
      // 如果希望登出后也清除记住的邮箱，取消注释下面两行
      // localStorage.removeItem("rememberedEmail");
      // localStorage.removeItem("rememberMe");
    }

    // 2. 使用replace而不是push，这样后退按钮不会回到dashboard
    router.replace("/login");
    
    // 3. 强制刷新页面以确保所有状态都被清除（可选，但更安全）
    // 如果上面的方法不够，可以取消注释下面这行
    // window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// using auth context hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
