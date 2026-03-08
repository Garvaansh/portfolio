import { contactLinks } from "@/content/contact";

const Footer = () => {
  return (
    <footer
      className="border-t border-border bg-bg-dark text-text-primary py-10"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-6">
          {contactLinks.map((contact) => {
            const Icon = contact.icon;
            return (
              <a
                key={contact.id}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${contact.label}`}
                className="w-10 h-10 rounded-full flex items-center justify-center text-text-secondary opacity-80 transition-all duration-300 hover:opacity-100 hover:-translate-y-1 hover:scale-105 hover:text-accent hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.4)] focus:outline-none focus-visible:opacity-100 focus-visible:-translate-y-1 focus-visible:scale-105 focus-visible:text-accent focus-visible:shadow-[0_0_20px_rgba(var(--accent-rgb),0.4)]"
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>

        {/* Divider */}
        <div className="h-px w-full max-w-md mx-auto bg-accent opacity-30 mb-6" />

        {/* Copyright */}
        <p className="text-center text-sm text-text-secondary font-medium">
          &copy; {new Date().getFullYear()} Garvaansh Gupta. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
