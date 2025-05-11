import { NextResponse } from 'next/server';

/**
 * 获取所有设置
 */
export async function GET(request: Request) {
  try {
    // 后端API地址
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
    
    // 获取URL中的group参数
    const { searchParams } = new URL(request.url);
    const group = searchParams.get('group');
    
    // 构建API URL，如果有group参数则添加
    let apiEndpoint = `${apiUrl}/settings`;
    if (group) {
      apiEndpoint += `?group=${group}`;
    }
    
    // 请求设置数据
    const response = await fetch(apiEndpoint, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching settings: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'Failed to fetch settings' 
      },
      { status: 500 }
    );
  }
} 