import path from 'path';
import { defineConfig } from 'vite';
import typescript from "@rollup/plugin-typescript";
import { typescriptPaths } from "rollup-plugin-typescript-paths";
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        manifest: true,
        minify: true,
        reportCompressedSize: true,
        lib: {
            entry: path.resolve(__dirname, './src/index.ts'),
            name: 'formlink',
            formats: ['es', 'cjs'],
            fileName: format => `formlink.${format}.js`
        },
        rollupOptions: {
            external: [],
            plugins: [
                typescriptPaths({
                    preserveExtensions: true,
                }),
                typescript({
                    sourceMap: false,
                    declaration: true,
                    outDir: "dist",
                }),
            ],
        },
    },

    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },

    plugins: [(dts({
        outDir: path.resolve(__dirname, './types')
    }) as any)]
});
