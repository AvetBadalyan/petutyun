import type { Medication } from '@/data/medications'
import type { Pet } from '@/store/pets'

/**
 * Weight-based dosage calculator.
 *
 * Each medication defines a per-kg dose; we multiply by the pet's weight,
 * round to a unit-appropriate precision, and clamp to the approved ceiling.
 *
 * Demo logic only — not a substitute for veterinary advice.
 */

export interface DosageResult {
	eligible: boolean
	reason?: string
	amount: number
	unit: string
	frequency: string
	display: string
	notes?: string
}

export function calculateDosage(
	medication: Medication,
	pet: Pet
): DosageResult {
	const { dosage } = medication
	const { weight } = pet

	if (weight < dosage.minWeightKg) {
		return {
			eligible: false,
			reason: `${medication.name} is approved for pets over ${dosage.minWeightKg} kg. ${pet.name} is ${weight} kg.`,
			amount: 0,
			unit: dosage.unit,
			frequency: dosage.frequency,
			display: 'Not recommended at this weight'
		}
	}

	let amount = dosage.perKg * weight

	if (dosage.unit === 'tablet') {
		// Tablets are only practical down to a half; never round below 0.5.
		amount = Math.max(0.5, Math.round(amount * 2) / 2)
	} else if (dosage.unit === 'mL') {
		amount = Math.round(amount * 10) / 10
	} else {
		amount = Math.round(amount)
	}

	// Surface the clamp so the user knows the dose hit the approved ceiling.
	let clampNote: string | undefined
	if (dosage.maxDose && amount > dosage.maxDose) {
		amount = dosage.maxDose
		clampNote = `Capped at the maximum approved dose of ${dosage.maxDose} ${dosage.unit}.`
	}

	const unitLabel =
		dosage.unit === 'tablet'
			? amount === 1
				? 'tablet'
				: 'tablets'
			: dosage.unit

	return {
		eligible: true,
		amount,
		unit: dosage.unit,
		frequency: dosage.frequency,
		display: `${amount} ${unitLabel}, ${dosage.frequency}`,
		notes: [dosage.notes, clampNote].filter(Boolean).join(' ') || undefined
	}
}
