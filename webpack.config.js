const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: {
      type: 'commonjs2'
    },
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json'
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        use: 'raw-loader'
      },
      {
        test: /\.css$/,
        use: 'raw-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/templates',
          to: 'templates',
          noErrorOnMissing: true
        },
        {
          from: 'public',
          to: 'public',
          noErrorOnMissing: true
        }
      ]
    })
  ],
  externals: {
    // Don't bundle these dependencies
    'puppeteer': 'commonjs puppeteer',
    'canvas': 'commonjs canvas',
    'sharp': 'commonjs sharp'
  },
  optimization: {
    minimize: false, // Keep readable code for debugging
    usedExports: true
  },
  node: {
    __dirname: false,
    __filename: false
  }
};