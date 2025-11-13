import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // Use SWC for faster compilation (Rust-based)
  plugins: [react()],

  // Path resolution
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@pages': resolve(__dirname, './src/pages'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@utils': resolve(__dirname, './src/utils'),
      '@data': resolve(__dirname, './src/data'),
      '@styles': resolve(__dirname, './src/styles'),
      '@assets': resolve(__dirname, './src/assets')
    }
  },

  // Development server configuration
  server: {
    port: 3000,
    open: true, // Auto-open browser
    host: true, // Expose to network
    cors: true,
    // Proxy API requests (if applicable)
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false
      }
    }
  },

  // Preview server configuration (for production build testing)
  preview: {
    port: 4173,
    open: true,
    host: true
  },

  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Disable in production for security
    minify: 'terser', // Use terser for better minification
    
    // Terser options for better compression
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info']
      }
    },

    // Chunk size warnings
    chunkSizeWarningLimit: 1000,

    // Rollup options for optimization
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          
          // UI components chunk
          'ui-components': [
            './src/components/common/Button/Button.jsx',
            './src/components/common/Card/Card.jsx'
          ],
          
          // Utils chunk
          'utils': [
            './src/utils/helpers.js',
            './src/utils/animations.js'
          ]
        },
        
        // Asset file naming
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').pop();
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff2?|ttf|otf|eot/i.test(extType)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        
        // Chunk file naming
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    },

    // CSS code splitting
    cssCodeSplit: true,

    // Asset inline limit (smaller than this will be inlined as base64)
    assetsInlineLimit: 4096, // 4kb

    // Report compressed size
    reportCompressedSize: true,

    // Enable/disable CSS minification
    cssMinify: true
  },

  // CSS configuration
  css: {
    devSourcemap: true,
    modules: {
      localsConvention: 'camelCase'
    },
    preprocessorOptions: {
      // If using SCSS
      // scss: {
      //   additionalData: `@import "@/styles/variables.scss";`
      // }
    }
  },

  // Define global constants
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
  },

  // Optimizations
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: []
  },

  // Environment variables prefix
  envPrefix: 'REACT_APP_',

  // Base public path
  base: '/',

  // Esbuild options
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
    target: 'es2020',
    legalComments: 'none'
  }
});
