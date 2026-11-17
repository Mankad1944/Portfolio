import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  plugins: [
    react(),
    basicSsl(),
  ],
  server: {
    port: 5173,
    https: true, // Enables free automated SSL / TLS in dev
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('error', (err, _req, res) => {
            // Gracefully handle backend offline without polluting terminal with AggregateError
            if (err.code === 'ECONNREFUSED') {
              if (res && res.writeHead && !res.headersSent) {
                res.writeHead(503, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ offline: true, message: 'Backend server not running on port 5000' }));
              }
            }
          });
        },
      },
    },
  },
});
