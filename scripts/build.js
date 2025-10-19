const esbuild = require('esbuild');
const alias = require('esbuild-plugin-alias');
const path = require('path');

const srcDir = path.resolve(__dirname, '..', 'src');
const outDir = path.resolve(__dirname, '..', 'out');

esbuild.build({
  entryPoints: [path.join(srcDir, 'extension.ts')],
  bundle: true,
  platform: 'node',
  target: ['node18'],
  outfile: path.join(outDir, 'extension.js'),
  sourcemap: true,
  external: ['vscode'],
  plugins: [
    alias({
      '@': srcDir
    })
  ]
}).catch((e) => {
  console.error(e);
  process.exit(1);
});
