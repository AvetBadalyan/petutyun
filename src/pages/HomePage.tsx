import { PageHead } from '@/components/PageHead'
import { adoptablePets } from '@/data/adoptablePets'
import { imageFallback, speciesEmoji } from '@/lib/species'
import { generateSrcSet, imageSizes, optimizeImage } from '@/lib/images'
import { useFavorites } from '@/store/favorites'
import { usePets } from '@/store/pets'
import {
	ArrowRight,
	Heart,
	MapPin,
	Package,
	PawPrint,
	Star,
	Stethoscope
} from 'lucide-react'
import { Link } from 'react-router-dom'

// Dina photos — the developer's real pitbull mascot
import dinaCta from '@/assets/dina-images/dina-cta.webp'
import dinaHero from '@/assets/dina-images/dina-hero.webp'

// Feature cards data
const features = [
	{
		to: '/my-pets',
		icon: PawPrint,
		title: 'My Pets',
		description: 'Add and manage your pet profiles',
		color: 'coral'
	},
	{
		to: '/symptom-checker',
		icon: Stethoscope,
		title: 'Symptom Checker',
		description: 'Quick health assessment wizard',
		color: 'teal'
	},
	{
		to: '/adopt',
		icon: Heart,
		title: 'Adopt a Pet',
		description: 'Find your new best friend',
		color: 'coral'
	},
	{
		to: '/wellness-box',
		icon: Package,
		title: 'Wellness Box',
		description: 'Personalized care subscription',
		color: 'teal'
	}
]

export function HomePage() {
	const { pets, activePetId, setActivePet } = usePets()
	const activePet = pets.find(p => p.id === activePetId)
	const { toggle, has } = useFavorites()

	const featuredPets = adoptablePets
		.filter(p => p.species === 'dog')
		.slice(0, 3)

 return (
 	<>
 		<PageHead
 			title="Armenia's Pet Republic"
 			description="Care for your pets, check symptoms, adopt from shelters across Armenia, and build personalized wellness boxes."
 		/>
 		<div>
			{/* Hero Section */}
			<section className="relative overflow-hidden bg-gradient-to-br from-coral-50 via-white to-teal-50 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900">
				<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
					<div className="grid items-center gap-12 lg:grid-cols-2">
						{/* Text content */}
						<div className="home-enter text-center lg:text-left">
							<span className="chip mb-4">🐾 Armenia&apos;s Pet Republic</span>
							<h1 className="font-serif text-5xl text-neutral-900 dark:text-white sm:text-6xl">
								Welcome to{' '}
								<span className="text-coral-700 dark:text-coral-400">Pet</span>
								<span className="text-teal-700 dark:text-teal-400">utyun</span>
							</h1>
							<p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400 lg:mx-0">
								Care for your pets, check symptoms, adopt from shelters across
								Armenia, and build personalized wellness boxes — all in one
								place.
							</p>
							<div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
								<Link to="/my-pets" className="btn-primary">
									Get Started <ArrowRight size={18} />
								</Link>
								<Link to="/adopt" className="btn-secondary">
									Browse Adoptable Pets
								</Link>
							</div>
						</div>

						{/* Dina the mascot */}
						<div className="home-image-enter relative mx-auto lg:mx-0">
							<div className="relative pb-6">
								<img
									src={dinaHero}
									alt="Dina the Pitbull with owner"
									width={700}
									height={437}
									fetchPriority="high"
									className="w-full max-w-md rounded-3xl object-cover shadow-2xl ring-4 ring-white dark:ring-neutral-800"
								/>
								{/* Fun badge — offset clear of the image corner */}
								<div className="absolute -bottom-3 left-6 rounded-2xl bg-white px-4 py-2.5 shadow-lg ring-1 ring-neutral-200 dark:bg-neutral-800 dark:ring-neutral-700">
									<p className="text-sm font-medium text-neutral-900 dark:text-white">
										Meet{' '}
										<span className="text-coral-700 dark:text-coral-400">
											Dina
										</span>{' '}
										🦖
									</p>
									<p className="text-xs text-neutral-500">
										The &quot;Dina-saur&quot; mascot
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Active Pet Section (if user has pets) */}
			{pets.length > 0 && (
				<section className="border-y border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
					<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
						<div className="flex items-center justify-between">
							<h2 className="font-serif text-2xl text-neutral-900 dark:text-white">
								Your Pets
							</h2>
							<Link to="/my-pets" className="btn-ghost text-sm">
								Manage <ArrowRight size={14} />
							</Link>
						</div>

						<div className="mt-4 flex gap-4 overflow-x-auto pb-2 no-scrollbar">
       {pets.map(pet => (
       	<button
       		key={pet.id}
       		onClick={() => setActivePet(pet.id)}
       		className={`flex shrink-0 items-center gap-3 rounded-2xl border-2 p-4 transition-all duration-200 ${
       			activePetId === pet.id
       				? 'border-coral-500 bg-coral-50 dark:border-coral-400 dark:bg-coral-950'
       				: 'border-neutral-200 bg-white hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600'
       		}`}
       	>
       		<div className="grid h-12 w-12 place-items-center rounded-xl bg-neutral-100 text-2xl dark:bg-neutral-700">
          {pet.photo ? (
          	<img
          		src={
          			pet.photo.includes('unsplash.com')
          				? optimizeImage(pet.photo, 48, 48)
          				: pet.photo
          		}
          		{...(pet.photo.includes('unsplash.com')
          			? {
          					srcSet: generateSrcSet(pet.photo, [48, 96]),
          					sizes: '48px'
          				}
          			: {})}
          		alt={pet.name}
          		loading="lazy"
          		width="48"
          		height="48"
          		className="h-full w-full rounded-xl object-cover"
          	/>
          ) : (
          	speciesEmoji[pet.species]
          )}
       		</div>
									<div className="text-left">
										<div className="flex items-center gap-2">
											<span className="font-medium text-neutral-900 dark:text-white">
												{pet.name}
											</span>
											{activePetId === pet.id && (
												<Star size={14} className="text-coral-500" />
											)}
										</div>
										<span className="text-sm text-neutral-500 dark:text-neutral-400">
											{pet.breed || pet.species}
										</span>
									</div>
								</button>
							))}
						</div>

						{activePet && (
							<div className="mt-4 rounded-xl bg-coral-50 p-4 dark:bg-coral-950/50">
								<p className="text-sm text-coral-800 dark:text-coral-200">
									<strong>{activePet.name}</strong> is your active pet. Features
									like Symptom Checker and Wellness Box will use{' '}
									{activePet.name}'s profile.
								</p>
							</div>
						)}
					</div>
				</section>
			)}

			{/* Feature Cards */}
			<section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
				<div className="home-stagger grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{features.map(feature => (
						<div key={feature.to} className="home-stagger-item">
							<Link
								to={feature.to}
								className="card group flex flex-col items-center p-6 text-center hover:shadow-card-hover"
							>
								<div
									className={`grid h-14 w-14 place-items-center rounded-2xl transition-transform duration-200 group-hover:scale-110 ${
										feature.color === 'coral'
											? 'bg-coral-100 text-coral-700 dark:bg-coral-950 dark:text-coral-400'
											: 'bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-400'
									}`}
								>
									<feature.icon size={26} />
								</div>
								<h3 className="mt-4 font-serif text-xl text-neutral-900 dark:text-white">
									{feature.title}
								</h3>
								<p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
									{feature.description}
								</p>
								<span
									className={`mt-4 flex items-center gap-1 text-sm font-medium ${
										feature.color === 'coral'
											? 'text-coral-700 dark:text-coral-400'
											: 'text-teal-700 dark:text-teal-400'
									}`}
								>
									Explore <ArrowRight size={14} />
								</span>
							</Link>
						</div>
					))}
				</div>
			</section>

			{/* CTA Section */}
			{pets.length === 0 && (
				<section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
					<div className="overflow-hidden rounded-3xl bg-gradient-to-r from-coral-700 to-coral-800 px-8 py-12 text-white lg:px-14">
						<div className="grid items-center gap-8 lg:grid-cols-2">
							<div>
								<h2 className="font-serif text-3xl leading-tight sm:text-4xl">
									Start by adding your pet
								</h2>
								<p className="mt-4 max-w-md text-coral-100">
									Create a profile for your furry friend to unlock personalized
									features like symptom checking and custom wellness boxes.
								</p>
								<Link
									to="/my-pets"
									className="btn-primary mt-6 bg-white text-coral-700 hover:bg-coral-50"
								>
									Add Your Pet <PawPrint size={18} />
								</Link>
							</div>
       <div className="hidden lg:block">
       	<img
       		src={dinaCta}
       		alt="Dina"
       		width={192}
       		height={192}
       		loading="lazy"
       		className="w-48 h-48 rounded-2xl object-cover opacity-90"
       	/>
       </div>
						</div>
					</div>
				</section>
			)}

			{/* Featured Adoptable Pets */}
			<section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
				<div className="flex items-end justify-between">
					<div>
						<h2 className="font-serif text-3xl text-neutral-900 dark:text-white">
							Pets Looking for Homes
						</h2>
						<p className="mt-1 text-neutral-600 dark:text-neutral-400">
							Give a pet a second chance at happiness
						</p>
					</div>
					<Link to="/adopt" className="btn-ghost hidden sm:flex">
						View all <ArrowRight size={14} />
					</Link>
				</div>

				<div className="home-stagger mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{featuredPets.map(pet => (
						<div
							key={pet.id}
							className="home-stagger-item card group flex flex-col overflow-hidden"
						>
       <div className="relative aspect-[4/3] overflow-hidden">
       	<img
       		src={optimizeImage(pet.photo, 400, 300)}
       		srcSet={generateSrcSet(pet.photo, [320, 400, 640, 800])}
       		sizes={imageSizes.card}
       		alt={pet.name}
       		width={400}
       		height={300}
       		loading="lazy"
       		className="dim-on-dark h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
       		onError={e => {
       			e.currentTarget.onerror = null
       			e.currentTarget.src = imageFallback()
       		}}
       	/>
								<button
									onClick={e => {
										e.preventDefault()
										toggle(pet.id)
									}}
									className={`absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full transition-all duration-200 ${
										has(pet.id)
											? 'bg-coral-500 text-white'
											: 'bg-white/90 text-neutral-600 hover:bg-coral-100 hover:text-coral-600'
									}`}
									aria-label={
										has(pet.id) ? 'Remove from favorites' : 'Add to favorites'
									}
								>
									<Heart
										size={20}
										fill={has(pet.id) ? 'currentColor' : 'none'}
									/>
								</button>
							</div>
							<div className="flex flex-1 flex-col p-4">
								<h3 className="font-serif text-xl text-neutral-900 dark:text-white">
									{pet.name}
								</h3>
								<p className="text-sm text-neutral-500 dark:text-neutral-400">
									{pet.breed} · {pet.age}
								</p>
								<p className="mt-1 flex items-center gap-1 text-xs text-neutral-600 dark:text-neutral-400">
									<MapPin size={12} /> {pet.location}
								</p>
								<div className="mt-auto" />
								<Link
									to={`/adopt/${pet.id}`}
									className="btn-primary mt-5 w-full"
								>
									Meet {pet.name}
								</Link>
							</div>
						</div>
					))}
				</div>

				<Link to="/adopt" className="btn-secondary mx-auto mt-6 flex sm:hidden">
					View All Pets <ArrowRight size={16} />
				</Link>
			</section>
			</div>
		</>
	)
}
