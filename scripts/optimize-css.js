const fs = require('fs');
const path = require('path');

// Script to help identify and optimize CSS usage
function analyzeCSSUsage() {
  console.log('🔍 Analyzing CSS usage...');
  
  // Check if there are any unused CSS files
  const publicDir = path.join(process.cwd(), 'public');
  const cssFiles = [];
  
  if (fs.existsSync(publicDir)) {
    const files = fs.readdirSync(publicDir, { recursive: true });
    files.forEach(file => {
      if (file.endsWith('.css')) {
        cssFiles.push(file);
      }
    });
  }
  
  if (cssFiles.length > 0) {
    console.log('⚠️  Found static CSS files that may be causing performance issues:');
    cssFiles.forEach(file => console.log(`   - ${file}`));
    console.log('💡 Consider removing these files and using Next.js CSS modules instead.');
  } else {
    console.log('✅ No static CSS files found in public directory.');
  }
  
  // Check globals.css size
  const globalsPath = path.join(process.cwd(), 'src/app/globals.css');
  if (fs.existsSync(globalsPath)) {
    const stats = fs.statSync(globalsPath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`📊 globals.css size: ${sizeKB}KB`);
    
    if (stats.size > 10000) { // 10KB
      console.log('⚠️  globals.css is quite large. Consider splitting into smaller modules.');
    }
  }
  
  console.log('✨ CSS optimization analysis complete!');
}

if (require.main === module) {
  analyzeCSSUsage();
}

module.exports = { analyzeCSSUsage };