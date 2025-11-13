#!/usr/bin/env node

/**
 * YAAM Stream Demo Server
 * Interactive demonstration of all features
 */

const express = require('express');
const path = require('path');
const { YaamStream } = require('./dist/index');

const app = express();
const PORT = process.env.PORT || 3000;

// Sample data for demonstration
const sampleData = {
  cover: {
    category: "Professional Demo",
    title: "YAAM Stream - Document Streaming Revolution",
    subtitle: "Interactive demonstration of advanced features",
    meta: [
      { label: "Version", value: "2.0.0" },
      { label: "Date", value: new Date().toLocaleDateString() },
      { label: "Mode", value: "Interactive Demo" }
    ]
  },
  sections: [
    {
      type: "content",
      title: "Real-Time Document Streaming",
      subtitle: "Revolutionary approach to document generation",
      content: "YAAM Stream transforms static document generation into an immersive, real-time experience. Using advanced WebSocket technology, documents are streamed section by section with smooth animations and professional typography. This revolutionary approach enables live collaboration, progressive loading, and unprecedented user engagement."
    },
    {
      type: "content",
      title: "AI-Powered Content Generation",
      subtitle: "Intelligent assistance for professional documents",
      content: "Integrated support for leading AI providers including Claude, ChatGPT, and DeepSeek enables intelligent content generation and enhancement. The system can automatically structure content, suggest improvements, and maintain consistent tone across sections. Advanced prompting capabilities ensure high-quality, contextually appropriate content generation."
    },
    {
      type: "highlights",
      title: "Core Capabilities",
      subtitle: "Professional-grade features",
      items: [
        { icon: "🚀", title: "Real-Time Streaming", text: "WebSocket-based streaming with multiple transport modes" },
        { icon: "🤖", title: "AI Integration", text: "Support for Claude, ChatGPT, DeepSeek, and custom providers" },
        { icon: "🎨", title: "Premium Themes", text: "Golden, Corporate, Modern, Dark, Minimal, Elegant themes" },
        { icon: "📊", title: "Multi-Format Export", text: "HTML, PDF, PowerPoint, LaTeX, DOCX, Markdown" },
        { icon: "⚡", title: "High Performance", text: "Optimized rendering with caching and compression" },
        { icon: "🔧", title: "Developer Friendly", text: "TypeScript support with comprehensive CLI" }
      ]
    },
    {
      type: "content",
      title: "Advanced Export Capabilities",
      subtitle: "Professional document formats",
      content: "YAAM Stream supports export to multiple professional formats including PDF with advanced features like encryption and watermarks, PowerPoint presentations with animations, LaTeX for academic publishing, and responsive HTML. Each format maintains the visual integrity and professional appearance of the original design."
    },
    {
      type: "content",
      title: "Enterprise-Grade Architecture",
      subtitle: "Scalable and secure",
      content: "Built with enterprise requirements in mind, YAAM Stream features comprehensive security measures including input sanitization, content security policies, and rate limiting. The modular plugin architecture allows for easy extension and customization while maintaining high performance through intelligent caching and parallel processing."
    },
    {
      type: "signature",
      left: "Professional Document Solution",
      right: "Powered by YAAM Stream"
    }
  ]
};

// Configuration for demo
const demoConfig = {
  theme: "golden",
  animation: {
    speed: 25,
    autoScroll: true,
    scrollDelay: 2000,
    effects: {
      typewriter: true,
      fadeIn: true,
      slideIn: true,
      cursor: true
    }
  },
  streaming: {
    mode: "websocket",
    port: 3001,
    cors: true
  }
};

// Routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'demo.html'));
});

app.get('/api/config', (req, res) => {
  res.json({
    theme: demoConfig.theme,
    animation: demoConfig.animation,
    streaming: demoConfig.streaming
  });
});

app.get('/api/demo/generate', async (req, res) => {
  try {
    const yaam = new YaamStream({
      data: sampleData,
      config: demoConfig
    });

    const html = await yaam.generate();
    await yaam.cleanup();

    res.json({
      success: true,
      html: html.substring(0, 1000) + '...', // Truncate for demo
      message: 'Document generated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.get('/api/demo/stream', async (req, res) => {
  res.json({
    success: true,
    message: 'WebSocket streaming server available on port 3001',
    url: `ws://localhost:3001/stream`
  });
});

app.get('/api/demo/export', async (req, res) => {
  try {
    const yaam = new YaamStream({
      data: sampleData,
      config: demoConfig
    });

    const results = await yaam.export(['html', 'pdf']);
    await yaam.cleanup();

    res.json({
      success: true,
      exports: results.map(r => ({
        format: r.format,
        filename: r.filename,
        size: r.size
      }))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.get('/api/demo/ai', async (req, res) => {
  res.json({
    success: true,
    message: 'AI integration demo',
    providers: ['claude', 'openai', 'deepseek'],
    features: ['Content generation', 'Summarization', 'Enhancement']
  });
});

// Start streaming server
async function startStreamingServer() {
  try {
    const yaam = new YaamStream({
      data: sampleData,
      config: demoConfig
    });

    await yaam.startServer(3001);
    console.log('🌐 Streaming server started on port 3001');
  } catch (error) {
    console.error('Failed to start streaming server:', error);
  }
}

// Start demo server
app.listen(PORT, () => {
  console.log(`🚀 YAAM Stream Demo Server running on http://localhost:${PORT}`);
  console.log(`📡 Streaming server will start on port 3001`);
  
  // Start streaming server after a delay
  setTimeout(startStreamingServer, 1000);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down demo server...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down demo server...');
  process.exit(0);
});