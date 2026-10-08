/**
 * Image optimization utilities
 */

/**
 * Generate responsive image srcset for Unsplash images
 * @param baseUrl - The Unsplash image URL
 * @param sizes - Array of width sizes for srcset
 * @returns srcset string
 */
export function generateSrcSet(
	baseUrl: string,
	sizes: number[] = [160, 320, 480, 640]
): string {
	return sizes
		.map(size => {
			const url = new URL(baseUrl)
			url.searchParams.set('w', size.toString())
			url.searchParams.set('auto', 'format')
			url.searchParams.set('q', '75')
			url.searchParams.set('fit', 'crop')
			return `${url.toString()} ${size}w`
		})
		.join(', ')
}

/**
 * Generate optimized Unsplash image URL
 * @param baseUrl - The Unsplash image URL
 * @param width - Desired width
 * @param height - Desired height
 * @param quality - Image quality (default 75)
 * @returns optimized URL
 */
export function optimizeImage(
	baseUrl: string,
	width: number,
	height?: number,
	quality: number = 75
): string {
	const url = new URL(baseUrl)
	url.searchParams.set('w', width.toString())
	if (height) {
		url.searchParams.set('h', height.toString())
	}
	url.searchParams.set('auto', 'format')
	url.searchParams.set('q', quality.toString())
	url.searchParams.set('fit', 'crop')
	return url.toString()
}

/**
 * Get sizes attribute for responsive images
 * Common breakpoints: mobile (320-767), tablet (768-1023), desktop (1024+)
 */
export const imageSizes = {
	thumbnail: '(max-width: 640px) 80px, 84px',
	card: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
	hero: '(max-width: 768px) 100vw, 700px',
	small: '(max-width: 640px) 160px, 200px'
}
