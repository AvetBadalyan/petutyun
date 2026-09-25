import { Layout } from '@/components/layout/Layout'
import { AdoptDetailPage } from '@/pages/AdoptDetailPage'
import { AdoptPage } from '@/pages/AdoptPage'
import { FavoritesPage } from '@/pages/FavoritesPage'
import { HomePage } from '@/pages/HomePage'
import { HowItWorksPage } from '@/pages/HowItWorksPage'
import { MyPetsPage } from '@/pages/MyPetsPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { PetDetailPage } from '@/pages/PetDetailPage'
import { SymptomCheckerPage } from '@/pages/SymptomCheckerPage'
import { WellnessBoxPage } from '@/pages/WellnessBoxPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

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
