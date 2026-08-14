const fs = require('node:fs');

fs.mkdirSync('dist', { recursive: true });
fs.copyFileSync('app.js', 'dist/app.js');

console.log('Build completed: dist/app.js created.');
