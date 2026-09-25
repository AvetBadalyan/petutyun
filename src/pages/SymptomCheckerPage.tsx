import { getSymptomResult, symptomAreas } from '@/data/symptoms'
import { cn } from '@/lib/format'
import { speciesEmoji } from '@/lib/species'
import { usePets } from '@/store/pets'
import type { SymptomResult } from '@/types'
import { AnimatePresence, motion } from 'framer-motion'
import {
	AlertCircle,
	AlertTriangle,
	ArrowLeft,
	ArrowRight,
	CheckCircle,
	PawPrint,
	RotateCcw,
	Stethoscope
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

// Wizard steps
type Step = 'select-pet' | 'select-area' | 'questions' | 'result'

export function SymptomCheckerPage() {
	const { pets, activePetId, getPetById } = usePets()

	const [step, setStep] = useState<Step>('select-pet')
	const [selectedPetId, setSelectedPetId] = useState<string | null>(activePetId)
	const [selectedArea, setSelectedArea] = useState<string | null>(null)
	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [answers, setAnswers] = useState<Record<string, string>>({})
	const [result, setResult] = useState<SymptomResult | null>(null)

	const selectedPet = selectedPetId ? getPetById(selectedPetId) : undefined
	const areaData = selectedArea
		? symptomAreas.find(a => a.id === selectedArea)
		: undefined

	const handleSelectPet = (petId: string) => {
		setSelectedPetId(petId)
		setStep('select-area')
	}

	const handleSelectArea = (areaId: string) => {
		setSelectedArea(areaId)
		setCurrentQuestion(0)
		setAnswers({})
		setStep('questions')
	}

	const handleAnswer = (questionId: string, value: string) => {
		const newAnswers = { ...answers, [questionId]: value }
		setAnswers(newAnswers)

		if (areaData && currentQuestion < areaData.questions.length - 1) {
			setCurrentQuestion(currentQuestion + 1)
		} else {
			const symptomResult = getSymptomResult(selectedArea!, newAnswers)
			setResult(symptomResult)
			setStep('result')
		}
	}

	const goBack = () => {
		if (step === 'questions' && currentQuestion > 0) {
			setCurrentQuestion(currentQuestion - 1)
		} else if (step === 'questions') {
			setStep('select-area')
		} else if (step === 'select-area') {
			setStep('select-pet')
		} else if (step === 'result') {
			setStep('questions')
			setCurrentQuestion(areaData!.questions.length - 1)
		}
	}

	const startOver = () => {
		setStep('select-pet')
		setSelectedPetId(activePetId)
		setSelectedArea(null)
		setCurrentQuestion(0)
		setAnswers({})
		setResult(null)
	}

	const severityConfig = {
		low: {
			bg: 'bg-green-100 dark:bg-green-950',
			text: 'text-green-700 dark:text-green-300',
			icon: CheckCircle,
			label: 'Low Concern'
		},
		medium: {
			bg: 'bg-yellow-100 dark:bg-yellow-950',
			text: 'text-yellow-700 dark:text-yellow-300',
			icon: AlertCircle,
			label: 'Moderate Concern'
		},
		high: {
			bg: 'bg-red-100 dark:bg-red-950',
			text: 'text-red-700 dark:text-red-300',
			icon: AlertTriangle,
			label: 'High Concern'
		}
	}

	return (
		<div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
			{/* Header */}
			<div className="mb-8 text-center">
				<div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-teal-100 text-teal-600 dark:bg-teal-950 dark:text-teal-400">
					<Stethoscope size={32} />
				</div>
				<h1 className="mt-4 font-serif text-4xl text-neutral-900 dark:text-white">
					Symptom Checker
				</h1>
				<p className="mt-2 text-neutral-600 dark:text-neutral-400">
					Answer a few questions to get guidance on your pet's symptoms.
				</p>
			</div>

			{/* Progress indicator */}
			{step !== 'select-pet' && (
				<div className="mb-8">
					<div className="flex justify-between text-xs text-neutral-500">
						<span
							className={
								step === 'select-area' ? 'text-teal-600 font-medium' : ''
							}
						>
							1. Area
						</span>
						<span
							className={
								step === 'questions' ? 'text-teal-600 font-medium' : ''
							}
						>
							2. Questions
						</span>
						<span
							className={step === 'result' ? 'text-teal-600 font-medium' : ''}
						>
							3. Result
						</span>
					</div>
					<div className="mt-2 h-2 rounded-full bg-neutral-200 dark:bg-neutral-800">
						<div
							className="h-full rounded-full bg-teal-500 transition-all duration-200"
							style={{
								width:
									step === 'select-area'
										? '33%'
										: step === 'questions'
											? `${33 + (33 * (currentQuestion + 1)) / (areaData?.questions.length || 1)}%`
											: '100%'
							}}
						/>
					</div>
				</div>
			)}

			{/* Back button */}
			{step !== 'select-pet' && step !== 'result' && (
				<button onClick={goBack} className="btn-ghost mb-4 -ml-2">
					<ArrowLeft size={16} /> Back
				</button>
			)}

			<AnimatePresence mode="wait">
				{/* STEP 1: Select Pet */}
				{step === 'select-pet' && (
					<motion.div
						key="select-pet"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
					>
						<h2 className="font-serif text-2xl text-neutral-900 dark:text-white">
							Which pet isn't feeling well?
						</h2>

						{pets.length === 0 ? (
							<div className="mt-6 rounded-2xl border-2 border-dashed border-neutral-200 py-12 text-center dark:border-neutral-700">
								<PawPrint size={40} className="mx-auto text-neutral-400" />
								<p className="mt-4 text-neutral-600 dark:text-neutral-400">
									You haven't added any pets yet.
								</p>
								<Link to="/my-pets" className="btn-primary mt-4">
									Add Your Pet First
								</Link>
							</div>
						) : (
							<div className="mt-6 grid gap-3">
								{pets.map(pet => (
									<button
										key={pet.id}
										onClick={() => handleSelectPet(pet.id)}
										className={cn(
											'flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all duration-200',
											selectedPetId === pet.id
												? 'border-teal-500 bg-teal-50 dark:border-teal-400 dark:bg-teal-950'
												: 'border-neutral-200 hover:border-neutral-300 dark:border-neutral-700 dark:hover:border-neutral-600'
										)}
									>
										<div className="grid h-12 w-12 place-items-center rounded-xl bg-neutral-100 text-2xl dark:bg-neutral-800">
											{pet.photo ? (
												<img
													src={pet.photo}
													alt={pet.name}
													className="h-full w-full rounded-xl object-cover"
												/>
											) : (
												speciesEmoji[pet.species]
											)}
										</div>
										<div>
											<p className="font-medium text-neutral-900 dark:text-white">
												{pet.name}
											</p>
											<p className="text-sm text-neutral-500">
												{pet.breed || pet.species}
												{pet.age > 0 && ` · ${pet.age} years`}
											</p>
										</div>
										<ArrowRight
											size={20}
											className="ml-auto text-neutral-400"
										/>
									</button>
								))}
							</div>
						)}
					</motion.div>
				)}

				{/* STEP 2: Select Symptom Area */}
				{step === 'select-area' && (
					<motion.div
						key="select-area"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
					>
						{selectedPet && (
							<div className="mb-6 flex items-center gap-3 rounded-xl bg-neutral-100 p-3 dark:bg-neutral-800">
								<span className="text-2xl">
									{speciesEmoji[selectedPet.species]}
								</span>
								<span className="font-medium text-neutral-900 dark:text-white">
									Checking symptoms for {selectedPet.name}
								</span>
							</div>
						)}

						<h2 className="font-serif text-2xl text-neutral-900 dark:text-white">
							What area is affected?
						</h2>

						<div className="mt-6 grid gap-3">
							{symptomAreas.map(area => (
								<button
									key={area.id}
									onClick={() => handleSelectArea(area.id)}
									className="flex items-center gap-4 rounded-2xl border-2 border-neutral-200 p-4 text-left transition-all duration-200 hover:border-teal-500 hover:bg-teal-50 dark:border-neutral-700 dark:hover:border-teal-400 dark:hover:bg-teal-950"
								>
									<span className="text-3xl">{area.emoji}</span>
									<div>
										<p className="font-medium text-neutral-900 dark:text-white">
											{area.label}
										</p>
										<p className="text-sm text-neutral-500">
											{area.description}
										</p>
									</div>
									<ArrowRight size={20} className="ml-auto text-neutral-400" />
								</button>
							))}
						</div>
					</motion.div>
				)}

				{/* STEP 3: Questions */}
				{step === 'questions' && areaData && (
					<motion.div
						key={`question-${currentQuestion}`}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
					>
						<div className="mb-4 flex items-center gap-2 text-sm text-neutral-500">
							<span className="text-2xl">{areaData.emoji}</span>
							<span>{areaData.label}</span>
							<span>·</span>
							<span>
								Question {currentQuestion + 1} of {areaData.questions.length}
							</span>
						</div>

						<h2 className="font-serif text-2xl text-neutral-900 dark:text-white">
							{areaData.questions[currentQuestion].text}
						</h2>

						<div className="mt-6 grid gap-3">
							{areaData.questions[currentQuestion].options.map(option => (
								<button
									key={option.value}
									onClick={() =>
										handleAnswer(
											areaData.questions[currentQuestion].id,
											option.value
										)
									}
									className="rounded-2xl border-2 border-neutral-200 p-4 text-left transition-all duration-200 hover:border-teal-500 hover:bg-teal-50 dark:border-neutral-700 dark:hover:border-teal-400 dark:hover:bg-teal-950"
								>
									<span className="text-neutral-900 dark:text-white">
										{option.label}
									</span>
								</button>
							))}
						</div>
					</motion.div>
				)}

				{/* STEP 4: Result */}
				{step === 'result' && result && (
					<motion.div
						key="result"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
					>
						{/* Severity Badge */}
						<div
							className={cn(
								'mx-auto flex w-fit items-center gap-2 rounded-full px-4 py-2',
								severityConfig[result.severity].bg,
								severityConfig[result.severity].text
							)}
						>
							{(() => {
								const Icon = severityConfig[result.severity].icon
								return <Icon size={18} />
							})()}
							<span className="font-medium">
								{severityConfig[result.severity].label}
							</span>
						</div>

						<h2 className="mt-6 text-center font-serif text-2xl text-neutral-900 dark:text-white">
							{result.cause}
						</h2>

						{/* Advice Card */}
						<div className="card mt-6 p-6">
							<h3 className="font-medium text-neutral-900 dark:text-white">
								What you can do:
							</h3>
							<p className="mt-2 leading-relaxed text-neutral-600 dark:text-neutral-400">
								{result.advice}
							</p>

							{result.seeVet && (
								<div className="mt-4 rounded-xl bg-coral-50 p-4 dark:bg-coral-950">
									<p className="flex items-start gap-2 text-sm text-coral-700 dark:text-coral-300">
										<AlertTriangle size={18} className="mt-0.5 shrink-0" />
										<span>
											<strong>We recommend seeing a veterinarian</strong> for a
											proper diagnosis and treatment plan.
										</span>
									</p>
								</div>
							)}
						</div>

						{/* Disclaimer */}
						<div className="mt-6 rounded-xl bg-neutral-100 p-4 text-center dark:bg-neutral-800">
							<p className="text-xs text-neutral-500">
								⚠️ This is a general guide only and does not replace
								professional veterinary advice. Always consult a vet for medical
								concerns.
							</p>
						</div>

						{/* Actions */}
						<div className="mt-8 flex flex-col gap-3 sm:flex-row">
							<button onClick={startOver} className="btn-secondary flex-1">
								<RotateCcw size={16} /> Check Another Symptom
							</button>
							<Link to="/my-pets" className="btn-primary flex-1 text-center">
								Back to My Pets
							</Link>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
