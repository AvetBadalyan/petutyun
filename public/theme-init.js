// Applies the persisted theme before first paint, avoiding a flash of the
// wrong theme. Mirrors the storage shape written by zustand/persist in
// src/store/theme.ts (key "petutyun-theme"), falling back to the OS
// preference. src/store/theme.ts re-applies the same class once React
// mounts, so this is just an early, synchronous head start.
// Loaded as a classic (non-module) script so it blocks rendering until it
// runs, and served same-origin so it satisfies the site's CSP (script-src 'self').
(function () {
	try {
		var stored = localStorage.getItem('petutyun-theme')
		var theme = stored
			? JSON.parse(stored).state.theme
			: window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light'
		if (theme === 'dark') document.documentElement.classList.add('dark')
	} catch (e) {
		// localStorage unavailable (e.g. privacy mode) — default to light.
	}
})()
