/**
 * Type definitions for YAAM Stream - Professional Document Streaming Library
 * Version 2.0 - Enhanced with WebSocket streaming, AI integration, and advanced export features
 */

export type ThemeName = 'golden' | 'corporate' | 'modern' | 'dark' | 'minimal' | 'elegant' | 'custom';
export type ExportFormat = 'html' | 'pdf' | 'pptx' | 'latex' | 'docx' | 'markdown';
export type Orientation = 'portrait' | 'landscape' | 'auto';
export type PageSize = 'A4' | 'letter' | 'legal' | 'A3' | 'A5' | 'custom';
export type AIProvider = 'claude' | 'openai' | 'deepseek' | 'anthropic' | 'custom';
export type StreamMode = 'websocket' | 'sse' | 'polling' | 'none';
export type AnimationType = 'typewriter' | 'fadeIn' | 'slideIn' | 'reveal' | 'none';
export type QualityLevel = 'screen' | 'print' | 'press' | 'draft';

/**
 * Main configuration interface with enhanced features
 */
export interface YaamConfig {
  theme?: ThemeName | CustomTheme;
  animation?: AnimationConfig;
  layout?: LayoutConfig;
  export?: ExportConfig;
  ai?: AIConfig;
  streaming?: StreamingConfig;
  watermark?: WatermarkConfig;
  seo?: SEOConfig;
  locale?: string;
  translations?: Record<string, string>;
  performance?: PerformanceConfig;
  security?: SecurityConfig;
}

/**
 * Enhanced animation configuration
 */
export interface AnimationConfig {
  speed?: number; // ms per character
  type?: AnimationType;
  autoScroll?: boolean;
  scrollDelay?: number; // ms
  stagger?: number; // ms between elements
  easing?: string; // CSS easing function
  effects?: {
    typewriter?: boolean;
    fadeIn?: boolean;
    slideIn?: boolean;
    reveal?: boolean;
    cursor?: boolean;
  };
  sequence?: 'sequential' | 'parallel' | 'staggered';
}

/**
 * Enhanced layout configuration
 */
export interface LayoutConfig {
  orientation?: Orientation;
  pageSize?: PageSize;
  maxPages?: number | null;
  responsive?: boolean;
  margins?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  columns?: number;
  grid?: {
    enabled?: boolean;
    gap?: number;
    columns?: number;
  };
}

/**
 * Enhanced export configuration
 */
export interface ExportConfig {
  format?: ExportFormat | ExportFormat[];
  filename?: string;
  quality?: QualityLevel;
  embedFonts?: boolean;
  compress?: boolean;
  preserveAnimations?: boolean;
  metadata?: {
    title?: string;
    author?: string;
    subject?: string;
    keywords?: string[];
    creator?: string;
  };
  pdf?: PDFConfig;
  pptx?: PPTXConfig;
  html?: HTMLConfig;
}

/**
 * PDF specific configuration
 */
export interface PDFConfig {
  header?: string;
  footer?: string;
  pageNumbers?: boolean;
  toc?: boolean;
  bookmarks?: boolean;
  encryption?: {
    enabled?: boolean;
    userPassword?: string;
    ownerPassword?: string;
    permissions?: {
      print?: boolean;
      modify?: boolean;
      copy?: boolean;
      annotate?: boolean;
    };
  };
}

/**
 * PowerPoint specific configuration
 */
export interface PPTXConfig {
  template?: string;
  slideSize?: {
    width?: number;
    height?: number;
  };
  masterSlide?: boolean;
  animations?: boolean;
  transitions?: boolean;
}

/**
 * HTML specific configuration
 */
export interface HTMLConfig {
  standalone?: boolean;
  inlineStyles?: boolean;
  inlineScripts?: boolean;
  responsive?: boolean;
  cdn?: boolean;
}

/**
 * Enhanced AI configuration
 */
export interface AIConfig {
  enabled?: boolean;
  provider?: AIProvider;
  model?: string;
  apiKey?: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  endpoint?: string;
  timeout?: number;
  retry?: {
    attempts?: number;
    delay?: number;
  };
  cache?: {
    enabled?: boolean;
    ttl?: number;
  };
}

/**
 * Streaming configuration
 */
export interface StreamingConfig {
  mode?: StreamMode;
  port?: number;
  host?: string;
  cors?: boolean;
  compression?: boolean;
  authentication?: {
    enabled?: boolean;
    token?: string;
    apiKey?: string;
  };
  buffer?: {
    size?: number;
    timeout?: number;
  };
}

/**
 * Performance configuration
 */
export interface PerformanceConfig {
  lazyLoading?: boolean;
  caching?: boolean;
  compression?: boolean;
  parallelProcessing?: boolean;
  memoryLimit?: number;
  timeout?: number;
}

/**
 * Security configuration
 */
export interface SecurityConfig {
  sanitizeInput?: boolean;
  contentSecurityPolicy?: boolean;
  httpsOnly?: boolean;
  rateLimit?: {
    enabled?: boolean;
    windowMs?: number;
    max?: number;
  };
}

/**
 * Watermark configuration
 */
export interface WatermarkConfig {
  enabled?: boolean;
  text?: string;
  opacity?: number;
  angle?: number;
  fontSize?: number;
  color?: string;
  position?: 'center' | 'diagonal' | 'header' | 'footer';
}

/**
 * SEO configuration
 */
export interface SEOConfig {
  title?: string;
  description?: string;
  author?: string;
  keywords?: string[];
  canonicalUrl?: string;
  social?: {
    twitter?: string;
    og?: string;
  };
}

/**
 * Custom theme definition
 */
export interface CustomTheme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    [key: string]: string;
  };
  fonts: {
    heading: string;
    body: string;
    code?: string;
    [key: string]: string;
  };
  spacing?: {
    unit?: number;
    scale?: number;
  };
  breakpoints?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

/**
 * Document data structure
 */
export interface DocumentData {
  cover: CoverData;
  sections: Section[];
  metadata?: {
    version?: string;
    created?: Date;
    modified?: Date;
    generator?: string;
  };
}

/**
 * Cover page data
 */
export interface CoverData {
  category?: string;
  title: string;
  subtitle?: string;
  meta?: MetaItem[];
  branding?: {
    logo?: string;
    company?: string;
    tagline?: string;
  };
}

/**
 * Meta item for cover page
 */
export interface MetaItem {
  label: string;
  value: string;
  icon?: string;
}

/**
 * Section types
 */
export type SectionType = 'content' | 'highlights' | 'signature' | 'chart' | 'table' | 'image' | 'custom';

/**
 * Base section interface
 */
export interface BaseSection {
  type: SectionType;
  id?: string;
  animation?: AnimationConfig;
  layout?: LayoutConfig;
}

/**
 * Content section
 */
export interface ContentSection extends BaseSection {
  type: 'content';
  title: string;
  subtitle?: string;
  content: string;
  author?: string;
  date?: Date;
  tags?: string[];
}

/**
 * Highlights section
 */
export interface HighlightsSection extends BaseSection {
  type: 'highlights';
  title: string;
  subtitle?: string;
  items: HighlightItem[];
  layout?: 'grid' | 'list' | 'cards';
}

/**
 * Highlight item
 */
export interface HighlightItem {
  icon: string;
  title: string;
  text: string;
  value?: string | number;
  trend?: 'up' | 'down' | 'stable';
  color?: string;
}

/**
 * Signature section
 */
export interface SignatureSection extends BaseSection {
  type: 'signature';
  left: string;
  right: string;
  center?: string;
  signature?: {
    name?: string;
    title?: string;
    date?: Date;
  };
}

/**
 * Chart section
 */
export interface ChartSection extends BaseSection {
  type: 'chart';
  title: string;
  subtitle?: string;
  chartType: 'line' | 'bar' | 'pie' | 'doughnut' | 'radar';
  data: any;
  options?: any;
}

/**
 * Table section
 */
export interface TableSection extends BaseSection {
  type: 'table';
  title: string;
  subtitle?: string;
  headers: string[];
  rows: any[][];
  options?: {
    sortable?: boolean;
    filterable?: boolean;
    pagination?: boolean;
  };
}

/**
 * Image section
 */
export interface ImageSection extends BaseSection {
  type: 'image';
  title?: string;
  subtitle?: string;
  src: string;
  alt?: string;
  caption?: string;
  options?: {
    width?: number;
    height?: number;
    responsive?: boolean;
    lazy?: boolean;
  };
}

/**
 * Custom section
 */
export interface CustomSection extends BaseSection {
  type: 'custom';
  content: string;
  template?: string;
  data?: any;
}

/**
 * Union type for all sections
 */
export type Section = ContentSection | HighlightsSection | SignatureSection | ChartSection | TableSection | ImageSection | CustomSection;

/**
 * Options for YaamStream constructor
 */
export interface YaamStreamOptions {
  data?: string | DocumentData | Promise<DocumentData>;
  config?: string | YaamConfig | Promise<YaamConfig>;
  output?: string;
  theme?: ThemeName;
  animation?: AnimationConfig;
  export?: ExportConfig;
  ai?: AIConfig;
  streaming?: StreamingConfig;
  hooks?: EventHooks;
  plugins?: Plugin[];
  middleware?: Middleware[];
}

/**
 * Event hooks
 */
export interface EventHooks {
  onStart?: () => void | Promise<void>;
  onSectionStart?: (section: Section, index: number) => void | Promise<void>;
  onSectionComplete?: (section: Section, index: number) => void | Promise<void>;
  onProgress?: (progress: number, total: number) => void | Promise<void>;
  onStreamStart?: (streamId: string) => void | Promise<void>;
  onStreamData?: (data: any) => void | Promise<void>;
  onStreamEnd?: (streamId: string) => void | Promise<void>;
  onExportStart?: (format: ExportFormat) => void | Promise<void>;
  onExportComplete?: (result: ExportResult) => void | Promise<void>;
  onComplete?: (stats: GenerationStats) => void | Promise<void>;
  onError?: (error: Error, context?: string) => void | Promise<void>;
  onWarning?: (warning: string, context?: string) => void | Promise<void>;
}

/**
 * Plugin interface
 */
export interface Plugin {
  name: string;
  version?: string;
  description?: string;
  initialize?: (stream: any) => void | Promise<void>;
  beforeGenerate?: (data: DocumentData, config: YaamConfig) => DocumentData | Promise<DocumentData>;
  afterGenerate?: (html: string, config: YaamConfig) => string | Promise<string>;
  beforeExport?: (data: any, format: ExportFormat, config: YaamConfig) => any | Promise<any>;
  afterExport?: (result: any, format: ExportFormat, config: YaamConfig) => any | Promise<any>;
  onStream?: (data: any, streamId: string) => any | Promise<any>;
}

/**
 * Middleware interface
 */
export interface Middleware {
  name: string;
  priority?: number;
  process?: (data: any, context: any) => any | Promise<any>;
}

/**
 * AI prompt configuration
 */
export interface AIPrompt {
  prompt: string;
  sections?: number | string[];
  tone?: 'professional' | 'casual' | 'technical' | 'executive' | 'academic' | 'creative';
  length?: 'brief' | 'normal' | 'detailed' | 'comprehensive';
  language?: string;
  includeHighlights?: boolean;
  includeCharts?: boolean;
  includeTables?: boolean;
  style?: {
    formal?: boolean;
    persuasive?: boolean;
    analytical?: boolean;
  };
}

/**
 * AI response structure
 */
export interface AIResponse {
  data: DocumentData;
  metadata: {
    model: string;
    tokensUsed: number;
    generationTime: number;
    cost?: number;
    cached?: boolean;
  };
}

/**
 * Export result
 */
export interface ExportResult {
  format: ExportFormat;
  filename: string;
  path: string;
  size: number;
  checksum?: string;
  pages?: number;
  duration?: number;
  quality?: QualityLevel;
}

/**
 * Generation statistics
 */
export interface GenerationStats {
  startTime: number;
  endTime: number;
  duration: number;
  sectionsProcessed: number;
  charactersWritten: number;
  pagesGenerated: number;
  animationsRendered: number;
  memoryUsed: number;
  streamDuration?: number;
}

/**
 * Stream event types
 */
export type StreamEvent = 
  | 'start'
  | 'data'
  | 'section'
  | 'progress'
  | 'complete'
  | 'error'
  | 'heartbeat';

/**
 * Stream message structure
 */
export interface StreamMessage {
  id: string;
  event: StreamEvent;
  data: any;
  timestamp: number;
  streamId?: string;
}

/**
 * WebSocket configuration
 */
export interface WebSocketConfig {
  port?: number;
  host?: string;
  path?: string;
  cors?: {
    origin?: string | string[];
    credentials?: boolean;
  };
  compression?: boolean;
  maxPayload?: number;
}

/**
 * Real-time streaming data
 */
export interface StreamData {
  id: string;
  type: 'section' | 'content' | 'highlight' | 'chart' | 'meta';
  data: any;
  metadata?: {
    index?: number;
    total?: number;
    progress?: number;
    estimatedTime?: number;
  };
}

/**
 * Client connection info
 */
export interface ClientInfo {
  id: string;
  ip: string;
  userAgent?: string;
  connectedAt: Date;
  subscriptions: string[];
}