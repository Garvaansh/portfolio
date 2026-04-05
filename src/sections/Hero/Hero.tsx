import { useRef } from "react";
import { heroContent } from "../../content/hero";
import { images } from "../../assets";
import StatusBadge from "../../components/shared/StatusBadge";
import { useThemeStore } from "../../store/themeStore";
import { getThemedImageUrl } from "../../utils/cdn";
import useHeroAnimation from "./useHeroAnimation";

const Hero = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const codenameRef = useRef<HTMLSpanElement | null>(null);
  const taglineRef = useRef<HTMLParagraphElement | null>(null);
  const realnameRef = useRef<HTMLSpanElement | null>(null);

  const theme = useThemeStore((s) => s.theme);

  const heroBgUrl = getThemedImageUrl(
    images.heroDark,
    images.heroLight,
    theme,
    { width: 1200, height: 800 },
  );

  useHeroAnimation(containerRef, codenameRef, taglineRef, realnameRef);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative overflow-hidden"
      style={{
        minHeight: "calc(var(--vh, 1vh) * 100)",
        backgroundColor: "var(--bg-main)",
      }}
    >
      {/* Background */}
      <img
        data-hero-bg
        src={heroBgUrl}
        alt=""
        loading="eager"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-30 blur-[40px] scale-110"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-12 py-20 min-h-[calc(var(--vh,1vh)*100)] flex flex-col justify-center">
        {/* Mobile status */}
        <div className="lg:hidden mb-6 scale-75 origin-top-left">
          <StatusBadge />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_auto] gap-8 lg:gap-10 xl:gap-12 items-start w-full">
          {/* Left column */}
          <div className="relative">
            <div
              className="absolute -top-12 -left-8 w-32 h-32 rounded-full blur-xl opacity-10"
              style={{ backgroundColor: "var(--accent)" }}
            />

            <div className="relative space-y-8">
              {/* Headline */}
              <h1
                data-hero-headline
                className="hero-headline flex flex-wrap items-baseline gap-x-3 font-heading text-[clamp(2.25rem,4.5vw,4rem)] text-soft"
              >
                {heroContent.intro}{" "}
                <span
                  ref={codenameRef}
                  data-hero-codename
                  className="inline-block font-pacifico text-[clamp(2.5rem,5.5vw,4.5rem)] text-accent"
                >
                  {heroContent.codename}
                </span>
              </h1>

              {/* AKA line */}
              <p
                data-hero-aka
                className="flex flex-wrap items-baseline gap-2 font-mono text-soft/80"
              >
                <span className="text-sm opacity-60">aka</span>

                <span
                  ref={realnameRef}
                  data-hero-realname
                  className="text-[clamp(1.125rem,2.75vw,1.5rem)] font-medium"
                >
                  {heroContent.realName}
                </span>
              </p>

              {/* Tagline */}
              <p
                ref={taglineRef}
                data-hero-tagline
                className="hero-tagline max-w-xl lg:max-w-2xl xl:max-w-3xl text-left leading-relaxed wrap-break-word"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(1.1rem, 4vw, 1.75rem)",
                  color: "var(--soft)",
                }}
              >
                {heroContent.tagline}
              </p>
            </div>
          </div>

          {/* Desktop status */}
          <div className="hidden lg:flex items-start">
            <StatusBadge />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
