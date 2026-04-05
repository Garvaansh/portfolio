import { create } from 'zustand';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface UIState {
  width: number;
  device: DeviceType;

  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;

  setDevice: (width: number) => void;
}

const getDevice = (width: number): DeviceType => {
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

export const useUIStore = create<UIState>()((set) => {
  const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
  const device = getDevice(width);

  return {
    width,
    device,

    isMobile: device === 'mobile',
    isTablet: device === 'tablet',
    isDesktop: device === 'desktop',

    setDevice: (width: number) => {
      const device = getDevice(width);

      set({
        width,
        device,
        isMobile: device === 'mobile',
        isTablet: device === 'tablet',
        isDesktop: device === 'desktop',
      });
    },
  };
});