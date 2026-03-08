import { useRef, useState } from "react";
import type { RefObject } from "react";
import { gsap, SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText);

/**
 * TWO-PHASE HANDSHAKE ARCHITECTURE
 *
 * TIER 1: Entrance Timeline (Ownership Phase)
 * - Controls all transforms, colors, SplitText creation
 * - Runs once per mount
 * - Leaves DOM in stable baseline state
 * - Sets tier1Complete = true when done
 *
 * TIER 2: Interaction Layer (Reactive Phase)
 * - Only exists after tier1Complete === true
 * - Line 2 proximity interaction only
 * - Never touches Line 1 or Line 3
 * - Desktop-only via matchMedia
 */

export default function useHeroAnimation(
  containerRef: RefObject<HTMLElement | null>,
  codenameRef: RefObject<HTMLSpanElement | null>,
  taglineRef: RefObject<HTMLParagraphElement | null>,
  realnameRef: RefObject<HTMLSpanElement | null>
) {
  const taglineSplitRef = useRef<SplitText | null>(null);
  const [tier1Complete, setTier1Complete] = useState(false);

  // === TIER 1: Core Identity (Always Runs) ===
  useGSAP(
    () => {
      const container = containerRef.current;
      const codename = codenameRef.current;
      const tagline = taglineRef.current;

      if (!container || !codename || !tagline) return;

      const headline = container.querySelector("[data-hero-headline]");
      const aka = container.querySelector("[data-hero-aka]");

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          setTier1Complete(true);
        },
      });

      // Line 1: notansh. bounce entrance
      if (headline) {
        tl.from(headline, {
          y: 30,
          opacity: 0,
          duration: 0.8,
        });
      }

      tl.fromTo(
        codename,
        {
          y: "-120%",
          rotation: -12,
          opacity: 0,
        },
        {
          y: "0%",
          rotation: 0,
          opacity: 1,
          duration: 1.4,
          ease: "bounce.out",
        },
        "-=0.4"
      );

      // Line 2: aka fade in (simple, no interaction yet)
      if (aka) {
        tl.from(
          aka,
          {
            opacity: 0,
            y: 20,
            duration: 0.7,
          },
          "-=0.6"
        );
      }

      // Line 3: Tagline SplitText reveal with color trace
      try {
        taglineSplitRef.current = new SplitText(tagline, {
          type: "words, chars",
          wordsClass: "hero-word",
          charsClass: "hero-char"
        });

        if (taglineSplitRef.current.chars) {
          const chars = taglineSplitRef.current.chars;

          tl.from(
            chars,
            {
              opacity: 0,
              y: 30,
              duration: 0.7,
              stagger: 0.025,
              ease: "power2.out",
            },
            "-=0.3"
          );

          // Color trace: accent → soft
          tl.fromTo(
            chars,
            {
              color: "var(--accent)",
            },
            {
              color: "var(--soft)",
              duration: 0.8,
              stagger: 0.015,
              ease: "none",
            },
            "-=0.5"
          );
        }
      } catch (error) {
        // Fallback: simple fade
        tl.from(
          tagline,
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          "-=0.3"
        );
      }

      return () => {
        setTier1Complete(false);
        if (taglineSplitRef.current) {
          taglineSplitRef.current.revert();
          taglineSplitRef.current = null;
        }
      };
    },
    {
      scope: containerRef,
      dependencies: [],
      revertOnUpdate: false,
    }
  );

  // === TIER 2: Line 2 Proximity Interaction ===
  // Only runs after Tier 1 completes
  useGSAP(
    () => {
      if (!tier1Complete) return;

      const realname = realnameRef.current;
      if (!realname) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        let splitInstance: SplitText | null = null;
        let scaleTweens: ReturnType<typeof gsap.quickTo>[] = [];
        let colorSetters: ReturnType<typeof gsap.quickSetter>[] = [];
        let charPositions: { x: number; y: number }[] = [];

        try {
          // Clear any transforms from Tier 1 before starting
          gsap.set(realname, { clearProps: "transform" });

          // Split Line 2 into characters
          splitInstance = new SplitText(realname, {
            type: "chars",
          });

          if (!splitInstance.chars) return;

          const chars = splitInstance.chars;

          // Cache character positions
          charPositions = chars.map((char: Element) => {
            const rect = char.getBoundingClientRect();
            return {
              x: rect.left + rect.width / 2,
              y: rect.top + rect.height / 2,
            };
          });

          // Create quickTo for scale
          scaleTweens = chars.map((char: Element) =>
            gsap.quickTo(char, "scale", {
              duration: 0.4,
              ease: "power2.out",
            })
          );

          // Create quickSetter for color
          colorSetters = chars.map((char: Element) =>
            gsap.quickSetter(char, "color")
          );

          // Pointer proximity logic
          const handlePointerMove = (e: PointerEvent) => {
            const pointerX = e.clientX;
            const pointerY = e.clientY;

            chars.forEach((_char: Element, i: number) => {
              // Use cached positions
              const { x: charCenterX, y: charCenterY } = charPositions[i];

              // Distance from pointer to character center
              const dx = pointerX - charCenterX;
              const dy = pointerY - charCenterY;
              const distance = Math.sqrt(dx * dx + dy * dy);

              // Proximity threshold
              const maxDistance = 100;

              if (distance < maxDistance) {
                // Calculate influence (0 at maxDistance → 1 at center)
                const influence = 1 - distance / maxDistance;

                // Scale: 1.0 → 1.35 (liquid glass expansion)
                const scale = 1 + influence * 0.35;
                scaleTweens[i](scale);

                // Color: blend from soft → accent based on influence
                colorSetters[i]("var(--accent)");
              } else {
                // Outside threshold: neutral state
                scaleTweens[i](1);
                colorSetters[i]("var(--soft)");
              }
            });
          };

          const handlePointerLeave = () => {
            // Reset all characters using same quickTo/quickSetter
            chars.forEach((_char: Element, i: number) => {
              scaleTweens[i](1);
              colorSetters[i]("var(--soft)");
            });
          };

          realname.addEventListener("pointermove", handlePointerMove);
          realname.addEventListener("pointerleave", handlePointerLeave);

          return () => {
            realname.removeEventListener("pointermove", handlePointerMove);
            realname.removeEventListener("pointerleave", handlePointerLeave);

            if (splitInstance) {
              splitInstance.revert();
            }
          };
        } catch (error) {
          // Silent fail - Tier 1 still works
          if (splitInstance) {
            splitInstance.revert();
          }
        }
      });

      return () => {
        mm.revert();
      };
    },
    {
      scope: containerRef,
      dependencies: [tier1Complete],
      revertOnUpdate: true,
    }
  );
}
