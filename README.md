# 🐾 PetCare Hub

An all-in-one pet care companion app. Manage your pets, check symptoms, find
adoptable pets, and build personalized wellness boxes.

**Live Demo:** [Coming Soon]

![PetCare Hub Screenshot](./screenshot.png)

## ✨ Features

### 🐕 My Pets

- Add, edit, and delete pet profiles
- Store pet details: name, species, breed, age, weight, photo
- Select an "active pet" for personalized features
- Data persisted in localStorage

### 🩺 Symptom Checker

- Step-by-step wizard to assess pet symptoms
- 5 body areas: Skin, Stomach, Behavior, Mobility, Eyes/Ears
- Decision tree logic provides guidance and severity levels
- Recommendations on when to see a vet
- **Note:** This is for guidance only, not medical advice!

### ❤️ Pet Adoption Browser

- Browse 25+ adoptable pets (mock data)
- Filter by species, size, age, and compatibility
- Search by name or breed
- Save favorites to revisit later
- Detailed pet profiles with shelter info
- Includes pitbulls, cats, birds, and small animals!

### 📦 Wellness Box Builder

- 5-question quiz about your pet
- Smart algorithm matches products to pet profile
- Customize your box with swap functionality
- "Subscribe" flow (demo only)

### 🎨 Design

- Warm coral (#FF6B35) and teal (#2EC4B6) color scheme
- Responsive design for all screen sizes
- Dark mode support
- Smooth animations with Framer Motion

## 🛠 Tech Stack

- **React 19** - Latest React features
- **Vite** - Fast build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Zustand** - Simple state management
- **React Router v7** - Client-side routing
- **Framer Motion** - Animations
- **Lucide Icons** - Beautiful icons
- **localStorage** - Data persistence (no backend needed)

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/          # Navbar, Footer, Layout
│   └── ui/              # Reusable UI components
├── data/
│   ├── adoptablePets.ts # Mock adoption data
│   ├── symptoms.ts      # Symptom checker decision tree
│   └── wellnessProducts.ts # Wellness box products
├── lib/
│   └── format.ts        # Utility functions
├── pages/
│   ├── HomePage.tsx
│   ├── MyPetsPage.tsx
│   ├── SymptomCheckerPage.tsx
│   ├── AdoptPage.tsx
│   ├── AdoptDetailPage.tsx
│   ├── FavoritesPage.tsx
│   ├── WellnessBoxPage.tsx
│   └── ...
├── store/
│   ├── pets.ts          # Pet profiles state
│   ├── favorites.ts     # Adoption favorites
│   └── theme.ts         # Dark/light mode
├── types/
│   └── index.ts         # TypeScript types
├── App.tsx              # Routes
└── main.tsx             # Entry point
```

## 💡 Interview Talking Points

### "How does the symptom checker work?"

> "It's a decision tree stored in a data file. Based on the user's answers, I
> build a lookup key and find the matching result. It's just pattern matching
> with nested if/else logic — simple but effective."

### "How did you handle state management?"

> "I used Zustand for global state like pets and favorites because it's simpler
> than Redux. For form state, I just use local useState. Data persists in
> localStorage so it survives page refreshes."

### "How does the wellness box algorithm work?"

> "Products have targeting tags like 'forSize: large' or 'forHealth: joints'. I
> filter the products array based on quiz answers, score each product by how
> many criteria it matches, then return the top 5."

### "Why no backend?"

> "For a portfolio demo, localStorage is sufficient. The architecture is clean
> enough that swapping localStorage calls with API calls would be
> straightforward."

## 📝 Notes

- This is a portfolio project — no real adoptions or purchases are processed
- Pet data is stored locally in your browser
- Symptom checker is for educational purposes only, not medical advice
- Mock pet images use placeholder services

## 🙏 Credits

- Pet images: [PlaceDog](https://placedog.net),
  [Placekitten](https://placekitten.com), [Unsplash](https://unsplash.com)
- Icons: [Lucide](https://lucide.dev)
- Fonts: System fonts (Georgia, Inter/Segoe UI)

---

Built with ❤️ for pets everywhere
