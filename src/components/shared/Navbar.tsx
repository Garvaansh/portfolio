import { useLayoutEffect } from "react";
import { FaGithub, FaDiscord } from "react-icons/fa";
import Logo from "./Logo";

export default function Navbar() {
  useLayoutEffect(() => {
    document.documentElement.style.setProperty("--nav-h", "0px");
  }, []);

  return (
    <>
      <Logo />

      {/* THE COMBINED PILL CONTAINER (___) */}
      <nav className="fixed top-4 right-4 md:right-12 z-50 flex items-center p-0.5 md:p-1 rounded-full bg-black/10 backdrop-blur-md border border-[var(--soft)]/20 shadow-sm pointer-events-auto transition-colors duration-300 hover:bg-black/20">
        {/* GitHub Link */}
        <a
          href="https://github.com/Garvaansh"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-2 py-2 md:px-4 md:py-2 rounded-full text-[var(--soft)]/80 hover:text-[var(--soft)] hover:bg-white/10 transition-all duration-300"
          aria-label="GitHub Profile"
        >
          <FaGithub size={18} />
          <span className="hidden md:inline font-mono tracking-widest uppercase text-xs">
            GitHub
          </span>
        </a>

        {/* Subtle Divider Line */}
        <div className="w-[1px] h-4 bg-[var(--soft)]/20 mx-1" />

        {/* Discord Link */}
        <a
          // Put your actual Discord username or invite link here
          href="https://discord.com/users/980746832005189702"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-2 py-2 md:px-4 md:py-2 rounded-full text-[var(--soft)]/80 hover:text-[#5865F2] hover:bg-[#5865F2]/15 transition-all duration-300"
          aria-label="Discord Contact"
        >
          <FaDiscord size={18} />
          <span className="hidden md:inline font-mono tracking-widest uppercase text-xs">
            Contact
          </span>
        </a>
      </nav>
    </>
  );
}
