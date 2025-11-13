# 🚀 Getting Started with YAAM Stream

Welcome to YAAM Stream! This guide will help you get up and running quickly.

## Prerequisites

- **Node.js** 16 or higher
- **npm** 8 or higher

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/claudisiar/yaam-stream.git
cd yaam-stream
```

### 2. Start the Demo

The easiest way to get started is to use the automated starter script:

```bash
npm start
```

This will:
- ✅ Check and install dependencies if needed
- ✅ Build the project from TypeScript source
- ✅ Start the interactive demo server
- 🌐 Server will be available at `http://localhost:3000`

### 3. Open Your Browser

Navigate to:
```
http://localhost:3000
```

You'll see an interactive demo showcasing all YAAM Stream features!

## Alternative Commands

### Development Mode

For active development with auto-reload:

```bash
npm run dev:server
```

### Manual Build and Run

If you prefer to build and run separately:

```bash
# Build the project
npm run build

# Start the demo server
npm run demo
```

### Watch Mode

To watch TypeScript files for changes:

```bash
npm run dev
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | 🚀 Auto-build and start (recommended) |
| `npm run quick-start` | Same as `npm start` |
| `npm run build` | 🔨 Build TypeScript to JavaScript |
| `npm run dev` | 👀 Watch mode for TypeScript |
| `npm run dev:server` | 🔄 Development with auto-reload |
| `npm run demo` | 🌐 Start demo server (needs build first) |
| `npm run test` | 🧪 Run tests |
| `npm run lint` | 🔍 Lint TypeScript files |
| `npm run format` | 💅 Format code with Prettier |
| `npm run clean` | 🧹 Remove build artifacts |
| `npm run reinstall` | 🔄 Clean install everything |

## What's Next?

### Explore the Demo

The demo server showcases:
- ✨ Real-time document streaming
- 🎨 Multiple premium themes
- 📊 Export to various formats (PDF, PPTX, LaTeX, etc.)
- 🤖 AI integration examples
- ⚡ Performance optimizations

### Try the Examples

Check out the `examples/` directory for code samples:

```bash
# Basic usage example
node examples/basic-usage.js

# Streaming example
node examples/streaming-demo.js

# AI integration example
node examples/ai-integration.js

# Export formats example
node examples/export-demo.js
```

### Use as a Library

Install in your project:

```bash
npm install yaam-stream
```

Then use in your code:

```javascript
import { YaamStream } from 'yaam-stream';

const yaam = new YaamStream({
  data: yourDocumentData,
  config: {
    theme: 'golden',
    animation: { speed: 25 }
  }
});

const html = await yaam.generate();
await yaam.export(['pdf', 'pptx']);
await yaam.cleanup();
```

## Troubleshooting

### Dependencies Won't Install

```bash
npm run clean
npm install
```

### Build Fails

Make sure you have Node.js 16+ and TypeScript installed:

```bash
node --version  # Should be 16+
npm --version   # Should be 8+
```

### Port Already in Use

Change the port in `demo-server.js` or set the PORT environment variable:

```bash
PORT=8080 npm start
```

### Need Help?

- 📖 Check the [README.md](./README.md) for full documentation
- 🐛 Report issues on [GitHub Issues](https://github.com/claudisiar/yaam-stream/issues)
- 💬 See examples in the `examples/` directory

## Next Steps

1. ✅ Run `npm start` to see the demo
2. 📖 Read through the full [README.md](./README.md)
3. 🧪 Experiment with the examples
4. 🚀 Start building your own documents!

Happy streaming! 🎉
