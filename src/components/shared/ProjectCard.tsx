import React from "react";
import { SiGithub } from "react-icons/si";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type ProjectCardProps = {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string | null;
  liveUrl?: string | null;
  status: "live" | "development";
  isActive: boolean;
  className?: string;
  style?: React.CSSProperties;
};

type RailButtonProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
};

const RailButton = ({ href, icon, label, isActive }: RailButtonProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    title={label}
    style={{ width: isActive ? "100px" : "36px" }}
    className={cn(
      "h-9 flex items-center gap-2 pl-2.5 shrink-0 overflow-hidden",
      "rounded-full border border-border/30",
      "bg-bg-secondary text-text-secondary",
      "hover:bg-bg-card hover:text-text-primary hover:border-border/60",
      "transition-[width] duration-500 ease-in-out",
    )}
  >
    <span className="shrink-0 flex items-center justify-center w-4 h-4">
      {icon}
    </span>
    <span
      className={cn(
        "text-[11px] font-mono whitespace-nowrap leading-none shrink-0",
        "transition-opacity duration-300 ease-in-out",
        isActive ? "opacity-100" : "opacity-0",
      )}
    >
      {label}
    </span>
  </a>
);

const ProjectCard = ({
  title,
  description,
  techStack,
  githubUrl,
  liveUrl,
  status,
  isActive,
  className,
  style,
}: ProjectCardProps) => {
  const pillStyle =
    status === "live"
      ? "bg-[var(--accent)]/15 text-[var(--accent)] border-[var(--accent)]/30"
      : "bg-[var(--wine)]/15 text-[var(--wine)] border-[var(--wine)]/30";

  const hasLinks = githubUrl || liveUrl;

  return (
    <Card
      className={cn(
        "absolute w-[85vw] max-w-[320px] md:max-w-none md:w-112.5 h-[400px] md:h-130",
        "bg-linear-to-br from-bg-card to-bg-main",
        "border border-border/40 rounded-3xl",
        "shadow-[0_0_60px_rgba(0,0,0,0.5)]",
        "p-0 gap-0 flex-col",
        "transition-opacity duration-500",
        !isActive && "opacity-75",
        className,
      )}
      style={style}
    >
      {hasLinks && (
        <div className="absolute bottom-6 md:bottom-8 left-2.5 flex flex-col items-start gap-2 md:gap-3 z-10">
          {liveUrl && (
            <RailButton
              href={liveUrl}
              icon={<HiArrowTopRightOnSquare />}
              label="Live"
              isActive={isActive}
            />
          )}
          {githubUrl && (
            <RailButton
              href={githubUrl}
              icon={<SiGithub />}
              label="GitHub"
              isActive={isActive}
            />
          )}
        </div>
      )}

      <div className="flex flex-col flex-1 overflow-hidden">
        <CardHeader className="px-5 md:px-6 pt-6 md:pt-8 pb-2 gap-1.5 md:gap-2">
          <CardTitle className="text-xl md:text-3xl font-heading font-bold text-text-primary leading-tight drop-shadow-sm">
            {title}
          </CardTitle>
          <span
            className={cn(
              "w-fit text-[10px] md:text-xs font-mono uppercase tracking-widest px-2.5 py-0.5 md:px-3 md:py-1 rounded-full border",
              pillStyle,
            )}
          >
            {status === "live" ? "● Live" : "◐ In Dev"}
          </span>
        </CardHeader>

        <CardContent className="px-5 md:px-6 flex-1 pt-1 overflow-y-auto">
          <p className="text-sm md:text-lg font-sans text-text-secondary leading-relaxed">
            {description}
          </p>
        </CardContent>

        <CardFooter className="pl-28 md:pl-32 pr-5 md:pr-6 pb-6 md:pb-8 pt-4 flex flex-wrap justify-end gap-1.5 md:gap-2 mt-auto">
          {techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-[10px] md:text-sm bg-bg-secondary text-text-secondary px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-border/30 shadow-sm transition-colors hover:text-text-primary"
            >
              {tech}
            </span>
          ))}
        </CardFooter>
      </div>
    </Card>
  );
};

export default ProjectCard;
