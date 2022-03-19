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
      external: isExternal,
      output: {
        globals: {
          react: 'react',
          'framer-motion': 'framer-motion',
          '@chakra-ui/system': '@chakra-ui/system',
          '@chakra-ui/theme-tools': '@chakra-ui/theme-tools',
          '@chakra-ui/utils': '@chakra-ui/utils',
          '@chakra-ui/icon': '@chakra-ui/icon',
          'react/jsx-runtime': 'react/jsx-runtime',
          '@chakra-ui/react': '@chakra-ui/react',
          '@chakra-ui/transition': '@chakra-ui/transition',
        },
      },
    },
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'chakra-ui-steps',
    },
  },
});
