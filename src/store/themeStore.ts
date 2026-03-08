import { create } from "zustand";

/**
 * Zustand Theme Store
 *
 * Source of truth for the current theme name.
 * The actual CSS custom properties are animated directly by GSAP in portal.tsx.
 * This store is only used by components that need to swap assets (Logo, Hero)
 * based on which theme is currently active.
 *
 * Always starts as "dark" — the Portal scroll animation drives the transition.
 */

export type Theme = "dark" | "silk";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "dark",
  setTheme: (theme) => set({ theme }),
}));
