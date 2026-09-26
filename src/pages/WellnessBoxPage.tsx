import { buildWellnessBox, getAlternatives } from '@/data/wellnessProducts'
import { cn } from '@/lib/format'
import { motionTransition } from '@/lib/motion'
import { imageFallback } from '@/lib/species'
import type { QuizAnswers, WellnessProduct } from '@/types'
import { AnimatePresence, motion } from 'framer-motion'
import {
	ArrowLeft,
	ArrowRight,
	Check,
	ChevronDown,
	Package,
	RefreshCw,
	ShoppingBag,
	Sparkles
} from 'lucide-react'
import { useState } from 'react'

// Quiz steps
type QuizStep = 'species' | 'size' | 'age' | 'activity' | 'health' | 'results'

// Quiz questions config
const questions = {
	species: {
		title: 'What type of pet do you have?',
		options: [
			{ value: 'dog', label: '🐕 Dog', emoji: '🐕' },
			{ value: 'cat', label: '🐱 Cat', emoji: '🐱' }
		]
	},
	size: {
		title: 'What size is your pet?',
		options: [
			{ value: 'small', label: 'Small', description: 'Under 10 kg / 22 lbs' },
			{ value: 'medium', label: 'Medium', description: '10-25 kg / 22-55 lbs' },
			{ value: 'large', label: 'Large', description: 'Over 25 kg / 55 lbs' }
		]
	},
	age: {
		title: 'How old is your pet?',
		options: [
			{ value: 'puppy', label: 'Young', description: 'Under 2 years' },
			{ value: 'adult', label: 'Adult', description: '2-7 years' },
			{ value: 'senior', label: 'Senior', description: '7+ years' }
		]
	},
	activity: {
		title: "What's their activity level?",
		options: [
			{
				value: 'lazy',
				label: 'Couch Potato 🛋️',
				description: 'Prefers naps to walks'
			},
			{
				value: 'moderate',
				label: 'Balanced ⚖️',
				description: 'Active but not hyper'
			},
			{
				value: 'hyper',
				label: 'Ball of Energy ⚡',
				description: 'Always on the move'
			}
		]
	},
	health: {
		title: 'Any specific health focus?',
		options: [
			{
				value: 'joints',
				label: '🦴 Joint & Mobility',
				description: 'Hip, knee, or arthritis support'
			},
			{
				value: 'digestion',
				label: '🫃 Digestion',
				description: 'Sensitive stomach, probiotics'
			},
			{
				value: 'skin',
				label: '✨ Skin & Coat',
				description: 'Itching, dryness, shedding'
			},
			{
				value: 'none',
				label: '🌟 General Wellness',
				description: 'No specific concerns'
			}
		]
	}
}

export function WellnessBoxPage() {
	const [step, setStep] = useState<QuizStep>('species')
	const [answers, setAnswers] = useState<Partial<QuizAnswers>>({})
	const [boxItems, setBoxItems] = useState<WellnessProduct[]>([])
	const [showSuccess, setShowSuccess] = useState(false)
	const [swapOpen, setSwapOpen] = useState<string | null>(null)

	const steps: QuizStep[] = [
		'species',
		'size',
		'age',
		'activity',
		'health',
		'results'
	]
	const currentStepIndex = steps.indexOf(step)
	const progress = (currentStepIndex / (steps.length - 1)) * 100

	const handleAnswer = (questionKey: string, value: string) => {
		const newAnswers = { ...answers, [questionKey]: value }
		setAnswers(newAnswers)

		const nextIndex = currentStepIndex + 1
		if (nextIndex < steps.length - 1) {
			setStep(steps[nextIndex])
		} else {
			const box = buildWellnessBox(
				newAnswers.species as 'dog' | 'cat',
				newAnswers.size as 'small' | 'medium' | 'large',
				newAnswers.age as 'puppy' | 'adult' | 'senior',
				newAnswers.activity as 'lazy' | 'moderate' | 'hyper',
				newAnswers.healthFocus as 'joints' | 'digestion' | 'skin' | 'none'
			)
			setBoxItems(box)
			setStep('results')
		}
	}

	const goBack = () => {
		if (currentStepIndex > 0) {
			setStep(steps[currentStepIndex - 1])
		}
	}

	const startOver = () => {
		setStep('species')
		setAnswers({})
		setBoxItems([])
		setShowSuccess(false)
		setSwapOpen(null)
	}

	const swapItem = (oldId: string, newProduct: WellnessProduct) => {
		setBoxItems(items =>
			items.map(item => (item.id === oldId ? newProduct : item))
		)
		setSwapOpen(null)
	}

	const totalPrice = boxItems.reduce((sum, item) => sum + item.price, 0)

	const handleSubscribe = () => {
		setShowSuccess(true)
	}

	return (
		<div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
			{/* Header */}
			<div className="mb-8 text-center">
				<div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-teal-100 text-teal-600 dark:bg-teal-950 dark:text-teal-400">
					<Package size={32} />
				</div>
				<h1 className="mt-4 font-serif text-4xl text-neutral-900 dark:text-white">
					Wellness Box Builder
				</h1>
				<p className="mt-2 text-neutral-600 dark:text-neutral-400">
					{step === 'results'
						? 'Your personalized box is ready!'
						: 'Answer a few questions to build a custom wellness box for your pet.'}
				</p>
			</div>

			{/* Progress bar */}
			{step !== 'results' && (
				<div className="mb-8">
					<div className="flex justify-between text-xs text-neutral-500">
						<span>Question {currentStepIndex + 1} of 5</span>
						<span>{Math.round(progress)}%</span>
					</div>
					<div className="mt-2 h-2 rounded-full bg-neutral-200 dark:bg-neutral-800">
						<motion.div
							className="h-full rounded-full bg-teal-500"
							initial={{ width: 0 }}
							animate={{ width: `${progress}%` }}
							transition={motionTransition}
						/>
					</div>
				</div>
			)}

			{/* Back button */}
			{step !== 'species' && step !== 'results' && (
				<button onClick={goBack} className="btn-ghost mb-4 -ml-2">
					<ArrowLeft size={16} /> Back
				</button>
			)}

			<AnimatePresence mode="wait">
				{/* Quiz Questions */}
				{step !== 'results' && (
					<motion.div
						key={step}
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						transition={motionTransition}
					>
						<h2 className="font-serif text-2xl text-neutral-900 dark:text-white">
							{questions[step].title}
						</h2>

						<div className="mt-6 grid gap-3">
							{questions[step].options.map(option => (
								<button
									key={option.value}
									onClick={() =>
										handleAnswer(
											step === 'health' ? 'healthFocus' : step,
											option.value
										)
									}
									className="flex items-center gap-4 rounded-2xl border-2 border-neutral-200 p-4 text-left transition-all duration-200 hover:border-teal-500 hover:bg-teal-50 dark:border-neutral-700 dark:hover:border-teal-400 dark:hover:bg-teal-950"
								>
									<div className="flex-1">
										<p className="font-medium text-neutral-900 dark:text-white">
											{option.label}
										</p>
										{'description' in option && (
											<p className="text-sm text-neutral-500">
												{option.description}
											</p>
										)}
									</div>
									<ArrowRight size={20} className="text-neutral-400" />
								</button>
							))}
						</div>
					</motion.div>
				)}

				{/* Results */}
				{step === 'results' && !showSuccess && (
					<motion.div
						key="results"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
					>
						{/* Summary badge */}
						<div className="mb-6 flex flex-wrap items-center justify-center gap-2">
							<span className="chip">
								{answers.species === 'dog' ? '🐕 Dog' : '🐱 Cat'}
							</span>
							<span className="chip capitalize">{answers.size}</span>
							<span className="chip capitalize">{answers.age}</span>
							<span className="chip capitalize">{answers.activity}</span>
							{answers.healthFocus !== 'none' && (
								<span className="chip-teal capitalize">
									{answers.healthFocus}
								</span>
							)}
						</div>

						{/* Box items */}
						<div className="card p-6">
							<h3 className="flex items-center gap-2 font-serif text-xl text-neutral-900 dark:text-white">
								<Sparkles size={20} className="text-teal-500" />
								Your Custom Box
							</h3>

							<div className="mt-4 divide-y divide-neutral-200 dark:divide-neutral-700">
								{boxItems.map(item => (
									<div key={item.id} className="flex items-center gap-4 py-4">
										<img
											src={item.image}
											alt={item.name}
											className="h-16 w-16 rounded-xl object-cover"
											onError={e => {
												e.currentTarget.onerror = null
												e.currentTarget.src = imageFallback()
											}}
										/>
										<div className="min-w-0 flex-1">
											<p className="font-medium text-neutral-900 dark:text-white">
												{item.name}
											</p>
											<p className="text-sm text-neutral-500">
												{item.description}
											</p>
										</div>
										<div className="text-right">
											<p className="font-semibold text-neutral-900 dark:text-white">
												${item.price.toFixed(2)}
											</p>
											<div className="relative">
												<button
													onClick={() =>
														setSwapOpen(swapOpen === item.id ? null : item.id)
													}
													className="flex items-center gap-1 text-xs text-teal-600 hover:text-teal-700 dark:text-teal-400"
												>
													<RefreshCw size={12} /> Swap
													<ChevronDown
														size={12}
														className={cn(swapOpen === item.id && 'rotate-180')}
													/>
												</button>

												{/* Swap dropdown */}
												<AnimatePresence>
													{swapOpen === item.id && (
														<>
															{/* Click-away backdrop to dismiss the dropdown */}
															<button
																type="button"
																aria-label="Close swap menu"
																onClick={() => setSwapOpen(null)}
																className="fixed inset-0 z-10 cursor-default"
															/>
															<motion.div
																initial={{ opacity: 0, y: -10 }}
																animate={{ opacity: 1, y: 0 }}
																exit={{ opacity: 0, y: -10 }}
																className="absolute right-0 top-6 z-20 w-64 rounded-xl border border-neutral-200 bg-white p-2 shadow-lg dark:border-neutral-700 dark:bg-neutral-900"
															>
																<p className="mb-2 px-2 text-xs font-medium text-neutral-500">
																	Swap with:
																</p>
																{getAlternatives(
																	item.id,
																	answers.species as 'dog' | 'cat'
																).map(alt => (
																	<button
																		key={alt.id}
																		onClick={() => swapItem(item.id, alt)}
																		className="flex w-full items-center gap-2 rounded-xl p-2 text-left text-sm transition-colors duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
																	>
																		<img
																			src={alt.image}
																			alt=""
																			className="h-8 w-8 rounded object-cover"
																		/>
																		<span className="flex-1 truncate text-neutral-900 dark:text-white">
																			{alt.name}
																		</span>
																		<span className="text-xs text-neutral-500">
																			${alt.price.toFixed(2)}
																		</span>
																	</button>
																))}
															</motion.div>
														</>
													)}
												</AnimatePresence>
											</div>
										</div>
									</div>
								))}
							</div>

							{/* Total */}
							<div className="mt-4 flex items-center justify-between border-t border-neutral-200 pt-4 dark:border-neutral-700">
								<div>
									<p className="text-sm text-neutral-500">
										Monthly subscription
									</p>
									<p className="font-serif text-2xl text-neutral-900 dark:text-white">
										${totalPrice.toFixed(2)}/mo
									</p>
								</div>
								<button onClick={handleSubscribe} className="btn-primary">
									<ShoppingBag size={18} /> Subscribe Now
								</button>
							</div>

							<p className="mt-4 text-center text-xs text-neutral-400">
								Cancel anytime. Free shipping on all boxes.
							</p>
						</div>

						{/* Start over */}
						<button onClick={startOver} className="btn-ghost mx-auto mt-6 flex">
							<RefreshCw size={16} /> Build a different box
						</button>
					</motion.div>
				)}

				{/* Success state */}
				{showSuccess && (
					<motion.div
						key="success"
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						className="text-center"
					>
						<div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400">
							<Check size={40} />
						</div>
						<h2 className="mt-6 font-serif text-3xl text-neutral-900 dark:text-white">
							You're all set! 🎉
						</h2>
						<p className="mt-2 text-neutral-600 dark:text-neutral-400">
							Your first wellness box will ship soon.
						</p>
						<div className="card mt-6 p-6 text-left">
							<h3 className="font-medium text-neutral-900 dark:text-white">
								What's next:
							</h3>
							<ul className="mt-3 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
								<li className="flex items-start gap-2">
									<Check size={16} className="mt-0.5 shrink-0 text-green-500" />
									Check your email for order confirmation
								</li>
								<li className="flex items-start gap-2">
									<Check size={16} className="mt-0.5 shrink-0 text-green-500" />
									Your box ships within 2-3 business days
								</li>
								<li className="flex items-start gap-2">
									<Check size={16} className="mt-0.5 shrink-0 text-green-500" />
									Manage or pause your subscription anytime
								</li>
							</ul>
						</div>
						<p className="mt-6 text-xs text-neutral-400">
							(This is a demo — no real orders are processed)
						</p>
						<button onClick={startOver} className="btn-secondary mt-4">
							Build Another Box
						</button>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
