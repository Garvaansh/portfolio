import { contactLinks } from "@/content/contact";

const Footer = () => {
  return (
    <footer
      className="border-t border-border bg-bg-dark text-text-primary py-6 md:py-8"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-4">
          {contactLinks.map((contact) => {
            const Icon = contact.icon;
            return (
              <a
                key={contact.id}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${contact.label}`}
                className="w-9 h-9 rounded-full flex items-center justify-center text-text-secondary opacity-80 transition-all duration-300 hover:opacity-100 hover:-translate-y-1 hover:scale-105 hover:text-accent hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.4)] focus:outline-none focus-visible:opacity-100 focus-visible:-translate-y-1 focus-visible:scale-105 focus-visible:text-accent focus-visible:shadow-[0_0_20px_rgba(var(--accent-rgb),0.4)]"
              >
                <Icon className="w-4.5 h-4.5" />
              </a>
            );
          })}
        </div>

        {/* Divider */}
        <div className="h-px w-full max-w-xs mx-auto bg-accent opacity-40 mb-4" />

        {/* Copyright */}
        <p className="text-center text-xs md:text-sm text-text-secondary font-normal">
          &copy; {new Date().getFullYear()} Garvaansh Gupta. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
