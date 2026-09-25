import { Layout } from '@/components/layout/Layout'
import { PageLoader } from '@/components/ui/PageLoader'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Lazy load all pages for better performance
const HomePage = lazy(() =>
	import('@/pages/HomePage').then(m => ({ default: m.HomePage }))
)
const MyPetsPage = lazy(() =>
	import('@/pages/MyPetsPage').then(m => ({ default: m.MyPetsPage }))
)
const PetDetailPage = lazy(() =>
	import('@/pages/PetDetailPage').then(m => ({ default: m.PetDetailPage }))
)
const SymptomCheckerPage = lazy(() =>
	import('@/pages/SymptomCheckerPage').then(m => ({
		default: m.SymptomCheckerPage
	}))
)
const AdoptPage = lazy(() =>
	import('@/pages/AdoptPage').then(m => ({ default: m.AdoptPage }))
)
const AdoptDetailPage = lazy(() =>
	import('@/pages/AdoptDetailPage').then(m => ({ default: m.AdoptDetailPage }))
)
const FavoritesPage = lazy(() =>
	import('@/pages/FavoritesPage').then(m => ({ default: m.FavoritesPage }))
)
const WellnessBoxPage = lazy(() =>
	import('@/pages/WellnessBoxPage').then(m => ({ default: m.WellnessBoxPage }))
)
const HowItWorksPage = lazy(() =>
	import('@/pages/HowItWorksPage').then(m => ({ default: m.HowItWorksPage }))
)
const NotFoundPage = lazy(() =>
	import('@/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage }))
)

function Page({ children }: { children: React.ReactNode }) {
	return <Suspense fallback={<PageLoader />}>{children}</Suspense>
}

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					{/* Dashboard / Home */}
					<Route
						path="/"
						element={
							<Page>
								<HomePage />
							</Page>
						}
					/>

					{/* My Pets - CRUD */}
					<Route
						path="/my-pets"
						element={
							<Page>
								<MyPetsPage />
							</Page>
						}
					/>
					<Route
						path="/my-pets/:id"
						element={
							<Page>
								<PetDetailPage />
							</Page>
						}
					/>

					{/* Symptom Checker - Wizard */}
					<Route
						path="/symptom-checker"
						element={
							<Page>
								<SymptomCheckerPage />
							</Page>
						}
					/>

					{/* Adoption */}
					<Route
						path="/adopt"
						element={
							<Page>
								<AdoptPage />
							</Page>
						}
					/>
					<Route
						path="/adopt/favorites"
						element={
							<Page>
								<FavoritesPage />
							</Page>
						}
					/>
					<Route
						path="/adopt/:id"
						element={
							<Page>
								<AdoptDetailPage />
							</Page>
						}
					/>

					{/* Wellness Box Quiz */}
					<Route
						path="/wellness-box"
						element={
							<Page>
								<WellnessBoxPage />
							</Page>
						}
					/>

					{/* Info pages */}
					<Route
						path="/how-it-works"
						element={
							<Page>
								<HowItWorksPage />
							</Page>
						}
					/>

					{/* 404 */}
					<Route
						path="*"
						element={
							<Page>
								<NotFoundPage />
							</Page>
						}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
