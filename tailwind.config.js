/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				// Brand palette: coral (primary) + teal (accent) over a zinc neutral scale.
				// Zinc reads crisp in dark mode and lets the brand colors pop.
				// Contrast targets: 4.5:1 for text, 3:1 for UI components (WCAG AA).
				coral: {
					50: '#fff5f2',
					100: '#ffe8e1',
					200: '#ffd1c7',
					300: '#ffb09e',
					400: '#ff8567',
					500: '#ff6b35',
					600: '#e84d1a',
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
					500: '#2ec4b6',
					600: '#069e91',
					700: '#0a7e75',
					800: '#0e645e',
					900: '#11534e',
					950: '#033331'
				},
				neutral: {
					50: '#fafafa',
					100: '#f4f4f5',
					200: '#e4e4e7',
					300: '#d4d4d8',
					400: '#a1a1aa',
					500: '#71717a',
					600: '#52525b',
					700: '#3f3f46',
					800: '#27272a',
					900: '#18181b',
					950: '#0f0f11'
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
			boxShadow: {
				card: '0 4px 24px -8px rgba(0, 0, 0, 0.08)',
				'card-hover': '0 12px 36px -10px rgba(0, 0, 0, 0.15)'
			},
			keyframes: {
				shimmer: {
					'100%': { transform: 'translateX(100%)' }
				}
			},
			animation: {
				shimmer: 'shimmer 1.5s infinite'
			}
		}
	},
	plugins: []
}
