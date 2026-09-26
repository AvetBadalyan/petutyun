export type { Pet, PetMedication } from '@/store/pets'

export type Species = 'dog' | 'cat' | 'bird' | 'other'

// ---- Adoptable Pets ----

export interface AdoptablePet {
	id: string
	name: string
	species: Species
	breed: string
	age: string // "2 years", "6 months", etc.
	size: 'small' | 'medium' | 'large'
	gender: 'male' | 'female'
	photo: string
	bio: string
	goodWithKids: boolean
	goodWithPets: boolean
	shelter: string
	location: string
}

// ---- Symptom Checker ----

export type SymptomArea =
	'skin' | 'stomach' | 'behavior' | 'mobility' | 'eyes-ears'

export interface SymptomResult {
	cause: string
	severity: 'low' | 'medium' | 'high'
	advice: string
	seeVet: boolean
}

// ---- Wellness Box ----

export interface WellnessProduct {
	id: string
	name: string
	description: string
	image: string
	price: number
	forSpecies?: Species[]
	forSize?: PetSize[]
	forAge?: PetAge[]
	forActivity?: PetActivity[]
	forHealth?: HealthFocus
}

export type PetSize = 'small' | 'medium' | 'large'
export type PetAge = 'puppy' | 'adult' | 'senior'
export type PetActivity = 'lazy' | 'moderate' | 'hyper'
export type HealthFocus = 'joints' | 'digestion' | 'skin'

export interface QuizAnswers {
	species: 'dog' | 'cat'
	size: PetSize
	age: PetAge
	activity: PetActivity
	healthFocus: HealthFocus | 'none'
}
