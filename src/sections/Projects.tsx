import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectsContent } from "../content/projects";
import ProjectCard from "@/components/shared/ProjectCard";
import ScrollFloat from "@/components/ScrollFloat";
import { useUIStore } from "../store/uiStore";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const stageRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const setActiveIndexRef = useRef(setActiveIndex);
  setActiveIndexRef.current = setActiveIndex;

  const isMobile = useUIStore((s) => s.isMobile);

  const getViewport = () => {
    return {
      vw: window.innerWidth,
      vh: window.innerHeight,
    };
  };

  useGSAP(
    () => {
      const { vw, vh } = getViewport();

      const cards = gsap.utils.toArray<HTMLElement>(
        ".project-card",
        stageRef.current,
      );
      if (!cards.length) return;

      const getPositions = () => {
        const xStep = isMobile ? 0 : Math.min(160, vw * 0.12);
        const yStep = isMobile ? 24 : Math.min(32, vh * 0.04);

        const globalXOffset = isMobile ? 0 : -Math.min(80, vw * 0.06);
        const globalYOffset = isMobile ? -40 : 0;

        return cards.map((_, i) => {
          const maxOffset = 3;

          const centerOffset = Math.max(
            -maxOffset,
            Math.min(maxOffset, i - (cards.length - 1) / 2),
          );
          return {
            x: centerOffset * xStep + globalXOffset,
            y:
              Math.sign(centerOffset) *
                Math.pow(Math.abs(centerOffset), 1.2) *
                yStep +
              globalYOffset,
          };
        });
      };

      const positions = getPositions();

      gsap.set(cards, {
        x: isMobile ? 0 : 800,
        y: vh + 100,
        opacity: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${cards.length * vh * 1.2}`,
          invalidateOnRefresh: true,

          // This calculates the exact distance between cards and forces the scrollbar
          // to glide perfectly to the nearest card when the user stops swiping.
          snap: {
            snapTo: 1 / (cards.length > 1 ? cards.length - 1 : 1),
            duration: { min: 0.3, max: 0.6 },
            ease: "power2.inOut",
          },

          onUpdate: (self) => {
            const next = Math.min(
              Math.floor(self.progress * cards.length),
              cards.length - 1,
            );
            setActiveIndexRef.current(next);
          },
        },
      });

      cards.forEach((card, i) => {
        tl.to(
          card,
          {
            x: positions[i].x,
            y: positions[i].y,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          },
          i,
        );
      });
    },
    { scope: stageRef, dependencies: [isMobile] },
  );

  return (
    <section
      id="projects"
      ref={stageRef}
      className="h-screen w-full bg-transparent relative overflow-hidden z-10 flex flex-col items-center"
    >
      <div className="absolute top-16 md:top-20 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-8 lg:right-12 z-20 pointer-events-none">
        <ScrollFloat
          containerClassName="!my-0"
          textClassName="inline-block text-[clamp(1.7rem,7vw,2.4rem)] md:text-[clamp(2.5rem,3.5vw,3.5rem)] font-heading font-bold text-text-primary tracking-tighter text-center md:text-right select-none"
          scrollStart="center bottom+=60%"
          scrollEnd="center center"
        >
          Featured Work
        </ScrollFloat>
      </div>

      {/* The Card Stage */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none pt-28 md:pt-10 max-w-275 mx-auto left-0 right-0">
        {projectsContent.projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            techStack={project.techStack}
            githubUrl={project.githubUrl}
            liveUrl={project.liveUrl}
            status={project.status}
            isActive={i === activeIndex}
            className="project-card pointer-events-auto"
            style={{ zIndex: i + 1 }}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
