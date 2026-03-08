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
      className="min-h-screen bg-bg-main flex flex-col relative z-10"
    >
      {/* Main Content */}
      <div className="grow grid grid-cols-1 lg:grid-cols-12 items-center mx-auto w-full px-6 py-24 gap-12 lg:gap-16">
        {/* LEFT COLUMN: Anchored to exactly 5 columns (40%) */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center w-full pt-16 lg:pt-0">
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
                className="text-[clamp(2.5rem,10vw,4.5rem)] md:text-6xl lg:text-7xl font-heading font-bold text-text-secondary tracking-widest uppercase leading-none text-balance"
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
                className="text-[clamp(3.5rem,15vw,8.5rem)] md:text-8xl lg:text-[8.5rem] font-heading font-extrabold text-accent leading-none mt-1 md:mt-2 tracking-tighter uppercase w-full text-center lg:text-left text-balance"
                style={{ fontFamily: "var(--font-heading)" }}
                disabled={isMobile}
              />
            </div>
          </div>

          <ScrollReveal
            containerClassName="mt-6 w-full max-w-md lg:mx-0"
            textClassName="text-lg md:text-xl font-sans text-[var(--text-secondary)] leading-relaxed text-center lg:text-left"
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
            cardGridClassName="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8 w-full auto-rows-[9rem] sm:auto-rows-[12rem] lg:auto-rows-[18rem]"
            disabled={isMobile}
            isMobile={isMobile}
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
