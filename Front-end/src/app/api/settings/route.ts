import { NextResponse } from 'next/server';
import { API_BASE_URL } from '@/services/api';

/**
 * fetch all settings
 * this API route is a server-side proxy, fetching settings data from the backend API
 */
export async function GET(request: Request) {
  try {
    // get group parameter from URL
    const { searchParams } = new URL(request.url);
    const group = searchParams.get('group');
    const lang = searchParams.get('lang');

    // build API URL, add all query parameters
    const queryParams = new URLSearchParams();
    if (group) queryParams.append('group', group);
    if (lang) queryParams.append('lang', lang);

    const queryString = queryParams.toString();
    const apiEndpoint = `${API_BASE_URL}/settings${queryString ? `?${queryString}` : ''}`;

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
  } catch (error: unknown) {
    console.error('[Settings API] Error fetching settings:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch settings';
    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
