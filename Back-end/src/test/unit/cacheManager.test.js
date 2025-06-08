/**
 * cache manager unit test
 */

import cacheManager from '../../utils/cacheManager.js';

// mock delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

describe('Cache Manager', () => {
  beforeEach(() => {
    // clear cache before each test
    cacheManager.clear();
  });
  
  describe('set() and get()', () => {
    it('should store and retrieve a value', () => {
      const key = 'test-key';
      const value = { name: 'test-value' };
      
      cacheManager.set(key, value);
      const retrieved = cacheManager.get(key);
      
      expect(retrieved).toEqual(value);
    });
    
    it('should return null for non-existent keys', () => {
      const retrieved = cacheManager.get('non-existent-key');
      
      expect(retrieved).toBeNull();
    });
    
    it('should respect TTL for cached items', async () => {
      const key = 'expiring-key';
      const value = 'expiring-value';
      
      // set TTL (200ms)
      cacheManager.set(key, value, 0.2);
      
      // check immediately, should exist
      expect(cacheManager.get(key)).toBe(value);
      
      // wait for TTL to expire (300ms > 200ms)
      await delay(300);
      
      // should be expired now
      expect(cacheManager.get(key)).toBeNull();
    });
  });
  
  describe('has()', () => {
    it('should return true if key exists', () => {
      const key = 'existing-key';
      cacheManager.set(key, 'value');
      
      expect(cacheManager.has(key)).toBe(true);
    });
    
    it('should return false if key does not exist', () => {
      expect(cacheManager.has('non-existent-key')).toBe(false);
    });
  });
  
  describe('delete()', () => {
    it('should remove an item from cache', () => {
      const key = 'deletable-key';
      cacheManager.set(key, 'value');
      
      expect(cacheManager.has(key)).toBe(true);
      
      cacheManager.delete(key);
      
      expect(cacheManager.has(key)).toBe(false);
      expect(cacheManager.get(key)).toBeNull();
    });
  });
  
  describe('clear()', () => {
    it('should remove all items from cache', () => {
      // add multiple cache items
      cacheManager.set('key1', 'value1');
      cacheManager.set('key2', 'value2');
      cacheManager.set('key3', 'value3');
      
      expect(cacheManager.has('key1')).toBe(true);
      expect(cacheManager.has('key2')).toBe(true);
      expect(cacheManager.has('key3')).toBe(true);
      
      // clear cache
      cacheManager.clear();
      
      expect(cacheManager.has('key1')).toBe(false);
      expect(cacheManager.has('key2')).toBe(false);
      expect(cacheManager.has('key3')).toBe(false);
    });
  });
  
  describe('getOrSet()', () => {
    it('should return cached value if it exists', async () => {
      const key = 'cached-key';
      const value = 'cached-value';
      
      // cache a value first
      cacheManager.set(key, value);
      
      // use getOrSet, provide a factory function that will not be called
      const factory = jest.fn().mockResolvedValue('new-value');
      const result = await cacheManager.getOrSet(key, factory);
      
      // should return cached value, without calling factory function
      expect(result).toBe(value);
      expect(factory).not.toHaveBeenCalled();
    });
    
    it('should call factory and cache result if key does not exist', async () => {
      const key = 'new-key';
      const factoryValue = 'factory-generated-value';
      
      const factory = jest.fn().mockResolvedValue(factoryValue);
      const result = await cacheManager.getOrSet(key, factory);
      
      // should call factory function and cache and return the result
      expect(result).toBe(factoryValue);
      expect(factory).toHaveBeenCalled();
      expect(cacheManager.get(key)).toBe(factoryValue);
    });
  });
  
  describe('stats()', () => {
    it('should return correct cache statistics', () => {
      // add multiple cache items
      cacheManager.set('key1', 'value1');
      cacheManager.set('key2', 'value2');
      
      // execute several cache hits and misses
      cacheManager.get('key1'); // hit
      cacheManager.get('key1'); // hit
      cacheManager.get('key2'); // hit
      cacheManager.get('key3'); // miss
      
      const stats = cacheManager.stats();
      
      expect(stats).toHaveProperty('size', 2);
      expect(stats).toHaveProperty('hits', 3);
      expect(stats).toHaveProperty('misses', 1);
      expect(stats).toHaveProperty('hitRate');
      
      // hit rate should be 3 / (3 + 1) = 0.75
      expect(stats.hitRate).toBeCloseTo(0.75);
    });
  });
}); 