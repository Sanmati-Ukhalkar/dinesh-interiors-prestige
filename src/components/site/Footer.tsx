import { Link } from "react-router-dom";

const navLinks = [
  { label: "Portfolio", to: "/portfolio" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" },
];

const social = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
];

const Footer = () => (
  <footer className="bg-[hsl(var(--wood-deep))] text-cream relative overflow-hidden grain">
    {/* Faint arch motif background */}
    <svg
      aria-hidden="true"
      viewBox="0 0 600 700"
      className="pointer-events-none absolute right-[-60px] bottom-0 h-[90%] w-auto opacity-[0.04]"
    >
      <path
        d="M50 650 L50 300 Q50 50 300 50 Q550 50 550 300 L550 650"
        fill="none"
        stroke="hsl(var(--gold-soft))"
        strokeWidth="2"
      />
    </svg>

    <div className="relative container-luxe pt-16 pb-12 md:pt-20 md:pb-14">
      {/* Top strip — brand + CTA */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-12 border-b border-cream/10">
        <div>
          <p className="font-serif text-3xl md:text-4xl">
            Interiors{" "}
            <em className="not-italic text-[hsl(var(--gold-soft))]">by Dinesh</em>
          </p>
          <p className="mt-4 text-cream/50 text-sm leading-[1.85] max-w-sm">
            A premium interior design studio crafting homes where Indian
            heritage meets modern living.
          </p>
        </div>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center gap-3 border border-[hsl(var(--gold)/0.5)] text-[hsl(var(--gold-soft))] px-8 h-12 rounded-full text-[11px] uppercase tracking-[0.3em] hover:bg-[hsl(var(--gold)/0.1)] transition-all duration-300 group w-fit hover:gap-4 hover:shadow-[0_4px_20px_-5px_hsl(var(--gold)/0.2)] hover:-translate-y-0.5"
        >
          Begin a Project
          <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
        </Link>
      </div>

      {/* Columns */}
      <div className="mt-12 grid sm:grid-cols-3 gap-10">
        {/* Nav */}
        <div>
          <p className="text-[11px] uppercase tracking-[0.32em] text-[hsl(var(--gold-soft))] mb-6">
            Navigate
          </p>
          <ul className="space-y-3">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-cream/60 hover:text-cream transition-colors duration-300 ink-link inline-block"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-[11px] uppercase tracking-[0.32em] text-[hsl(var(--gold-soft))] mb-6">
            Studio
          </p>
          <ul className="space-y-3 text-sm text-cream/60 leading-[1.85]">
            <li>Pune, Maharashtra</li>
            <li>
              <a href="mailto:hello@interiorsbydinesh.com" className="hover:text-cream transition-colors duration-300 ink-link inline-block">
                hello@interiorsbydinesh.com
              </a>
            </li>
            <li>
              <a href="tel:+919999999999" className="hover:text-cream transition-colors duration-300 ink-link inline-block">
                +91 99999 99999
              </a>
            </li>
            <li className="text-cream/40">Mon–Sat, 10am – 7pm</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <p className="text-[11px] uppercase tracking-[0.32em] text-[hsl(var(--gold-soft))] mb-6">
            Follow
          </p>
          <ul className="space-y-3">
            {social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-cream/60 hover:text-[hsl(var(--gold-soft))] transition-colors duration-300 inline-flex items-center gap-2 group"
                >
                  {s.label}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-14 pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between gap-3 text-[11px] text-cream/35 tracking-wide">
        <p>© {new Date().getFullYear()} Interiors by Dinesh. All rights reserved.</p>
        <p>Crafted with care · Pune</p>
      </div>
    </div>
  </footer>
);

export default Footer;
