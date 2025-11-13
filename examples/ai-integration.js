/**
 * YAAM Stream - AI Integration Example
 * Demonstrates AI-powered content generation and enhancement
 */

const { YaamStream } = require('yaam-stream');

async function aiIntegrationDemo() {
  console.log('🤖 YAAM Stream AI Integration Demo\n');

  // Basic document structure
  const basicData = {
    cover: {
      category: "AI-Enhanced Report",
      title: "Market Analysis Report",
      subtitle: "Enhanced with AI Assistance"
    },
    sections: [
      {
        type: "content",
        title: "Executive Summary",
        content: "Basic market analysis data to be enhanced by AI."
      }
    ]
  };

  try {
    // Initialize YAAM Stream with AI configuration
    const yaam = new YaamStream({
      data: basicData,
      config: {
        theme: 'corporate',
        ai: {
          enabled: true,
          provider: 'openai', // Replace with your preferred provider
          apiKey: process.env.OPENAI_API_KEY || 'your-api-key-here',
          model: 'gpt-3.5-turbo',
          temperature: 0.7,
          maxTokens: 2000
        },
        animation: {
          speed: 30,
          effects: {
            typewriter: true,
            cursor: true
          }
        }
      }
    });

    console.log('📝 Original document structure:');
    console.log(`  📄 Title: ${basicData.cover.title}`);
    console.log(`  📝 Sections: ${basicData.sections.length}`);
    console.log(`  📝 Content preview: ${basicData.sections[0].content.substring(0, 50)}...\n`);

    // AI Enhancement 1: Content Generation
    console.log('🤖 AI Enhancement 1: Content Generation');
    console.log('💭 Prompt: "Generate a comprehensive market analysis report with professional business language, including market trends, competitive analysis, and strategic recommendations"\n');
    
    const enhancedData1 = await yaam.processWithAI(
      "Generate a comprehensive market analysis report with professional business language, including market trends, competitive analysis, and strategic recommendations. Make it suitable for C-level executives and include specific actionable insights."
    );

    console.log('✅ Content enhancement completed!');
    console.log(`  📊 New sections: ${enhancedData1.sections.length}`);
    console.log(`  📝 Enhanced content length: ${enhancedData1.sections[0].content.length} characters\n`);

    // Update document with enhanced content
    yaam.setData(enhancedData1);

    // AI Enhancement 2: Add Highlights Section
    console.log('🤖 AI Enhancement 2: Adding Key Metrics Section');
    console.log('💭 Prompt: "Add a highlights section with 6 key performance indicators relevant to market analysis, including metrics like market share, growth rate, customer satisfaction, etc."\n');
    
    const enhancedData2 = await yaam.processWithAI(
      "Add a highlights section with 6 key performance indicators relevant to market analysis. Include metrics like market share, growth rate, customer satisfaction, competitive position, revenue trends, and strategic opportunities. Use appropriate icons and professional formatting."
    );

    console.log('✅ Highlights section added!');
    console.log(`  📊 Total sections: ${enhancedData2.sections.length}`);
    
    // Find and display the highlights section
    const highlightsSection = enhancedData2.sections.find(s => s.type === 'highlights');
    if (highlightsSection) {
      console.log(`  🎯 Highlights items: ${highlightsSection.items.length}`);
      highlightsSection.items.forEach((item, index) => {
        console.log(`    ${index + 1}. ${item.icon} ${item.title}: ${item.text}`);
      });
    }
    console.log();

    // AI Enhancement 3: Generate Executive Summary
    console.log('🤖 AI Enhancement 3: Executive Summary Generation');
    console.log('💭 Prompt: "Create a compelling executive summary that synthesizes all sections into a concise overview for senior leadership"\n');
    
    const finalData = await yaam.processWithAI(
      "Create a compelling executive summary that synthesizes all sections into a concise overview for senior leadership. The summary should be no more than 200 words and highlight the most critical findings and recommendations."
    );

    console.log('✅ Executive summary generated!');
    console.log(`  📄 Final document: ${finalData.sections.length} sections\n`);

    // Generate the final enhanced document
    console.log('🎨 Generating final AI-enhanced document...');
    const html = await yaam.generate();
    
    console.log('✅ AI-enhanced document generated successfully!');
    console.log(`📊 Final HTML length: ${html.length.toLocaleString()} characters`);

    // Export to multiple formats
    console.log('\n🔄 Exporting AI-enhanced document...');
    const results = await yaam.export(['html', 'pdf']);
    
    console.log('✅ Export completed!');
    results.forEach(result => {
      console.log(`  📁 ${result.format.toUpperCase()}: ${result.filename}`);
    });

    // Get AI usage statistics
    const aiStats = {
      enhancements: 3,
      totalTokens: Math.floor(html.length / 4), // Rough estimate
      estimatedCost: ((html.length / 4) * 0.0015 / 1000).toFixed(4) // GPT-3.5 pricing
    };

    console.log('\n🤖 AI Usage Statistics:');
    console.log(`  🔧 Enhancements applied: ${aiStats.enhancements}`);
    console.log(`  📝 Estimated tokens: ${aiStats.totalTokens.toLocaleString()}`);
    console.log(`  💰 Estimated cost: $${aiStats.estimatedCost}`);

    // Cleanup
    await yaam.cleanup();
    console.log('\n🧹 Cleanup completed');
    console.log('\n✨ AI Integration Demo completed successfully!');

  } catch (error) {
    console.error('❌ AI Integration error:', error.message);
    
    // Provide helpful error messages
    if (error.message.includes('API key')) {
      console.log('\n💡 To use AI features:');
      console.log('  1. Set your API key in environment variable:');
      console.log('     export OPENAI_API_KEY=your-api-key-here');
      console.log('  2. Or pass it directly in the config');
      console.log('  3. Make sure you have valid API credits');
    }
    
    process.exit(1);
  }
}

// Alternative: AI-powered content enhancement function
async function enhanceContentWithAI(yaam, prompt, options = {}) {
  try {
    console.log(`🤖 AI Enhancement: ${options.description || 'Content enhancement'}`);
    console.log(`💭 Prompt: ${prompt.substring(0, 100)}...`);
    
    const enhancedData = await yaam.processWithAI(prompt, options);
    
    console.log('✅ AI enhancement completed');
    return enhancedData;
  } catch (error) {
    console.error('❌ AI enhancement failed:', error.message);
    throw error;
  }
}

// AI enhancement presets
const aiPresets = {
  businessReport: {
    description: "Business Report Enhancement",
    prompt: "Transform this into a professional business report suitable for C-level executives. Include market analysis, competitive landscape, financial projections, and strategic recommendations. Use formal business language and structure."
  },
  
  academicPaper: {
    description: "Academic Paper Enhancement",
    prompt: "Enhance this content for academic publication. Include proper citations, methodology section, literature review, and academic formatting. Ensure scholarly tone and rigorous analysis."
  },
  
  marketingContent: {
    description: "Marketing Content Enhancement",
    prompt: "Create compelling marketing content that highlights key benefits, includes customer testimonials, call-to-action elements, and persuasive language. Focus on conversion and engagement."
  },
  
  technicalDocumentation: {
    description: "Technical Documentation Enhancement",
    prompt: "Create comprehensive technical documentation with clear explanations, code examples, API references, troubleshooting guides, and best practices. Use technical but accessible language."
  }
};

// Run the demo
if (require.main === module) {
  // Check for AI API key
  if (!process.env.OPENAI_API_KEY && !process.env.CLAUDE_API_KEY && !process.env.DEEPSEEK_API_KEY) {
    console.log('⚠️  No AI API key found in environment variables');
    console.log('💡 Set one of these environment variables:');
    console.log('   export OPENAI_API_KEY=your-key-here');
    console.log('   export CLAUDE_API_KEY=your-key-here');
    console.log('   export DEEPSEEK_API_KEY=your-key-here\n');
    
    // Run demo with placeholder (will show error but demonstrate structure)
    process.env.OPENAI_API_KEY = 'demo-key-placeholder';
  }
  
  aiIntegrationDemo().catch(console.error);
}

module.exports = { 
  aiIntegrationDemo, 
  enhanceContentWithAI, 
  aiPresets 
};