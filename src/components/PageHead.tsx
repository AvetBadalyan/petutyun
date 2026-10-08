import { useEffect } from 'react'

interface PageHeadProps {
	title: string
	description?: string
}

/**
 * Lightweight per-route head manager — updates document.title on mount.
 * Keeps each page's title/description in its own component instead of
 * duplicating logic or adding a heavy library.
 */
export function PageHead({ title, description }: PageHeadProps) {
	useEffect(() => {
		const fullTitle = `${title} · Petutyun`
		document.title = fullTitle

		if (description) {
			let metaDesc = document.querySelector('meta[name="description"]')
			if (!metaDesc) {
				metaDesc = document.createElement('meta')
				metaDesc.setAttribute('name', 'description')
				document.head.appendChild(metaDesc)
			}
			metaDesc.setAttribute('content', description)
		}
	}, [title, description])

	return null
}
