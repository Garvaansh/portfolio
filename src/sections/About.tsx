import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutContent } from "../content/about";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const stageRef = useRef<HTMLElement>(null);
  const framesRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const frames = framesRef.current.filter(Boolean) as HTMLDivElement[];
      if (!frames.length || !stageRef.current) return;

      gsap.set(frames, { willChange: "transform, opacity" });

      frames.forEach((frame) => {
        gsap.set(frame.querySelectorAll(".animate-element"), {
          autoAlpha: 0,
          y: 30,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: "+=400%",
        },
      });

      frames.forEach((frame, i) => {
        const isLast = i === frames.length - 1;
        const scene = aboutContent.scenes[i];
        const elements = frame.querySelectorAll(".animate-element");

        const sceneTl = gsap.timeline();

        // 1. Enter: Background Color, Anchor Color, & Text Slide Up
        sceneTl.to(
          stageRef.current,
          { backgroundColor: scene.bgColor, duration: 1, ease: "none" },
          0,
        );

        // Sync the anchor text and line colors with the current scene
        sceneTl.to(
          ".about-anchor-text",
          { color: scene.textColor, duration: 1, ease: "none" },
          0,
        );
        sceneTl.to(
          ".about-anchor-line",
          { backgroundColor: scene.textColor, duration: 1, ease: "none" },
          0,
        );

        sceneTl.to(
          elements,
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
          },
          0,
        );

        // 2. Hold: Give the user time to read
        sceneTl.to({}, { duration: 1.5 });

        // 3. Exit: Slide up and fade out (if not the last frame)
        if (!isLast) {
          sceneTl.to(elements, {
            autoAlpha: 0,
            y: -30,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.in",
          });
        }

        // Add this scene's sequence to the master timeline
        tl.add(sceneTl);
      });
    },
    { scope: stageRef },
  );

  return (
    <section
      id="about"
      ref={stageRef}
      className="h-screen w-full relative overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: aboutContent.scenes[0].bgColor }}
    >
      {/* DESKTOP ONLY: Vertical "About Me" Anchor (Now fully color-synced) */}
      <div className="hidden lg:flex absolute left-12 top-1/2 -translate-y-1/2 flex-col items-center gap-6 z-20 opacity-50">
        <span
          className="about-anchor-text text-sm font-mono uppercase tracking-[0.3em] rotate-180"
          style={{
            writingMode: "vertical-rl",
            color: aboutContent.scenes[0].textColor, // Initial color
          }}
        >
          About Me
        </span>
        <div
          className="about-anchor-line w-px h-24"
          style={{ backgroundColor: aboutContent.scenes[0].textColor }} // Initial color
        ></div>
      </div>

      {aboutContent.scenes.map((scene, i) => (
        <div
          key={scene.id}
          ref={(el) => {
            framesRef.current[i] = el;
          }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-10 w-full h-full"
        >
          <div className="max-w-4xl flex flex-col items-center">
            {/* Headline */}
            <h2
              className="animate-element text-5xl md:text-7xl lg:text-8xl font-heading font-black tracking-tight leading-[1.1] mb-6"
              style={{ color: scene.headlineColor }}
            >
              {scene.headline}
            </h2>

            {/* Subtext */}
            {scene.subtext && (
              <p
                className="animate-element text-xl md:text-3xl font-heading font-medium mb-6"
                style={{ color: scene.textColor }}
              >
                {scene.subtext}
              </p>
            )}

            {/* Body */}
            {scene.body && (
              <p
                className="animate-element text-lg md:text-xl font-sans max-w-2xl leading-relaxed"
                style={{ color: scene.textColor }}
              >
                {scene.body}
              </p>
            )}

            {/* Stats */}
            {scene.stats && (
              <div className="flex flex-wrap justify-center gap-10 md:gap-16 mt-12 w-full">
                {scene.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="animate-element flex flex-col items-center gap-2"
                  >
                    <span
                      className="text-xl md:text-2xl font-heading font-bold"
                      style={{ color: scene.headlineColor }}
                    >
                      {stat.value}
                    </span>
                    <span
                      className="text-xs font-mono tracking-widest uppercase opacity-70"
                      style={{ color: scene.textColor }}
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

export default About;
