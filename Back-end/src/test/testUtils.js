/**
 * test utility functions
 * 
 * provide helper functions and mock data generators for testing
 */

/**
 * generate random string
 * @param {number} length - string length
 * @returns {string} random string
 */
export const generateRandomString = (length = 10) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

/**
 * generate random email
 * @returns {string} random email
 */
export const generateRandomEmail = () => {
  return `test.${generateRandomString(8)}@example.com`;
};

/**
 * generate test user data
 * @param {Object} overrides - override default values
 * @returns {Object} user data
 */
export const generateUserData = (overrides = {}) => {
  const defaultData = {
    username: `user_${generateRandomString(5)}`,
    email: generateRandomEmail(),
    password: 'Password123!',
    displayName: `Test User ${generateRandomString(3)}`,
    role: 'user'
  };
  
  return { ...defaultData, ...overrides };
};

/**
 * generate test post data
 * @param {Object} overrides - override default values
 * @returns {Object} post data
 */
export const generatePostData = (overrides = {}) => {
  const title = `Test Post ${generateRandomString(8)}`;
  const slug = title.toLowerCase().replace(/\s+/g, '-');
  
  const defaultData = {
    title,
    slug,
    content: `This is a test content for ${title}. It contains some text for testing purposes.`,
    excerpt: `This is a test excerpt for ${title}.`,
    status: 'published',
    tags: [],
    categories: [],
    allowComments: true
  };
  
  return { ...defaultData, ...overrides };
};

/**
 * generate test category data
 * @param {Object} overrides - override default values
 * @returns {Object} category data
 */
export const generateCategoryData = (overrides = {}) => {
  const name = `Category ${generateRandomString(5)}`;
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  
  const defaultData = {
    name,
    name_en: name,
    name_zh: `分类 ${generateRandomString(5)}`,
    slug,
    description: `Description for ${name}`,
    description_en: `Description for ${name}`,
    description_zh: `${name} 的描述`
  };
  
  return { ...defaultData, ...overrides };
};

/**
 * generate test tag data
 * @param {Object} overrides - override default values
 * @returns {Object} tag data
 */
export const generateTagData = (overrides = {}) => {
  const name = `Tag ${generateRandomString(5)}`;
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  
  const defaultData = {
    name,
    slug
  };
  
  return { ...defaultData, ...overrides };
}; 