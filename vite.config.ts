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
		// App is small and intentionally not code-split; the single bundle is
		// well under any real-world concern, so relax the default 500 kB notice.
		chunkSizeWarningLimit: 700
	}
})
