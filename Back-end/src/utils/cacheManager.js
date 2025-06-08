/**
 * Cache Manager
 * Simple in-memory cache with TTL support
 */

class CacheManager {
  constructor() {
    this.cache = new Map();
    this.stats = {
      hits: 0,
      misses: 0,
      sets: 0,
      deletes: 0,
    };
    
    // Perform periodic cleanup every 10 minutes
    this.cleanupInterval = setInterval(() => this.cleanup(), 10 * 60 * 1000);
  }

  /**
   * Get item from cache
   * @param {string} key - Cache key
   * @returns {*} Cached value or undefined if not found
   */
  get(key) {
    const item = this.cache.get(key);
    
    if (!item) {
      this.stats.misses++;
      return undefined;
    }
    
    // Check if item has expired
    if (item.expiry && item.expiry < Date.now()) {
      this.delete(key);
      this.stats.misses++;
      return undefined;
    }
    
    this.stats.hits++;
    return item.value;
  }

  /**
   * Set cache item with optional TTL
   * @param {string} key - Cache key
   * @param {*} value - Value to cache
   * @param {number} [ttlSeconds=3600] - Time to live in seconds (default: 1 hour)
   */
  set(key, value, ttlSeconds = 3600) {
    const expiry = ttlSeconds > 0 ? Date.now() + (ttlSeconds * 1000) : null;
    
    this.cache.set(key, {
      value,
      expiry,
      createdAt: Date.now()
    });
    
    this.stats.sets++;
    return value;
  }

  /**
   * Delete item from cache
   * @param {string} key - Cache key
   * @returns {boolean} True if item was deleted, false otherwise
   */
  delete(key) {
    const deleted = this.cache.delete(key);
    if (deleted) {
      this.stats.deletes++;
    }
    return deleted;
  }

  /**
   * Check if key exists in cache and is not expired
   * @param {string} key - Cache key
   * @returns {boolean} True if key exists and is not expired
   */
  has(key) {
    const item = this.cache.get(key);
    
    if (!item) {
      return false;
    }
    
    // Check if item has expired
    if (item.expiry && item.expiry < Date.now()) {
      this.delete(key);
      return false;
    }
    
    return true;
  }

  /**
   * Clear all items from cache
   */
  clear() {
    this.cache.clear();
    return true;
  }

  /**
   * Get cache size
   * @returns {number} Number of items in cache
   */
  size() {
    return this.cache.size;
  }

  /**
   * Get cache statistics
   * @returns {Object} Cache statistics
   */
  getStats() {
    return {
      ...this.stats,
      size: this.size(),
      hitRate: this.stats.hits / (this.stats.hits + this.stats.misses) || 0
    };
  }

  /**
   * Remove expired items from cache
   * @private
   */
  cleanup() {
    const now = Date.now();
    
    for (const [key, item] of this.cache.entries()) {
      if (item.expiry && item.expiry < now) {
        this.delete(key);
      }
    }
  }

  /**
   * Get or set cache item (convenience method)
   * @param {string} key - Cache key
   * @param {Function} fetcher - Function to execute if cache miss
   * @param {number} [ttlSeconds=3600] - Time to live in seconds
   * @returns {Promise<*>} Cached value or result of fetcher function
   */
  async getOrSet(key, fetcher, ttlSeconds = 3600) {
    // Check if value is in cache
    const cachedValue = this.get(key);
    if (cachedValue !== undefined) {
      return cachedValue;
    }
    
    // If not in cache, call fetcher function
    try {
      const fetchedValue = await fetcher();
      
      // Cache the fetched value
      this.set(key, fetchedValue, ttlSeconds);
      
      return fetchedValue;
    } catch (error) {
      // Don't cache errors
      throw error;
    }
  }

  /**
   * Dispose cache manager (clear intervals)
   */
  dispose() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }
}

// Create a singleton instance
const cacheManager = new CacheManager();

// Handle application shutdown
process.on('SIGINT', () => {
  cacheManager.dispose();
  process.exit(0);
});

export default cacheManager; 