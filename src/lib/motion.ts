// Shared Framer Motion transition used app-wide: 200ms matches the
// CSS `duration-200` used on all hover/focus transitions.
const ease = [0.16, 1, 0.3, 1] as const

export const motionTransition = {
	duration: 0.2,
	ease
} as const
