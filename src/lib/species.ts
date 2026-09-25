import type { Species } from '@/types'

export const speciesEmoji: Record<Species, string> = {
	dog: '🐕',
	cat: '🐱',
	bird: '🐦',
	other: '🐾'
}

/** Neutral inline-SVG placeholder for images that fail to load. */
export function imageFallback(): string {
	const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='400' height='300' fill='%23e7e5e4'/></svg>`
	return `data:image/svg+xml;utf8,${svg}`
}
