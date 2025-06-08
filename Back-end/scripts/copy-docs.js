/**
 * 文档复制脚本
 * 
 * 此脚本将整合后的文档从Back-end/docs复制到根目录的docs文件夹，
 * 确保文档集中在一处，便于团队成员访问。
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 路径配置
const backendDocsPath = path.join(__dirname, '..', 'docs');
const rootDocsPath = path.join(__dirname, '..', '..', 'docs');

// 确保目标目录存在
function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
    console.log(`创建目录: ${directory}`);
  }
}

// 递归复制目录
function copyDirectory(source, destination) {
  ensureDirectoryExists(destination);
  
  // 读取源目录内容
  const files = fs.readdirSync(source);
  
  files.forEach(file => {
    const sourcePath = path.join(source, file);
    const destPath = path.join(destination, file);
    
    const stats = fs.statSync(sourcePath);
    
    if (stats.isDirectory()) {
      // 递归复制子目录
      copyDirectory(sourcePath, destPath);
    } else {
      // 复制文件
      fs.copyFileSync(sourcePath, destPath);
      console.log(`复制文件: ${sourcePath} -> ${destPath}`);
    }
  });
}

// 执行复制
try {
  console.log('开始复制文档...');
  copyDirectory(backendDocsPath, rootDocsPath);
  console.log('文档复制完成!');
} catch (error) {
  console.error('复制文档时出错:', error);
} 