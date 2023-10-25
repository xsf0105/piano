import { resolve } from 'path'
import { defineConfig } from 'vite'
import copyPlugin from 'rollup-plugin-copy'

export default defineConfig({
  base: './',
  build: {
    emptyOutDir: false, // 复制文件夹，需要将此配置项设为 false
    rollupOptions: {
      plugins: [
        copyPlugin({
          targets: [
            { src: 'samples', dest: 'dist' }
          ],
        }),
      ],
      input: {
        main: resolve(__dirname, 'index.html'),
      }
    },
  },
})
