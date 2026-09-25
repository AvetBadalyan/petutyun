import { adoptablePets } from '@/data/adoptablePets'
import { cn } from '@/lib/format'
import { imageFallback, speciesEmoji } from '@/lib/species'
import { useFavorites } from '@/store/favorites'
import type { AdoptablePet } from '@/types'
import { motion } from 'framer-motion'
import { Filter, Heart, MapPin, Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const speciesOptions = [
	{ value: 'all', label: 'All Pets' },
	{ value: 'dog', label: '🐕 Dogs' },
	{ value: 'cat', label: '🐱 Cats' },
	{ value: 'bird', label: '🐦 Birds' },
	{ value: 'other', label: '🐾 Other' }
]

const sizeOptions = [
	{ value: 'all', label: 'Any Size' },
	{ value: 'small', label: 'Small' },
	{ value: 'medium', label: 'Medium' },
	{ value: 'large', label: 'Large' }
]

const ageOptions = [
	{ value: 'all', label: 'Any Age' },
	{ value: 'young', label: 'Young (0-2 yrs)' },
	{ value: 'adult', label: 'Adult (3-6 yrs)' },
	{ value: 'senior', label: 'Senior (7+ yrs)' }
]

function parseAge(ageStr: string): number {
	const match = ageStr.match(/(\d+)/)
	return match ? parseInt(match[1], 10) : 0
}

function getAgeCategory(ageStr: string): string {
	const years = parseAge(ageStr)
	if (years <= 2) return 'young'
	if (years <= 6) return 'adult'
	return 'senior'
}

export function AdoptPage() {
	const [search, setSearch] = useState('')
	const [species, setSpecies] = useState('all')
	const [size, setSize] = useState('all')
	const [age, setAge] = useState('all')
	const [goodWithKids, setGoodWithKids] = useState(false)
	const [goodWithPets, setGoodWithPets] = useState(false)
	const [showFilters, setShowFilters] = useState(false)

	const { toggle, has } = useFavorites()
	const favCount = useFavorites(s => s.ids.length)

	const filteredPets = useMemo(() => {
		return adoptablePets.filter(pet => {
			if (search) {
				const searchLower = search.toLowerCase()
				const matchesName = pet.name.toLowerCase().includes(searchLower)
				const matchesBreed = pet.breed.toLowerCase().includes(searchLower)
				if (!matchesName && !matchesBreed) return false
			}

			if (species !== 'all' && pet.species !== species) return false
			if (size !== 'all' && pet.size !== size) return false
			if (age !== 'all' && getAgeCategory(pet.age) !== age) return false
			if (goodWithKids && !pet.goodWithKids) return false
			if (goodWithPets && !pet.goodWithPets) return false

			return true
		})
	}, [search, species, size, age, goodWithKids, goodWithPets])

	const activeFilters = [
		species !== 'all',
		size !== 'all',
		age !== 'all',
		goodWithKids,
		goodWithPets
	].filter(Boolean).length

	const clearFilters = () => {
		setSearch('')
		setSpecies('all')
		setSize('all')
		setAge('all')
		setGoodWithKids(false)
		setGoodWithPets(false)
	}

	return (
		<div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
			{/* Header */}
			<div className="flex flex-wrap items-end justify-between gap-4">
				<div>
					<h1 className="font-serif text-4xl text-neutral-900 dark:text-white">
						Adopt a Pet
					</h1>
					<p className="mt-2 text-neutral-600 dark:text-neutral-400">
						{filteredPets.length} pet{filteredPets.length !== 1 && 's'} looking
						for a forever home
					</p>
				</div>
				<Link to="/adopt/favorites" className="btn-secondary relative">
					<Heart size={18} />
					Saved Pets
					{favCount > 0 && (
						<span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-coral-500 text-xs font-bold text-white">
							{favCount}
						</span>
					)}
				</Link>
			</div>

			{/* Search and Filter Bar */}
			<div className="mt-6 flex flex-wrap gap-3">
				{/* Search Input */}
				<div className="relative flex-1 min-w-[200px]">
					<Search
						size={18}
						className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
					/>
					<input
						type="text"
						value={search}
						onChange={e => setSearch(e.target.value)}
						placeholder="Search by name or breed..."
						className="input pl-10"
					/>
				</div>

				{/* Filter Toggle (Mobile) */}
				<button
					onClick={() => setShowFilters(!showFilters)}
					className={cn(
						'btn-secondary lg:hidden',
						activeFilters > 0 && 'border-coral-500 text-coral-600'
					)}
				>
					<Filter size={18} />
					Filters
					{activeFilters > 0 && (
						<span className="ml-1 rounded-full bg-coral-500 px-2 py-0.5 text-xs text-white">
							{activeFilters}
						</span>
					)}
				</button>

				{/* Desktop Filters */}
				<div className="hidden gap-3 lg:flex">
					<select
						value={species}
						onChange={e => setSpecies(e.target.value)}
						className="input w-auto"
					>
						{speciesOptions.map(opt => (
							<option key={opt.value} value={opt.value}>
								{opt.label}
							</option>
						))}
					</select>

					<select
						value={size}
						onChange={e => setSize(e.target.value)}
						className="input w-auto"
					>
						{sizeOptions.map(opt => (
							<option key={opt.value} value={opt.value}>
								{opt.label}
							</option>
						))}
					</select>

					<select
						value={age}
						onChange={e => setAge(e.target.value)}
						className="input w-auto"
					>
						{ageOptions.map(opt => (
							<option key={opt.value} value={opt.value}>
								{opt.label}
							</option>
						))}
					</select>

					<label className="flex cursor-pointer items-center gap-2 rounded-xl border-2 border-neutral-200 bg-white px-4 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900">
						<input
							type="checkbox"
							checked={goodWithKids}
							onChange={e => setGoodWithKids(e.target.checked)}
							className="h-4 w-4 rounded accent-coral-500"
						/>
						Good with kids
					</label>

					<label className="flex cursor-pointer items-center gap-2 rounded-xl border-2 border-neutral-200 bg-white px-4 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900">
						<input
							type="checkbox"
							checked={goodWithPets}
							onChange={e => setGoodWithPets(e.target.checked)}
							className="h-4 w-4 rounded accent-coral-500"
						/>
						Good with pets
					</label>

					{activeFilters > 0 && (
						<button onClick={clearFilters} className="btn-ghost text-coral-600">
							<X size={16} /> Clear
						</button>
					)}
				</div>
			</div>

			{/* Mobile Filters Panel */}
			{showFilters && (
				<motion.div
					initial={{ opacity: 0, height: 0 }}
					animate={{ opacity: 1, height: 'auto' }}
					exit={{ opacity: 0, height: 0 }}
					className="mt-4 rounded-2xl border-2 border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900 lg:hidden"
				>
					<div className="grid gap-4 sm:grid-cols-2">
						<div>
							<label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
								Species
							</label>
							<select
								value={species}
								onChange={e => setSpecies(e.target.value)}
								className="input"
							>
								{speciesOptions.map(opt => (
									<option key={opt.value} value={opt.value}>
										{opt.label}
									</option>
								))}
							</select>
						</div>

						<div>
							<label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
								Size
							</label>
							<select
								value={size}
								onChange={e => setSize(e.target.value)}
								className="input"
							>
								{sizeOptions.map(opt => (
									<option key={opt.value} value={opt.value}>
										{opt.label}
									</option>
								))}
							</select>
						</div>

						<div>
							<label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
								Age
							</label>
							<select
								value={age}
								onChange={e => setAge(e.target.value)}
								className="input"
							>
								{ageOptions.map(opt => (
									<option key={opt.value} value={opt.value}>
										{opt.label}
									</option>
								))}
							</select>
						</div>

						<div className="flex flex-col gap-2">
							<label className="flex cursor-pointer items-center gap-2">
								<input
									type="checkbox"
									checked={goodWithKids}
									onChange={e => setGoodWithKids(e.target.checked)}
									className="h-4 w-4 rounded accent-coral-500"
								/>
								<span className="text-sm">Good with kids</span>
							</label>
							<label className="flex cursor-pointer items-center gap-2">
								<input
									type="checkbox"
									checked={goodWithPets}
									onChange={e => setGoodWithPets(e.target.checked)}
									className="h-4 w-4 rounded accent-coral-500"
								/>
								<span className="text-sm">Good with other pets</span>
							</label>
						</div>
					</div>

					{activeFilters > 0 && (
						<button
							onClick={clearFilters}
							className="btn-ghost mt-4 w-full text-coral-600"
						>
							<X size={16} /> Clear All Filters
						</button>
					)}
				</motion.div>
			)}

			{/* Results Grid */}
			{filteredPets.length === 0 ? (
				<div className="mt-10 rounded-2xl border-2 border-dashed border-neutral-200 py-16 text-center dark:border-neutral-700">
					<div className="text-5xl">🔍</div>
					<h2 className="mt-4 font-serif text-2xl text-neutral-900 dark:text-white">
						No pets found
					</h2>
					<p className="mt-2 text-neutral-500 dark:text-neutral-400">
						Try adjusting your filters or search term.
					</p>
					<button onClick={clearFilters} className="btn-primary mt-6">
						Clear Filters
					</button>
				</div>
			) : (
				<motion.div
					initial="hidden"
					animate="show"
					variants={{ show: { transition: { staggerChildren: 0.05 } } }}
					className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
				>
					{filteredPets.map(pet => (
						<PetCard
							key={pet.id}
							pet={pet}
							isFavorite={has(pet.id)}
							onToggleFavorite={() => toggle(pet.id)}
						/>
					))}
				</motion.div>
			)}
		</div>
	)
}

// === Pet Card Component ===
interface PetCardProps {
	pet: AdoptablePet
	isFavorite: boolean
	onToggleFavorite: () => void
}

function PetCard({ pet, isFavorite, onToggleFavorite }: PetCardProps) {
	return (
		<motion.div
			variants={{
				hidden: { opacity: 0, y: 20 },
				show: { opacity: 1, y: 0 }
			}}
			className="card group flex flex-col overflow-hidden"
		>
			{/* Image */}
			<div className="relative aspect-[4/3] overflow-hidden">
				<img
					src={pet.photo}
					alt={pet.name}
					className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
					onError={e => {
						e.currentTarget.onerror = null
						e.currentTarget.src = imageFallback()
					}}
				/>
				{/* Favorite button */}
				<button
					onClick={e => {
						e.preventDefault()
						onToggleFavorite()
					}}
					className={cn(
						'absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full transition-all',
						isFavorite
							? 'bg-coral-500 text-white'
							: 'bg-white/90 text-neutral-600 hover:bg-coral-100 hover:text-coral-600'
					)}
					aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
				>
					<Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
				</button>
				{/* Species badge */}
				<span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-sm">
					{speciesEmoji[pet.species]}
				</span>
			</div>

			{/* Info - flex-grow to fill available space */}
			<div className="flex flex-1 flex-col p-4">
				<div className="flex items-start justify-between">
					<div className="min-w-0 flex-1">
						<h3 className="font-serif text-xl text-neutral-900 dark:text-white">
							{pet.name}
						</h3>
						<p className="truncate text-sm text-neutral-500 dark:text-neutral-400">
							{pet.breed} · {pet.age}
						</p>
					</div>
					<span
						className={cn(
							'ml-2 shrink-0 rounded-full px-2 py-1 text-xs font-medium',
							pet.size === 'small' &&
								'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',
							pet.size === 'medium' &&
								'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
							pet.size === 'large' &&
								'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
						)}
					>
						{pet.size}
					</span>
				</div>

				<p className="mt-2 flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
					<MapPin size={12} /> {pet.location}
				</p>

				{/* Tags - fixed height to ensure alignment */}
				<div className="mt-3 flex min-h-[28px] flex-wrap gap-1">
					{pet.goodWithKids && (
						<span className="chip-teal text-xs">Kids OK</span>
					)}
					{pet.goodWithPets && (
						<span className="chip-teal text-xs">Pets OK</span>
					)}
				</div>

				{/* CTA - pushed to bottom with mt-auto */}
				<Link
					to={`/adopt/${pet.id}`}
					className="btn-primary mt-auto w-full pt-4 text-center"
				>
					Meet {pet.name}
				</Link>
			</div>
		</motion.div>
	)
}
