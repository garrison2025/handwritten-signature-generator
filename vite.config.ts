import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Ensures manifest.json and SEO files in the root are copied to the dist folder during build
    viteStaticCopy({
      targets: [
        {
          src: 'manifest.json',
          dest: '.'
        },
        {
          src: 'robots.txt',
          dest: '.'
        },
        {
          src: 'sitemap.xml',
          dest: '.'
        }
      ]
    })
  ]
});