# YAAM Stream 🚀

**Professional animated document streaming library with AI integration, multiple export formats, and premium design themes.**

[![npm version](https://badge.fury.io/js/yaam-stream.svg)](https://badge.fury.io/js/yaam-stream)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16%2B-green.svg)](https://nodejs.org/)

## ✨ Features

### 🚀 **Real-Time Streaming**
- **WebSocket-based streaming** with live document updates
- **Multiple transport modes**: WebSocket, SSE, Polling
- **Progressive loading** with smooth animations
- **Client-server architecture** for collaborative editing

### 🤖 **AI Integration**
- **Multi-provider support**: Claude, ChatGPT, DeepSeek, Anthropic
- **Intelligent content generation** and enhancement
- **Custom AI providers** with extensible architecture
- **Smart prompting** with temperature and token controls

### 🎨 **Premium Themes**
- **Golden Theme** - Luxury and elegance with golden accents
- **Corporate Theme** - Professional business design
- **Modern Theme** - Clean and contemporary
- **Dark Theme** - Modern dark mode interface
- **Minimal Theme** - Clean and simple design
- **Elegant Theme** - Sophisticated typography

### 📊 **Multi-Format Export**
- **HTML** - Responsive and interactive
- **PDF** - Professional with encryption and watermarks
- **PowerPoint** - Animated presentations
- **LaTeX** - Academic publishing
- **DOCX** - Microsoft Word compatibility
- **Markdown** - Developer-friendly format

### ⚡ **High Performance**
- **Optimized rendering** with caching and compression
- **Parallel processing** for large documents
- **Memory-efficient** streaming architecture
- **TypeScript support** with full type safety

## 🛠️ Quick Start

### Installation

```bash
npm install yaam-stream
```

### 🚀 **Running the Demo (Quickest Way)**

```bash
# Clone or download the repository
git clone https://github.com/claudisiar/yaam-stream.git
cd yaam-stream

# Start with the automated starter script
./starter.sh
# or
npm start
```

The starter script will automatically:
- ✅ Check Node.js version (16+ required)
- ✅ Install dependencies if needed
- ✅ Build the project if needed
- ✅ Start the website/demo server
- 🌐 Open your browser to `http://localhost:3000`

**Available npm scripts:**
- `npm start` or `./starter.sh` - Auto-build and start website (recommended)
- `npm run dev:server` - Development mode with auto-reload
- `npm run build` - Build TypeScript to JavaScript
- `npm run demo` - Start demo server (requires build first)
- `npm run dev` - Watch mode for TypeScript compilation
- `npm run clean` - Clean build artifacts
- `npm run reinstall` - Fresh install

### Basic Usage

```javascript
import { YaamStream } from 'yaam-stream';

// Create document data
const documentData = {
  cover: {
    title: "My Professional Report",
    subtitle: "Generated with YAAM Stream",
    category: "Business Report"
  },
  sections: [
    {
      type: "content",
      title: "Executive Summary",
      content: "This is a professional document generated with YAAM Stream..."
    }
  ]
};

// Initialize YAAM Stream
const yaam = new YaamStream({
  data: documentData,
  config: {
    theme: "golden",
    animation: {
      speed: 25,
      autoScroll: true
    }
  }
});

// Generate document
const html = await yaam.generate();
console.log("Document generated successfully!");

// Export to multiple formats
const results = await yaam.export(['html', 'pdf', 'pptx']);
console.log("Export completed:", results);

await yaam.cleanup();
```

### CLI Usage

```bash
# Generate document from JSON data
yaam-stream generate --data document.json --config config.yaml

# Start streaming server
yaam-stream stream --port 3000

# Export existing HTML
yaam-stream export --input document.html --format pdf

# Process with AI
yaam-stream ai --data document.json --prompt "Enhance this content"
```

## 📋 Configuration

### YAML Configuration Example

```yaml
# Theme Configuration
theme: golden

# Animation Settings
animation:
  speed: 25  # ms per character
  autoScroll: true
  scrollDelay: 3000
  effects:
    typewriter: true
    fadeIn: true
    slideIn: true
    cursor: true

# Layout Configuration
layout:
  orientation: portrait
  pageSize: A4
  margins:
    top: 1
    right: 1
    bottom: 1
    left: 1

# Export Configuration
export:
  format: [html, pdf, pptx]
  quality: print
  embedFonts: true

# AI Configuration
ai:
  enabled: true
  provider: openai
  apiKey: ${AI_API_KEY}
  model: gpt-3.5-turbo

# Streaming Configuration
streaming:
  mode: websocket
  port: 3000
  cors: true
```

## 🎨 Theme Gallery

### Golden Theme
![Golden Theme Preview](https://via.placeholder.com/800x400/8B7355/FFFFFF?text=Golden+Theme)
- Luxury golden color palette
- Premium typography
- Elegant animations

### Corporate Theme
![Corporate Theme Preview](https://via.placeholder.com/800x400/2563eb/FFFFFF?text=Corporate+Theme)
- Professional blue tones
- Clean business design
- Modern typography

### Modern Theme
![Modern Theme Preview](https://via.placeholder.com/800x400/06b6d4/FFFFFF?text=Modern+Theme)
- Contemporary cyan accents
- Minimalist design
- Smooth animations

## 🤖 AI Integration

### Supported Providers
- **OpenAI** - GPT-4, GPT-3.5 Turbo
- **Anthropic** - Claude 3 series
- **DeepSeek** - DeepSeek Chat
- **Custom** - Any OpenAI-compatible API

### Usage Example

```javascript
const yaam = new YaamStream({
  data: documentData,
  config: {
    ai: {
      enabled: true,
      provider: 'openai',
      apiKey: process.env.OPENAI_API_KEY,
      model: 'gpt-3.5-turbo'
    }
  }
});

// Process document with AI
const enhancedData = await yaam.processWithAI(
  "Enhance this business report with professional language and structure"
);
```

## 📊 Export Formats

### HTML Export
```javascript
const result = await yaam.export('html');
// Creates responsive, animated HTML document
```

### PDF Export
```javascript
const result = await yaam.export('pdf');
// Creates professional PDF with:
// - Custom headers/footers
// - Page numbers
// - Encryption options
// - Watermarks
```

### PowerPoint Export
```javascript
const result = await yaam.export('pptx');
// Creates animated presentation with:
// - Slide transitions
// - Professional templates
// - Embedded animations
```

## 🚀 Streaming Server

### Start Streaming Server

```javascript
const yaam = new YaamStream({
  config: {
    streaming: {
      mode: 'websocket',
      port: 3000,
      cors: true
    }
  }
});

await yaam.startServer();
console.log('Streaming server started on port 3000');
```

### Client Connection

```javascript
// WebSocket client example
const ws = new WebSocket('ws://localhost:3000/stream');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
};
```

## 🔧 Advanced Features

### Custom Themes

```javascript
const customTheme = {
  name: 'my-theme',
  colors: {
    primary: '#667eea',
    secondary: '#764ba2',
    accent: '#f093fb',
    background: '#ffffff',
    text: '#2d3748'
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif'
  }
};

const yaam = new YaamStream({
  config: {
    theme: customTheme
  }
});
```

### Plugin System

```javascript
const myPlugin = {
  name: 'analytics-plugin',
  beforeGenerate: async (data, config) => {
    // Process data before generation
    return data;
  },
  afterGenerate: async (html, config) => {
    // Process HTML after generation
    return html;
  }
};

const yaam = new YaamStream({
  plugins: [myPlugin]
});
```

### Middleware Support

```javascript
const middleware = {
  name: 'auth-middleware',
  priority: 100,
  process: async (data, context) => {
    // Process data with middleware
    return data;
  }
};

const yaam = new YaamStream({
  middleware: [middleware]
});
```

## 📚 API Reference

### YaamStream Class

#### Constructor
```javascript
new YaamStream(options: YaamStreamOptions)
```

#### Methods
- `generate(options?)` - Generate HTML document
- `export(formats?)` - Export to multiple formats
- `processWithAI(prompt, options?)` - Process with AI
- `startServer(port?, host?)` - Start streaming server
- `stopServer()` - Stop streaming server
- `cleanup()` - Cleanup resources

#### Events
- `start` - Generation started
- `progress` - Generation progress
- `complete` - Generation completed
- `error` - Error occurred
- `streamData` - Streaming data received

### Configuration Options

#### AnimationConfig
```typescript
interface AnimationConfig {
  speed?: number;           // ms per character
  type?: AnimationType;     // 'typewriter' | 'fadeIn' | 'slideIn'
  autoScroll?: boolean;     // Enable auto-scroll
  scrollDelay?: number;     // Scroll delay in ms
  effects?: {
    typewriter?: boolean;
    fadeIn?: boolean;
    slideIn?: boolean;
    cursor?: boolean;
  };
}
```

#### ExportConfig
```typescript
interface ExportConfig {
  format?: ExportFormat | ExportFormat[];
  filename?: string;
  quality?: 'screen' | 'print' | 'press';
  embedFonts?: boolean;
  compress?: boolean;
}
```

## 🎯 Examples

### Business Report

```javascript
const businessReport = {
  cover: {
    title: "Q4 2024 Financial Report",
    subtitle: "Executive Summary and Analysis",
    category: "Financial Report",
    meta: [
      { label: "Date", value: "2024-12-31" },
      { label: "Department", value: "Finance" }
    ]
  },
  sections: [
    {
      type: "content",
      title: "Executive Summary",
      content: "This quarter showed significant growth..."
    },
    {
      type: "highlights",
      title: "Key Metrics",
      items: [
        { icon: "📈", title: "Revenue Growth", text: "15% increase YoY" },
        { icon: "💰", title: "Profit Margin", text: "Improved to 22%" }
      ]
    }
  ]
};
```

### Academic Paper

```javascript
const academicPaper = {
  cover: {
    title: "Machine Learning in Healthcare",
    subtitle: "A Comprehensive Review",
    category: "Research Paper"
  },
  sections: [
    {
      type: "content",
      title: "Abstract",
      content: "This paper reviews the application of machine learning..."
    },
    {
      type: "content",
      title: "Introduction",
      content: "Healthcare is undergoing a digital transformation..."
    }
  ]
};
```

## 🔒 Security Features

- **Input sanitization** to prevent XSS attacks
- **Content Security Policy** headers
- **Rate limiting** for API endpoints
- **HTTPS-only** mode for production
- **Secure token generation** for authentication

## ⚡ Performance Optimization

- **Lazy loading** for large documents
- **Caching system** for templates and assets
- **Compression** for streaming data
- **Parallel processing** for exports
- **Memory monitoring** and optimization

## 🧪 Testing

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run linting
npm run lint

# Run type checking
npm run type-check
```

## 📦 Package Scripts

```bash
# Build the project
npm run build

# Development mode
npm run dev

# Start demo server
npm run demo

# Generate configuration template
yaam-stream config --output config.yaml
```

## 🌟 Showcase

### Real-World Applications
- **Financial Reports** - Quarterly and annual reports
- **Legal Documents** - Contracts and agreements
- **Academic Papers** - Research publications
- **Business Proposals** - Client presentations
- **Technical Documentation** - API docs and guides

### Integration Examples
- **Express.js** - Web server integration
- **Next.js** - React framework integration
- **Electron** - Desktop application integration
- **Docker** - Containerized deployment

## 📈 Roadmap

### Version 2.1 (Coming Soon)
- [ ] Real-time collaborative editing
- [ ] Advanced chart and visualization support
- [ ] Enhanced AI capabilities with fine-tuning
- [ ] Mobile-responsive themes
- [ ] Performance monitoring dashboard

### Version 3.0 (Future)
- [ ] Cloud-native architecture
- [ ] Enterprise SSO integration
- [ ] Advanced security features
- [ ] Multi-language support
- [ ] Plugin marketplace

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/claudisiar/yaam-stream.git
cd yaam-stream

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Handlebars.js** - Template engine
- **Puppeteer** - PDF generation
- **PptxGenJS** - PowerPoint generation
- **OpenAI** - AI integration
- **Anthropic** - Claude integration
- **Community** - For feedback and contributions

## 📞 Support

- **GitHub Issues** - [Report bugs and feature requests](https://github.com/claudisiar/yaam-stream/issues)
- **Documentation** - [Full API documentation](https://yaam-stream-docs.example.com)
- **Discord Community** - [Join our Discord server](https://discord.gg/yaam-stream)
- **Email** - support@yaam-stream.com

---

**YAAM Stream** - Transform your documents into immersive experiences 🚀

Built with ❤️ for the developer community