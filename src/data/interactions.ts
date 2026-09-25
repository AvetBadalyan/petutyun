/**
 * Medication interaction checker: a small database of known ingredient
 * interactions plus a pairwise scan over a pet's active medications.
 *
 * Demo data for a portfolio — not medical advice.
 */

export interface Interaction {
	ingredientA: string
	ingredientB: string
	severity: 'avoid' | 'caution' | 'monitor'
	reason: string
}

export const interactions: Interaction[] = [
	{
		ingredientA: 'Carprofen',
		ingredientB: 'Meloxicam',
		severity: 'avoid',
		reason:
			'Two NSAIDs together sharply increase the risk of stomach ulcers and kidney damage. Never combine.'
	},
	{
		ingredientA: 'Carprofen',
		ingredientB: 'Prednisolone',
		severity: 'avoid',
		reason:
			'Combining an NSAID with a corticosteroid can cause serious gastrointestinal bleeding.'
	},
	{
		ingredientA: 'Meloxicam',
		ingredientB: 'Prednisolone',
		severity: 'avoid',
		reason:
			'NSAID and steroid together greatly increases ulcer risk. Requires a vet-directed washout period between.'
	},
	{
		ingredientA: 'Gabapentin',
		ingredientB: 'Trazodone',
		severity: 'caution',
		reason:
			'Both are sedating. Combined use can cause excessive drowsiness — monitor closely and reduce activity.'
	},
	{
		ingredientA: 'Fluoxetine',
		ingredientB: 'Trazodone',
		severity: 'caution',
		reason:
			'Risk of serotonin syndrome when stacked. Use only under veterinary supervision with dose adjustments.'
	},
	{
		ingredientA: 'Omega-3 Fatty Acids',
		ingredientB: 'Carprofen',
		severity: 'monitor',
		reason:
			'Both can mildly affect blood clotting. Generally fine, but monitor for unusual bruising or bleeding.'
	},
	{
		ingredientA: 'Ivermectin',
		ingredientB: 'Milbemycin Oxime',
		severity: 'avoid',
		reason:
			'Overlapping macrocyclic lactones can cause neurotoxicity, especially in MDR1-sensitive breeds (Collies, Aussies).'
	},
	{
		ingredientA: 'Calcium Carbonate',
		ingredientB: 'Enrofloxacin',
		severity: 'caution',
		reason:
			'Calcium binds to the antibiotic and reduces absorption. Separate doses by at least 2 hours.'
	},
	{
		ingredientA: 'Levothyroxine',
		ingredientB: 'Calcium Carbonate',
		severity: 'caution',
		reason:
			'Calcium can reduce thyroid medication absorption. Give thyroid meds on empty stomach, calcium with food.'
	},
	{
		ingredientA: 'Enalapril',
		ingredientB: 'Potassium Supplements',
		severity: 'monitor',
		reason:
			'ACE inhibitors can raise potassium levels. Monitor for signs of hyperkalemia if supplementing.'
	}
]

export function findInteraction(
	ingredientA: string,
	ingredientB: string
): Interaction | undefined {
	return interactions.find(
		i =>
			(i.ingredientA === ingredientA && i.ingredientB === ingredientB) ||
			(i.ingredientA === ingredientB && i.ingredientB === ingredientA)
	)
}

/**
 * Check every pair of active ingredients for interactions. O(n²), but n is
 * the handful of medications one pet is on. Two medications sharing the same
 * active ingredient are flagged as a duplicate-dose risk.
 */
export function checkInteractions(ingredients: string[]): Interaction[] {
	const found: Interaction[] = []

	for (let i = 0; i < ingredients.length; i++) {
		for (let j = i + 1; j < ingredients.length; j++) {
			if (ingredients[i] === ingredients[j]) {
				found.push({
					ingredientA: ingredients[i],
					ingredientB: ingredients[j],
					severity: 'caution',
					reason: `Two medications both contain ${ingredients[i]} — combining them risks a double dose. Check with your vet.`
				})
				continue
			}
			const interaction = findInteraction(ingredients[i], ingredients[j])
			if (interaction) found.push(interaction)
		}
	}

	const severityOrder = { avoid: 0, caution: 1, monitor: 2 }
	return found.sort(
		(a, b) => severityOrder[a.severity] - severityOrder[b.severity]
	)
}

/**
 * Get severity color classes for UI
 */
export function getSeverityStyles(severity: Interaction['severity']) {
	switch (severity) {
		case 'avoid':
			return {
				bg: 'bg-red-100 dark:bg-red-950',
				text: 'text-red-700 dark:text-red-300',
				border: 'border-red-300 dark:border-red-800',
				label: 'AVOID'
			}
		case 'caution':
			return {
				bg: 'bg-amber-100 dark:bg-amber-950',
				text: 'text-amber-700 dark:text-amber-300',
				border: 'border-amber-300 dark:border-amber-800',
				label: 'CAUTION'
			}
		case 'monitor':
			return {
				bg: 'bg-blue-100 dark:bg-blue-950',
				text: 'text-blue-700 dark:text-blue-300',
				border: 'border-blue-300 dark:border-blue-800',
				label: 'MONITOR'
			}
	}
}
