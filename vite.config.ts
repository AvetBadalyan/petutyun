import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	build: {
		// Enable code splitting for better performance
		chunkSizeWarningLimit: 700,
		rollupOptions: {
			output: {
				// Manual chunks for better code splitting
				manualChunks: {
					// Vendor chunks
					vendor: ['react', 'react-dom', 'react-router-dom'],
					motion: ['framer-motion'],
					icons: ['lucide-react']
				}
			}
		},
		// CSS code splitting
		cssCodeSplit: true
		// Minification uses esbuild (Vite's default, no extra dependency).
		// console/debugger stripping is configured below via `esbuild.drop`.
	},
	// Drop console/debugger calls from the production build.
	esbuild: {
		drop: ['console', 'debugger']
	}
})
