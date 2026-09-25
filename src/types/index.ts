// ============================================
// PetCare Hub Types
// Simple, explainable types - nothing fancy
// ============================================

// Re-export Pet from store for convenience
export type { Pet } from '@/store/pets'

// Species options
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
	| 'skin'
	| 'stomach'
	| 'behavior'
	| 'mobility'
	| 'eyes-ears'

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
	// Targeting tags
	forSpecies?: Species[]
	forSize?: ('small' | 'medium' | 'large')[]
	forAge?: ('puppy' | 'adult' | 'senior')[]
	forActivity?: ('lazy' | 'moderate' | 'hyper')[]
	forHealth?: string // "joints", "digestion", "skin", etc.
}

export interface QuizAnswers {
	species: 'dog' | 'cat'
	size: 'small' | 'medium' | 'large'
	age: 'puppy' | 'adult' | 'senior'
	activity: 'lazy' | 'moderate' | 'hyper'
	healthFocus: 'joints' | 'digestion' | 'skin' | 'none'
}

// ---- Symptom History ----

export interface SymptomCheck {
	id: string
	petId: string
	petName: string
	date: string // ISO string
	area: SymptomArea
	result: SymptomResult
}

// ---- Medication Tracking ----

export interface PetMedication {
	id: string
	medicationId: string // References medication from medications.ts
	petId: string
	startDate: string // ISO string
	active: boolean
	notes?: string
}
