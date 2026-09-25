import { Home, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
	return (
		<div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
			<div className="text-8xl">🐾</div>
			<h1 className="mt-6 font-serif text-5xl text-neutral-900 dark:text-white">
				Page Not Found
			</h1>
			<p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
				Looks like this page wandered off. Let's get you back on track.
			</p>
			<div className="mt-8 flex flex-wrap justify-center gap-4">
				<Link
					to="/"
					className="btn-primary"
				>
					<Home size={18} /> Go Home
				</Link>
				<Link
					to="/adopt"
					className="btn-secondary"
				>
					<Search size={18} /> Find Pets
				</Link>
			</div>
		</div>
	)
}
