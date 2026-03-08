import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SkillBadgeProps = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
};

const SkillBadge = ({ name, icon: Icon, className }: SkillBadgeProps) => {
  return (
    <Badge
      variant="outline"
      className={cn(
        "group flex flex-col items-center justify-center cursor-default transition-all duration-300",
        "gap-2 md:gap-4",
        "min-w-25 md:min-w-35",
        "min-h-15 md:min-h-21",
        "px-4 py-3 md:px-6 md:py-5",
        "bg-bg-secondary text-text-primary border-border/30 shadow-sm rounded-2xl",
        "hover:border-border/60 md:hover:bg-bg-card md:hover:shadow-md",
        "text-sm md:text-lg font-sans font-medium",
        "whitespace-nowrap",
        className,
      )}
    >
      <div className="w-4 h-4 md:w-8 md:h-8 mb-1 md:mb-2 flex items-center justify-center text-text-secondary group-hover:text-accent transition-colors duration-300 [&>svg]:w-full [&>svg]:h-full">
        <Icon />
      </div>
      <span className="leading-none tracking-wide">{name}</span>
    </Badge>
  );
};

export default SkillBadge;
