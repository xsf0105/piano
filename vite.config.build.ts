// import { resolve } from "path";
// import { defineConfig } from "vite";

// // https://vitejs.dev/config/
// export default defineConfig({
//   build: {
//     lib: {
//       entry: resolve("./src/index.tsx"),
//       formats: ["es", "umd"], // 打包输出格式，默认输出 esm/umd
//       fileName: (format, entryName) => {
//         if (format === "es") {
//           return `${entryName}.js`;
//         }

//         return `${entryName}.${format}.js`;
//       },
//       name: "MyComponent",
//     },
//     rollupOptions: {
//       external: ["quarkc"], // 可选项，是否将 quarkc 打包进组件
//       output: {
//         dir: "lib",
//         globals: {
//           quarkc: "Quarkc",
//         },
//       },
//     },
//   },
// });

import { resolve } from 'path'
import { defineConfig } from 'vite'
import copyPlugin from 'rollup-plugin-copy'

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      plugins: [
        copyPlugin({
          targets: [{ src: 'samples', dest: 'dist' }], // 将文件复制到 dist/healthcheck, vite会自动复制到dist目录
        }),
      ],
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
})
