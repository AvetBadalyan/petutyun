import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark'

interface ThemeState {
	theme: Theme
	toggle: () => void
	set: (t: Theme) => void
}

export const useTheme = create<ThemeState>()(
	persist(
		(set, get) => ({
			theme: 'light',
			toggle: () => {
				const next = get().theme === 'light' ? 'dark' : 'light'
				set({ theme: next })
				applyTheme(next)
			},
			set: t => {
				set({ theme: t })
				applyTheme(t)
			}
		}),
		{ name: 'petcare-theme' }
	)
)

export function applyTheme(theme: Theme) {
	const root = document.documentElement
	if (theme === 'dark') root.classList.add('dark')
	else root.classList.remove('dark')
}

/** Call once on startup to sync the <html> class with persisted state. */
export function initTheme() {
	applyTheme(useTheme.getState().theme)
}
