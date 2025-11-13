#!/usr/bin/env node

/**
 * YAAM Stream CLI - Command Line Interface
 * Professional document streaming with AI integration
 */

import { Command } from 'commander';
import * as chalk from 'chalk';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as yaml from 'js-yaml';
import * as ora from 'ora';

import { YaamStream } from './lib/YaamStream';
import { 
  YaamStreamOptions, 
  YaamConfig, 
  DocumentData,
  ExportFormat,
  ThemeName,
  AIProvider,
  StreamMode
} from './types';

const program = new Command();
const packageJson = require('../package.json');

// CLI Configuration
program
  .name('yaam-stream')
  .description('Professional animated document streaming library with AI integration')
  .version(packageJson.version);

// Generate command
program
  .command('generate')
  .alias('gen')
  .description('Generate animated document from JSON data')
  .option('-d, --data <path>', 'JSON data file path')
  .option('-c, --config <path>', 'YAML configuration file path')
  .option('-o, --output <path>', 'Output directory')
  .option('-t, --theme <theme>', 'Theme name (golden, corporate, modern, dark, minimal, elegant)')
  .option('-f, --format <format>', 'Export format (html, pdf, pptx, latex, docx, markdown)')
  .option('-s, --stream', 'Enable real-time streaming')
  .option('-p, --port <number>', 'Streaming server port', '3000')
  .option('--ai-provider <provider>', 'AI provider (claude, openai, deepseek)')
  .option('--ai-key <key>', 'AI API key')
  .option('--ai-prompt <prompt>', 'AI processing prompt')
  .option('--speed <number>', 'Animation speed (ms per character)', '25')
  .option('--quality <quality>', 'Export quality (screen, print, press)', 'print')
  .option('--orientation <orientation>', 'Page orientation (portrait, landscape)', 'portrait')
  .option('--pagesize <size>', 'Page size (A4, letter, legal)', 'A4')
  .option('--watermark <text>', 'Watermark text')
  .option('--no-animations', 'Disable animations')
  .option('--no-cursor', 'Disable typing cursor')
  .option('--verbose', 'Verbose logging')
  .action(async (options) => {
    const spinner = ora('Initializing YAAM Stream...').start();
    
    try {
      // Build configuration
      const config = await buildConfig(options);
      
      // Build data
      const data = await buildData(options);
      
      // Create options
      const yaamOptions: YaamStreamOptions = {
        data,
        config,
        output: options.output,
        hooks: {
          onStart: () => spinner.text = 'Starting document generation...',
          onSectionStart: (section, index) => {
            spinner.text = `Processing section ${index + 1}...`;
          },
          onProgress: (current, total) => {
            spinner.text = `Progress: ${current}/${total}`;
          },
          onComplete: (stats) => {
            spinner.succeed(`Document generated successfully!`);
            console.log(chalk.green('✓ Generation completed'));
            console.log(chalk.gray(`  Duration: ${stats.duration}ms`));
            console.log(chalk.gray(`  Sections: ${stats.sectionsProcessed}`));
            console.log(chalk.gray(`  Characters: ${stats.charactersWritten.toLocaleString()}`));
          },
          onError: (error, context) => {
            spinner.fail(`Error in ${context}: ${error.message}`);
            console.error(chalk.red('✗ Error:'), error.message);
          }
        }
      };
      
      // Initialize YAAM Stream
      const yaam = new YaamStream(yaamOptions);
      
      if (options.verbose) {
        yaam.on('streamData', (data) => {
          console.log(chalk.blue('📡 Stream:'), data.type, data.id);
        });
      }
      
      // Start streaming server if requested
      if (options.stream) {
        spinner.text = 'Starting streaming server...';
        await yaam.startServer(parseInt(options.port));
        console.log(chalk.cyan('🌐 Streaming server started on port'), options.port);
      }
      
      // Generate document
      spinner.text = 'Generating document...';
      const html = await yaam.generate({ stream: options.stream });
      
      // Export if format specified
      if (options.format) {
        spinner.text = 'Exporting document...';
        const formats = options.format.split(',').map((f: string) => f.trim() as ExportFormat);
        const results = await yaam.export(formats);
        
        console.log(chalk.green('✓ Export completed'));
        results.forEach(result => {
          console.log(chalk.gray(`  ${result.format.toUpperCase()}: ${result.filename} (${result.size.toLocaleString()} bytes)`));
        });
      }
      
      // Save HTML if no specific format or HTML is included
      if (!options.format || options.format.includes('html')) {
        const outputPath = path.join(options.output || process.cwd(), 'document.html');
        await fs.writeFile(outputPath, html, 'utf8');
        console.log(chalk.green('✓ HTML saved to'), outputPath);
      }
      
      // AI processing if requested
      if (options.aiPrompt && config.ai?.enabled) {
        spinner.text = 'Processing with AI...';
        await yaam.processWithAI(options.aiPrompt);
        console.log(chalk.green('✓ AI processing completed'));
      }
      
      // Keep server running if streaming
      if (options.stream) {
        console.log(chalk.cyan('🚀 Streaming server is running. Press Ctrl+C to stop.'));
        process.on('SIGINT', async () => {
          console.log(chalk.yellow('🛑 Stopping streaming server...'));
          await yaam.stopServer();
          await yaam.cleanup();
          process.exit(0);
        });
      } else {
        await yaam.cleanup();
      }
      
    } catch (error) {
      spinner.fail('Generation failed');
      console.error(chalk.red('✗ Error:'), error.message);
      if (options.verbose) {
        console.error(error.stack);
      }
      process.exit(1);
    }
  });

// Stream command
program
  .command('stream')
  .description('Start streaming server only')
  .option('-p, --port <number>', 'Server port', '3000')
  .option('-h, --host <host>', 'Server host', 'localhost')
  .option('-c, --config <path>', 'Configuration file path')
  .option('--cors', 'Enable CORS')
  .option('--auth <token>', 'Authentication token')
  .action(async (options) => {
    const spinner = ora('Starting streaming server...').start();
    
    try {
      const config = await buildConfig(options);
      
      const yaam = new YaamStream({ config });
      
      await yaam.startServer(parseInt(options.port), options.host);
      
      spinner.succeed('Streaming server started');
      console.log(chalk.cyan('🌐 Server running on'), `${options.host}:${options.port}`);
      console.log(chalk.gray('📡 Mode:'), config.streaming?.mode || 'websocket');
      console.log(chalk.gray('🔐 Auth:'), options.auth ? 'Enabled' : 'Disabled');
      
      // Handle graceful shutdown
      process.on('SIGINT', async () => {
        console.log(chalk.yellow('🛑 Stopping server...'));
        await yaam.stopServer();
        await yaam.cleanup();
        process.exit(0);
      });
      
    } catch (error) {
      spinner.fail('Failed to start server');
      console.error(chalk.red('✗ Error:'), error.message);
      process.exit(1);
    }
  });

// Export command
program
  .command('export')
  .description('Export existing HTML to different formats')
  .requiredOption('-i, --input <path>', 'Input HTML file')
  .option('-f, --format <format>', 'Export format (pdf, pptx, latex, docx, markdown)', 'pdf')
  .option('-o, --output <path>', 'Output directory')
  .option('-c, --config <path>', 'Configuration file path')
  .option('--quality <quality>', 'Export quality', 'print')
  .action(async (options) => {
    const spinner = ora('Exporting document...').start();
    
    try {
      // Read input HTML
      const html = await fs.readFile(options.input, 'utf8');
      
      // Build configuration
      const config = await buildConfig(options);
      
      // Create YAAM instance
      const yaam = new YaamStream({ config });
      
      // Export
      const results = await yaam.export(options.format.split(',').map((f: string) => f.trim() as ExportFormat));
      
      spinner.succeed('Export completed');
      
      results.forEach(result => {
        console.log(chalk.green('✓'), chalk.gray(`${result.format.toUpperCase()}:`), result.filename);
      });
      
      await yaam.cleanup();
      
    } catch (error) {
      spinner.fail('Export failed');
      console.error(chalk.red('✗ Error:'), error.message);
      process.exit(1);
    }
  });

// AI command
program
  .command('ai')
  .description('Process document with AI')
  .requiredOption('-d, --data <path>', 'JSON data file')
  .requiredOption('-p, --prompt <prompt>', 'AI processing prompt')
  .option('--provider <provider>', 'AI provider', 'openai')
  .option('--key <key>', 'AI API key')
  .option('--model <model>', 'AI model')
  .option('-o, --output <path>', 'Output file for processed data')
  .action(async (options) => {
    const spinner = ora('Processing with AI...').start();
    
    try {
      // Build AI configuration
      const aiConfig = {
        enabled: true,
        provider: options.provider as AIProvider,
        apiKey: options.key || process.env.AI_API_KEY,
        model: options.model
      };
      
      // Read data
      const dataPath = path.resolve(options.data);
      const dataContent = await fs.readFile(dataPath, 'utf8');
      const data = JSON.parse(dataContent);
      
      // Create YAAM instance
      const yaam = new YaamStream({ 
        data,
        config: { ai: aiConfig }
      });
      
      // Process with AI
      const result = await yaam.processWithAI(options.prompt);
      
      // Save result
      const outputPath = options.output || `${dataPath.replace('.json', '')}-ai-processed.json`;
      await fs.writeFile(outputPath, JSON.stringify(result, null, 2), 'utf8');
      
      spinner.succeed('AI processing completed');
      console.log(chalk.green('✓ Result saved to'), outputPath);
      
      await yaam.cleanup();
      
    } catch (error) {
      spinner.fail('AI processing failed');
      console.error(chalk.red('✗ Error:'), error.message);
      process.exit(1);
    }
  });

// Config command
program
  .command('config')
  .description('Generate configuration template')
  .option('-o, --output <path>', 'Output file path')
  .option('--theme <theme>', 'Theme name')
  .option('--format <format>', 'Default export format')
  .action(async (options) => {
    try {
      const configTemplate = generateConfigTemplate(options);
      const outputPath = options.output || 'yaam-config.yaml';
      
      await fs.writeFile(outputPath, configTemplate, 'utf8');
      
      console.log(chalk.green('✓ Configuration template generated:'), outputPath);
      console.log(chalk.gray('💡 Edit the file and use with --config option'));
      
    } catch (error) {
      console.error(chalk.red('✗ Error:'), error.message);
      process.exit(1);
    }
  });

// Theme command
program
  .command('theme')
  .description('Theme management')
  .option('--list', 'List available themes')
  .option('--preview <theme>', 'Show theme preview')
  .option('--export <theme>', 'Export theme as JSON')
  .option('--import <path>', 'Import theme from JSON')
  .action(async (options) => {
    try {
      const { ThemeManager } = await import('./lib/themes');
      const logger = { info: console.log, error: console.error } as any;
      const themeManager = new ThemeManager(logger);
      
      if (options.list) {
        const themes = themeManager.getAvailableThemes();
        console.log(chalk.cyan('Available themes:'));
        themes.forEach(theme => {
          console.log(chalk.gray('  •'), theme);
        });
      }
      
      if (options.preview) {
        const preview = themeManager.getThemePreview(options.preview as ThemeName);
        if (preview) {
          console.log(chalk.cyan(`Preview for ${options.preview}:`));
          console.log(preview.preview);
        } else {
          console.error(chalk.red('✗ Theme not found:'), options.preview);
        }
      }
      
      if (options.export) {
        const themeJSON = themeManager.exportTheme(options.export as ThemeName);
        const outputPath = `${options.export}-theme.json`;
        await fs.writeFile(outputPath, themeJSON, 'utf8');
        console.log(chalk.green('✓ Theme exported to'), outputPath);
      }
      
      if (options.import) {
        const themeJSON = await fs.readFile(options.import, 'utf8');
        const customTheme = await themeManager.importTheme(themeJSON);
        console.log(chalk.green('✓ Theme imported:'), customTheme.name);
      }
      
    } catch (error) {
      console.error(chalk.red('✗ Error:'), error.message);
      process.exit(1);
    }
  });

// Info command
program
  .command('info')
  .description('Show system information')
  .action(async () => {
    console.log(chalk.cyan('YAAM Stream Information'));
    console.log(chalk.gray('Version:'), packageJson.version);
    console.log(chalk.gray('Node:'), process.version);
    console.log(chalk.gray('Platform:'), process.platform);
    console.log(chalk.gray('Architecture:'), process.arch);
    console.log(chalk.gray('Memory:'), Math.round(process.memoryUsage().heapUsed / 1024 / 1024), 'MB');
    console.log(chalk.gray('Uptime:'), Math.round(process.uptime()), 'seconds');
  });

/**
 * Build configuration from CLI options
 */
async function buildConfig(options: any): Promise<YaamConfig> {
  let config: YaamConfig = {};
  
  // Load from file if specified
  if (options.config) {
    const configPath = path.resolve(options.config);
    if (await fs.pathExists(configPath)) {
      const content = await fs.readFile(configPath, 'utf8');
      const ext = path.extname(configPath).toLowerCase();
      
      if (ext === '.yaml' || ext === '.yml') {
        config = yaml.load(content) as YaamConfig;
      } else if (ext === '.json') {
        config = JSON.parse(content);
      }
    }
  }
  
  // Override with CLI options
  if (options.theme) config.theme = options.theme as ThemeName;
  if (options.speed) {
    config.animation = config.animation || {};
    config.animation.speed = parseInt(options.speed);
  }
  if (options.animations === false) {
    config.animation = config.animation || {};
    config.animation.effects = { typewriter: false, fadeIn: false, slideIn: false };
  }
  if (options.cursor === false) {
    config.animation = config.animation || {};
    config.animation.effects = { ...config.animation.effects, cursor: false };
  }
  if (options.format) {
    config.export = config.export || {};
    config.export.format = options.format.split(',').map((f: string) => f.trim() as ExportFormat);
  }
  if (options.quality) config.export = { ...config.export, quality: options.quality };
  if (options.orientation) {
    config.layout = config.layout || {};
    config.layout.orientation = options.orientation;
  }
  if (options.pagesize) {
    config.layout = config.layout || {};
    config.layout.pageSize = options.pagesize;
  }
  if (options.watermark) {
    config.watermark = { enabled: true, text: options.watermark };
  }
  if (options.stream) {
    config.streaming = {
      mode: 'websocket' as StreamMode,
      port: parseInt(options.port),
      cors: true
    };
  }
  if (options.aiProvider || options.aiKey) {
    config.ai = {
      enabled: true,
      provider: options.aiProvider as AIProvider,
      apiKey: options.aiKey || process.env.AI_API_KEY
    };
  }
  if (options.auth) {
    config.streaming = {
      ...config.streaming,
      authentication: { enabled: true, token: options.auth }
    };
  }
  
  return config;
}

/**
 * Build data from CLI options
 */
async function buildData(options: any): Promise<DocumentData> {
  if (!options.data) {
    // Create sample data
    return {
      cover: {
        category: "Sample Document",
        title: "YAAM Stream Demo",
        subtitle: "Professional Document Generation",
        meta: [
          { label: "Date", value: new Date().toLocaleDateString() },
          { label: "Version", value: packageJson.version }
        ]
      },
      sections: [
        {
          type: 'content',
          title: "Welcome to YAAM Stream",
          subtitle: "Next-Generation Document Streaming",
          content: "YAAM Stream is a professional document streaming library that transforms static documents into immersive, animated experiences. With support for multiple export formats, AI integration, and real-time streaming, it represents the future of document generation."
        },
        {
          type: 'highlights',
          title: "Key Features",
          subtitle: "Professional Capabilities",
          items: [
            { icon: "🎨", title: "Premium Themes", text: "Multiple professionally designed themes including Golden, Corporate, Modern, and more." },
            { icon: "🚀", title: "Real-time Streaming", text: "WebSocket-based streaming with multiple transport modes for live document updates." },
            { icon: "🤖", title: "AI Integration", text: "Built-in support for Claude, ChatGPT, DeepSeek, and custom AI providers." },
            { icon: "📊", title: "Multi-format Export", text: "Export to HTML, PDF, PowerPoint, LaTeX, DOCX, and Markdown formats." },
            { icon: "⚡", title: "High Performance", text: "Optimized rendering with caching, compression, and parallel processing." },
            { icon: "🔧", title: "Developer Friendly", text: "TypeScript support, comprehensive CLI, and extensive configuration options." }
          ]
        }
      ]
    };
  }
  
  const dataPath = path.resolve(options.data);
  const content = await fs.readFile(dataPath, 'utf8');
  const ext = path.extname(dataPath).toLowerCase();
  
  if (ext === '.json') {
    return JSON.parse(content);
  } else if (ext === '.yaml' || ext === '.yml') {
    return yaml.load(content) as DocumentData;
  } else {
    // Try JSON first, then YAML
    try {
      return JSON.parse(content);
    } catch {
      return yaml.load(content) as DocumentData;
    }
  }
}

/**
 * Generate configuration template
 */
function generateConfigTemplate(options: any): string {
  const config: YaamConfig = {
    theme: options.theme || 'golden',
    animation: {
      speed: 25,
      autoScroll: true,
      scrollDelay: 3000,
      effects: {
        typewriter: true,
        fadeIn: true,
        slideIn: true,
        cursor: true
      }
    },
    layout: {
      orientation: 'portrait',
      pageSize: 'A4',
      margins: {
        top: 1,
        right: 1,
        bottom: 1,
        left: 1
      }
    },
    export: {
      format: options.format ? [options.format as ExportFormat] : ['html'],
      quality: 'print',
      embedFonts: true,
      compress: false
    },
    streaming: {
      mode: 'websocket',
      port: 3000,
      host: 'localhost',
      cors: true
    },
    watermark: {
      enabled: false,
      text: 'Confidential',
      opacity: 0.3,
      position: 'diagonal'
    },
    seo: {
      title: 'YAAM Stream Document',
      description: 'Generated with YAAM Stream professional document library',
      author: 'YAAM Stream'
    }
  };
  
  return `# YAAM Stream Configuration
# Generated on ${new Date().toISOString()}

${yaml.dump(config, { indent: 2 })}`;
}

// Parse CLI arguments
program.parse();

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  console.error(chalk.red('✗ Uncaught Exception:'), error.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error(chalk.red('✗ Unhandled Rejection:'), reason);
  process.exit(1);
});