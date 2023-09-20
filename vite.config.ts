import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, './src/index.ts'),
            name: 'formlink',
            fileName: format => `formlink.${format}.js`
        }
    },

    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },

    plugins: [(dts({
        outputDir: path.resolve(__dirname, './types')
    }) as any)]
});
