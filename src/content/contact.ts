import { FaGithub, FaLinkedin, FaDiscord, FaFile } from "react-icons/fa";

export interface ContactLink {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: React.ComponentType<any>;
}

export const contactLinks: ContactLink[] = [
  {
    id: "github",
    label: "GitHub",
    value: "@Garvaansh",
    href: "https://github.com/Garvaansh",
    icon: FaGithub,
  },
  {
    id: "discord",
    label: "Discord",
    value: "notansh.",
    href: "https://discord.com/users/980746832005189702",
    icon: FaDiscord,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "Garvaansh Gupta",
    href: "https://www.linkedin.com/in/garvaansh-gupta/",
    icon: FaLinkedin,
  },
  {
    id: "resume",
    label: "Resume",
    value: "Download PDF",
    href: "/resume.pdf",
    icon: FaFile,
  },
];
