import { create } from "zustand";
import { persist } from "zustand/middleware";

// Simple favorites store for adoptable pets
// Just an array of pet IDs - nothing fancy

interface FavoritesState {
  ids: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  clear: () => void;
}

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      ids: [],

      add: (id) => {
        if (!get().ids.includes(id)) {
          set((s) => ({ ids: [...s.ids, id] }));
        }
      },

      remove: (id) => {
        set((s) => ({ ids: s.ids.filter((x) => x !== id) }));
      },

      toggle: (id) => {
        if (get().ids.includes(id)) {
          get().remove(id);
        } else {
          get().add(id);
        }
      },

      has: (id) => get().ids.includes(id),

      clear: () => set({ ids: [] }),
    }),
    {
      name: "petcare-favorites",
    }
  )
);
