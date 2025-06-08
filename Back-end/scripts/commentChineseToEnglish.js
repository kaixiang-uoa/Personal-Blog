/**
 * Comment translator tool
 * Converts Chinese comments to English in codebase
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Project root directory
const ROOT_DIR = path.join(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');

// File extensions to check
const EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx'];

// Directories to ignore
const IGNORE_DIRS = ['node_modules', 'dist', 'build', 'coverage', 'logs', 'uploads', 'public'];

// Statistics
const stats = {
  processedFiles: 0,
  translatedFiles: 0,
  translatedComments: 0,
  failedTranslations: 0
};

// Common Chinese patterns that need translation
const CHINESE_PATTERN = /[\u4e00-\u9fa5]+/;

/**
 * Simple translation function (placeholder)
 * In a real implementation, you would use a proper translation API
 * @param {string} text - Text to translate
 * @returns {Promise<string>} Translated text
 */
async function translateText(text) {
  // This is a placeholder. In production, you'd connect to a translation API
  // like Google Translate, DeepL, or other services
  
  // Example of how you might implement a call to a translation API
  // For demonstration only - not functional without API keys and proper setup
  return new Promise((resolve, reject) => {
    console.log(`Would translate: "${text}"`);
    
    // Return a manual mapping for common comment patterns
    // This is just a demonstration - in a real scenario you'd use an actual API
    const commonTranslations = {
      '初始化': 'initialize',
      '配置': 'configure',
      '创建': 'create',
      '获取': 'get',
      '设置': 'set',
      '处理': 'process',
      '验证': 'validate',
      '检查': 'check',
      '查询': 'query',
      '更新': 'update',
      '删除': 'delete',
      '响应': 'response',
      '请求': 'request',
      '错误': 'error',
      '成功': 'success',
      '用户': 'user',
      '文章': 'post',
      '评论': 'comment',
      '标签': 'tag',
      '分类': 'category',
      '中间件': 'middleware',
      '路由': 'router',
      '控制器': 'controller',
      '模型': 'model',
      '工具': 'utility',
      '服务': 'service',
      '安全': 'security',
      '认证': 'authentication',
      '授权': 'authorization',
      '数据库': 'database',
      '缓存': 'cache',
      '日志': 'log',
      '配置文件': 'config file',
      '文件上传': 'file upload',
      '分页': 'pagination',
      '搜索': 'search',
      '排序': 'sort',
      '过滤': 'filter',
      '令牌': 'token',
      '密码': 'password',
      '邮件': 'email',
      '通知': 'notification',
      '权限': 'permission',
      '角色': 'role',
      '状态': 'status',
      '设置': 'settings',
      '主题': 'theme',
      '语言': 'language',
      '国际化': 'internationalization',
      '本地化': 'localization',
      '备份': 'backup',
      '恢复': 'restore',
      '导入': 'import',
      '导出': 'export',
      '统计': 'statistics',
      '分析': 'analytics',
      '监控': 'monitoring',
      '性能优化': 'performance optimization',
      '安全增强': 'security enhancement',
      '错误处理': 'error handling',
      '异常捕获': 'exception handling',
      '跨域': 'CORS',
      '速率限制': 'rate limit',
      '输入验证': 'input validation',
      '输出过滤': 'output filtering',
      '自动生成': 'auto-generate',
      '防止重复': 'prevent duplication',
      '确保唯一': 'ensure uniqueness',
      '标准化': 'standardize'
    };
    
    // Very simple "translation" - just replace known Chinese phrases
    let translated = text;
    Object.entries(commonTranslations).forEach(([chinese, english]) => {
      translated = translated.replace(new RegExp(chinese, 'g'), english);
    });
    
    // If translation still contains Chinese characters, mark as incomplete
    if (CHINESE_PATTERN.test(translated)) {
      translated = `[INCOMPLETE TRANSLATION] ${translated}`;
      stats.failedTranslations++;
    }
    
    // Simulate API delay
    setTimeout(() => {
      resolve(translated);
    }, 10);
  });
}

/**
 * Check if text contains Chinese characters
 * @param {string} text - Text to check
 * @returns {boolean} True if text contains Chinese characters
 */
function containsChinese(text) {
  return CHINESE_PATTERN.test(text);
}

/**
 * Extract and translate comments from file
 * @param {string} filePath - Path to file
 * @returns {Promise<boolean>} Whether any translations were made
 */
async function translateFileComments(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    let modified = false;
    let translatedComments = 0;
    
    // Process each line
    const translatedLines = [];
    let inBlockComment = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmedLine = line.trim();
      
      // Handle block comments
      if (trimmedLine.startsWith('/*') || inBlockComment) {
        inBlockComment = true;
        
        if (containsChinese(line)) {
          let commentText = line;
          
          // Extract the comment part while preserving spacing
          const leadingSpaces = line.match(/^(\s*)/)[0];
          const commentStart = line.indexOf('*');
          
          if (commentStart !== -1) {
            const beforeComment = line.substring(0, commentStart + 1);
            const comment = line.substring(commentStart + 1).trim();
            
            if (containsChinese(comment)) {
              const translatedComment = await translateText(comment);
              translatedLines.push(`${beforeComment} ${translatedComment}`);
              modified = true;
              translatedComments++;
              continue;
            }
          }
        }
        
        if (trimmedLine.endsWith('*/')) {
          inBlockComment = false;
        }
      } 
      // Handle line comments
      else if (trimmedLine.startsWith('//')) {
        if (containsChinese(line)) {
          // Extract comment text
          const commentStart = line.indexOf('//');
          const beforeComment = line.substring(0, commentStart + 2);
          const commentText = line.substring(commentStart + 2).trim();
          
          if (containsChinese(commentText)) {
            const translatedComment = await translateText(commentText);
            translatedLines.push(`${beforeComment} ${translatedComment}`);
            modified = true;
            translatedComments++;
            continue;
          }
        }
      }
      
      // Add unchanged line
      translatedLines.push(line);
    }
    
    // Update file if modified
    if (modified) {
      fs.writeFileSync(filePath, translatedLines.join('\n'), 'utf8');
      stats.translatedFiles++;
      stats.translatedComments += translatedComments;
      
      console.log(`Translated ${translatedComments} comments in: ${path.relative(ROOT_DIR, filePath)}`);
    }
    
    return modified;
  } catch (error) {
    console.error(`Failed to translate file: ${filePath}`, error);
    return false;
  }
}

/**
 * Recursively find files to process
 * @param {string} dir - Directory path
 * @returns {Array} List of file paths
 */
function findFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!IGNORE_DIRS.includes(file)) {
        results = results.concat(findFiles(filePath));
      }
    } else {
      const ext = path.extname(file);
      if (EXTENSIONS.includes(ext)) {
        results.push(filePath);
      }
    }
  });
  
  return results;
}

/**
 * Run the translator
 */
async function runTranslator() {
  console.log('Starting comment translation from Chinese to English...');
  
  const files = findFiles(SRC_DIR);
  console.log(`Found ${files.length} files to check`);
  
  // Process files sequentially to avoid overwhelming translation API
  for (const file of files) {
    stats.processedFiles++;
    await translateFileComments(file);
    
    // Show progress every 10 files
    if (stats.processedFiles % 10 === 0) {
      console.log(`Progress: ${stats.processedFiles}/${files.length} files processed`);
    }
  }
  
  // Output statistics
  console.log('\n===== Translation Results =====');
  console.log(`Processed files: ${stats.processedFiles}`);
  console.log(`Files with translations: ${stats.translatedFiles}`);
  console.log(`Total comments translated: ${stats.translatedComments}`);
  console.log(`Failed translations: ${stats.failedTranslations}`);
  
  if (stats.failedTranslations > 0) {
    console.log('\nNote: Some translations are incomplete. Search for [INCOMPLETE TRANSLATION] in your code to fix them manually.');
  }
}

// Run the translator
runTranslator().catch(error => {
  console.error('Translation process failed:', error);
}); 