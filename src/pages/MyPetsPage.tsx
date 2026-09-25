import { cn } from '@/lib/format'
import { speciesEmoji } from '@/lib/species'
import { usePets, type Pet } from '@/store/pets'
import { AnimatePresence, motion } from 'framer-motion'
import {
	Calculator,
	Check,
	PawPrint,
	Pencil,
	Plus,
	Star,
	Trash2,
	X
} from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const emptyForm = {
	name: '',
	species: 'dog' as Pet['species'],
	breed: '',
	age: '',
	weight: '',
	photo: ''
}

export function MyPetsPage() {
	const { pets, activePetId, addPet, updatePet, removePet, setActivePet } =
		usePets()
	const location = useLocation()

	const [isAdding, setIsAdding] = useState(false)
	const [editingId, setEditingId] = useState<string | null>(
		// Support opening edit mode via navigation state
		(location.state as { editId?: string })?.editId || null
	)
	const [form, setForm] = useState(() => {
		// If editing via state, populate form
		const editId = (location.state as { editId?: string })?.editId
		if (editId) {
			const pet = pets.find(p => p.id === editId)
			if (pet) {
				return {
					name: pet.name,
					species: pet.species,
					breed: pet.breed,
					age: String(pet.age),
					weight: String(pet.weight),
					photo: pet.photo
				}
			}
		}
		return emptyForm
	})
	const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

	const handleChange = (field: string, value: string) => {
		setForm(prev => ({ ...prev, [field]: value }))
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!form.name.trim()) return

		const petData = {
			name: form.name.trim(),
			species: form.species,
			breed: form.breed.trim(),
			age: Number(form.age) || 0,
			weight: Number(form.weight) || 0,
			photo: form.photo.trim()
		}

		if (editingId) {
			updatePet(editingId, petData)
			setEditingId(null)
		} else {
			addPet(petData)
			setIsAdding(false)
		}
		setForm(emptyForm)
	}

	const startEdit = (pet: Pet) => {
		setForm({
			name: pet.name,
			species: pet.species,
			breed: pet.breed,
			age: String(pet.age),
			weight: String(pet.weight),
			photo: pet.photo
		})
		setEditingId(pet.id)
		setIsAdding(false)
	}

	const cancelForm = () => {
		setForm(emptyForm)
		setIsAdding(false)
		setEditingId(null)
	}

	const confirmDelete = (id: string) => {
		removePet(id)
		setDeleteConfirm(null)
	}

	return (
		<div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
			{/* Header */}
			<div className="flex flex-wrap items-end justify-between gap-4">
				<div>
					<h1 className="font-serif text-4xl text-neutral-900 dark:text-white">
						My Pets
					</h1>
					<p className="mt-2 text-neutral-600 dark:text-neutral-400">
						Manage your furry (or feathery) friends. Select an active pet for
						personalized features.
					</p>
				</div>
				{!isAdding && !editingId && (
					<button className="btn-primary" onClick={() => setIsAdding(true)}>
						<Plus size={18} /> Add Pet
					</button>
				)}
			</div>

			{/* Add/Edit Form */}
			<AnimatePresence>
				{(isAdding || editingId) && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						className="overflow-hidden"
					>
						<form onSubmit={handleSubmit} className="card mt-6 p-6">
							<div className="mb-6 flex items-center justify-between">
								<h2 className="font-serif text-2xl text-neutral-900 dark:text-white">
									{editingId ? 'Edit Pet' : 'Add New Pet'}
								</h2>
								<button
									type="button"
									onClick={cancelForm}
									className="text-neutral-400 hover:text-neutral-600"
								>
									<X size={22} />
								</button>
							</div>

							<div className="grid gap-4 sm:grid-cols-2">
								{/* Name */}
								<div>
									<label
										htmlFor="pet-name"
										className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
									>
										Name *
									</label>
									<input
										id="pet-name"
										type="text"
										value={form.name}
										onChange={e => handleChange('name', e.target.value)}
										placeholder="e.g., Bidzo"
										className="input"
										required
									/>
								</div>

								{/* Species */}
								<div>
									<label
										htmlFor="pet-species"
										className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
									>
										Species *
									</label>
									<select
										id="pet-species"
										value={form.species}
										onChange={e => handleChange('species', e.target.value)}
										className="input"
									>
										<option value="dog">🐕 Dog</option>
										<option value="cat">🐱 Cat</option>
										<option value="bird">🐦 Bird</option>
										<option value="other">🐾 Other</option>
									</select>
								</div>

								{/* Breed */}
								<div>
									<label
										htmlFor="pet-breed"
										className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
									>
										Breed
									</label>
									<input
										id="pet-breed"
										type="text"
										value={form.breed}
										onChange={e => handleChange('breed', e.target.value)}
										placeholder="e.g., Gampr, Persian"
										className="input"
									/>
								</div>

								{/* Age */}
								<div>
									<label
										htmlFor="pet-age"
										className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
									>
										Age (years)
									</label>
									<input
										id="pet-age"
										type="number"
										value={form.age}
										onChange={e => handleChange('age', e.target.value)}
										placeholder="e.g., 3"
										min="0"
										max="30"
										className="input"
									/>
								</div>

								{/* Weight */}
								<div>
									<label
										htmlFor="pet-weight"
										className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
									>
										Weight (kg)
									</label>
									<input
										id="pet-weight"
										type="number"
										value={form.weight}
										onChange={e => handleChange('weight', e.target.value)}
										placeholder="e.g., 25"
										min="0"
										max="200"
										step="0.1"
										className="input"
									/>
								</div>

								{/* Photo URL */}
								<div>
									<label
										htmlFor="pet-photo"
										className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
									>
										Photo URL
									</label>
									<input
										id="pet-photo"
										type="url"
										value={form.photo}
										onChange={e => handleChange('photo', e.target.value)}
										placeholder="https://example.com/photo.jpg"
										className="input"
									/>
								</div>
							</div>

							{/* Form Actions */}
							<div className="mt-6 flex gap-3">
								<button type="submit" className="btn-primary">
									<Check size={16} /> {editingId ? 'Save Changes' : 'Add Pet'}
								</button>
								<button
									type="button"
									onClick={cancelForm}
									className="btn-ghost"
								>
									Cancel
								</button>
							</div>
						</form>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Empty State */}
			{pets.length === 0 && !isAdding && (
				<div className="mt-10 rounded-2xl border-2 border-dashed border-neutral-200 py-16 text-center dark:border-neutral-700">
					<div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-coral-100 text-coral-600 dark:bg-coral-950 dark:text-coral-400">
						<PawPrint size={32} />
					</div>
					<h2 className="mt-4 font-serif text-2xl text-neutral-900 dark:text-white">
						No pets yet
					</h2>
					<p className="mt-2 text-neutral-500 dark:text-neutral-400">
						Add your first pet to get started with personalized care.
					</p>
					<button
						className="btn-primary mt-6"
						onClick={() => setIsAdding(true)}
					>
						<Plus size={18} /> Add Your First Pet
					</button>
				</div>
			)}

			{/* Pet Cards Grid */}
			{pets.length > 0 && (
				<div className="mt-8 grid gap-4 sm:grid-cols-2">
					{pets.map(pet => (
						<motion.div
							key={pet.id}
							layout
							className={cn(
								'card relative p-5 transition-all',
								activePetId === pet.id && 'ring-2 ring-coral-500'
							)}
						>
							{/* Active badge */}
							{activePetId === pet.id && (
								<div className="absolute -top-2 -right-2">
									<span className="chip flex items-center gap-1">
										<Star size={12} /> Active
									</span>
								</div>
							)}

							<div className="flex gap-4">
								{/* Photo with emoji shown behind it as the fallback */}
								<div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-neutral-100 text-3xl dark:bg-neutral-800">
									<span aria-hidden>{speciesEmoji[pet.species]}</span>
									{pet.photo && (
										<img
											src={pet.photo}
											alt={pet.name}
											className="absolute inset-0 h-full w-full object-cover"
											onError={e => {
												e.currentTarget.style.display = 'none'
											}}
										/>
									)}
								</div>

								{/* Info */}
								<div className="min-w-0 flex-1">
									<h3 className="font-serif text-xl text-neutral-900 dark:text-white">
										{pet.name}
									</h3>
									<p className="text-sm text-neutral-500 dark:text-neutral-400">
										{pet.breed ||
											speciesEmoji[pet.species] +
												' ' +
												pet.species.charAt(0).toUpperCase() +
												pet.species.slice(1)}
										{pet.age > 0 && ` · ${pet.age} yr`}
										{pet.weight > 0 && ` · ${pet.weight} kg`}
									</p>
								</div>
							</div>

							{/* Actions */}
							<div className="mt-4 flex gap-2">
								<Link
									to={`/my-pets/${pet.id}`}
									className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-teal-500 py-2 text-sm font-medium text-white hover:bg-teal-600"
								>
									<Calculator size={14} /> Medications
								</Link>
								<button
									onClick={() => setActivePet(pet.id)}
									disabled={activePetId === pet.id}
									className={cn(
										'grid h-10 w-10 place-items-center rounded-xl transition-colors',
										activePetId === pet.id
											? 'bg-coral-100 text-coral-700 dark:bg-coral-950 dark:text-coral-300'
											: 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
									)}
									aria-label={
										activePetId === pet.id ? 'Active pet' : 'Set as active'
									}
								>
									<Star
										size={16}
										className={activePetId === pet.id ? 'fill-current' : ''}
									/>
								</button>
								<button
									onClick={() => startEdit(pet)}
									className="grid h-10 w-10 place-items-center rounded-xl bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
									aria-label="Edit"
								>
									<Pencil size={16} />
								</button>
								<button
									onClick={() => setDeleteConfirm(pet.id)}
									className="grid h-10 w-10 place-items-center rounded-xl bg-neutral-100 text-neutral-600 hover:bg-red-100 hover:text-red-600 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-red-950 dark:hover:text-red-400"
									aria-label="Delete"
								>
									<Trash2 size={16} />
								</button>
							</div>

							{/* Delete confirmation */}
							<AnimatePresence>
								{deleteConfirm === pet.id && (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/95 dark:bg-neutral-900/95"
									>
										<div className="text-center">
											<p className="text-neutral-700 dark:text-neutral-300">
												Delete <strong>{pet.name}</strong>?
											</p>
											<div className="mt-3 flex justify-center gap-2">
												<button
													onClick={() => confirmDelete(pet.id)}
													className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
												>
													Delete
												</button>
												<button
													onClick={() => setDeleteConfirm(null)}
													className="btn-ghost"
												>
													Cancel
												</button>
											</div>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</motion.div>
					))}
				</div>
			)}
		</div>
	)
}
