import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-dts';
const path = require('path');

const isExternal = (id: string) => !id.startsWith('.') && !path.isAbsolute(id);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts()],
  build: {
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: isExternal,
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
        },
      },
    },
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'chakra-ui-steps',
    },
  },
});
