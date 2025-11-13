#!/usr/bin/env node
/**
 * Automated TypeScript error fixer
 * Systematically fixes common TypeScript errors
 */

const fs = require('fs');
const path = require('path');

// Files to fix
const files = [
  'src/cli.ts',
  'src/lib/ai.ts',
  'src/lib/exporters.ts',
  'src/lib/performance.ts',
  'src/lib/plugins.ts',
  'src/lib/streaming.ts',
  'src/lib/themes.ts',
  'src/lib/utils.ts',
  'src/lib/validators.ts',
  'src/lib/YaamStream.ts'
];

function fixFile(filepath) {
  console.log(`Fixing ${filepath}...`);
  let content = fs.readFileSync(filepath, 'utf8');
  const original = content;
  
  // Fix error handling (error.message when error is unknown)
  content = content.replace(
    /catch\s*\(error\)\s*{([^}]*?)error\.message/gs,
    'catch (error) {$1(error instanceof Error ? error.message : String(error))'
  );
  content = content.replace(
    /catch\s*\(error\)\s*{([^}]*?)error\.stack/gs,
    'catch (error) {$1(error instanceof Error ? error.stack : "")'
  );
  
  // Fix process.env.AI_API_KEY to process.env['AI_API_KEY']
  content = content.replace(/process\.env\.AI_API_KEY/g, "process.env['AI_API_KEY']");
  
  // Fix spinner.text assignments (return void not string)
  content = content.replace(
    /onStart:\s*\(\)\s*=>\s*spinner\.text\s*=/g,
    'onStart: () => { spinner.text ='
  ).replace(
    /onStart:\s*\(\)\s*=>\s*\{\s*spinner\.text\s*=\s*([^,]+),/g,
    'onStart: () => { spinner.text = $1; },'
  );
  
  //  Fix unused parameters by prefixing with underscore
  content = content.replace(/\((\w+),\s*index\)\s*=>/g, '(_$1, index) =>');
  content = content.replace(/\(pluginManager:\s*any\)/g, '(_pluginManager: any)');
  content = content.replace(/,\s*(config:\s*YaamConfig)\)/g, ', _$1)');
  content = content.replace(/,\s*(provider:\s*AIProvider)\)/g, ', _$1)');
  content = content.replace(/,\s*(streamId:\s*string)\)/g, ', _$1)');
  content = content.replace(/(preserveStructure:\s*boolean)/g, '_$1');
  
  // Fix unused variables
  content = content.replace(/const\s+(html|cursorEnabled|config|performanceMonitor|securityManager)\s*=/g, 'const _$1 =');
  
  // Fix unused imports - comment them out
  content = content.replace(/^import \* as (fs|path) from/gm, '// import * as $1 from');
  content = content.replace(/^\s*(AIPrompt|Section|ExportFormat|StreamMode|ThemeName|AIProvider|ERROR_CODES|SUCCESS_CODES|DEFAULT_ANIMATION_SPEED|DEFAULT_EXPORT_QUALITY|StreamMessage),?$/gm, '  // $1,');
  
  if (content !== original) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`  ✓ Fixed ${filepath}`);
  } else {
    console.log(`  - No changes needed for ${filepath}`);
  }
}

// Run fixes
files.forEach(f => {
  const fullPath = path.join(__dirname, f);
  if (fs.existsSync(fullPath)) {
    fixFile(fullPath);
  }
});

console.log('\n✅ Automated fixes complete!');
console.log('Run "npm run build" to check remaining errors.');
