import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { skills } from "../content/skills";
import SkillBadge from "../components/shared/SkillBadge";
import ScrollFloat from "../components/ScrollFloat";
import { useUIStore } from "../store/uiStore";

const categories = [
  { key: "frontend", title: "Frontend" },
  { key: "backend", title: "Backend" },
  { key: "ai", title: "AI & ML" },
  { key: "devops", title: "DevOps" },
] as const;

const titleColors = [
  "text-[var(--accent)]",
  "text-[var(--wine)]",
  "text-[var(--soft)]",
];

const Skills = () => {
  const stageRef = useRef<HTMLElement>(null);
  const leftTitlesRef = useRef<(HTMLDivElement | null)[]>([]);
  const rightBlocksRef = useRef<(HTMLDivElement | null)[]>([]);
  const isMobile = useUIStore((s) => s.isMobile);

  useGSAP(
    () => {
      const stage = stageRef.current;
      const titles = leftTitlesRef.current;
      const blocks = rightBlocksRef.current;

      if (!stage) return;

      const gap = 50;

      gsap.set(titles, { autoAlpha: 0, y: 50 });
      gsap.set(blocks, { y: 150, autoAlpha: 0 });

      // scroll distance must match animation travel
      const totalScrollNeeded = blocks.reduce((sum, block, i) => {
        if (!block) return sum;

        const isLast = i === categories.length - 1;

        let travel;

        if (isLast) {
          travel = isMobile
            ? block.offsetHeight * 0.18 + 150
            : block.offsetHeight * 0.05 + 150;
        } else {
          travel = block.offsetHeight + gap + 150;
        }

        return sum + travel;
      }, 0);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          pin: true,
          scrub: 1.5,
          start: "top top",
          end: () => "+=" + totalScrollNeeded,
          invalidateOnRefresh: true,
        },
      });

      categories.forEach((_, i) => {
        const title = titles[i];
        const block = blocks[i];

        if (!title || !block) return;

        const isLast = i === categories.length - 1;

        tl.to(
          title,
          { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" },
          i === 0 ? ">" : "-=0.25",
        )

          // fade in badges
          .to(block, { autoAlpha: 1, duration: 0.35 }, "<")

          // vertical movement
          .to(
            block,
            {
              y: () => {
                if (isLast) {
                  if (!isMobile) return -(block.offsetHeight * 0.05);
                  return -(block.offsetHeight * 0.18);
                }

                return -(block.offsetHeight + gap);
              },
              duration: 1.4,
              ease: "none",
            },
            "<",
          );

        // exit animation
        if (!isLast) {
          tl.to(
            block,
            { autoAlpha: 0, duration: 0.45, ease: "power1.out" },
            "-=0.35",
          ).to(
            title,
            { autoAlpha: 0, y: -50, duration: 0.25, ease: "power2.in" },
            "<",
          );
        } else {
          tl.to({}, { duration: 0.4 });
        }
      });
    },
    { scope: stageRef, dependencies: [isMobile] },
  );

  const maskStyle = {
    WebkitMaskImage: isMobile
      ? "linear-gradient(to bottom, transparent -8%, transparent -4%, black 2%, black 80%, transparent 100%)"
      : "linear-gradient(to bottom, transparent 0%, transparent 18%, black 22%, black 85%, transparent 100%)",

    maskImage: isMobile
      ? "linear-gradient(to bottom, transparent -8%, transparent -4%, black 2%, black 80%, transparent 100%)"
      : "linear-gradient(to bottom, transparent 0%, transparent 18%, black 22%, black 85%, transparent 100%)",
  };

  return (
    <section
      id="skills"
      ref={stageRef}
      className="h-screen w-full relative bg-transparent overflow-hidden z-10 flex flex-col items-center"
    >
      <div className="w-full max-w-7xl mx-auto px-6 pt-18 md:pt-20 z-20 relative">
        <ScrollFloat
          containerClassName="!my-0 text-center"
          textClassName="text-[clamp(1.5rem,8vw,4.5rem)] font-heading font-bold text-text-primary leading-tight tracking-tight text-center pb-2 px-2"
          scrollStart="center bottom+=60%"
          scrollEnd="center center"
        >
          Technologies I've Worked With
        </ScrollFloat>
      </div>

      {/* SCROLL ARENA */}
      <div
        className="w-full max-w-7xl mx-auto grow flex flex-col md:flex-row px-6 relative z-10"
        style={!isMobile ? maskStyle : undefined}
      >
        {/* DESKTOP DIVIDER */}
        <div className="hidden md:block absolute left-[45%] top-[40%] -translate-y-1/2 w-1.5 h-[35%] bg-(--border)/30 rounded-full z-10" />

        {/* MOBILE DIVIDER */}
        <div className="block md:hidden absolute top-[10%] left-1/2 -translate-x-1/2 w-2/3 h-1 bg-(--border)/40 rounded-full z-30" />

        {/* LEFT COLUMN (CATEGORY TITLES) */}
        <div className="w-full h-[18%] md:w-[45%] md:h-full relative">
          {categories.map((category, index) => (
            <div
              key={`title-${category.key}`}
              ref={(el) => {
                leftTitlesRef.current[index] = el;
              }}
              className="absolute inset-0 flex items-start md:items-center justify-center md:justify-start w-full"
            >
              <h3
                className={`relative top-4 md:-top-16 w-full text-2xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold uppercase tracking-wider text-center md:text-left ${
                  titleColors[index % titleColors.length]
                }`}
              >
                {category.title}
              </h3>
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN (BADGES) */}
        <div
          className="w-full h-[82%] md:w-[55%] md:h-full relative"
          style={isMobile ? maskStyle : undefined}
        >
          {categories.map((category, index) => (
            <div
              key={`block-${category.key}`}
              ref={(el) => {
                rightBlocksRef.current[index] = el;
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="flex flex-wrap gap-3 md:gap-5 items-center content-center justify-center w-full max-w-xl">
                {skills[category.key as keyof typeof skills].map((skill) => (
                  <SkillBadge
                    key={skill.name}
                    name={skill.name}
                    icon={skill.icon}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
