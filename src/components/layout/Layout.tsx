import { useEffect } from 'react'
import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

export function Layout() {
	const { pathname } = useLocation()

	// Scroll to top on route change
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
	}, [pathname])

	return (
		<div className="flex min-h-screen flex-col">
			<Navbar />
			<main className="flex-1">
				<Suspense
					fallback={
						<div
							className="mx-auto max-w-4xl px-4 py-10 text-neutral-600 dark:text-neutral-400"
							role="status"
						>
							Loading page...
						</div>
					}
				>
					<Outlet />
				</Suspense>
			</main>
			<Footer />
		</div>
	)
}
