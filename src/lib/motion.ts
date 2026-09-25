/**
 * Shared motion tokens so animations feel consistent app-wide:
 * - `fast` for micro-interactions and wizard step swaps
 * - `base` for element entrances (fade/slide in)
 * Both share one easing curve.
 */
const ease = [0.16, 1, 0.3, 1] as const

export const motionTransition = {
	fast: { duration: 0.2, ease },
	base: { duration: 0.35, ease }
} as const
