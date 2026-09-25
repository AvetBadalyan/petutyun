import { Github, Heart, Mail, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom'

const features = [
	{ label: 'My Pets', to: '/my-pets' },
	{ label: 'Symptom Checker', to: '/symptom-checker' },
	{ label: 'Adopt a Pet', to: '/adopt' },
	{ label: 'Wellness Box', to: '/wellness-box' }
]

const resources = [
	{ label: 'How It Works', to: '/how-it-works' },
	{ label: 'Saved Pets', to: '/adopt/favorites' },
	{ label: 'About', to: '#' }
]

export function Footer() {
	return (
		<footer className="mt-20 border-t border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
					{/* Brand */}
					<div className="lg:col-span-2">
						<Link to="/" className="flex items-center gap-2">
							<span className="text-2xl">🐾</span>
							<span className="font-serif text-xl font-semibold text-neutral-900 dark:text-white">
								PetCare<span className="text-coral-500">Hub</span>
							</span>
						</Link>
						<p className="mt-4 max-w-sm text-sm text-neutral-600 dark:text-neutral-400">
							Your all-in-one pet companion. Manage your pets, check symptoms,
							find adoptable pets, and build personalized wellness boxes.
						</p>
						<div className="mt-6 flex items-center gap-4">
							<a
								href="#"
								className="grid h-10 w-10 place-items-center rounded-xl bg-neutral-200 text-neutral-600 transition-colors hover:bg-coral-100 hover:text-coral-600 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-coral-950 dark:hover:text-coral-400"
								aria-label="Twitter"
							>
								<Twitter size={18} />
							</a>
							<a
								href="#"
								className="grid h-10 w-10 place-items-center rounded-xl bg-neutral-200 text-neutral-600 transition-colors hover:bg-coral-100 hover:text-coral-600 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-coral-950 dark:hover:text-coral-400"
								aria-label="GitHub"
							>
								<Github size={18} />
							</a>
							<a
								href="#"
								className="grid h-10 w-10 place-items-center rounded-xl bg-neutral-200 text-neutral-600 transition-colors hover:bg-coral-100 hover:text-coral-600 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-coral-950 dark:hover:text-coral-400"
								aria-label="Email"
							>
								<Mail size={18} />
							</a>
						</div>
					</div>

					{/* Features */}
					<div>
						<h6 className="text-sm font-semibold uppercase tracking-wide text-neutral-900 dark:text-white">
							Features
						</h6>
						<ul className="mt-4 space-y-3">
							{features.map(l => (
								<li key={l.label}>
									<Link
										to={l.to}
										className="text-sm text-neutral-600 transition-colors hover:text-coral-600 dark:text-neutral-400 dark:hover:text-coral-400"
									>
										{l.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Resources */}
					<div>
						<h6 className="text-sm font-semibold uppercase tracking-wide text-neutral-900 dark:text-white">
							Resources
						</h6>
						<ul className="mt-4 space-y-3">
							{resources.map(l => (
								<li key={l.label}>
									<Link
										to={l.to}
										className="text-sm text-neutral-600 transition-colors hover:text-coral-600 dark:text-neutral-400 dark:hover:text-coral-400"
									>
										{l.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-8 dark:border-neutral-800 sm:flex-row">
					<p className="text-sm text-neutral-500 dark:text-neutral-500">
						© {new Date().getFullYear()} PetCare Hub. Portfolio demo project.
					</p>
					<p className="flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-500">
						Made with <Heart size={14} className="text-coral-500" /> for pets
						everywhere
					</p>
				</div>
			</div>
		</footer>
	)
}
