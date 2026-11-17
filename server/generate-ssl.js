import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sslDir = path.join(__dirname, 'ssl');

if (!fs.existsSync(sslDir)) {
  fs.mkdirSync(sslDir, { recursive: true });
}

console.log('🔒 Free SSL / TLS Generator for Portfolio Server');
console.log('Directory:', sslDir);

try {
  // Attempt generating with openssl if available
  execSync(
    `openssl req -x509 -newkey rsa:2048 -keyout "${path.join(sslDir, 'key.pem')}" -out "${path.join(sslDir, 'cert.pem')}" -days 365 -nodes -subj "/CN=localhost"`,
    { stdio: 'inherit' }
  );
  console.log('✅ Generated free SSL cert.pem and key.pem successfully!');
} catch (e) {
  console.log('ℹ️ OpenSSL CLI not in PATH or not required. Vite dev server handles SSL automatically via @vitejs/plugin-basic-ssl.');
}
