import { useEffect } from 'react'
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
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}
