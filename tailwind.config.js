/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				// Brand palette: coral (primary) + teal (accent) over warm neutrals.
				// Optimized for WCAG AA contrast (4.5:1 for text, 3:1 for UI)
				coral: {
					50: '#fff5f2',
					100: '#ffe8e1',
					200: '#ffd1c7',
					300: '#ffb09e',
					400: '#ff8567',
					500: '#ff6b35', // Primary brand color
					600: '#e84d1a', // Darkened for better contrast on white
					700: '#c74316',
					800: '#a33916',
					900: '#873418',
					950: '#4a1709'
				},
				teal: {
					50: '#effefa',
					100: '#c8fff1',
					200: '#92fee5',
					300: '#53f5d5',
					400: '#21e2c1',
					500: '#2ec4b6', // Secondary brand color
					600: '#069e91',
					700: '#0a7e75',
					800: '#0e645e',
					900: '#11534e',
					950: '#033331'
				},
				neutral: {
					50: '#fafaf9',
					100: '#f5f5f4',
					200: '#e7e5e4',
					300: '#d6d3d1',
					400: '#a8a29e',
					500: '#78716c',
					600: '#57534e',
					700: '#44403c',
					800: '#292524',
					900: '#1c1917',
					950: '#0c0a09'
				}
			},
			fontFamily: {
				serif: ['"Georgia"', '"Times New Roman"', 'serif'],
				sans: [
					'Inter',
					'Segoe UI',
					'-apple-system',
					'BlinkMacSystemFont',
					'Roboto',
					'Helvetica Neue',
					'sans-serif'
				]
			},
			borderRadius: {
				pill: '1000px'
			},
			boxShadow: {
				card: '0 4px 24px -8px rgba(0, 0, 0, 0.08)',
				'card-hover': '0 12px 36px -10px rgba(0, 0, 0, 0.15)'
			},
			keyframes: {
				shimmer: {
					'100%': { transform: 'translateX(100%)' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				}
			},
			animation: {
				shimmer: 'shimmer 1.5s infinite',
				'fade-in': 'fade-in 0.2s ease-out'
			}
		}
	},
	plugins: []
}
