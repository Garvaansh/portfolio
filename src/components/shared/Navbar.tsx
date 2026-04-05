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
      <nav className="fixed top-5 right-4 md:right-8 lg:right-12 z-50 flex items-center p-[3px] md:p-[4px] rounded-full bg-black/8 backdrop-blur-md border border-soft/20 shadow-sm pointer-events-auto transition-colors duration-300 hover:bg-black/15">
        {/* GitHub Link */}
        <a
          href="https://github.com/Garvaansh"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-2 py-1.5 md:px-3 md:py-1.5 rounded-full text-soft/80 hover:text-soft hover:bg-white/10 transition-all duration-300"
          aria-label="GitHub Profile"
        >
          <FaGithub size={18} />
          <span className="hidden md:inline font-mono tracking-widest uppercase text-xs">
            GitHub
          </span>
        </a>

        {/* Subtle Divider Line */}
        <div className="w-[1px] h-3 bg-soft/20 mx-1" />

        {/* Discord Link */}
        <a
          // Put your actual Discord username or invite link here
          href="https://discord.com/users/980746832005189702"
          target="_blank"
          rel="noreferrer"
          className="flex items-center leading-none gap-2 px-2 py-2 md:px-4 md:py-2 rounded-full text-soft/80 hover:text-[#5865F2] hover:bg-[#5865F2]/15 transition-all duration-300"
          aria-label="Discord Contact"
        >
          <FaDiscord size={16} />
          <span className="hidden md:inline font-mono tracking-widest uppercase text-xs">
            Contact
          </span>
        </a>
      </nav>
    </>
  );
}
