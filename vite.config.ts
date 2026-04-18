import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, loadEnv} from 'vite';

const copyHtaccess = () => ({
  name: 'copy-htaccess',
  closeBundle() {
    const content = [
      'Options -MultiViews',
      'RewriteEngine On',
      'RewriteBase /',
      'RewriteRule ^index\\.html$ - [L]',
      'RewriteCond %{REQUEST_FILENAME} !-f',
      'RewriteCond %{REQUEST_FILENAME} !-d',
      'RewriteRule . /index.html [L]',
      ''
    ].join('\n');
    fs.writeFileSync('dist/.htaccess', content);
  }
});

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), copyHtaccess()],
    base: '/',
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
