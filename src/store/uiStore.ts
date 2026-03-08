import { create } from 'zustand';

interface UIState {
  isMobile: boolean; // Phones (under 768px)
  setDevice: (width: number) => void;
}

export const useUIStore = create<UIState>((set) => ({
  // Default for SSR/initial render
  isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false,
  
  setDevice: (width) => set({
    isMobile: width < 768,
  }),
}));