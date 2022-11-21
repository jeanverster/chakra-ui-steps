import typescript from '@rollup/plugin-typescript';
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite';
const path = require('path');

const isExternal = (id: string) => !id.startsWith('.') && !path.isAbsolute(id);
const resolvePath = (str: string) => path.resolve(__dirname, str);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    babel: {
      plugins: ['@babel/plugin-transform-typescript'],
    },
  })],
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
      plugins: [
        typescript({
          target: 'ESNext',
          rootDir: resolvePath('./src'),
          declaration: true,
          declarationDir: resolvePath('./dist'),
          exclude: resolvePath('./node_modules/**'),
          allowSyntheticDefaultImports: true,
        }),
      ],
    },
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'chakra-ui-steps',
    },
  },
});
