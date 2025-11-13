/**
 * YAAM Stream - Professional Document Streaming Library
 * Main entry point with enhanced features
 * Version 3.0 - Top 1% Developer Package
 */

// Core exports
export * from './lib/YaamStream';
export * from './types';
export * from './lib/themes';
export * from './lib/exporters';
export * from './lib/ai';
export * from './lib/streaming';
export * from './lib/plugins';

// Utility exports
export * from './lib/utils';
export * from './lib/validators';
export * from './lib/logger';

// Template exports
export * from './lib/templates';

// Configuration exports
export { defaultConfig } from './lib/config';

// Version info
export const version = require('../package.json').version;
export const name = require('../package.json').name;

// Type re-exports for convenience
export type {
  YaamConfig,
  DocumentData,
  Section,
  ExportFormat,
  ThemeName,
  AIProvider,
  StreamMode,
  AnimationType,
  YaamStreamOptions,
  ExportResult,
  GenerationStats,
  StreamMessage,
  StreamData,
  ClientInfo,
  QualityLevel
} from './types';

// Constants
export const SUPPORTED_FORMATS = ['html', 'pdf', 'pptx', 'latex', 'docx', 'markdown'] as const;
export const SUPPORTED_THEMES = ['golden', 'corporate', 'modern', 'dark', 'minimal', 'elegant', 'custom'] as const;
export const SUPPORTED_AI_PROVIDERS = ['claude', 'openai', 'deepseek', 'anthropic', 'custom'] as const;
export const DEFAULT_PORT = 3000;
export const DEFAULT_HOST = 'localhost';

// Feature flags
export const FEATURES = {
  STREAMING: true,
  AI_INTEGRATION: true,
  MULTI_EXPORT: true,
  REAL_TIME: true,
  WEBSOCKET: true,
  PLUGINS: true,
  MIDDLEWARE: true,
  CACHING: true,
  COMPRESSION: true,
  AUTHENTICATION: true
} as const;

// Error codes
export const ERROR_CODES = {
  INVALID_CONFIG: 'YAAM_001',
  INVALID_DATA: 'YAAM_002',
  EXPORT_FAILED: 'YAAM_003',
  AI_REQUEST_FAILED: 'YAAM_004',
  STREAM_ERROR: 'YAAM_005',
  THEME_NOT_FOUND: 'YAAM_006',
  PLUGIN_ERROR: 'YAAM_007',
  MIDDLEWARE_ERROR: 'YAAM_008',
  VALIDATION_ERROR: 'YAAM_009',
  NETWORK_ERROR: 'YAAM_010',
  TIMEOUT_ERROR: 'YAAM_011',
  AUTHENTICATION_ERROR: 'YAAM_012'
} as const;

// Success codes
export const SUCCESS_CODES = {
  DOCUMENT_GENERATED: 'YAAM_200',
  EXPORT_COMPLETED: 'YAAM_201',
  STREAM_STARTED: 'YAAM_202',
  AI_PROCESSING_COMPLETE: 'YAAM_203',
  THEME_APPLIED: 'YAAM_204',
  PLUGIN_LOADED: 'YAAM_205'
} as const;

// Default configurations
export const DEFAULT_ANIMATION_SPEED = 25;
export const DEFAULT_STREAM_PORT = 3000;
export const DEFAULT_EXPORT_QUALITY = 'print' as const;
export const DEFAULT_AI_TEMPERATURE = 0.7;
export const DEFAULT_MAX_TOKENS = 4000;

// Validation patterns
export const VALIDATION_PATTERNS = {
  URL: /^https?:\/\/.+/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
  FILENAME: /^[\w\-. ]+$/
} as const;

// MIME types for exports
export const MIME_TYPES = {
  html: 'text/html',
  pdf: 'application/pdf',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  latex: 'application/x-latex',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  markdown: 'text/markdown'
} as const;

// File extensions
export const FILE_EXTENSIONS = {
  html: '.html',
  pdf: '.pdf',
  pptx: '.pptx',
  latex: '.tex',
  docx: '.docx',
  markdown: '.md'
} as const;

// Performance thresholds
export const PERFORMANCE_THRESHOLDS = {
  MEMORY_WARNING: 500 * 1024 * 1024, // 500MB
  TIMEOUT_WARNING: 30000, // 30 seconds
  RENDER_TIME_WARNING: 5000 // 5 seconds
} as const;

// Streaming constants
export const STREAM_CONSTANTS = {
  HEARTBEAT_INTERVAL: 30000, // 30 seconds
  MAX_BUFFER_SIZE: 1024 * 1024, // 1MB
  RECONNECT_DELAY: 5000, // 5 seconds
  MAX_RECONNECT_ATTEMPTS: 5
} as const;

// AI model configurations
export const AI_MODELS = {
  claude: {
    'claude-3-sonnet': { maxTokens: 4000, cost: 0.00163 },
    'claude-3-haiku': { maxTokens: 4000, cost: 0.00025 },
    'claude-3-opus': { maxTokens: 4000, cost: 0.015 }
  },
  openai: {
    'gpt-4': { maxTokens: 8000, cost: 0.03 },
    'gpt-4-turbo': { maxTokens: 128000, cost: 0.01 },
    'gpt-3.5-turbo': { maxTokens: 4000, cost: 0.0015 }
  },
  deepseek: {
    'deepseek-chat': { maxTokens: 4000, cost: 0.0002 }
  }
} as const;

// Theme configurations
export const THEME_DEFAULTS = {
  golden: {
    colors: {
      primary: '#B8956A',
      secondary: '#8B7355',
      accent: '#D4AF69',
      background: '#FAF7F2',
      text: '#2C2416'
    },
    fonts: {
      heading: 'Georgia, serif',
      body: 'Georgia, serif'
    }
  },
  corporate: {
    colors: {
      primary: '#2563eb',
      secondary: '#1e40af',
      accent: '#3b82f6',
      background: '#ffffff',
      text: '#1f2937'
    },
    fonts: {
      heading: 'Inter, sans-serif',
      body: 'Inter, sans-serif'
    }
  },
  modern: {
    colors: {
      primary: '#06b6d4',
      secondary: '#0891b2',
      accent: '#67e8f9',
      background: '#f8fafc',
      text: '#0f172a'
    },
    fonts: {
      heading: 'Inter, sans-serif',
      body: 'Inter, sans-serif'
    }
  },
  dark: {
    colors: {
      primary: '#818cf8',
      secondary: '#6366f1',
      accent: '#a5b4fc',
      background: '#0f172a',
      text: '#f1f5f9'
    },
    fonts: {
      heading: 'Inter, sans-serif',
      body: 'Inter, sans-serif'
    }
  },
  minimal: {
    colors: {
      primary: '#374151',
      secondary: '#111827',
      accent: '#6b7280',
      background: '#ffffff',
      text: '#111827'
    },
    fonts: {
      heading: 'Inter, sans-serif',
      body: 'Inter, sans-serif'
    }
  },
  elegant: {
    colors: {
      primary: '#7c3aed',
      secondary: '#5b21b6',
      accent: '#a855f7',
      background: '#faf5ff',
      text: '#581c87'
    },
    fonts: {
      heading: 'Playfair Display, serif',
      body: 'Inter, sans-serif'
    }
  }
} as const;

// Export everything for maximum compatibility
export default {
  YaamStream: require('./lib/YaamStream').default,
  version,
  name,
  SUPPORTED_FORMATS,
  SUPPORTED_THEMES,
  SUPPORTED_AI_PROVIDERS,
  FEATURES,
  ERROR_CODES,
  SUCCESS_CODES,
  DEFAULT_ANIMATION_SPEED,
  DEFAULT_STREAM_PORT,
  DEFAULT_EXPORT_QUALITY,
  DEFAULT_AI_TEMPERATURE,
  DEFAULT_MAX_TOKENS,
  VALIDATION_PATTERNS,
  MIME_TYPES,
  FILE_EXTENSIONS,
  PERFORMANCE_THRESHOLDS,
  STREAM_CONSTANTS,
  AI_MODELS,
  THEME_DEFAULTS
};