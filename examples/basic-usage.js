/**
 * YAAM Stream - Basic Usage Example
 * Demonstrates fundamental features and configuration
 */

const { YaamStream } = require('yaam-stream');

async function basicExample() {
  console.log('🚀 YAAM Stream Basic Usage Example\n');

  // Sample document data
  const documentData = {
    cover: {
      category: "Business Report",
      title: "Quarterly Performance Analysis",
      subtitle: "Q4 2024 Financial Results",
      meta: [
        { label: "Date", value: "December 2024" },
        { label: "Department", value: "Finance" },
        { label: "Author", value: "Financial Team" }
      ]
    },
    sections: [
      {
        type: "content",
        title: "Executive Summary",
        subtitle: "Key Performance Indicators",
        content: "This quarter has demonstrated exceptional growth across all key metrics. Revenue increased by 15% year-over-year, while operational efficiency improved significantly. Our strategic initiatives have yielded positive results, positioning the company for sustained growth in the coming fiscal year."
      },
      {
        type: "content",
        title: "Financial Performance",
        subtitle: "Revenue and Profitability Analysis",
        content: "The financial performance this quarter exceeded expectations with total revenue reaching $2.4 million, representing a 15% increase from the previous year. Operating margins improved to 22%, driven by operational efficiencies and strategic cost management initiatives."
      },
      {
        type: "highlights",
        title: "Key Achievements",
        subtitle: "Quarterly Milestones",
        items: [
          { icon: "📈", title: "Revenue Growth", text: "15% increase year-over-year with strong momentum" },
          { icon: "💰", title: "Profit Margin", text: "Improved to 22% through operational efficiency" },
          { icon: "👥", title: "Team Expansion", text: "25% growth in key departments" },
          { icon: "🎯", title: "Goal Achievement", text: "95% of quarterly objectives met" },
          { icon: "🌟", title: "Customer Satisfaction", text: "NPS score improved to 8.5" },
          { icon: "🔧", title: "Process Optimization", text: "Implemented 12 efficiency improvements" }
        ]
      },
      {
        type: "content",
        title: "Market Analysis",
        subtitle: "Competitive Landscape and Opportunities",
        content: "Market conditions remain favorable with growing demand for our services. Competitive analysis shows strong positioning, and emerging opportunities in adjacent markets present potential for expansion. Strategic partnerships have been established to accelerate growth."
      },
      {
        type: "signature",
        left: "Prepared by Finance Department",
        right: "Approved by Executive Team"
      }
    ]
  };

  try {
    // Initialize YAAM Stream with golden theme
    const yaam = new YaamStream({
      data: documentData,
      config: {
        theme: 'golden',
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
          pageSize: 'A4'
        },
        export: {
          format: ['html', 'pdf'],
          quality: 'print'
        }
      }
    });

    console.log('📄 Generating document...');
    
    // Generate the document
    const html = await yaam.generate();
    console.log('✅ Document generated successfully!');
    console.log(`📊 HTML length: ${html.length} characters\n`);

    // Export to multiple formats
    console.log('🔄 Exporting to multiple formats...');
    const results = await yaam.export(['html', 'pdf']);
    
    console.log('✅ Export completed!');
    results.forEach(result => {
      console.log(`  📁 ${result.format.toUpperCase()}: ${result.filename} (${(result.size / 1024).toFixed(1)} KB)`);
    });

    // Get generation statistics
    const stats = yaam.getStats();
    console.log('\n📈 Generation Statistics:');
    console.log(`  ⏱️  Duration: ${stats.duration}ms`);
    console.log(`  📄 Sections: ${stats.sectionsProcessed}`);
    console.log(`  📝 Characters: ${stats.charactersWritten.toLocaleString()}`);

    // Cleanup
    await yaam.cleanup();
    console.log('\n🧹 Cleanup completed');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the example
if (require.main === module) {
  basicExample().catch(console.error);
}

module.exports = { basicExample };