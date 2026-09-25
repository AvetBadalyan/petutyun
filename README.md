# 🐨 Koala · Pet Pharmacy

A full-featured, trustworthy pet medication e-commerce app. Vet-grade catalog,
personalized weight-based dosing, subscription refills, and medication
interaction warnings — built as a portfolio piece.

> Illustrative demo. All medical/dosage content is mock data and **not**
> veterinary advice.

## Tech stack

- **React 19** + **Vite 6** + **TypeScript** (strict)
- **Tailwind CSS** design system (Koala green/teal, dark & light mode)
- **Zustand** for state (cart, pets, auth, wishlist, orders, theme) with
  `localStorage` persistence
- **React Router 7** for navigation (with route-level code splitting)
- **Framer Motion** for animations
- **lucide-react** icons

## Features

**Storefront**

- Product catalog across 5 pet types (Dogs, Cats, Birds, Fish, Small Animals)
  and 5 categories (Flea & Tick, Vitamins, Pain Relief, Dental, Supplements)
- Search with autocomplete + keyboard navigation
- Filters: pet type, category, brand, price range, plus sorting
- Product detail: image gallery, dosage & instructions,
  warnings/contraindications, frequently bought together, customer reviews
- Skeleton loaders and smooth page transitions

**Cart & checkout**

- Slide-in cart drawer with quantity controls
- Subscribe & save (monthly auto-refill) per item
- Live medication interaction warnings in the cart
- Multi-step checkout (shipping → payment → review) with order confirmation

**Pet profiles (the unique selling point)**

- Add pets with species, breed, weight and age
- **Weight-based dosage calculator** per product
- Personalized recommendations by species, age and weight
- Medication schedule with reminders and one-tap refills
- **Interaction warnings** across a pet's active medications

**Account & auth**

- Mock sign up / login with protected routes
- Order history, active subscriptions, saved pets, wishlist
- Dark / light theme toggle

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check + production build
npm run preview  # preview the production build
```

## Project structure

```
src/
  assets/          brand images (Koala logo, mascots, social icons)
  components/
    auth/          route guard
    cart/          cart drawer
    layout/        navbar, footer, search, layout shell
    pets/          pet form
    product/       product card, grid, reviews
    ui/            rating, badge, skeleton, loaders
  data/            products, taxonomy, interactions (mock data)
  lib/             dosage calculator, recommendations, search, formatting
  pages/           route pages
  store/           Zustand stores (persisted)
  types/           shared TypeScript types
```

## Notes

Originally a static single-page landing built with Create React App for an
Upwork task. Migrated to Vite + React 19 + TypeScript and expanded into a
complete pharmacy experience while keeping the original Koala branding and green
wellness aesthetic.
