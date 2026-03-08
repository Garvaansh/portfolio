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

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(
        ".project-card",
        stageRef.current,
      );
      if (!cards.length) return;

      const getPositions = () => {
        const xStep = isMobile ? 0 : 180;
        const yStep = isMobile ? 30 : 40;

        const globalXOffset = isMobile ? 0 : -120;
        const globalYOffset = isMobile ? -60 : 0;

        return cards.map((_, i) => {
          const centerOffset = i - (cards.length - 1) / 2;
          return {
            x: centerOffset * xStep + globalXOffset,
            y: centerOffset * yStep + globalYOffset,
          };
        });
      };

      const positions = getPositions();

      gsap.set(cards, {
        x: isMobile ? 0 : 800,
        y: window.innerHeight + 200,
        opacity: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${cards.length * window.innerHeight * 1.2}`,
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
      <div className="w-full px-4 pt-14 md:pt-10 md:pr-16 z-20 relative flex justify-center md:justify-end pointer-events-none">
        <ScrollFloat
          containerClassName="!my-0"
          textClassName="text-[clamp(2rem,8vw,4rem)] md:text-7xl lg:text-8xl font-heading font-bold text-text-primary tracking-tighter text-center md:text-right select-none"
          scrollStart="center bottom+=60%"
          scrollEnd="center center"
        >
          Featured Work
        </ScrollFloat>
      </div>

      {/* The Card Stage */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none pt-24 md:pt-12">
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
