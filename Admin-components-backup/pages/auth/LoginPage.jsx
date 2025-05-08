"use client"

import { useState } from "react"
import { useAppContext } from "../../context/AppContext"
import { Mail, Lock, LogIn, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAppContext()

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials({
      ...credentials,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await login(credentials)
      // 登录成功，应用上下文已自动更新认证状态
    } catch (error) {
      setError(error.response?.data?.message || "登录失败，请检查您的凭据。")
    } finally {
      setIsLoading(false)
    }
  }

  // 直接使用内联样式来保证不受外部样式影响
  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(to bottom, #EFF6FF, #F9FAFB)',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '560px',
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
        padding: '56px',
        margin: '0 20px',
        boxSizing: 'border-box',
      }}>
        <div style={{textAlign: 'center'}}>
          <div style={{
            width: '84px',
            height: '84px',
            borderRadius: '50%',
            backgroundColor: '#DBEAFE',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px auto',
          }}>
            <LogIn style={{width: '42px', height: '42px', color: '#2563EB'}} />
          </div>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#111827',
            margin: '0 0 12px 0',
          }}>管理员登录</h2>
          <p style={{
            fontSize: '18px',
            color: '#6B7280',
            margin: '0 0 42px 0',
          }}>请输入您的管理员账号密码</p>
        </div>

        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '32px'}}>
          {error && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px',
              backgroundColor: '#FEF2F2',
              color: '#B91C1C',
              borderRadius: '10px',
            }}>
              <AlertCircle style={{width: '24px', height: '24px', marginRight: '12px', flexShrink: 0}} />
              <span style={{fontSize: '18px'}}>{error}</span>
            </div>
          )}

          <div>
            <div style={{position: 'relative'}}>
              <div style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                alignItems: 'center',
                pointerEvents: 'none',
              }}>
                <Mail style={{width: '26px', height: '26px', color: '#9CA3AF'}} />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                style={{
                  width: '100%',
                  padding: '16px 16px 16px 52px',
                  fontSize: '18px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '10px',
                  backgroundColor: '#FFFFFF',
                  color: '#111827',
                  boxSizing: 'border-box',
                  outline: 'none',
                  height: '60px',
                }}
                placeholder="Email地址"
                value={credentials.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <div style={{position: 'relative'}}>
              <div style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                alignItems: 'center',
                pointerEvents: 'none',
              }}>
                <Lock style={{width: '26px', height: '26px', color: '#9CA3AF'}} />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                style={{
                  width: '100%',
                  padding: '16px 16px 16px 52px',
                  fontSize: '18px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '10px',
                  backgroundColor: '#FFFFFF',
                  color: '#111827',
                  boxSizing: 'border-box',
                  outline: 'none',
                  height: '60px',
                }}
                placeholder="密码"
                value={credentials.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding: '16px',
              backgroundColor: '#2563EB',
              color: '#FFFFFF',
              borderRadius: '10px',
              border: 'none',
              fontSize: '18px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              opacity: isLoading ? '0.7' : '1',
              height: '60px',
            }}
          >
            {isLoading ? (
              <span style={{display: 'flex', alignItems: 'center'}}>
                <svg
                  style={{
                    animation: 'spin 1s linear infinite',
                    marginRight: '12px',
                    width: '22px',
                    height: '22px',
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    style={{opacity: '0.25'}}
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    style={{opacity: '0.75'}}
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                登录中...
              </span>
            ) : (
              <span style={{display: 'flex', alignItems: 'center'}}>
                <LogIn style={{width: '22px', height: '22px', marginRight: '12px'}} />
                登录
              </span>
            )}
          </button>
        </form>

        <div style={{
          marginTop: '42px',
          textAlign: 'center',
          fontSize: '16px',
          color: '#6B7280',
        }}>
          <p>© 2025 管理系统. 保留所有权利.</p>
        </div>
      </div>
    </div>
  )
}
 