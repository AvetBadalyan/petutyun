/**
 * One shared transition for all animations so motion feels uniform app-wide:
 * a single 200ms duration on one easing curve. Matches the `duration-200`
 * used by CSS hover transitions.
 */
const ease = [0.16, 1, 0.3, 1] as const
const DURATION = 0.2

export const motionTransition = {
	fast: { duration: DURATION, ease },
	base: { duration: DURATION, ease }
} as const
