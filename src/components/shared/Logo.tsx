import { useThemeStore } from "../../store/themeStore";
import { getThemedImageUrl } from "../../utils/cdn";
import { Button } from "../ui/button";

/**
 * Logo Component
 *
 * GSAP-Safe: No animations or global GSAP calls.
 * Theme is driven by Zustand (useThemeStore), updated by the Portal scroll animation.
 *
 * Two absolutely-positioned images cross-fade via CSS opacity so there is
 * zero cumulative layout shift during the theme transition.
 */
export default function Logo() {
  const theme = useThemeStore((s) => s.theme);

  const darkLogo = getThemedImageUrl(
    "logo-theme-dark",
    "logo-theme-dark",
    "dark",
    { format: "png", width: 600, height: 200 },
  );
  const silkLogo = getThemedImageUrl(
    "logo-theme-silk",
    "logo-theme-silk",
    "silk",
    { format: "png", width: 600, height: 200 },
  );

  const handleLogoClick = () => {
    const target = document.getElementById("home");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const sizeClass = "w-28 sm:w-32 md:w-36 lg:w-44";

  const imgClass = `${sizeClass} h-auto object-contain absolute top-0 left-0 transition-opacity duration-500`;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleLogoClick}
      className="fixed top-5 left-1 md:left-8 z-40 transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-transparent rounded-lg bg-transparent p-0 h-auto w-auto"
      aria-label="Go to home section"
    >
      {/* Wrapper sized to the image — both images stacked, cross-fading */}
      <div className={`relative ${sizeClass} h-auto`}>
        {/* Invisible reference image keeps the wrapper's intrinsic height */}
        <img
          src={darkLogo}
          alt=""
          aria-hidden="true"
          className={`${sizeClass} h-auto object-contain opacity-0 pointer-events-none`}
          width="600"
          height="200"
          decoding="sync"
        />
        {/* Dark logo — visible in dark theme */}
        <img
          src={darkLogo}
          alt="notansh. logo"
          className={`${imgClass} ${theme === "dark" ? "opacity-100" : "opacity-0"}`}
          loading="eager"
          fetchPriority="high"
          width="600"
          height="200"
          decoding="sync"
        />
        {/* Silk logo — visible in light theme */}
        <img
          src={silkLogo}
          alt="notansh. logo"
          className={`${imgClass} ${theme === "silk" ? "opacity-100" : "opacity-0"}`}
          loading="eager"
          width="600"
          height="200"
          decoding="sync"
        />
      </div>
    </Button>
  );
}
