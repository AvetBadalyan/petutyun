import {
	ArrowRight,
	CheckCircle,
	Heart,
	Package,
	PawPrint,
	Stethoscope
} from 'lucide-react'
import { Link } from 'react-router-dom'

const steps = [
	{
		icon: PawPrint,
		title: '1. Add Your Pets',
		description:
			'Create profiles for your pets with their name, species, breed, age, and weight. This helps personalize all features.',
		link: '/my-pets'
	},
	{
		icon: Stethoscope,
		title: '2. Check Symptoms',
		description:
			"If your pet isn't feeling well, use our symptom checker wizard to get guidance on possible causes and whether to see a vet.",
		link: '/symptom-checker'
	},
	{
		icon: Heart,
		title: '3. Adopt a Friend',
		description:
			'Browse adoptable pets from shelters across Armenia — from Yerevan to Gyumri and Dilijan. Filter by species, size, and compatibility. Save your favorites.',
		link: '/adopt'
	},
	{
		icon: Package,
		title: '4. Build a Wellness Box',
		description:
			"Take a quick quiz about your pet and we'll recommend a personalized box of supplements and treats.",
		link: '/wellness-box'
	}
]

const faqs = [
	{
		q: 'Is the symptom checker a replacement for a vet?',
		a: "No! It's just a guide to help you understand what might be going on. Always consult a real veterinarian for medical advice."
	},
	{
		q: 'Is my pet data stored securely?',
		a: 'All data is stored locally in your browser (localStorage). Nothing is sent to any server. This is a demo app.'
	},
	{
		q: 'Are the adoptable pets real?',
		a: 'The pets shown are mock data for demonstration. In a real app, this would connect to shelter APIs like Petfinder.'
	},
	{
		q: 'Does the wellness box actually ship?',
		a: "This is a portfolio demo — the 'Subscribe' button doesn't process real payments. But the recommendation logic is real!"
	}
]

export function HowItWorksPage() {
	return (
		<div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
			<div className="text-center">
				<h1 className="font-serif text-4xl text-neutral-900 dark:text-white">
					How Petutyun Works
				</h1>
				<p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
					Everything you need to care for your pets, in one simple app.
				</p>
			</div>

			{/* Steps */}
			<div className="mt-12 space-y-8">
				{steps.map(step => (
					<div
						key={step.title}
						className="card flex flex-col gap-4 p-6 sm:flex-row sm:items-start"
					>
						<div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-coral-100 text-coral-600 dark:bg-coral-950 dark:text-coral-400">
							<step.icon size={26} />
						</div>
						<div className="flex-1">
							<h3 className="font-serif text-xl text-neutral-900 dark:text-white">
								{step.title}
							</h3>
							<p className="mt-2 text-neutral-600 dark:text-neutral-400">
								{step.description}
							</p>
							<Link
								to={step.link}
								className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-coral-600 hover:text-coral-700 dark:text-coral-400"
							>
								Try it <ArrowRight size={14} />
							</Link>
						</div>
					</div>
				))}
			</div>

			{/* FAQ */}
			<div className="mt-16">
				<h2 className="font-serif text-2xl text-neutral-900 dark:text-white">
					Frequently Asked Questions
				</h2>
				<div className="mt-6 space-y-4">
					{faqs.map(faq => (
						<div key={faq.q} className="card p-5">
							<h4 className="flex items-start gap-2 font-medium text-neutral-900 dark:text-white">
								<CheckCircle
									size={18}
									className="mt-0.5 shrink-0 text-teal-500"
								/>
								{faq.q}
							</h4>
							<p className="mt-2 pl-6 text-sm text-neutral-600 dark:text-neutral-400">
								{faq.a}
							</p>
						</div>
					))}
				</div>
			</div>

			{/* CTA */}
			<div className="mt-16 rounded-2xl bg-gradient-to-r from-teal-500 to-teal-600 p-8 text-center text-white">
				<h3 className="font-serif text-2xl">Ready to get started?</h3>
				<p className="mt-2 text-teal-100">
					Add your first pet and explore all the features.
				</p>
				<Link
					to="/my-pets"
					className="btn-primary mt-6 bg-white text-teal-600 hover:bg-teal-50"
				>
					Add Your Pet <PawPrint size={18} />
				</Link>
			</div>
		</div>
	)
}
