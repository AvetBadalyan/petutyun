import type { SymptomResult } from '@/types'

/**
 * Symptom Checker Decision Tree
 *
 * This is a simplified decision tree for a portfolio demo.
 * In a real app, this would be much more comprehensive and should
 * ALWAYS defer to actual veterinary advice.
 *
 * Structure:
 * - Each area (skin, stomach, etc.) has follow-up questions
 * - Based on answers, we look up a result
 */

export interface SymptomQuestion {
	id: string
	text: string
	options: { value: string; label: string }[]
}

export interface SymptomAreaData {
	id: string
	label: string
	emoji: string
	description: string
	questions: SymptomQuestion[]
}

export const symptomAreas: SymptomAreaData[] = [
	{
		id: 'skin',
		label: 'Skin & Coat',
		emoji: '🐾',
		description: 'Itching, scratching, hair loss, rashes',
		questions: [
			{
				id: 'skin-main',
				text: "What's the main symptom you've noticed?",
				options: [
					{ value: 'scratching', label: 'Excessive scratching' },
					{ value: 'hair-loss', label: 'Hair loss or bald patches' },
					{ value: 'rash', label: 'Rash or red spots' },
					{ value: 'dry', label: 'Dry, flaky skin' }
				]
			},
			{
				id: 'skin-duration',
				text: 'How long has this been happening?',
				options: [
					{ value: 'days', label: 'A few days' },
					{ value: 'week', label: 'About a week' },
					{ value: 'weeks', label: 'Several weeks' },
					{ value: 'months', label: 'A month or more' }
				]
			},
			{
				id: 'skin-location',
				text: 'Where is it mostly affecting?',
				options: [
					{ value: 'all-over', label: 'All over the body' },
					{ value: 'belly', label: 'Belly and underside' },
					{ value: 'ears', label: 'Around the ears' },
					{ value: 'paws', label: 'Paws and legs' }
				]
			}
		]
	},
	{
		id: 'stomach',
		label: 'Stomach & Digestion',
		emoji: '🤢',
		description: 'Vomiting, diarrhea, appetite changes',
		questions: [
			{
				id: 'stomach-main',
				text: "What's the main symptom?",
				options: [
					{ value: 'vomiting', label: 'Vomiting' },
					{ value: 'diarrhea', label: 'Diarrhea' },
					{ value: 'no-appetite', label: 'Not eating' },
					{ value: 'eating-grass', label: 'Eating grass a lot' }
				]
			},
			{
				id: 'stomach-frequency',
				text: 'How often is this happening?',
				options: [
					{ value: 'once', label: 'Just once or twice' },
					{ value: 'daily', label: 'Once a day' },
					{ value: 'multiple', label: 'Multiple times a day' },
					{ value: 'constant', label: 'Almost constantly' }
				]
			},
			{
				id: 'stomach-other',
				text: 'Any other symptoms?',
				options: [
					{ value: 'none', label: 'No other symptoms' },
					{ value: 'lethargy', label: 'Seems tired/weak' },
					{ value: 'blood', label: 'Blood in vomit/stool' },
					{ value: 'bloated', label: 'Bloated belly' }
				]
			}
		]
	},
	{
		id: 'behavior',
		label: 'Behavior Changes',
		emoji: '😔',
		description: 'Lethargy, aggression, anxiety, hiding',
		questions: [
			{
				id: 'behavior-main',
				text: 'What change have you noticed?',
				options: [
					{ value: 'lethargy', label: 'Less energy than usual' },
					{ value: 'hiding', label: 'Hiding or avoiding people' },
					{ value: 'aggression', label: 'Unusual aggression' },
					{ value: 'anxiety', label: 'Seems anxious or restless' }
				]
			},
			{
				id: 'behavior-duration',
				text: 'When did this start?',
				options: [
					{ value: 'today', label: 'Today' },
					{ value: 'days', label: 'A few days ago' },
					{ value: 'week', label: 'About a week ago' },
					{ value: 'gradual', label: 'Gradual change over time' }
				]
			},
			{
				id: 'behavior-trigger',
				text: 'Did anything happen recently?',
				options: [
					{ value: 'nothing', label: 'Nothing that I know of' },
					{ value: 'move', label: 'We moved or traveled' },
					{ value: 'new-pet', label: 'New pet or family member' },
					{ value: 'loud-noise', label: 'Loud noise (fireworks, storm)' }
				]
			}
		]
	},
	{
		id: 'mobility',
		label: 'Mobility & Movement',
		emoji: '🦴',
		description: 'Limping, stiffness, trouble moving',
		questions: [
			{
				id: 'mobility-main',
				text: "What's the main issue?",
				options: [
					{ value: 'limping', label: 'Limping on one leg' },
					{ value: 'stiff', label: 'General stiffness' },
					{ value: 'slow', label: 'Moving slowly' },
					{ value: 'wont-jump', label: "Won't jump or climb" }
				]
			},
			{
				id: 'mobility-when',
				text: 'When is it worst?',
				options: [
					{ value: 'always', label: 'All the time' },
					{ value: 'morning', label: 'After resting/sleeping' },
					{ value: 'activity', label: 'After activity' },
					{ value: 'varies', label: 'It varies day to day' }
				]
			},
			{
				id: 'mobility-injury',
				text: 'Any known injury or incident?',
				options: [
					{ value: 'yes', label: 'Yes, they got hurt' },
					{ value: 'maybe', label: 'Maybe, not sure' },
					{ value: 'no', label: 'No injury I know of' },
					{ value: 'old-injury', label: 'Old injury acting up' }
				]
			}
		]
	},
	{
		id: 'eyes-ears',
		label: 'Eyes & Ears',
		emoji: '👁️',
		description: 'Discharge, redness, head shaking',
		questions: [
			{
				id: 'eyes-ears-area',
				text: 'Which area is affected?',
				options: [
					{ value: 'eyes', label: 'Eyes' },
					{ value: 'ears', label: 'Ears' },
					{ value: 'both', label: 'Both eyes and ears' }
				]
			},
			{
				id: 'eyes-ears-symptom',
				text: 'What are you seeing?',
				options: [
					{ value: 'discharge', label: 'Discharge or gunk' },
					{ value: 'redness', label: 'Redness or swelling' },
					{ value: 'scratching', label: 'Scratching at the area' },
					{ value: 'shaking', label: 'Head shaking (ears)' }
				]
			},
			{
				id: 'eyes-ears-smell',
				text: 'Is there any smell?',
				options: [
					{ value: 'no', label: 'No smell' },
					{ value: 'mild', label: 'Mild odor' },
					{ value: 'strong', label: 'Strong/bad smell' }
				]
			}
		]
	}
]

// Results keyed by "area-mainSymptom[-acuity]"; see getSymptomResult for how
// the key is assembled from the wizard answers.
const resultsMap: Record<string, SymptomResult> = {
	// SKIN
	'skin-scratching-chronic': {
		cause: 'Possible allergies (food or environmental)',
		severity: 'medium',
		advice:
			'Consider an elimination diet or allergy testing. Keep a log of when scratching is worst.',
		seeVet: true
	},
	'skin-scratching-acute': {
		cause: 'Could be fleas, new irritant, or temporary reaction',
		severity: 'low',
		advice:
			'Check for fleas. Did you change food, detergent, or visit a new area? Try a gentle bath.',
		seeVet: false
	},
	'skin-hair-loss': {
		cause: 'Hair loss can indicate hormonal issues, stress, or skin infection',
		severity: 'medium',
		advice:
			'Document the pattern of hair loss with photos. This needs a vet examination.',
		seeVet: true
	},
	'skin-rash': {
		cause:
			'Could be contact dermatitis, bacterial/fungal infection, or allergic reaction',
		severity: 'medium',
		advice:
			"Keep the area clean and prevent scratching. Don't apply human products.",
		seeVet: true
	},
	'skin-dry': {
		cause: 'Dry skin from weather, diet deficiency, or over-bathing',
		severity: 'low',
		advice:
			'Try omega-3 supplements, reduce bathing frequency, use a humidifier in dry weather.',
		seeVet: false
	},

	// STOMACH
	'stomach-vomiting-mild': {
		cause:
			'Occasional vomiting can be from eating too fast or minor stomach upset',
		severity: 'low',
		advice:
			'Withhold food for 12 hours, then offer small bland meals. Ensure water access.',
		seeVet: false
	},
	'stomach-vomiting-severe': {
		cause:
			'Frequent vomiting is concerning - could be infection, toxin, or blockage',
		severity: 'high',
		advice:
			"This needs immediate attention. Don't wait - contact your vet or emergency clinic.",
		seeVet: true
	},
	'stomach-diarrhea-mild': {
		cause: 'Could be dietary indiscretion, stress, or minor infection',
		severity: 'low',
		advice:
			'Feed a bland diet (boiled chicken and rice). Ensure hydration. Should improve in 1-2 days.',
		seeVet: false
	},
	'stomach-diarrhea-severe': {
		cause:
			'Persistent diarrhea can cause dehydration and indicates infection or other issues',
		severity: 'high',
		advice:
			'Watch for signs of dehydration. If blood is present, see a vet immediately.',
		seeVet: true
	},
	'stomach-no-appetite': {
		cause: 'Loss of appetite has many causes - from stress to illness',
		severity: 'medium',
		advice:
			'Monitor for 24 hours. Try warming food or offering favorites. If continues, see vet.',
		seeVet: true
	},

	// BEHAVIOR
	'behavior-lethargy': {
		cause:
			'Decreased energy can indicate pain, illness, depression, or age-related changes',
		severity: 'medium',
		advice:
			'Note any other symptoms. If sudden onset or combined with other issues, see vet.',
		seeVet: true
	},
	'behavior-hiding': {
		cause: 'Hiding often means pain, illness, or stress/fear',
		severity: 'medium',
		advice:
			'Create a safe quiet space. If this is sudden and unusual, a vet visit is recommended.',
		seeVet: true
	},
	'behavior-aggression': {
		cause:
			'Sudden aggression often means pain or fear, sometimes medical issues',
		severity: 'high',
		advice:
			"Don't punish - they may be hurting. Keep everyone safe and consult a vet first.",
		seeVet: true
	},
	'behavior-anxiety': {
		cause: 'Anxiety can be triggered by changes, past trauma, or separation',
		severity: 'medium',
		advice:
			'Provide comfort and routine. Consider calming products. Discuss with vet if severe.',
		seeVet: false
	},

	// MOBILITY
	'mobility-limping-injury': {
		cause: 'Injury to paw, leg, or joint',
		severity: 'high',
		advice:
			'Rest is important. Check for visible injuries. If not improving in 24h, see vet.',
		seeVet: true
	},
	'mobility-limping-unknown': {
		cause: 'Could be soft tissue injury, arthritis, or other joint issue',
		severity: 'medium',
		advice:
			"Limit activity. Note which leg and when it's worst. Schedule a vet visit.",
		seeVet: true
	},
	'mobility-stiff': {
		cause: 'Stiffness often indicates arthritis, especially in older pets',
		severity: 'medium',
		advice:
			'Gentle exercise, warm bedding, joint supplements may help. Discuss pain management with vet.',
		seeVet: true
	},

	// EYES & EARS
	'eyes-discharge': {
		cause:
			'Eye discharge can be from allergies, infection, or blocked tear duct',
		severity: 'medium',
		advice:
			'Gently clean with warm damp cloth. If discharge is green/yellow or eye is red, see vet.',
		seeVet: true
	},
	'ears-discharge': {
		cause:
			'Ear discharge usually indicates infection (bacterial, yeast, or mites)',
		severity: 'medium',
		advice:
			"Don't use Q-tips inside the ear. A vet can determine the type of infection and proper treatment.",
		seeVet: true
	},
	'ears-smell': {
		cause: 'Smelly ears are a strong sign of ear infection',
		severity: 'high',
		advice:
			"Ear infections are painful and won't resolve on their own. Vet visit needed.",
		seeVet: true
	}
}

/**
 * Maps a set of wizard answers to a result by building a lookup key from the
 * affected area and the user's answers. "Acuity" (how long/often) is derived
 * separately from the result's clinical severity.
 */
type Acuity = 'acute' | 'chronic'

export function getSymptomResult(
	area: string,
	answers: Record<string, string>
): SymptomResult {
	let key = ''

	const duration = answers['skin-duration'] || answers['behavior-duration']
	const frequency = answers['stomach-frequency']
	const other = answers['stomach-other']

	// Long-running or high-frequency symptoms are treated as chronic; anything
	// recent or one-off (including the default) is acute.
	const longRunning =
		duration === 'weeks' ||
		duration === 'months' ||
		frequency === 'multiple' ||
		frequency === 'constant'
	const acuity: Acuity = longRunning ? 'chronic' : 'acute'

	// Blood or bloating is an emergency regardless of how long it has been going.
	const emergency = other === 'blood' || other === 'bloated'

	switch (area) {
		case 'skin': {
			const skinMain = answers['skin-main']
			if (skinMain === 'scratching') {
				key =
					acuity === 'chronic'
						? 'skin-scratching-chronic'
						: 'skin-scratching-acute'
			} else if (skinMain === 'hair-loss') {
				key = 'skin-hair-loss'
			} else if (skinMain === 'rash') {
				key = 'skin-rash'
			} else {
				key = 'skin-dry'
			}
			break
		}

		case 'stomach': {
			const stomachMain = answers['stomach-main']
			const stomachSevere = emergency || acuity === 'chronic'
			if (stomachMain === 'vomiting') {
				key = stomachSevere
					? 'stomach-vomiting-severe'
					: 'stomach-vomiting-mild'
			} else if (stomachMain === 'diarrhea') {
				key = stomachSevere
					? 'stomach-diarrhea-severe'
					: 'stomach-diarrhea-mild'
			} else {
				key = 'stomach-no-appetite'
			}
			break
		}

		case 'behavior': {
			const behaviorMain = answers['behavior-main']
			key = `behavior-${behaviorMain}`
			break
		}

		case 'mobility': {
			const mobilityMain = answers['mobility-main']
			const injury = answers['mobility-injury']
			if (mobilityMain === 'limping') {
				key =
					injury === 'yes'
						? 'mobility-limping-injury'
						: 'mobility-limping-unknown'
			} else {
				key = 'mobility-stiff'
			}
			break
		}

		case 'eyes-ears': {
			const eyesEarsArea = answers['eyes-ears-area']
			const smell = answers['eyes-ears-smell']
			if (eyesEarsArea === 'eyes') {
				key = 'eyes-discharge'
			} else if (smell === 'strong' || smell === 'mild') {
				// A smell only points to an ear infection when the ears are involved.
				key = 'ears-smell'
			} else {
				key = 'ears-discharge'
			}
			break
		}
	}

	return (
		resultsMap[key] || {
			cause: 'Unable to determine specific cause',
			severity: 'medium',
			advice:
				'Based on the symptoms described, we recommend consulting with your veterinarian for a proper diagnosis.',
			seeVet: true
		}
	)
}
