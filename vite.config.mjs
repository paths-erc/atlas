import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Replaces Create React App. Environment variables keep their REACT_APP_ names
// (REACT_APP_API_BASE, REACT_APP_API_KEY, REACT_APP_APP) so .env files and the
// GitHub Actions secret are unchanged.
export default defineConfig({
  plugins: [react()],
  envPrefix: ['VITE_', 'REACT_APP_'],
  // Markdown pages are imported as URLs and fetched at runtime (ReactMarkdownPath)
  assetsInclude: ['**/*.md'],
  build: {
    outDir: 'build',
    // never inline a markdown page as a data: URL
    assetsInlineLimit: file => (file.endsWith('.md') ? false : undefined),
  },
  server: {
    port: 3000,
    // With an empty REACT_APP_API_BASE the API is reached through this proxy (no CORS)
    proxy: { '/paths': 'http://localhost:8080' },
  },
});
