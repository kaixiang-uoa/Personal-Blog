/**
 * comment linter tool
 * check if the code comments are in the correct format
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// project root directory
const ROOT_DIR = path.join(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');

// file extensions to check
const EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx'];

// directories to ignore
const IGNORE_DIRS = ['node_modules', 'dist', 'build', 'coverage', 'logs', 'uploads', 'public'];

// issue types
const ISSUE_TYPES = {
  UPPERCASE_COMMENT: 'uppercase comment',
  COMMENT_ENDS_WITH_PERIOD: 'comment ends with period',
  COMMENT_WITHOUT_SPACE: 'comment without space',
  REDUNDANT_COMMENT: 'redundant comment',
  TOO_MANY_COMMENTS: 'too many comments',
  OUTDATED_COMMENT: 'outdated comment',
  COMMENTED_CODE: 'commented code block'
};

// possible redundant comment starts
const REDUNDANT_STARTS = [
  'create', 'initialize', 'set', 'get', 'return', 'define',
  '创建', '初始化', '设置', '获取', '返回', '定义'
];

/**
 * check comments in files
 * @param {string} filePath - file path
 * @returns {Array} issue list
 */
function checkFileComments(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const issues = [];
    let commentCount = 0;
    let codeCount = 0;
    let inBlockComment = false;
    // let lastCommentLine = -1;
    const commentedCodeBlocks = [];
    let currentCommentBlock = [];

    // process each line
    lines.forEach((line, index) => {
      const lineNumber = index + 1;
      const trimmedLine = line.trim();
      
      // skip empty lines
      if (!trimmedLine) return;
      
      // process block comment start and end
      if (trimmedLine.startsWith('/*')) {
        inBlockComment = true;
        commentCount++;
      } 
      
      if (inBlockComment && trimmedLine.endsWith('*/')) {
        inBlockComment = false;
      }
      
      // check line comments
      if (trimmedLine.startsWith('//')) {
        commentCount++;
        lastCommentLine = lineNumber;
        
        // check spaces after comments
        if (!trimmedLine.startsWith('// ') && trimmedLine.length > 2) {
          issues.push({
            line: lineNumber,
            type: ISSUE_TYPES.COMMENT_WITHOUT_SPACE,
            text: trimmedLine
          });
        }
        
        // extract comment content
        const commentText = trimmedLine.substring(2).trim();
        
        // check uppercase first letter
        if (commentText && /^[A-Z]/.test(commentText)) {
          issues.push({
            line: lineNumber,
            type: ISSUE_TYPES.UPPERCASE_COMMENT,
            text: trimmedLine
          });
        }
        
        // check if ends with period
        if (commentText && /[.。]$/.test(commentText)) {
          issues.push({
            line: lineNumber,
            type: ISSUE_TYPES.COMMENT_ENDS_WITH_PERIOD,
            text: trimmedLine
          });
        }
        
        // check if it's a comment about code
        if (commentText && (
          commentText.includes('=') || 
          commentText.includes('(') && commentText.includes(')') ||
          /^(if|for|while|switch|function|const|let|var)/.test(commentText)
        )) {
          currentCommentBlock.push({ line: lineNumber, text: commentText });
        } else if (currentCommentBlock.length > 0) {
          if (currentCommentBlock.length >= 2) {
            commentedCodeBlocks.push([...currentCommentBlock]);
          }
          currentCommentBlock = [];
        }
        
        // check redundant comments
        for (const start of REDUNDANT_STARTS) {
          if (commentText.toLowerCase().startsWith(start.toLowerCase())) {
            // check if the next line matches the comment
            const nextLine = lines[index + 1]?.trim();
            if (nextLine && !nextLine.startsWith('//') && !nextLine.startsWith('*')) {
              // ignore function comments
              if (index > 0 && !lines[index - 1].trim().startsWith('*')) {
                issues.push({
                  line: lineNumber,
                  type: ISSUE_TYPES.REDUNDANT_COMMENT,
                  text: trimmedLine
                });
              }
            }
          }
        }
      } else if (!inBlockComment && !trimmedLine.startsWith('*')) {
        // count code lines
        codeCount++;
      }
    });
    
    // check commented code blocks
    commentedCodeBlocks.forEach(block => {
      issues.push({
        line: block[0].line,
        type: ISSUE_TYPES.COMMENTED_CODE,
        text: `${block.length} lines of commented code`
      });
    });
    
    // check comment to code ratio
    const commentRatio = commentCount / (commentCount + codeCount);
    if (commentCount > 10 && commentRatio > 0.4) {
      issues.push({
        line: 1,
        type: ISSUE_TYPES.TOO_MANY_COMMENTS,
        text: `too many comments (${Math.round(commentRatio * 100)}%)`
      });
    }
    
    return issues;
  } catch (error) {
    console.error(`failed to check file: ${filePath}`, error);
    return [];
  }
}

/**
 * recursively find files to check
 * @param {string} dir - directory path
 * @returns {Array} file path list
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
 * run the linter and output the results
 */
function runLinter() {
  const files = findFiles(SRC_DIR);
  let totalIssues = 0;
  let filesWithIssues = 0;
  
  // count issues by type
  const issuesByType = {};
  Object.values(ISSUE_TYPES).forEach(type => {
    issuesByType[type] = 0;
  });
  
  // files with severe issues
  const severeIssueFiles = [];
  
  files.forEach(file => {
    const relativePath = path.relative(ROOT_DIR, file);
    const issues = checkFileComments(file);
    
    if (issues.length > 0) {
      filesWithIssues++;
      totalIssues += issues.length;
      
      // count issues by type
      issues.forEach(issue => {
        issuesByType[issue.type] = (issuesByType[issue.type] || 0) + 1;
      });
      
      // check if there are severe issues
      const severeIssues = issues.filter(issue => 
        issue.type === ISSUE_TYPES.COMMENTED_CODE || 
        issue.type === ISSUE_TYPES.TOO_MANY_COMMENTS
      );
      
      if (severeIssues.length > 0) {
        severeIssueFiles.push({
          file: relativePath,
          issues: severeIssues
        });
      }
      
      // output file issues
      console.log(`\nfile: ${relativePath}`);
      console.log('issues:');
      issues.forEach(issue => {
        console.log(`  行 ${issue.line}: ${issue.type} - ${issue.text}`);
      });
    }
  });
  
  // output statistics
  console.log('\n===== comment check results =====');
  console.log(`checked files: ${files.length}`);
  console.log(`files with issues: ${filesWithIssues}`);
  console.log(`total issues: ${totalIssues}`);
  
  // output issue type statistics
  console.log('\nissue type statistics:');
  Object.entries(issuesByType).forEach(([type, count]) => {
    if (count > 0) {
      console.log(`  ${type}: ${count}`);
    }
  });
  
  // output files with severe issues
  if (severeIssueFiles.length > 0) {
    console.log('\nfiles with severe issues:');
    severeIssueFiles.forEach(item => {
      console.log(`  ${item.file}`);
      item.issues.forEach(issue => {
        console.log(`    - ${issue.type}`);
      });
    });
  }
}

// run the linter
runLinter(); 