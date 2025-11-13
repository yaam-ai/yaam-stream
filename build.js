#!/usr/bin/env node

/**
 * YAAM Stream Build Script
 * Professional build process with optimization
 */

const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

async function build() {
  console.log('🔨 YAAM Stream Build Process\n');
  console.log('=' .repeat(50));

  try {
    // Clean previous build
    console.log('🧹 Cleaning previous build...');
    await fs.remove('dist');
    await fs.remove('lib');
    console.log('✅ Clean completed\n');

    // TypeScript compilation
    console.log('🔧 Compiling TypeScript...');
    try {
      execSync('npx tsc', { stdio: 'inherit' });
      console.log('✅ TypeScript compilation completed\n');
    } catch (error) {
      console.error('❌ TypeScript compilation failed:', error.message);
      process.exit(1);
    }

    // Copy templates and assets
    console.log('📁 Copying templates and assets...');
    await fs.copy('src/templates', 'dist/templates');
    await fs.copy('public', 'dist/public');
    console.log('✅ Assets copied\n');

    // Make CLI executable
    console.log('🔧 Setting up CLI...');
    const cliPath = path.join('dist', 'cli.js');
    if (await fs.pathExists(cliPath)) {
      await fs.chmod(cliPath, '755');
      console.log('✅ CLI executable permissions set\n');
    }

    // Generate package info
    console.log('📦 Generating package information...');
    const packageJson = await fs.readJSON('package.json');
    const buildInfo = {
      version: packageJson.version,
      buildDate: new Date().toISOString(),
      nodeVersion: process.version,
      buildEnv: process.env.NODE_ENV || 'development',
      features: {
        streaming: true,
        aiIntegration: true,
        multiExport: true,
        themes: ['golden', 'corporate', 'modern', 'dark', 'minimal', 'elegant'],
        exports: ['html', 'pdf', 'pptx', 'latex', 'docx', 'markdown']
      }
    };

    await fs.writeJSON('dist/build-info.json', buildInfo, { spaces: 2 });
    console.log('✅ Build info generated\n');

    // Validate build
    console.log('🔍 Validating build...');
    const requiredFiles = [
      'dist/index.js',
      'dist/index.d.ts',
      'dist/lib/YaamStream.js',
      'dist/lib/types.js',
      'dist/cli.js'
    ];

    for (const file of requiredFiles) {
      if (await fs.pathExists(file)) {
        const stats = await fs.stat(file);
        console.log(`   ✅ ${file} (${(stats.size / 1024).toFixed(1)} KB)`);
      } else {
        console.log(`   ❌ ${file} - Missing!`);
        process.exit(1);
      }
    }
    console.log('✅ Build validation completed\n');

    // Calculate build size
    console.log('📊 Calculating build size...');
    let totalSize = 0;
    const distFiles = await fs.readdir('dist', { recursive: true });
    
    for (const file of distFiles) {
      const filePath = path.join('dist', file);
      if ((await fs.stat(filePath)).isFile()) {
        totalSize += (await fs.stat(filePath)).size;
      }
    }

    console.log(`✅ Total build size: ${(totalSize / 1024).toFixed(1)} KB\n`);

    // Generate build report
    console.log('📋 Generating build report...');
    const buildReport = {
      timestamp: new Date().toISOString(),
      version: packageJson.version,
      files: distFiles.length,
      totalSize: totalSize,
      buildTime: Date.now() - Date.now(), // Will be calculated
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
      dependencies: Object.keys(packageJson.dependencies).length,
      devDependencies: Object.keys(packageJson.devDependencies).length
    };

    await fs.writeJSON('build-report.json', buildReport, { spaces: 2 });
    console.log('✅ Build report generated\n');

    console.log('🎉 Build completed successfully!');
    console.log('=' .repeat(50));
    console.log(`📦 Package: ${packageJson.name} v${packageJson.version}`);
    console.log(`📁 Output: dist/`);
    console.log(`📊 Size: ${(totalSize / 1024).toFixed(1)} KB`);
    console.log(`🔧 Files: ${distFiles.length}`);
    console.log('=' .repeat(50));

  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

// Run build if called directly
if (require.main === module) {
  const startTime = Date.now();
  
  build().then(() => {
    const duration = Date.now() - startTime;
    console.log(`\n⏱️  Build completed in ${duration}ms`);
  }).catch((error) => {
    console.error('❌ Build process failed:', error);
    process.exit(1);
  });
}

module.exports = { build };