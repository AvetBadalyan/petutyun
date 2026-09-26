import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Pet {
	id: string
	name: string
	species: 'dog' | 'cat' | 'bird' | 'other'
	breed: string
	age: number
	weight: number
	photo: string
}

export interface PetMedication {
	id: string
	medicationId: string
	petId: string
	startDate: string
	active: boolean
	notes?: string
}

interface PetsState {
	pets: Pet[]
	activePetId: string | null
	medications: PetMedication[]

	addPet: (pet: Omit<Pet, 'id'>) => void
	updatePet: (id: string, updates: Partial<Omit<Pet, 'id'>>) => void
	removePet: (id: string) => void

	setActivePet: (id: string | null) => void
	getActivePet: () => Pet | undefined
	getPetById: (id: string) => Pet | undefined

	addMedication: (petId: string, medicationId: string, notes?: string) => void
	removeMedication: (id: string) => void
	getMedicationsForPet: (petId: string) => PetMedication[]
}

const generateId = (prefix: string) =>
	`${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`

// Default demo pets so the portfolio isn't empty on first visit.
// Dina is the developer's real dog 🦖
const defaultPets: Pet[] = [
	{
		id: 'demo-pet-1',
		name: 'Dina',
		species: 'dog',
		breed: 'Pitbull',
		age: 5,
		weight: 40,
		photo: '/dina-profile.jpg'
	},
	{
		id: 'demo-pet-2',
		name: 'Luna',
		species: 'cat',
		breed: 'Persian',
		age: 2,
		weight: 4.5,
		photo:
			'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&h=200&fit=crop'
	},
	{
		id: 'demo-pet-3',
		name: 'Max',
		species: 'dog',
		breed: 'German Shepherd',
		age: 5,
		weight: 35,
		photo:
			'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=200&h=200&fit=crop'
	}
]

// Default medications for demo
const defaultMedications: PetMedication[] = [
	{
		id: 'demo-med-1',
		medicationId: 'med-1',
		petId: 'demo-pet-1',
		startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
		active: true,
		notes: 'For arthritis - 2 weeks course'
	},
	{
		id: 'demo-med-2',
		medicationId: 'med-11',
		petId: 'demo-pet-1',
		startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
		active: true,
		notes: 'Daily supplement'
	}
]

export const usePets = create<PetsState>()(
	persist(
		(set, get) => ({
			pets: defaultPets,
			activePetId: 'demo-pet-1',
			medications: defaultMedications,

			addPet: petData => {
				const newPet: Pet = {
					...petData,
					id: generateId('pet')
				}
				set(state => ({
					pets: [...state.pets, newPet],
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
					medications: state.medications.filter(m => m.petId !== id),
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
			},

			addMedication: (petId, medicationId, notes) => {
				const existing = get().medications.find(
					m => m.petId === petId && m.medicationId === medicationId && m.active
				)
				if (existing) return

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

			getMedicationsForPet: petId => {
				return get().medications.filter(m => m.petId === petId)
			}
		}),
		{ name: 'petutyun-pets' }
	)
)
