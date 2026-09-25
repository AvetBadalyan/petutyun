import { checkInteractions, getSeverityStyles } from '@/data/interactions'
import {
	getMedicationById,
	getMedicationsForSpecies,
	type Medication
} from '@/data/medications'
import { calculateDosage } from '@/lib/dosage'
import { cn } from '@/lib/format'
import { speciesEmoji } from '@/lib/species'
import { usePets } from '@/store/pets'
import { AnimatePresence, motion } from 'framer-motion'
import {
	AlertTriangle,
	ArrowLeft,
	Calculator,
	Check,
	Info,
	Pill,
	Plus,
	Trash2,
	X
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { NotFoundPage } from './NotFoundPage'

export function PetDetailPage() {
	const { id } = useParams()
	const navigate = useNavigate()
	const {
		getPetById,
		removePet,
		medications: petMedications,
		addMedication,
		removeMedication
	} = usePets()

	const pet = id ? getPetById(id) : undefined
	const [showCalculator, setShowCalculator] = useState(false)
	const [selectedMedId, setSelectedMedId] = useState<string>('')
	const [deleteConfirm, setDeleteConfirm] = useState(false)

	const activeMeds = useMemo(() => {
		if (!pet) return []
		return petMedications.filter(m => m.petId === pet.id && m.active)
	}, [pet, petMedications])

	const activeMedDetails = useMemo(() => {
		return activeMeds
			.map(pm => getMedicationById(pm.medicationId))
			.filter((m): m is Medication => m !== undefined)
	}, [activeMeds])

	const interactions = useMemo(() => {
		const ingredients = activeMedDetails.map(m => m.activeIngredient)
		return checkInteractions(ingredients)
	}, [activeMedDetails])

	const availableMeds = useMemo(() => {
		if (!pet || (pet.species !== 'dog' && pet.species !== 'cat')) return []
		return getMedicationsForSpecies(pet.species)
	}, [pet])

	const selectedMed = selectedMedId
		? getMedicationById(selectedMedId)
		: undefined
	const dosageResult = useMemo(() => {
		if (!selectedMed || !pet) return undefined
		return calculateDosage(selectedMed, pet)
	}, [selectedMed, pet])

	if (!pet) {
		return <NotFoundPage />
	}

	const handleDelete = () => {
		removePet(pet.id)
		navigate('/my-pets')
	}

	const handleAddMedication = () => {
		if (!selectedMedId) return
		addMedication(pet.id, selectedMedId)
		setSelectedMedId('')
		setShowCalculator(false)
	}

	return (
		<div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
			{/* Back link */}
			<Link to="/my-pets" className="btn-ghost mb-6 -ml-2">
				<ArrowLeft size={16} /> Back to My Pets
			</Link>

			{/* Pet Header */}
			<div className="card p-6">
				<div className="flex flex-wrap items-start gap-6">
					{/* Photo */}
					<div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800">
						{pet.photo ? (
							<img
								src={pet.photo}
								alt={pet.name}
								className="h-full w-full object-cover"
							/>
						) : (
							<div className="flex h-full w-full items-center justify-center text-5xl">
								{speciesEmoji[pet.species]}
							</div>
						)}
					</div>

					{/* Info */}
					<div className="flex-1">
						<h1 className="font-serif text-4xl text-neutral-900 dark:text-white">
							{pet.name}
						</h1>
						<p className="mt-1 text-neutral-600 dark:text-neutral-400">
							{pet.breed || pet.species} ·{' '}
							{pet.age > 0 ? `${pet.age} years` : 'Age unknown'} ·{' '}
							{pet.weight > 0 ? `${pet.weight} kg` : 'Weight unknown'}
						</p>
						{pet.weight === 0 && (
							<p className="mt-2 text-sm text-amber-600 dark:text-amber-400">
								⚠️ Add weight to use the dosage calculator
							</p>
						)}
					</div>

					{/* Actions */}
					<div className="flex gap-2">
						<Link
							to="/my-pets"
							state={{ editId: pet.id }}
							className="btn-secondary"
						>
							Edit
						</Link>
						<button
							onClick={() => setDeleteConfirm(true)}
							className="grid h-11 w-11 place-items-center rounded-xl border-2 border-neutral-200 text-neutral-500 hover:border-red-300 hover:bg-red-50 hover:text-red-500 dark:border-neutral-700"
							aria-label="Delete pet"
						>
							<Trash2 size={18} />
						</button>
					</div>
				</div>
			</div>

			{/* Delete Confirmation */}
			<AnimatePresence>
				{deleteConfirm && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
					>
						<motion.div
							initial={{ scale: 0.95 }}
							animate={{ scale: 1 }}
							exit={{ scale: 0.95 }}
							className="card max-w-sm p-6 text-center"
						>
							<h3 className="font-serif text-xl text-neutral-900 dark:text-white">
								Delete {pet.name}?
							</h3>
							<p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
								This will also remove all medication records for this pet.
							</p>
							<div className="mt-6 flex justify-center gap-3">
								<button
									onClick={handleDelete}
									className="rounded-xl bg-red-500 px-6 py-2 text-white hover:bg-red-600"
								>
									Delete
								</button>
								<button
									onClick={() => setDeleteConfirm(false)}
									className="btn-ghost"
								>
									Cancel
								</button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Interaction Warnings */}
			{interactions.length > 0 && (
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					className="mt-6"
				>
					<div className="rounded-2xl border-2 border-red-300 bg-red-50 p-5 dark:border-red-800 dark:bg-red-950/50">
						<h3 className="flex items-center gap-2 font-medium text-red-800 dark:text-red-200">
							<AlertTriangle size={20} />
							Medication Interaction Warnings
						</h3>
						<div className="mt-4 space-y-3">
							{interactions.map((interaction, idx) => {
								const styles = getSeverityStyles(interaction.severity)
								return (
									<div key={idx} className={cn('rounded-xl p-4', styles.bg)}>
										<div className="flex items-center gap-2">
											<span
												className={cn(
													'text-xs font-bold uppercase',
													styles.text
												)}
											>
												{styles.label}
											</span>
											<span className={cn('text-sm font-medium', styles.text)}>
												{interaction.ingredientA} + {interaction.ingredientB}
											</span>
										</div>
										<p className={cn('mt-1 text-sm', styles.text)}>
											{interaction.reason}
										</p>
									</div>
								)
							})}
						</div>
						<p className="mt-4 text-xs text-red-600 dark:text-red-400">
							⚠️ This is informational only. Always consult your veterinarian
							about medication combinations.
						</p>
					</div>
				</motion.div>
			)}

			{/* Current Medications */}
			<section className="mt-8">
				<div className="flex items-center justify-between">
					<h2 className="flex items-center gap-2 font-serif text-2xl text-neutral-900 dark:text-white">
						<Pill size={22} /> Current Medications
					</h2>
					<button
						onClick={() => setShowCalculator(!showCalculator)}
						className="btn-secondary"
					>
						<Plus size={16} /> Add Medication
					</button>
				</div>

				{activeMeds.length === 0 ? (
					<p className="mt-4 rounded-2xl border-2 border-dashed border-neutral-200 p-6 text-center text-neutral-500 dark:border-neutral-700">
						No medications added yet. Use the dosage calculator to add
						medications.
					</p>
				) : (
					<div className="mt-4 space-y-3">
						{activeMeds.map(pm => {
							const med = getMedicationById(pm.medicationId)
							if (!med) return null
							const dose = calculateDosage(med, pet)
							return (
								<div key={pm.id} className="card flex items-center gap-4 p-4">
									<div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-950 dark:text-teal-400">
										<Pill size={22} />
									</div>
									<div className="min-w-0 flex-1">
										<h4 className="font-medium text-neutral-900 dark:text-white">
											{med.name}
										</h4>
										<p className="text-sm text-neutral-500">
											{dose.eligible ? dose.display : 'See vet for dosing'}
										</p>
									</div>
									<button
										onClick={() => removeMedication(pm.id)}
										className="grid h-10 w-10 place-items-center rounded-xl text-neutral-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950"
										aria-label="Remove medication"
									>
										<X size={18} />
									</button>
								</div>
							)
						})}
					</div>
				)}
			</section>

			{/* Dosage Calculator */}
			<AnimatePresence>
				{showCalculator && (
					<motion.section
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						className="mt-8 overflow-hidden"
					>
						<div className="card p-6">
							<h2 className="flex items-center gap-2 font-serif text-2xl text-neutral-900 dark:text-white">
								<Calculator size={22} /> Dosage Calculator
							</h2>
							<p className="mt-1 text-sm text-neutral-500">
								Calculate weight-based dosage for {pet.name} ({pet.weight} kg)
							</p>

							{pet.weight === 0 ? (
								<div className="mt-4 rounded-xl bg-amber-50 p-4 dark:bg-amber-950/50">
									<p className="text-amber-700 dark:text-amber-300">
										Please add {pet.name}'s weight to use the dosage calculator.
									</p>
								</div>
							) : pet.species !== 'dog' && pet.species !== 'cat' ? (
								<div className="mt-4 rounded-xl bg-neutral-100 p-4 dark:bg-neutral-800">
									<p className="text-neutral-600 dark:text-neutral-400">
										Dosage calculator is currently available for dogs and cats
										only.
									</p>
								</div>
							) : (
								<>
									{/* Medication Selector */}
									<div className="mt-4">
										<label
											htmlFor="med-select"
											className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
										>
											Select Medication
										</label>
										<select
											id="med-select"
											value={selectedMedId}
											onChange={e => setSelectedMedId(e.target.value)}
											className="input"
										>
											<option value="">Choose a medication...</option>
											{availableMeds.map(med => (
												<option key={med.id} value={med.id}>
													{med.name} ({med.category})
												</option>
											))}
										</select>
									</div>

									{/* Dosage Result */}
									{selectedMed && dosageResult && (
										<motion.div
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											className="mt-6"
										>
											{/* Result Card */}
											<div
												className={cn(
													'rounded-2xl p-6',
													dosageResult.eligible
														? 'bg-teal-500 text-white'
														: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200'
												)}
											>
												<p className="text-sm uppercase tracking-wide opacity-80">
													{dosageResult.eligible
														? 'Recommended Dose'
														: 'Not Recommended'}
												</p>
												<p className="mt-1 font-serif text-3xl">
													{dosageResult.eligible ? dosageResult.display : '—'}
												</p>
												{!dosageResult.eligible && dosageResult.reason && (
													<p className="mt-2 text-sm">{dosageResult.reason}</p>
												)}
												{dosageResult.notes && dosageResult.eligible && (
													<p className="mt-2 text-sm opacity-80">
														{dosageResult.notes}
													</p>
												)}
											</div>

											{/* Medication Details */}
											<div className="mt-4 rounded-xl bg-neutral-100 p-4 dark:bg-neutral-800">
												<h4 className="font-medium text-neutral-900 dark:text-white">
													{selectedMed.name}
												</h4>
												<p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
													{selectedMed.description}
												</p>
												<p className="mt-2 text-xs text-neutral-500">
													Active ingredient: {selectedMed.activeIngredient}
												</p>

												{/* Warnings */}
												{selectedMed.warnings.length > 0 && (
													<div className="mt-4 rounded-lg bg-amber-50 p-3 dark:bg-amber-950/50">
														<p className="flex items-center gap-1 text-xs font-medium text-amber-700 dark:text-amber-300">
															<Info size={14} /> Warnings
														</p>
														<ul className="mt-1 list-inside list-disc text-xs text-amber-600 dark:text-amber-400">
															{selectedMed.warnings.map((w, i) => (
																<li key={i}>{w}</li>
															))}
														</ul>
													</div>
												)}

												{selectedMed.requiresPrescription && (
													<p className="mt-3 text-xs text-coral-600 dark:text-coral-400">
														⚠️ This medication requires a veterinary
														prescription.
													</p>
												)}
											</div>

											{/* Add Button */}
											{dosageResult.eligible && (
												<button
													onClick={handleAddMedication}
													className="btn-primary mt-4 w-full"
												>
													<Check size={16} /> Add to {pet.name}'s Medications
												</button>
											)}
										</motion.div>
									)}
								</>
							)}

							{/* Disclaimer */}
							<p className="mt-6 text-center text-xs text-neutral-400">
								⚠️ This calculator is for informational purposes only. Always
								consult your veterinarian before giving any medication.
							</p>
						</div>
					</motion.section>
				)}
			</AnimatePresence>
		</div>
	)
}
