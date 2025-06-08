/**
 * comment fixer tool
 * automatically fix common comment issues in the code
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

// file extensions to process
const EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx'];

// directories to ignore
const IGNORE_DIRS = ['node_modules', 'dist', 'build', 'coverage', 'logs', 'uploads', 'public'];

// fix type statistics
const fixStats = {
  fixedFiles: 0,
  spaceFixes: 0,
  uppercaseFixes: 0,
  periodFixes: 0
};

/**
 * fix comments in files
 * @param {string} filePath - file path
 * @returns {boolean} whether the file was modified
 */
function fixFileComments(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    let modified = false;
    let spaceFixed = 0;
    let uppercaseFixed = 0;
    let periodFixed = 0;

    // fix each line
    const fixedLines = lines.map(line => {
      const trimmedLine = line.trim();
      
      // only process line comments
      if (trimmedLine.startsWith('//')) {
        let fixedLine = line;
        
        // fix spaces after comments
        if (!trimmedLine.startsWith('// ') && trimmedLine.length > 2) {
          const index = line.indexOf('//');
          fixedLine = line.substring(0, index + 2) + ' ' + line.substring(index + 2);
          modified = true;
          spaceFixed++;
        }
        
        // extract comment content
        const commentStartIndex = fixedLine.indexOf('//') + 2;
        let commentText = fixedLine.substring(commentStartIndex).trim();
        let leadingSpaces = fixedLine.substring(0, commentStartIndex);
        let trailingSpaces = '';
        
        // keep spaces after comments
        const match = /^(\s*)(.+?)(\s*)$/.exec(commentText);
        if (match) {
          commentText = match[2];
          trailingSpaces = match[3];
        }
        
        // fix uppercase first letter
        if (commentText && /^[A-Z]/.test(commentText) && !/^[A-Z]+$/.test(commentText.split(' ')[0])) {
          // do not fix constants, class names, and proper nouns
          if (!/^[A-Z][a-z]+|API|URL|ID|UI|HTTP|JWT|JSON|XML|HTML|CSS|ES6|[A-Z]+-[A-Z]+/.test(commentText.split(' ')[0])) {
            commentText = commentText.charAt(0).toLowerCase() + commentText.slice(1);
            modified = true;
            uppercaseFixed++;
          }
        }
        
        // fix comments ending with a period
        if (commentText && /[.。]$/.test(commentText)) {
          commentText = commentText.replace(/[.。]$/, '');
          modified = true;
          periodFixed++;
        }
        
        // rebuild the fixed line
        if (modified) {
          return `${leadingSpaces}${commentText}${trailingSpaces}`;
        }
      }
      
      return line;
    });
    
    // if modified, write back to file
    if (modified) {
      fs.writeFileSync(filePath, fixedLines.join('\n'), 'utf8');
      fixStats.fixedFiles++;
      fixStats.spaceFixes += spaceFixed;
      fixStats.uppercaseFixes += uppercaseFixed;
      fixStats.periodFixes += periodFixed;
      
      console.log(`fixed file: ${path.relative(ROOT_DIR, filePath)}`);
      if (spaceFixed > 0) console.log(`  - space issue: ${spaceFixed}`);
      if (uppercaseFixed > 0) console.log(`  - uppercase issue: ${uppercaseFixed}`);
      if (periodFixed > 0) console.log(`  - period issue: ${periodFixed}`);
    }
    
    return modified;
  } catch (error) {
    console.error(`failed to fix file: ${filePath}`, error);
    return false;
  }
}

/**
 * recursively find files to process
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
 * run the fixer and output the results
 */
function runFixer() {
  console.log('starting to fix comment issues...');
  
  const files = findFiles(SRC_DIR);
  console.log(`found ${files.length} files to check`);
  
  files.forEach(file => {
    fixFileComments(file);
  });
  
  // output statistics
  console.log('\n===== comment fix results =====');
  console.log(`total files: ${files.length}`);
  console.log(`fixed files: ${fixStats.fixedFiles}`);
  console.log(`space issue fixed: ${fixStats.spaceFixes}`);
  console.log(`uppercase issue fixed: ${fixStats.uppercaseFixes}`);
  console.log(`period issue fixed: ${fixStats.periodFixes}`);
}

// run the fixer
runFixer(); 