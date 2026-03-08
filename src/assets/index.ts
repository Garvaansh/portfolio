// CDN image URLs registry - components must never use raw URL strings
export const images = {
  heroDark: "home-bg-dark",
  heroLight: "home-bg-light",
  project1: "campusmitra",
} as const;

export type Images = typeof images;

export default images;
