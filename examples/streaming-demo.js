/**
 * YAAM Stream - Streaming Server Demo
 * Demonstrates real-time document streaming capabilities
 */

const { YaamStream } = require('yaam-stream');
const WebSocket = require('ws');

async function streamingDemo() {
  console.log('🚀 YAAM Stream Real-Time Streaming Demo\n');

  // Sample streaming data (simulating real-time updates)
  const streamingData = {
    cover: {
      category: "Live Report",
      title: "Real-Time Market Analysis",
      subtitle: "Streaming Financial Data",
      meta: [
        { label: "Time", value: new Date().toLocaleTimeString() },
        { label: "Status", value: "Live Streaming" }
      ]
    },
    sections: [
      {
        type: "content",
        title: "Market Overview",
        subtitle: "Current Market Conditions",
        content: "Real-time market analysis showing dynamic trends and patterns across multiple sectors..."
      },
      {
        type: "highlights",
        title: "Live Market Indicators",
        subtitle: "Current Performance Metrics",
        items: [
          { icon: "📊", title: "S&P 500", text: "4,185.32 (+0.8%)" },
          { icon: "💹", title: "NASDAQ", text: "12,845.67 (+1.2%)" },
          { icon: "🏦", title: "Dow Jones", text: "33,891.45 (+0.6%)" },
          { icon: "💎", title: "Gold", text: "$1,985.40 (+0.3%)" },
          { icon: "🛢️", title: "Oil", text: "$82.15 (-1.1%)" },
          { icon: "₿", title: "Bitcoin", text: "$43,256.80 (+2.4%)" }
        ]
      }
    ]
  };

  try {
    // Initialize YAAM Stream with streaming configuration
    const yaam = new YaamStream({
      data: streamingData,
      config: {
        theme: 'modern',
        animation: {
          speed: 15, // Faster for streaming
          autoScroll: false, // Manual control for demo
          effects: {
            typewriter: true,
            fadeIn: true,
            slideIn: false,
            cursor: true
          }
        },
        streaming: {
          mode: 'websocket',
          port: 3001,
          host: 'localhost',
          cors: true,
          compression: true
        }
      },
      hooks: {
        onStreamStart: (streamId) => {
          console.log(`🌊 Stream started: ${streamId}`);
        },
        onStreamData: (data) => {
          console.log(`📡 Streaming data: ${data.type} - ${data.id}`);
        },
        onStreamEnd: (streamId) => {
          console.log(`🏁 Stream completed: ${streamId}`);
        }
      }
    });

    console.log('🌐 Starting streaming server...');
    
    // Start streaming server
    await yaam.startServer(3001, 'localhost');
    console.log('✅ Streaming server started on port 3001');
    console.log('🔗 WebSocket URL: ws://localhost:3001/stream\n');

    // Generate document with streaming enabled
    console.log('📄 Starting document generation with streaming...');
    const html = await yaam.generate({ stream: true });
    console.log('✅ Document generation started with streaming enabled\n');

    // Simulate real-time data updates
    console.log('🔄 Simulating real-time data updates...');
    
    let updateCount = 0;
    const updateInterval = setInterval(async () => {
      updateCount++;
      
      // Create dynamic content update
      const updateData = {
        id: `update-${updateCount}`,
        type: 'content',
        data: {
          timestamp: new Date().toISOString(),
          marketData: {
            sp500: (4185 + Math.random() * 20 - 10).toFixed(2),
            nasdaq: (12845 + Math.random() * 50 - 25).toFixed(2),
            bitcoin: (43256 + Math.random() * 200 - 100).toFixed(2)
          }
        }
      };

      // Broadcast update to all connected clients
      await yaam.broadcast(updateData);
      console.log(`📊 Update ${updateCount} broadcasted to clients`);

      // Stop after 10 updates for demo
      if (updateCount >= 10) {
        clearInterval(updateInterval);
        console.log('\n✅ Demo streaming completed');
        
        // Stop server after demo
        setTimeout(async () => {
          await yaam.stopServer();
          console.log('🛑 Streaming server stopped');
          await yaam.cleanup();
          console.log('🧹 Cleanup completed');
          process.exit(0);
        }, 2000);
      }
    }, 3000);

    // WebSocket client example for testing
    console.log('\n💡 WebSocket Client Test (Run in separate terminal):');
    console.log(`node -e "
      const WebSocket = require('ws');
      const ws = new WebSocket('ws://localhost:3001/stream');
      
      ws.on('open', () => {
        console.log('🔌 Connected to streaming server');
      });
      
      ws.on('message', (data) => {
        const message = JSON.parse(data);
        console.log('📨 Received:', message.event, message.data?.type || 'data');
      });
      
      ws.on('close', () => {
        console.log('🔌 Disconnected from server');
      });
    "`);

  } catch (error) {
    console.error('❌ Streaming demo error:', error.message);
    process.exit(1);
  }
}

// Alternative: Simple WebSocket client for testing
function createTestClient() {
  const ws = new WebSocket('ws://localhost:3001/stream');
  
  ws.on('open', () => {
    console.log('🔌 Test client connected to streaming server');
  });
  
  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data);
      console.log(`📨 Client received: ${message.event}`);
      
      if (message.data) {
        console.log('  Data type:', message.data.type);
        console.log('  Data ID:', message.data.id);
      }
    } catch (error) {
      console.error('❌ Error parsing message:', error.message);
    }
  });
  
  ws.on('close', () => {
    console.log('🔌 Test client disconnected');
  });
  
  ws.on('error', (error) => {
    console.error('❌ WebSocket error:', error.message);
  });
  
  return ws;
}

// Run the demo
if (require.main === module) {
  console.log('🎯 YAAM Stream Real-Time Streaming Demo');
  console.log('=' .repeat(50));
  
  // Check if client mode is requested
  if (process.argv.includes('--client')) {
    console.log('🎮 Running in client test mode...');
    setTimeout(() => {
      createTestClient();
    }, 2000);
  } else {
    streamingDemo().catch(console.error);
  }
}

module.exports = { streamingDemo, createTestClient };