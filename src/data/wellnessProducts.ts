import type {
	HealthFocus,
	PetActivity,
	PetAge,
	PetSize,
	WellnessProduct
} from '@/types'

/**
 * Wellness box catalog. Each product's optional `for*` tags define who it
 * suits; buildWellnessBox() scores products against the quiz answers.
 */

export const wellnessProducts: WellnessProduct[] = [
	// === JOINT & MOBILITY ===
	{
		id: 'wp-1',
		name: 'Hip & Joint Chews',
		description:
			'Glucosamine and chondroitin for healthy joints and mobility support.',
		image:
			'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop',
		price: 24.99,
		forSpecies: ['dog', 'cat'],
		forSize: ['medium', 'large'],
		forAge: ['adult', 'senior'],
		forHealth: 'joints'
	},
	{
		id: 'wp-2',
		name: 'Senior Mobility Powder',
		description:
			'Turmeric and green-lipped mussel for aging joints. Sprinkle on food.',
		image:
			'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=200&h=200&fit=crop',
		price: 29.99,
		forSpecies: ['dog'],
		forSize: ['medium', 'large'],
		forAge: ['senior'],
		forHealth: 'joints'
	},
	{
		id: 'wp-3',
		name: 'Mini Joint Support Treats',
		description: 'Small, soft chews perfect for tiny dogs with joint concerns.',
		image:
			'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=200&h=200&fit=crop',
		price: 19.99,
		forSpecies: ['dog'],
		forSize: ['small'],
		forAge: ['adult', 'senior'],
		forHealth: 'joints'
	},

	// === DIGESTION ===
	{
		id: 'wp-4',
		name: 'Probiotic Daily Chews',
		description: '6 probiotic strains for a balanced gut and better digestion.',
		image:
			'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=200&h=200&fit=crop',
		price: 22.99,
		forSpecies: ['dog', 'cat'],
		forAge: ['puppy', 'adult', 'senior'],
		forHealth: 'digestion'
	},
	{
		id: 'wp-5',
		name: 'Sensitive Stomach Formula',
		description: 'Pumpkin and ginger blend for pets with tummy troubles.',
		image:
			'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=200&h=200&fit=crop',
		price: 18.99,
		forSpecies: ['dog', 'cat'],
		forAge: ['adult', 'senior'],
		forHealth: 'digestion'
	},
	{
		id: 'wp-6',
		name: 'Puppy Digestive Support',
		description: 'Gentle formula for developing digestive systems.',
		image:
			'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop',
		price: 16.99,
		forSpecies: ['dog', 'cat'],
		forAge: ['puppy'],
		forHealth: 'digestion'
	},

	// === SKIN & COAT ===
	{
		id: 'wp-7',
		name: 'Omega-3 Fish Oil',
		description: 'Wild-caught salmon oil for a shiny coat and healthy skin.',
		image:
			'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=200&h=200&fit=crop',
		price: 21.99,
		forSpecies: ['dog', 'cat'],
		forAge: ['puppy', 'adult', 'senior'],
		forHealth: 'skin'
	},
	{
		id: 'wp-8',
		name: 'Skin & Itch Relief Treats',
		description: 'Biotin and zinc to support skin health and reduce itching.',
		image:
			'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=200&h=200&fit=crop',
		price: 19.99,
		forSpecies: ['dog'],
		forAge: ['adult', 'senior'],
		forHealth: 'skin'
	},
	{
		id: 'wp-9',
		name: 'Cat Coat Enhancer',
		description:
			'Specially formulated for feline coats. Reduces hairballs too!',
		image:
			'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&h=200&fit=crop',
		price: 17.99,
		forSpecies: ['cat'],
		forHealth: 'skin'
	},

	// === CALMING / ANXIETY ===
	{
		id: 'wp-10',
		name: 'Calming Soft Chews',
		description: 'L-theanine and chamomile for stressful situations.',
		image:
			'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop',
		price: 24.99,
		forSpecies: ['dog', 'cat'],
		forActivity: ['hyper'],
		forAge: ['adult', 'senior']
	},
	{
		id: 'wp-11',
		name: 'Puppy Calm Formula',
		description: 'Gentle calming support for excitable young pups.',
		image:
			'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=200&h=200&fit=crop',
		price: 18.99,
		forSpecies: ['dog'],
		forActivity: ['hyper'],
		forAge: ['puppy']
	},
	{
		id: 'wp-12',
		name: 'Travel & Thunder Treats',
		description: 'Fast-acting calming for car rides, storms, and fireworks.',
		image:
			'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=200&h=200&fit=crop',
		price: 21.99,
		forSpecies: ['dog', 'cat'],
		forActivity: ['hyper', 'moderate']
	},

	// === ENERGY / VITALITY ===
	{
		id: 'wp-13',
		name: 'Daily Multivitamin Chews',
		description: 'Complete vitamin blend for overall health and vitality.',
		image:
			'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=200&h=200&fit=crop',
		price: 19.99,
		forSpecies: ['dog', 'cat'],
		forAge: ['puppy', 'adult', 'senior']
	},
	{
		id: 'wp-14',
		name: 'Senior Vitality Boost',
		description:
			'CoQ10 and antioxidants for aging pets who need extra support.',
		image:
			'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=200&h=200&fit=crop',
		price: 27.99,
		forSpecies: ['dog', 'cat'],
		forAge: ['senior']
	},
	{
		id: 'wp-15',
		name: 'Puppy Growth Formula',
		description: 'DHA and calcium for healthy development in growing pups.',
		image:
			'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop',
		price: 22.99,
		forSpecies: ['dog'],
		forAge: ['puppy']
	},

	// === SIZE-SPECIFIC ===
	{
		id: 'wp-16',
		name: 'Large Breed Support',
		description: 'Extra-strength formula for big dogs with big needs.',
		image:
			'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=200&h=200&fit=crop',
		price: 32.99,
		forSpecies: ['dog'],
		forSize: ['large'],
		forAge: ['adult', 'senior']
	},
	{
		id: 'wp-17',
		name: 'Small Dog Immunity Bites',
		description: 'Tiny treats packed with immune-boosting ingredients.',
		image:
			'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=200&h=200&fit=crop',
		price: 16.99,
		forSpecies: ['dog'],
		forSize: ['small']
	},
	{
		id: 'wp-18',
		name: 'Medium Breed Essentials',
		description: 'Balanced nutrition for medium-sized dogs.',
		image:
			'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=200&h=200&fit=crop',
		price: 24.99,
		forSpecies: ['dog'],
		forSize: ['medium'],
		forAge: ['adult']
	},

	// === CAT SPECIFIC ===
	{
		id: 'wp-19',
		name: 'Hairball Control Treats',
		description: 'Fiber-rich treats to help prevent hairballs.',
		image:
			'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&h=200&fit=crop',
		price: 14.99,
		forSpecies: ['cat'],
		forAge: ['adult', 'senior']
	},
	{
		id: 'wp-20',
		name: 'Kitten Starter Pack',
		description: 'Everything a growing kitten needs in one tasty chew.',
		image:
			'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=200&h=200&fit=crop',
		price: 18.99,
		forSpecies: ['cat'],
		forAge: ['puppy'] // Using "puppy" for young animals
	},

	// === DENTAL ===
	{
		id: 'wp-21',
		name: 'Dental Health Chews',
		description: 'Textured chews that clean teeth while they eat.',
		image:
			'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop',
		price: 17.99,
		forSpecies: ['dog'],
		forAge: ['adult', 'senior']
	},
	{
		id: 'wp-22',
		name: 'Fresh Breath Drops',
		description: 'Add to water for fresher breath and cleaner teeth.',
		image:
			'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=200&h=200&fit=crop',
		price: 12.99,
		forSpecies: ['dog', 'cat']
	},

	// === ACTIVE / LAZY PETS ===
	{
		id: 'wp-23',
		name: 'Energy Boost Bites',
		description: 'B-vitamins and iron for active, athletic pets.',
		image:
			'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=200&h=200&fit=crop',
		price: 23.99,
		forSpecies: ['dog'],
		forActivity: ['moderate', 'hyper'],
		forAge: ['adult']
	},
	{
		id: 'wp-24',
		name: 'Weight Management Treats',
		description:
			'Low-calorie treats for less active pets watching their weight.',
		image:
			'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=200&h=200&fit=crop',
		price: 15.99,
		forSpecies: ['dog', 'cat'],
		forActivity: ['lazy'],
		forAge: ['adult', 'senior']
	}
]

/**
 * Build a personalized wellness box from quiz answers: filter by species,
 * score each product by how many traits it matches, and return the top
 * matches. Health focus is weighted highest; a generic product earns a small
 * baseline so the box is never empty.
 */
export function buildWellnessBox(
	species: 'dog' | 'cat',
	size: PetSize,
	age: PetAge,
	activity: PetActivity,
	healthFocus: HealthFocus | 'none'
): WellnessProduct[] {
	const scored = wellnessProducts
		.filter(p => !p.forSpecies || p.forSpecies.includes(species))
		.map(product => {
			let score = 0
			if (product.forSize?.includes(size)) score += 2
			if (product.forAge?.includes(age)) score += 2
			if (product.forActivity?.includes(activity)) score += 3
			if (healthFocus !== 'none' && product.forHealth === healthFocus)
				score += 5

			const isGeneric =
				!product.forSize &&
				!product.forAge &&
				!product.forActivity &&
				!product.forHealth
			if (isGeneric) score += 1

			return { product, score }
		})
		// Drop irrelevant products so the box stays personalized rather than padded.
		.filter(s => s.score > 0)

	return scored
		.sort((a, b) => b.score - a.score)
		.slice(0, 5)
		.map(s => s.product)
}

export function getAlternatives(
	currentId: string,
	species: 'dog' | 'cat'
): WellnessProduct[] {
	return wellnessProducts
		.filter(
			p =>
				p.id !== currentId && (!p.forSpecies || p.forSpecies.includes(species))
		)
		.slice(0, 5)
}
