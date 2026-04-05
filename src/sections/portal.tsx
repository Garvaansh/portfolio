import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "@/components/ScrollReveal";
import { useThemeStore } from "../store/themeStore";
import { useUIStore } from "@/store/uiStore";

gsap.registerPlugin(ScrollTrigger);

const Portal = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tRef = useRef<HTMLSpanElement>(null);

  // The Curtains
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);

  const lastThemeState = useRef<boolean | null>(null);
  const { isMobile, isTablet } = useUIStore();

  const SCALE_DURATION = 0.6;

  const CURTAIN_START = SCALE_DURATION * (isTablet ? 0.85 : 0.9);
  const FADE_START = CURTAIN_START + 0.05;

  useGSAP(
    () => {
      const section = sectionRef.current;
      const wrapper = wrapperRef.current;
      const tLetter = tRef.current;
      const leftCurtain = leftCurtainRef.current;
      const rightCurtain = rightCurtainRef.current;

      if (!section || !wrapper || !tLetter || !leftCurtain || !rightCurtain)
        return;

      const { setTheme } = useThemeStore.getState();

      function recalcOrigin() {
        if (!wrapper || !tLetter) return;
        const wrapperRect = wrapper.getBoundingClientRect();
        const tRect = tLetter.getBoundingClientRect();

        const originX =
          ((tRect.left + tRect.width / 2 - wrapperRect.left) /
            wrapperRect.width) *
          100;
        const originY =
          ((tRect.top + tRect.height / 2 - wrapperRect.top) /
            wrapperRect.height) *
          100;

        gsap.set(wrapper, { transformOrigin: `${originX}% ${originY}%` });
      }

      recalcOrigin();
      ScrollTrigger.addEventListener("refresh", recalcOrigin);

      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: isMobile ? 1 : 1.75,
            start: "top top",
            end: isMobile ? "+=120%" : isTablet ? "+=180%" : "+=240%",
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Trigger the theme change when the curtains are mostly open
              const isSilk = self.progress > 0.6;
              if (lastThemeState.current !== isSilk) {
                lastThemeState.current = isSilk;
                setTheme(isSilk ? "silk" : "dark");
                document.documentElement.setAttribute(
                  "data-theme",
                  isSilk ? "silk" : "dark",
                );
              }
            },
            onLeave: () => {
              setTheme("silk");
              document.documentElement.setAttribute("data-theme", "silk");
            },
          },
        })
        // ── Phase 1: Zoom the text to a reasonable size ───────────────────────────
        .to(
          wrapper,
          {
            scale: isMobile ? 40 : isTablet ? 22 : 15,
            ease: "power1.inOut",
            duration: SCALE_DURATION,
          },
          0,
        )
        // ── Phase 2: Slide the Dark Curtains open ─────────────────────────────
        // We start this right as the text finishes scaling (at 0.6 seconds)
        .to(
          leftCurtain,
          {
            xPercent: -100,
            ease: "power3.out",
            duration: 0.5,
          },
          CURTAIN_START,
        )
        .to(
          rightCurtain,
          {
            xPercent: 100,
            ease: "power3.out",
            duration: 0.5,
          },
          CURTAIN_START,
        )
        // Fade out the text slightly as the curtains open so it blends away
        .to(
          wrapper,
          {
            opacity: 0,
            duration: 0.3,
            ease: "power1.in",
          },
          FADE_START,
        );

      return () => {
        tl.kill();
        ScrollTrigger.removeEventListener("refresh", recalcOrigin);
        document.documentElement.setAttribute("data-theme", "dark");
        lastThemeState.current = null;
      };
    },
    { dependencies: [isMobile, isTablet] },
  );

  return (
    <section
      ref={sectionRef}
      id="portal"
      className="h-screen w-full relative overflow-hidden z-20 flex items-center justify-center pb-[2vh]"
      style={{ backgroundColor: "#fdf6f0" }}
    >
      {/* THE CURTAINS */}
      <div
        ref={leftCurtainRef}
        className="absolute top-0 left-0 w-1/2 h-full z-0"
        style={{ backgroundColor: "#0e050a" }}
      />
      <div
        ref={rightCurtainRef}
        className="absolute top-0 right-0 w-1/2 h-full z-0"
        style={{ backgroundColor: "#0e050a" }}
      />

      <div
        ref={wrapperRef}
        className="relative z-10 flex flex-col max-w-5xl mx-auto items-center justify-center text-center select-none"
      >
        <ScrollReveal
          baseOpacity={0}
          baseRotation={2}
          blurStrength={4}
          containerClassName="mb-6 md:mb-8 z-10"
          textClassName="text-xl md:text-2xl lg:text-3xl font-sans text-[var(--text-secondary)]"
        >
          Engineering intelligent
        </ScrollReveal>

        <h2
          className="font-heading font-black uppercase leading-[0.85] tracking-tighter"
          style={{
            fontSize: "clamp(4rem, 10vw, 10rem)",
            color: "#fdf6f0",
          }}
        >
          SYS<span ref={tRef}>T</span>EMS
        </h2>

        <ScrollReveal
          baseOpacity={0}
          baseRotation={2}
          blurStrength={4}
          containerClassName="mt-6 md:mt-8 z-10"
          textClassName="text-xl md:text-2xl lg:text-3xl font-sans text-[var(--text-secondary)]"
        >
          for the modern web.
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Portal;
