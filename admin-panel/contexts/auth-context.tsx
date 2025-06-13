'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiService } from '@/lib/api';
import { User } from '@/types';
import { AuthContextType, AuthResponse } from '@/types/auth';

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
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        // verify token validity
        const response = await apiService.get<User>('/auth/me');
        
        if (response && response.success && response.data) {
          // API returns user data in response.data, no need to access .user
          setUser(response.data);
        } else {
          // token invalid, clear local storage
          localStorage.removeItem('token');
        }
      } catch (error) {
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  // login method
  const login = async (email: string, password: string): Promise<AuthResponse | undefined> => {
    try {
      setLoading(true);
      
      try {
        // use apiService's login method, convert return result to any to access properties
        const responseData = (await apiService.login({ email, password })) as any;
        
        // if success, save token and user info
        if (responseData && responseData.success) {
          // get token and user info from response
          const { token, user, refreshToken } = responseData;
          
          // save token to local storage
          localStorage.setItem('token', token);
          
          // save refreshToken if exists
          if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
          }
          
          // update user state
          setUser({
            _id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
          });
          
          return responseData as AuthResponse;
        } else {
          throw new Error(responseData?.message || 'Login failed');
        }
      } catch (apiError: any) {
        // get error message from API response
        if (apiError.response?.status === 429) {
          throw new Error('Too many requests, please try again later');
        } else if (apiError.response?.status === 401) {
          // use API returned error message
          throw new Error(apiError.response.data.message || 'Email or password is incorrect');
        } else if (apiError.response?.data?.message) {
          throw new Error(apiError.response.data.message);
        } else {
          throw apiError;
        }
      }
    } catch (error: any) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // logout method
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken'); // clear refresh token
    setUser(null);
    
    // Use router for navigation instead of direct window location change
    // This maintains better application state
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      isAuthenticated: !!user,
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// using auth context hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 