import { cn } from '@/lib/format'
import { useFavorites } from '@/store/favorites'
import { useTheme } from '@/store/theme'
import { AnimatePresence, motion } from 'framer-motion'
import {
	Heart,
	Home,
	Menu,
	Moon,
	Package,
	PawPrint,
	Stethoscope,
	Sun,
	X
} from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navLinks = [
	{ to: '/my-pets', label: 'My Pets', icon: PawPrint },
	{ to: '/symptom-checker', label: 'Symptom Checker', icon: Stethoscope },
	{ to: '/adopt', label: 'Adopt', icon: Heart },
	{ to: '/wellness-box', label: 'Wellness Box', icon: Package }
]

export function Navbar() {
	const [mobileOpen, setMobileOpen] = useState(false)
	const theme = useTheme(s => s.theme)
	const toggleTheme = useTheme(s => s.toggle)
	const favCount = useFavorites(s => s.ids.length)

	return (
		<header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/80 backdrop-blur-lg dark:border-neutral-800 dark:bg-neutral-950/80">
			<div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
				{/* Mobile menu button */}
				<button
					className="grid h-10 w-10 place-items-center rounded-xl text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 lg:hidden"
					onClick={() => setMobileOpen(o => !o)}
					aria-label="Toggle menu"
				>
					{mobileOpen ? <X size={22} /> : <Menu size={22} />}
				</button>

				{/* Logo */}
				<Link
					to="/"
					className="flex shrink-0 items-center gap-2"
				>
					<span className="text-2xl">🐾</span>
					<span className="font-serif text-xl font-semibold text-neutral-900 dark:text-white">
						PetCare<span className="text-coral-500">Hub</span>
					</span>
				</Link>

				{/* Desktop nav */}
				<nav className="hidden items-center gap-1 lg:flex lg:ml-8">
					{navLinks.map(l => (
						<NavLink
							key={l.to}
							to={l.to}
							className={({ isActive }) =>
								cn(
									'flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors',
									isActive
										? 'bg-coral-100 text-coral-700 dark:bg-coral-950 dark:text-coral-300'
										: 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800'
								)
							}
						>
							<l.icon size={16} />
							{l.label}
						</NavLink>
					))}
				</nav>

				{/* Right side actions */}
				<div className="ml-auto flex items-center gap-2">
					{/* Favorites link with badge */}
					<Link
						to="/adopt/favorites"
						className="relative grid h-10 w-10 place-items-center rounded-xl text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
						aria-label="Saved pets"
					>
						<Heart size={20} />
						{favCount > 0 && (
							<span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-coral-500 px-1 text-[11px] font-bold text-white">
								{favCount}
							</span>
						)}
					</Link>

					{/* Theme toggle */}
					<button
						onClick={toggleTheme}
						className="grid h-10 w-10 place-items-center rounded-xl text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
						aria-label="Toggle dark mode"
					>
						{theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
					</button>
				</div>
			</div>

			{/* Mobile menu */}
			<AnimatePresence>
				{mobileOpen && (
					<motion.nav
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="overflow-hidden border-t border-neutral-200 dark:border-neutral-800 lg:hidden"
					>
						<div className="flex flex-col gap-1 p-4">
							<NavLink
								to="/"
								onClick={() => setMobileOpen(false)}
								className={({ isActive }) =>
									cn(
										'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium',
										isActive
											? 'bg-coral-100 text-coral-700 dark:bg-coral-950 dark:text-coral-300'
											: 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400'
									)
								}
							>
								<Home size={18} />
								Home
							</NavLink>
							{navLinks.map(l => (
								<NavLink
									key={l.to}
									to={l.to}
									onClick={() => setMobileOpen(false)}
									className={({ isActive }) =>
										cn(
											'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium',
											isActive
												? 'bg-coral-100 text-coral-700 dark:bg-coral-950 dark:text-coral-300'
												: 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400'
										)
									}
								>
									<l.icon size={18} />
									{l.label}
								</NavLink>
							))}
						</div>
					</motion.nav>
				)}
			</AnimatePresence>
		</header>
	)
}
