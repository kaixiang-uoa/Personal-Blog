import { NextResponse } from 'next/server';
import { API_BASE_URL } from '@/services/api';

/**
 * 获取所有设置
 * 这个API路由作为服务端代理，从后端API获取设置数据
 */
export async function GET(request: Request) {
  try {
    // 获取URL中的group参数
    const { searchParams } = new URL(request.url);
    const group = searchParams.get('group');
    const lang = searchParams.get('lang');
    
    // 构建API URL，添加所有查询参数
    const queryParams = new URLSearchParams();
    if (group) queryParams.append('group', group);
    if (lang) queryParams.append('lang', lang);
    
    const queryString = queryParams.toString();
    const apiEndpoint = `${API_BASE_URL}/settings${queryString ? `?${queryString}` : ''}`;
    
    console.log(`[Settings API] Fetching settings from: ${apiEndpoint}`);
    
    // 请求设置数据
    const response = await fetch(apiEndpoint, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`[Settings API] Error status: ${response.status}`);
      throw new Error(`Error fetching settings: ${response.status}`);
    }

    const data = await response.json();
    
    // 打印重要的响应信息
    console.log(`[Settings API] Response received. Success: ${data.success}`);
    
    if (data.data) {
      console.log('[Settings API] Available settings keys:', Object.keys(data.data));
      
      // 特别检查Banner相关设置
      const bannerKeys = Object.keys(data.data).filter(key => key.includes('banner') || key.includes('Banner'));
      if (bannerKeys.length > 0) {
        console.log('[Settings API] Banner related settings:', bannerKeys);
        for (const key of bannerKeys) {
          console.log(`[Settings API] ${key} =`, data.data[key]);
        }
      } else {
        console.log('[Settings API] No banner related settings found');
      }
    } else {
      console.log('[Settings API] No data in response');
    }
    
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('[Settings API] Error fetching settings:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'Failed to fetch settings' 
      },
      { status: 500 }
    );
  }
} 