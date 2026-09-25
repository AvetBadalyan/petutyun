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

interface PetsState {
	pets: Pet[]
	activePetId: string | null

	// CRUD operations
	addPet: (pet: Omit<Pet, 'id'>) => void
	updatePet: (id: string, updates: Partial<Omit<Pet, 'id'>>) => void
	removePet: (id: string) => void

	// Active pet selection
	setActivePet: (id: string | null) => void
	getActivePet: () => Pet | undefined
	getPetById: (id: string) => Pet | undefined
}

// Simple ID generator
const generateId = () =>
	`pet-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

export const usePets = create<PetsState>()(
	persist(
		(set, get) => ({
			pets: [],
			activePetId: null,

			addPet: petData => {
				const newPet: Pet = {
					...petData,
					id: generateId()
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
					// Clear active if deleted
					activePetId: state.activePetId === id ? null : state.activePetId
				}))
			},

			setActivePet: id => {
				set({ activePetId: id })
			},

			getActivePet: () => {
				const { pets, activePetId } = get()
				return pets.find(p => p.id === activePetId)
			},

			getPetById: id => {
				return get().pets.find(p => p.id === id)
			}
		}),
		{
			name: 'petcare-pets' // localStorage key
		}
	)
)
