/**
 * CSRF Protection Service
 * 
 * Provides functionality for generating and validating CSRF tokens
 * to protect against Cross-Site Request Forgery attacks.
 */

// 存储CSRF令牌的键名
const CSRF_TOKEN_KEY = 'csrfToken';

/**
 * CSRF保护服务
 */
export const csrfService = {
  /**
   * 生成CSRF令牌
   * @returns 生成的CSRF令牌
   */
  generateToken(): string {
    // 生成随机令牌
    const randomBytes = new Uint8Array(32);
    window.crypto.getRandomValues(randomBytes);
    const token = Array.from(randomBytes)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    // 存储令牌
    this.saveToken(token);
    
    return token;
  },
  
  /**
   * 获取当前CSRF令牌
   * @returns 当前存储的CSRF令牌，如果不存在则生成新的
   */
  getToken(): string {
    if (typeof window === 'undefined') return '';
    
    let token = localStorage.getItem(CSRF_TOKEN_KEY);
    
    if (!token) {
      token = this.generateToken();
    }
    
    return token;
  },
  
  /**
   * 保存CSRF令牌
   * @param token CSRF令牌
   */
  saveToken(token: string): void {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem(CSRF_TOKEN_KEY, token);
  },
  
  /**
   * 从服务器响应中更新CSRF令牌
   * @param token 从服务器接收的新CSRF令牌
   */
  updateToken(token: string): void {
    this.saveToken(token);
  },
  
  /**
   * 验证CSRF令牌是否匹配
   * @param token 要验证的CSRF令牌
   * @returns 令牌是否有效
   */
  validateToken(token: string): boolean {
    const storedToken = this.getToken();
    return !!token && !!storedToken && token === storedToken;
  },
  
  /**
   * 为表单添加CSRF令牌
   * @param formData 表单数据
   * @returns 添加了CSRF令牌的表单数据
   */
  protectForm<T extends Record<string, any>>(formData: T): T & { _csrf: string } {
    return {
      ...formData,
      _csrf: this.getToken(),
    };
  },
  
  /**
   * 清除存储的CSRF令牌
   */
  clearToken(): void {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem(CSRF_TOKEN_KEY);
  }
}; 