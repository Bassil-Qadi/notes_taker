import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    babel: {
      plugins: [
        'babel-plugin-macros',
        [
          '@emotion/babel-plugin-jsx-pragmatic',
          {
            export: 'jsx',
            import: '__cssprop',
            module: '@emotion/react',
          },
        ],
        [
          '@babel/plugin-transform-react-jsx',
          { pragma: '__cssprop' },
          'twin.macro',
        ],
      ],
    },
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
