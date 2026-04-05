import { useRef } from "react";
import VariableProximity from "../components/VariableProximity";
import ScrollReveal from "../components/ScrollReveal";
import MagicBento from "../components/MagicBento";
import { contactLinks } from "../content/contact";
import { useUIStore } from "@/store/uiStore";

const contactBentoCards = contactLinks.map((link) => ({
  label: link.label,
  value: link.value,
  icon: link.icon,
  href: link.href,
}));

const Contact = () => {
  const contactRef = useRef<HTMLElement>(null);
  const isMobile = useUIStore((s) => s.isMobile);

  return (
    <section
      ref={contactRef}
      id="contact"
      className="min-h-screen bg-bg-main flex items-center relative z-10"
    >
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 items-start lg:items-center mx-auto w-full px-6 py-12 md:py-14 gap-10 lg:gap-12">
        {/* LEFT COLUMN: Anchored to exactly 5 columns (40%) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center w-full pt-10 lg:pt-0">
          <div className="flex flex-col items-center text-center lg:text-left w-fit">
            {/* DESKTOP ONLY: Animated Variable Proximity */}
            <div className="flex flex-col items-center lg:items-start w-full">
              <VariableProximity
                label="GET IN"
                containerRef={contactRef}
                fromFontVariationSettings="'wght' 300"
                toFontVariationSettings="'wght' 800"
                radius={220}
                falloff="gaussian"
                className="text-[clamp(2.2rem,8vw,3.8rem)] md:text-6xl lg:text-7xl font-heading font-bold text-text-secondary tracking-widest uppercase leading-none text-balance"
                style={{ fontFamily: "var(--font-heading)" }}
                disabled={isMobile}
              />
              <VariableProximity
                label="TOUCH."
                containerRef={contactRef}
                fromFontVariationSettings="'wght' 900"
                toFontVariationSettings="'wght' 200"
                radius={220}
                falloff="gaussian"
                className="text-[clamp(3rem,12vw,7rem)] md:text-7xl lg:text-[7rem] font-heading font-extrabold text-accent leading-none mt-0 md:mt-1 tracking-tighter uppercase w-full text-center lg:text-left text-balance"
                style={{ fontFamily: "var(--font-heading)" }}
                disabled={isMobile}
              />
            </div>
          </div>

          <ScrollReveal
            containerClassName="mt-4 w-full max-w-sm lg:mx-0"
            textClassName="text-base md:text-lg font-sans text-[var(--text-secondary)] leading-relaxed text-center lg:text-left"
            baseOpacity={0.1}
            baseRotation={2}
            enableBlur={true}
            blurStrength={4}
          >
            Let's architect scalable systems and engineer the next generation of
            digital experiences.
          </ScrollReveal>
        </div>

        {/* RIGHT COLUMN: Takes the remaining 7 columns (60%) */}
        <div className="lg:col-span-7 w-full flex items-center justify-center">
          <MagicBento
            textAutoHide={true}
            enableStars
            enableSpotlight
            enableBorderGlow={true}
            enableTilt={false}
            enableMagnetism
            clickEffect
            spotlightRadius={400}
            particleCount={12}
            glowColor="196, 90, 160"
            disableAnimations={false}
            cards={contactBentoCards}
            cardGridClassName="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-6 w-full auto-rows-[8rem] sm:auto-rows-[10rem] lg:auto-rows-[15rem]"
            disabled={isMobile}
            isMobile={isMobile}
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
