export interface HeroContent {
  intro: string;
  codename: string;
  realName: string;
  tagline: string;
  status: "available" | "busy" | "offline";
  statusMessage: string;
}

export const heroContent: HeroContent = {
  intro: "Hi, I'm",
  codename: "notansh.",
  realName: "Garvaansh Gupta",
  tagline:
    "I build intelligent systems. And highly complex accidental features.",
  status: "available",
  statusMessage: "Available for new projects",
};

export default heroContent;