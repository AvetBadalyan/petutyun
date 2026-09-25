import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Simple Pet type - easy to understand
export interface Pet {
	id: string
	name: string
	species: 'dog' | 'cat' | 'bird' | 'other'
	breed: string
	age: number // years
	weight: number // kg
	photo: string // URL or empty string
}

// Medication assigned to a pet (for tracking and interaction checking)
export interface PetMedication {
	id: string
	medicationId: string // References medication from medications.ts
	petId: string
	startDate: string // ISO string
	active: boolean
	notes?: string
}

interface PetsState {
	pets: Pet[]
	activePetId: string | null
	medications: PetMedication[] // Medications assigned to pets

	// CRUD operations for pets
	addPet: (pet: Omit<Pet, 'id'>) => void
	updatePet: (id: string, updates: Partial<Omit<Pet, 'id'>>) => void
	removePet: (id: string) => void

	// Active pet selection
	setActivePet: (id: string | null) => void
	getActivePet: () => Pet | undefined
	getPetById: (id: string) => Pet | undefined

	// Medication tracking
	addMedication: (petId: string, medicationId: string, notes?: string) => void
	removeMedication: (id: string) => void
	toggleMedication: (id: string) => void
	getMedicationsForPet: (petId: string) => PetMedication[]
}

// Simple ID generator
const generateId = (prefix: string) =>
	`${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

export const usePets = create<PetsState>()(
	persist(
		(set, get) => ({
			pets: [],
			activePetId: null,
			medications: [],

			// === Pet CRUD ===
			addPet: petData => {
				const newPet: Pet = {
					...petData,
					id: generateId('pet')
				}
				set(state => ({
					pets: [...state.pets, newPet],
					// Auto-select if first pet
					activePetId: state.pets.length === 0 ? newPet.id : state.activePetId
				}))
			},

			updatePet: (id, updates) => {
				set(state => ({
					pets: state.pets.map(pet =>
						pet.id === id ? { ...pet, ...updates } : pet
					)
				}))
			},

			removePet: id => {
				set(state => ({
					pets: state.pets.filter(pet => pet.id !== id),
					// Also remove their medications
					medications: state.medications.filter(m => m.petId !== id),
					// Clear active if deleted
					activePetId: state.activePetId === id ? null : state.activePetId
				}))
			},

			// === Active Pet ===
			setActivePet: id => {
				set({ activePetId: id })
			},

			getActivePet: () => {
				const { pets, activePetId } = get()
				return pets.find(p => p.id === activePetId)
			},

			getPetById: id => {
				return get().pets.find(p => p.id === id)
			},

			// === Medication Tracking ===
			addMedication: (petId, medicationId, notes) => {
				// Check if already added
				const existing = get().medications.find(
					m => m.petId === petId && m.medicationId === medicationId && m.active
				)
				if (existing) return // Don't add duplicates

				const newMed: PetMedication = {
					id: generateId('med'),
					medicationId,
					petId,
					startDate: new Date().toISOString(),
					active: true,
					notes
				}
				set(state => ({
					medications: [...state.medications, newMed]
				}))
			},

			removeMedication: id => {
				set(state => ({
					medications: state.medications.filter(m => m.id !== id)
				}))
			},

			toggleMedication: id => {
				set(state => ({
					medications: state.medications.map(m =>
						m.id === id ? { ...m, active: !m.active } : m
					)
				}))
			},

			getMedicationsForPet: petId => {
				return get().medications.filter(m => m.petId === petId)
			}
		}),
		{
			name: 'petcare-pets' // localStorage key
		}
	)
)
