import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/pages/HomePage'
import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const AdoptDetailPage = lazy(() =>
	import('@/pages/AdoptDetailPage').then(module => ({
		default: module.AdoptDetailPage
	}))
)
const AdoptPage = lazy(() =>
	import('@/pages/AdoptPage').then(module => ({ default: module.AdoptPage }))
)
const FavoritesPage = lazy(() =>
	import('@/pages/FavoritesPage').then(module => ({
		default: module.FavoritesPage
	}))
)
const HowItWorksPage = lazy(() =>
	import('@/pages/HowItWorksPage').then(module => ({
		default: module.HowItWorksPage
	}))
)
const MyPetsPage = lazy(() =>
	import('@/pages/MyPetsPage').then(module => ({ default: module.MyPetsPage }))
)
const NotFoundPage = lazy(() =>
	import('@/pages/NotFoundPage').then(module => ({
		default: module.NotFoundPage
	}))
)
const PetDetailPage = lazy(() =>
	import('@/pages/PetDetailPage').then(module => ({
		default: module.PetDetailPage
	}))
)
const SymptomCheckerPage = lazy(() =>
	import('@/pages/SymptomCheckerPage').then(module => ({
		default: module.SymptomCheckerPage
	}))
)
const WellnessBoxPage = lazy(() =>
	import('@/pages/WellnessBoxPage').then(module => ({
		default: module.WellnessBoxPage
	}))
)

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<HomePage />} />

					<Route path="/my-pets" element={<MyPetsPage />} />
					<Route path="/my-pets/:id" element={<PetDetailPage />} />

					<Route path="/symptom-checker" element={<SymptomCheckerPage />} />

					<Route path="/adopt" element={<AdoptPage />} />
					<Route path="/adopt/favorites" element={<FavoritesPage />} />
					<Route path="/adopt/:id" element={<AdoptDetailPage />} />

					<Route path="/wellness-box" element={<WellnessBoxPage />} />

					<Route path="/how-it-works" element={<HowItWorksPage />} />

					<Route path="*" element={<NotFoundPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
