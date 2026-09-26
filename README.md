# 🐾 Petutyun

> "Pet" + "-utyun" (the Armenian suffix in _hanrapetutyun_ / Հանրապետություն = "republic") = **Pet Republic**

Armenia's all-in-one pet care companion app. Manage your pets, check symptoms, find
adoptable pets, and build personalized wellness boxes.

**Live Demo:** [petutyun.vercel.app](https://petutyun.vercel.app/)

## ✨ Features

### 🐕 My Pets

- Add, edit, and delete pet profiles
- Store pet details: name, species, breed, age, weight, photo
- Select an "active pet" for personalized features
- **Medication tracking** — track which medications each pet is taking
- Ships with demo pets (including Dina, the developer's real dog 🦖)
- Data persisted in `localStorage`

### 💊 Dosage Calculator & Interaction Checker

- **Weight-based dosage calculation** for 12 common pet medications
- Real-time: enter the pet's weight, select a medication, get a recommended dose
- Handles dose rounding, min/max limits, and per-kg calculations
- **Medication interaction warnings** — detects dangerous drug combinations
- 13 veterinary drug interactions (NSAIDs, steroids, sedatives, antibiotics, …)
- Three severity levels: Avoid, Caution, Monitor — with plain-language reasoning
- Also flags duplicate active ingredients across a pet's medications

**Technical details:**

- Dosage formula: `dose = weight_kg × perKg_rate`, with min-weight and max-dose clamping
- O(n²) pairwise interaction checking (fine — a pet is on only a few meds)
- All output includes disclaimers — this is demo data, not medical advice

### 🩺 Symptom Checker

- Step-by-step wizard to assess pet symptoms
- 5 body areas: Skin, Stomach, Behavior, Mobility, Eyes/Ears
- Decision-tree logic maps answers to guidance and a severity level
- Recommends when to see a vet
- **Note:** for guidance only, not medical advice

### ❤️ Pet Adoption Browser

- Browse 24 adoptable pets from shelters across Armenia (mock data)
- Filter by species, size, age, and compatibility; search by name or breed
- "Show more" pagination so mobile isn't an endless scroll
- Save favorites to revisit later
- Detailed pet profiles with (mock) shelter contact info
- Demo actions: adoption inquiry, schedule a visit, share link

### 📦 Wellness Box Builder

- 5-question quiz about your pet
- Scoring algorithm matches products to the pet's profile
- Swap items in the recommended box
- "Subscribe" flow (demo only)

### 🎨 Design

- Warm coral (`#ff6b35`) + teal (`#2ec4b6`) brand palette over a cool neutral scale
- Fully responsive (mobile → desktop)
- Light & dark mode
- Consistent 200ms motion, custom focus rings, `prefers-reduced-motion` support
- Smooth animations with Framer Motion

## 🛠 Tech Stack

- **React 19** + **TypeScript** (strict)
- **Vite** — build tool / dev server
- **Tailwind CSS** — utility-first styling with a small design-token layer
- **Zustand** — state management (persisted to `localStorage`)
- **React Router v7** — client-side routing
- **Framer Motion** — animations
- **Lucide** — icons
- **ESLint + Prettier** — linting & formatting
- No backend — all data lives in the browser

## 🚀 Getting Started

```bash
npm install       # install dependencies
npm run dev       # start the dev server
npm run build     # type-check + production build
npm run preview   # preview the production build
npm run lint      # lint
npm run format    # format with Prettier
```

## 📁 Project Structure

```
src/
├── assets/
│   └── dina-images/     # Dina (the mascot) photos
├── components/
│   └── layout/          # Navbar, Footer, Layout
├── data/
│   ├── adoptablePets.ts # Mock adoption data (Armenian cities/shelters)
│   ├── symptoms.ts      # Symptom-checker decision tree
│   ├── wellnessProducts.ts # Wellness-box products
│   ├── medications.ts   # 12 pet medications with dosage rules
│   └── interactions.ts  # Drug-interaction database
├── lib/
│   ├── dosage.ts        # Weight-based dosage calculator
│   ├── motion.ts        # Shared motion tokens
│   ├── species.ts       # Species emoji + image fallback
│   └── format.ts        # Small utilities (cn, formatters)
├── pages/
│   ├── HomePage.tsx
│   ├── MyPetsPage.tsx
│   ├── PetDetailPage.tsx    # Dosage calculator & medications
│   ├── SymptomCheckerPage.tsx
│   ├── AdoptPage.tsx
│   ├── AdoptDetailPage.tsx
│   ├── FavoritesPage.tsx
│   ├── WellnessBoxPage.tsx
│   ├── HowItWorksPage.tsx
│   └── NotFoundPage.tsx
├── store/
│   ├── pets.ts          # Pet profiles + medication tracking
│   ├── favorites.ts     # Adoption favorites
│   └── theme.ts         # Dark/light mode
├── types/
│   └── index.ts         # Shared TypeScript types
├── App.tsx              # Routes
└── main.tsx             # Entry point
```

## 💡 Interview Talking Points

### "How does the dosage calculator work?"

> "Each medication has a dosage rule with a per-kg rate. I multiply the pet's
> weight by that rate, apply min-weight and max-dose limits, and round per unit
> (half-tablets for tablets, one decimal for mL). If a pet is under the minimum
> approved weight, it returns a clear 'not recommended' result instead of a dose."

### "How do you detect medication interactions?"

> "Interactions are stored as pairs of active ingredients with a severity level.
> When a pet is on multiple meds, I check every pair — O(n²), but n is tiny.
> Matches are sorted by severity and shown with color-coded warnings, and I also
> flag two meds that share the same active ingredient as a duplicate-dose risk."

### "How does the symptom checker work?"

> "It's a decision tree in a data file. The wizard answers build a lookup key
> (area + main symptom + acuity), and I read the matching result. Straightforward
> pattern matching, with a sensible fallback that recommends seeing a vet."

### "How did you handle state management?"

> "Zustand for global state (pets, favorites, theme) because it's lighter than
> Redux; local `useState` for form state. Each store persists to `localStorage`
> so data survives refreshes."

### "How does the wellness box algorithm work?"

> "Products have targeting tags like `forSize` or `forHealth`. I filter by species,
> score each product by how many quiz answers it matches (weighting health focus
> highest), drop zero-score items, and return the top matches."

### "Why no backend?"

> "It's a frontend showcase, so `localStorage` is sufficient and keeps it
> zero-cost to host. The Zustand stores are structured so the persistence layer
> could be swapped for API calls without touching the components."

## 📝 Notes

- Portfolio project — no real adoptions or purchases are processed
- Pet data is stored locally in your browser (`localStorage`)
- **Dosage calculator, interaction checker, and symptom checker are for DEMO PURPOSES ONLY** — always consult a veterinarian
- Adoptable-pet and product photos are stock images (Unsplash); Dina's photos are the developer's own

## 🙏 Credits

- Stock photos: [Unsplash](https://unsplash.com)
- Icons: [Lucide](https://lucide.dev)
- Fonts: Georgia (display) + Inter / system sans (body)

---

Built with ❤️ in Yerevan, Armenia 🇦🇲 — and inspired by Dina the Dina-saur 🦖
