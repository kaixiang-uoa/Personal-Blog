/**
 * health check endpoint test
 */

import { request } from './setup.js';

describe('Health Check Endpoint', () => {
  it('should return 200 and status information', async () => {
    const response = await request.get('/health');
    
    // check status code
    expect(response.status).toBe(200);
    
    // check response body structure
    expect(response.body).toHaveProperty('status', 'OK');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body).toHaveProperty('uptime');
    expect(response.body).toHaveProperty('memoryUsage');
    
    // check memory usage information
    expect(response.body.memoryUsage).toHaveProperty('rss');
    expect(response.body.memoryUsage).toHaveProperty('heapTotal');
    expect(response.body.memoryUsage).toHaveProperty('heapUsed');
    
    // validate timestamp is valid
    const timestamp = new Date(response.body.timestamp);
    expect(timestamp).toBeInstanceOf(Date);
    expect(isNaN(timestamp.getTime())).toBe(false);
    
    // validate uptime is a number
    expect(typeof response.body.uptime).toBe('number');
    expect(response.body.uptime).toBeGreaterThan(0);
  });
}); 