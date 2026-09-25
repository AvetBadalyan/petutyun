import { getAdoptablePetById } from '@/data/adoptablePets'
import { cn } from '@/lib/format'
import { motionTransition } from '@/lib/motion'
import { imageFallback, speciesEmoji } from '@/lib/species'
import { useFavorites } from '@/store/favorites'
import { motion } from 'framer-motion'
import {
	ArrowLeft,
	Check,
	Heart,
	Mail,
	MapPin,
	Phone,
	Share2,
	X
} from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { NotFoundPage } from './NotFoundPage'

export function AdoptDetailPage() {
	const { id } = useParams()
	const pet = id ? getAdoptablePetById(id) : undefined
	const { toggle, has } = useFavorites()
	const [inquiry, setInquiry] = useState<'inquiry' | 'visit' | null>(null)
	const [copied, setCopied] = useState(false)

	if (!pet) {
		return <NotFoundPage />
	}

	const handleShare = () => {
		navigator.clipboard?.writeText(window.location.href)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	const isFavorite = has(pet.id)

	const shelterContact = {
		phone: '+374 10 55-12-34',
		email: `adopt@${pet.shelter.toLowerCase().replace(/\s+/g, '')}.am`,
		hours: 'Mon-Sat: 10:00 - 18:00, Sun: 12:00 - 17:00'
	}

	return (
		<div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
			{/* Back link */}
			<Link to="/adopt" className="btn-ghost mb-6 -ml-2">
				<ArrowLeft size={16} /> Back to adoption
			</Link>

			<div className="grid gap-8 lg:grid-cols-2">
				{/* Image Section */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={motionTransition.base}
				>
					<div className="relative overflow-hidden rounded-3xl">
						<img
							src={pet.photo}
							alt={pet.name}
							className="aspect-square w-full object-cover"
							onError={e => {
								e.currentTarget.onerror = null
								e.currentTarget.src = imageFallback()
							}}
						/>
						{/* Favorite button */}
						<button
							onClick={() => toggle(pet.id)}
							className={cn(
								'absolute right-4 top-4 flex items-center gap-2 rounded-full px-4 py-2 font-medium transition-all duration-200',
								isFavorite
									? 'bg-coral-500 text-white'
									: 'bg-white/90 text-neutral-700 hover:bg-coral-100 hover:text-coral-600'
							)}
						>
							<Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
							{isFavorite ? 'Saved' : 'Save'}
						</button>
					</div>

					{/* Share buttons (mock) */}
					<div className="mt-4 flex items-center justify-center gap-2">
						<span className="text-sm text-neutral-500">
							{copied ? 'Link copied!' : 'Share:'}
						</span>
						<button
							onClick={handleShare}
							aria-label={`Share ${pet.name}`}
							className="grid h-10 w-10 place-items-center rounded-full bg-neutral-100 text-neutral-600 transition-colors duration-200 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
						>
							{copied ? <Check size={18} /> : <Share2 size={18} />}
						</button>
					</div>
				</motion.div>

				{/* Info Section */}
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ ...motionTransition.base, delay: 0.1 }}
				>
					{/* Header */}
					<div className="flex items-start justify-between">
						<div>
							<span className="text-4xl">{speciesEmoji[pet.species]}</span>
							<h1 className="mt-2 font-serif text-4xl text-neutral-900 dark:text-white">
								{pet.name}
							</h1>
							<p className="mt-1 text-lg text-neutral-600 dark:text-neutral-400">
								{pet.breed}
							</p>
						</div>
					</div>

					{/* Quick Info */}
					<div className="mt-6 grid grid-cols-3 gap-4">
						<div className="rounded-2xl bg-neutral-100 p-4 text-center dark:bg-neutral-800">
							<p className="text-sm text-neutral-500 dark:text-neutral-400">
								Age
							</p>
							<p className="mt-1 font-semibold text-neutral-900 dark:text-white">
								{pet.age}
							</p>
						</div>
						<div className="rounded-2xl bg-neutral-100 p-4 text-center dark:bg-neutral-800">
							<p className="text-sm text-neutral-500 dark:text-neutral-400">
								Size
							</p>
							<p className="mt-1 font-semibold capitalize text-neutral-900 dark:text-white">
								{pet.size}
							</p>
						</div>
						<div className="rounded-2xl bg-neutral-100 p-4 text-center dark:bg-neutral-800">
							<p className="text-sm text-neutral-500 dark:text-neutral-400">
								Gender
							</p>
							<p className="mt-1 font-semibold capitalize text-neutral-900 dark:text-white">
								{pet.gender}
							</p>
						</div>
					</div>

					{/* Compatibility */}
					<div className="mt-6">
						<h3 className="font-medium text-neutral-900 dark:text-white">
							Compatibility
						</h3>
						<div className="mt-3 flex flex-wrap gap-3">
							<span
								className={cn(
									'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium',
									pet.goodWithKids
										? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300'
										: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
								)}
							>
								{pet.goodWithKids ? <Check size={16} /> : <X size={16} />}
								{pet.goodWithKids ? 'Good with kids' : 'Not ideal with kids'}
							</span>
							<span
								className={cn(
									'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium',
									pet.goodWithPets
										? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300'
										: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
								)}
							>
								{pet.goodWithPets ? <Check size={16} /> : <X size={16} />}
								{pet.goodWithPets
									? 'Good with other pets'
									: 'Prefers to be only pet'}
							</span>
						</div>
					</div>

					{/* Bio */}
					<div className="mt-6">
						<h3 className="font-medium text-neutral-900 dark:text-white">
							About {pet.name}
						</h3>
						<p className="mt-3 leading-relaxed text-neutral-600 dark:text-neutral-400">
							{pet.bio}
						</p>
					</div>

					{/* Shelter Info */}
					<div className="mt-8 rounded-2xl border-2 border-neutral-200 p-6 dark:border-neutral-700">
						<h3 className="font-medium text-neutral-900 dark:text-white">
							{pet.shelter}
						</h3>
						<p className="mt-1 flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
							<MapPin size={14} /> {pet.location}
						</p>

						<div className="mt-4 space-y-2 text-sm">
							<p className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
								<Phone size={14} /> {shelterContact.phone}
							</p>
							<p className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
								<Mail size={14} /> {shelterContact.email}
							</p>
							<p className="text-neutral-500 dark:text-neutral-500">
								{shelterContact.hours}
							</p>
						</div>

						{/* Action Buttons */}
						{inquiry ? (
							<div className="mt-6 flex items-start gap-3 rounded-2xl border-2 border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950/50">
								<Check
									size={20}
									className="mt-0.5 shrink-0 text-green-600 dark:text-green-400"
								/>
								<div>
									<p className="font-medium text-green-800 dark:text-green-300">
										{inquiry === 'inquiry'
											? `Inquiry sent for ${pet.name}!`
											: `Visit requested for ${pet.name}!`}
									</p>
									<p className="mt-0.5 text-sm text-green-700 dark:text-green-400">
										{pet.shelter} will be in touch shortly. (Demo — no real
										request is sent.)
									</p>
								</div>
							</div>
						) : (
							<>
								<div className="mt-6 flex flex-col gap-3 sm:flex-row">
									<button
										onClick={() => setInquiry('inquiry')}
										className="btn-primary flex-1"
									>
										Start Adoption Inquiry
									</button>
									<button
										onClick={() => setInquiry('visit')}
										className="btn-secondary flex-1"
									>
										Schedule a Visit
									</button>
								</div>
								<p className="mt-4 text-center text-xs text-neutral-500">
									This is a demo — no real adoptions are processed.
								</p>
							</>
						)}
					</div>
				</motion.div>
			</div>
		</div>
	)
}
