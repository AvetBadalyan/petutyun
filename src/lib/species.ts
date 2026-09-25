import type { Species } from '@/types'

export const speciesEmoji: Record<Species, string> = {
	dog: '🐕',
	cat: '🐱',
	bird: '🐦',
	other: '🐾'
}

/**
 * Inline-SVG data URI used as an <img> onError fallback. Being inline (rather
 * than a remote placeholder service) keeps it offline-safe and instant.
 */
export function imageFallback(label = 'Pet'): string {
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23e7e5e4"/><text x="50%" y="50%" font-family="sans-serif" font-size="20" fill="%23a8a29e" text-anchor="middle" dominant-baseline="middle">${label}</text></svg>`
	return `data:image/svg+xml;utf8,${svg}`
}
