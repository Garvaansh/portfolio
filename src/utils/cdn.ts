const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

interface ImageOptions {
  format?: "png" | "auto";
  width?: number;
  height?: number;
  dpr?: number | "auto";
}

/**
 * - Logos: f_png (lossless by default, no quality needed)
 * - Photos: f_auto,q_auto (auto-format WebP/AVIF + smart compression)
 *
 * @param publicId - Image identifier in Cloudinary
 * @param options - Transformation options
 * @returns Optimized CDN URL
 */

export const getImageUrl = (
  publicId: string,
  { format, width, height, dpr = "auto" }: ImageOptions = {}
): string => {
  if (!publicId) {
    console.warn("[CDN] Missing publicId");
    return "";
  }

  // Fallback if Cloudinary not configured
  if (!CLOUD_NAME || CLOUD_NAME === "undefined") {
    console.warn(
      "VITE_CLOUDINARY_CLOUD_NAME not configured. Using placeholder image."
    );
    return `https://placehold.co/800x600/2a2a2a/8a8a8a?text=${encodeURIComponent(
      publicId.split("/").pop() || "Project"
    )}`;
  }

  const transformations: string[] = [];

  if (format === "png") {
    // Lossless PNG
    transformations.push("f_png");

    // Size transformations
    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);
  } else {
    // Auto-format + auto-quality for photos 
    transformations.push("f_auto");
    transformations.push("q_auto");
    transformations.push(`dpr_${dpr}`);

    // Size transformations
    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);
  }

  return `${BASE_URL}/${transformations.join(",")}/${publicId}`;
};

/**
 * Get theme-specific image URL
 * @param darkPublicId - Image ID for dark theme
 * @param lightPublicId - Image ID for light/silk theme
 * @param theme - Current theme ('dark' or 'silk')
 * @param options - Transformation options
 * @returns Theme-appropriate CDN URL
 */
export const getThemedImageUrl = (
  darkPublicId: string,
  lightPublicId: string,
  theme: "dark" | "silk",
  options: ImageOptions = {}
): string => {
  const publicId = theme === "dark" ? darkPublicId : lightPublicId;
  return getImageUrl(publicId, options);
};
