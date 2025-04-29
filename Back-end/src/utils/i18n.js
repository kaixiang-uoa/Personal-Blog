// 国际化工具函数

// 翻译字典
const translations = {
  // 通用翻译
  common: {
    en: {
      success: 'Success',
      error: 'Error',
      notFound: 'Not Found',
      unauthorized: 'Unauthorized',
      forbidden: 'Forbidden',
      serverError: 'Server Error',
      invalidInput: 'Invalid Input'
    },
    zh: {
      success: '成功',
      error: '错误',
      notFound: '未找到',
      unauthorized: '未授权',
      forbidden: '禁止访问',
      serverError: '服务器错误',
      invalidInput: '无效输入'
    }
  },
  
  // 用户相关翻译
  user: {
    en: {
      loginSuccess: 'Login successful',
      loginFailed: 'Login failed',
      registerSuccess: 'Registration successful',
      registerFailed: 'Registration failed',
      userNotFound: 'User not found',
      passwordIncorrect: 'Password incorrect',
      emailExists: 'Email already exists',
      usernameExists: 'Username already exists',
      profileUpdated: 'Profile updated successfully'
    },
    zh: {
      loginSuccess: '登录成功',
      loginFailed: '登录失败',
      registerSuccess: '注册成功',
      registerFailed: '注册失败',
      userNotFound: '用户不存在',
      passwordIncorrect: '密码不正确',
      emailExists: '邮箱已存在',
      usernameExists: '用户名已存在',
      profileUpdated: '个人资料更新成功'
    }
  },
  
  // 文章相关翻译
  post: {
    en: {
      created: 'Post created successfully',
      updated: 'Post updated successfully',
      deleted: 'Post deleted successfully',
      notFound: 'Post not found',
      listTitle: 'Posts'
    },
    zh: {
      created: '文章创建成功',
      updated: '文章更新成功',
      deleted: '文章删除成功',
      notFound: '文章不存在',
      listTitle: '文章列表'
    }
  },
  
  // 分类相关翻译
  category: {
    en: {
      created: 'Category created successfully',
      updated: 'Category updated successfully',
      deleted: 'Category deleted successfully',
      notFound: 'Category not found',
      listTitle: 'Categories'
    },
    zh: {
      created: '分类创建成功',
      updated: '分类更新成功',
      deleted: '分类删除成功',
      notFound: '分类不存在',
      listTitle: '分类列表'
    }
  },
  
  // 标签相关翻译
  tag: {
    en: {
      created: 'Tag created successfully',
      updated: 'Tag updated successfully',
      deleted: 'Tag deleted successfully',
      notFound: 'Tag not found',
      listTitle: 'Tags'
    },
    zh: {
      created: '标签创建成功',
      updated: '标签更新成功',
      deleted: '标签删除成功',
      notFound: '标签不存在',
      listTitle: '标签列表'
    }
  },
  
  // 设置相关翻译
  setting: {
    en: {
      updated: 'Settings updated successfully',
      notFound: 'Setting not found',
      listTitle: 'Settings'
    },
    zh: {
      updated: '设置更新成功',
      notFound: '设置不存在',
      listTitle: '设置列表'
    }
  },
  
  // 媒体相关翻译
  media: {
    en: {
      uploaded: 'File uploaded successfully',
      deleted: 'File deleted successfully',
      notFound: 'File not found',
      invalidType: 'Invalid file type',
      tooLarge: 'File too large',
      listTitle: 'Media'
    },
    zh: {
      uploaded: '文件上传成功',
      deleted: '文件删除成功',
      notFound: '文件不存在',
      invalidType: '无效的文件类型',
      tooLarge: '文件太大',
      listTitle: '媒体文件'
    }
  }
};

/**
 * 获取翻译文本
 * @param {string} key - 翻译键，格式为 "category.key"
 * @param {string} lang - 语言代码
 * @param {Object} params - 替换参数
 * @returns {string} 翻译后的文本
 */
export const t = (key, lang = 'en', params = {}) => {
  // 分割键，例如 "user.loginSuccess" -> ["user", "loginSuccess"]
  const [category, messageKey] = key.split('.');
  
  // 获取翻译
  const translation = translations[category]?.[lang]?.[messageKey] || key;
  
  // 替换参数
  return Object.entries(params).reduce((text, [param, value]) => {
    return text.replace(new RegExp(`{${param}}`, 'g'), value);
  }, translation);
};

/**
 * 获取当前语言的所有翻译
 * @param {string} lang - 语言代码
 * @returns {Object} 所有翻译
 */
export const getTranslations = (lang = 'en') => {
  const result = {};
  
  Object.keys(translations).forEach(category => {
    result[category] = translations[category][lang] || translations[category]['en'];
  });
  
  return result;
};

/**
 * 获取支持的语言列表
 * @returns {Array} 支持的语言列表
 */
export const getSupportedLanguages = () => {
  return ['en', 'zh'];
};