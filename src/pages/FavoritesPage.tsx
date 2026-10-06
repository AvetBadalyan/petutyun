import { getAdoptablePetsByIds } from '@/data/adoptablePets'
import { imageFallback, speciesEmoji } from '@/lib/species'
import { useFavorites } from '@/store/favorites'
import { motion } from 'framer-motion'
import { ArrowLeft, Heart, MapPin, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export function FavoritesPage() {
	const { ids, remove, clear } = useFavorites()
	const savedPets = getAdoptablePetsByIds(ids)

	return (
		<div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
			{/* Back link */}
			<Link to="/adopt" className="btn-ghost mb-6 -ml-2">
				<ArrowLeft size={16} /> Back to adoption
			</Link>

			{/* Header */}
			<div className="flex flex-wrap items-end justify-between gap-4">
				<div>
					<h1 className="font-serif text-4xl text-neutral-900 dark:text-white">
						Saved Pets
					</h1>
					<p className="mt-2 text-neutral-600 dark:text-neutral-400">
						{savedPets.length} pet{savedPets.length !== 1 && 's'} you're
						interested in
					</p>
				</div>
				{savedPets.length > 0 && (
					<button
						onClick={clear}
						className="btn-ghost text-red-500 hover:text-red-600"
					>
						<Trash2 size={16} /> Clear all
					</button>
				)}
			</div>

			{/* Empty State */}
			{savedPets.length === 0 ? (
				<div className="mt-10 rounded-2xl border-2 border-dashed border-neutral-200 py-16 text-center dark:border-neutral-700">
					<div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-coral-100 text-coral-600 dark:bg-coral-950 dark:text-coral-400">
						<Heart size={32} />
					</div>
					<h2 className="mt-4 font-serif text-2xl text-neutral-900 dark:text-white">
						No saved pets yet
					</h2>
					<p className="mt-2 text-neutral-500 dark:text-neutral-400">
						When you find a pet you love, click the heart to save them here.
					</p>
					<Link to="/adopt" className="btn-primary mt-6">
						Browse Adoptable Pets
					</Link>
				</div>
			) : (
				<motion.div
					initial="hidden"
					animate="show"
					variants={{ show: { transition: { staggerChildren: 0.05 } } }}
					className="mt-8 space-y-4"
				>
					{savedPets.map(pet => (
						<motion.div
							key={pet.id}
							variants={{
								hidden: { opacity: 0, y: 10 },
								show: { opacity: 1, y: 0 }
							}}
							className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
						>
							{/* Image */}
							<Link
								to={`/adopt/${pet.id}`}
								className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl"
							>
								<img
									src={pet.photo}
									alt={pet.name}
									width={400}
									height={300}
									loading="lazy"
									className="h-full w-full object-cover"
									onError={e => {
										e.currentTarget.onerror = null
										e.currentTarget.src = imageFallback()
									}}
								/>
								<span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-sm">
									{speciesEmoji[pet.species]}
								</span>
							</Link>

							{/* Info */}
							<div className="min-w-0 flex-1">
								<Link
									to={`/adopt/${pet.id}`}
									className="font-serif text-xl text-neutral-900 transition-colors duration-200 hover:text-coral-600 dark:text-white dark:hover:text-coral-400"
								>
									{pet.name}
								</Link>
								<p className="text-sm text-neutral-500 dark:text-neutral-400">
									{pet.breed} · {pet.age} ·{' '}
									<span className="capitalize">{pet.size}</span>
								</p>
								<p className="mt-1 flex items-center gap-1 text-xs text-neutral-400">
									<MapPin size={12} /> {pet.location}
								</p>

								{/* Tags */}
								<div className="mt-2 flex flex-wrap gap-1">
									{pet.goodWithKids && (
										<span className="chip-teal text-xs">Kids OK</span>
									)}
									{pet.goodWithPets && (
										<span className="chip-teal text-xs">Pets OK</span>
									)}
								</div>
							</div>

							{/* Actions */}
							<div className="flex gap-2 sm:flex-col">
								<Link
									to={`/adopt/${pet.id}`}
									className="btn-primary flex-1 sm:flex-none"
								>
									View Details
								</Link>
								<button
									onClick={() => remove(pet.id)}
									className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border-2 border-neutral-200 text-neutral-500 transition-colors duration-200 hover:border-red-300 hover:bg-red-50 hover:text-red-500 dark:border-neutral-700 dark:hover:border-red-800 dark:hover:bg-red-950"
									aria-label="Remove from favorites"
								>
									<Heart size={18} fill="currentColor" />
								</button>
							</div>
						</motion.div>
					))}
				</motion.div>
			)}

			{/* Tip */}
			{savedPets.length > 0 && (
				<div className="mt-8 rounded-2xl bg-teal-50 p-4 text-center dark:bg-teal-950">
					<p className="text-sm text-teal-700 dark:text-teal-300">
						💡 <strong>Tip:</strong> Reach out to shelters quickly — popular
						pets get adopted fast!
					</p>
				</div>
			)}
		</div>
	)
}
