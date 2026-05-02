import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const leftLinks = [
  { label: "Portfolio", to: "/portfolio", n: "01", badge: "New" },
  { label: "About", to: "/about", n: "02" },
];

const rightLinks = [
  { label: "Services", to: "/services", n: "03" },
  { label: "Contact", to: "/contact", n: "04" },
];

const allLinks = [...leftLinks, ...rightLinks];

const Navbar = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const solid = scrolled || !isHome;

  const linkClass = (isActive: boolean) =>
    `group relative flex items-center gap-2 text-[12px] tracking-[0.12em] uppercase transition-colors duration-300 py-1 ${
      solid
        ? isActive
          ? "text-[hsl(var(--wood-deep))]"
          : "text-muted-foreground hover:text-foreground"
        : isActive
        ? "text-[hsl(var(--gold-soft))]"
        : "text-cream/70 hover:text-cream"
    }`;

  return (
    <>
      {/* ─── Main bar ─── */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          solid
            ? "bg-[hsl(var(--cream)/0.92)] backdrop-blur-md border-b border-[hsl(var(--border))]"
            : "bg-transparent"
        }`}
      >
        {/* Gold accent top line — only when scrolled */}
        <div
          className={`absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-700 ${
            solid ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, hsl(var(--gold)) 35%, hsl(var(--gold-soft)) 65%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        <div
          className={`container-luxe grid grid-cols-[1fr_auto_1fr] items-center transition-all duration-500 ${
            solid ? "py-3.5" : "py-5 md:py-6"
          }`}
        >
          {/* LEFT links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10 justify-start">
            {leftLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) => linkClass(isActive)}
              >
                {({ isActive }) => (
                  <>
                    {/* Number prefix */}
                    <span
                      className={`font-serif text-[10px] transition-colors duration-300 ${
                        solid
                          ? isActive
                            ? "text-[hsl(var(--gold))]"
                            : "text-[hsl(var(--border))] group-hover:text-[hsl(var(--gold)/0.6)]"
                          : isActive
                          ? "text-[hsl(var(--gold-soft))]"
                          : "text-cream/30 group-hover:text-cream/50"
                      }`}
                    >
                      {l.n}
                    </span>

                    <span>{l.label}</span>

                    {/* Badge */}
                    {"badge" in l && (
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] bg-[hsl(var(--gold))] text-[hsl(var(--wood-deep))] px-2 py-0.5 rounded-sm leading-none ml-1 shadow-sm">
                        {l.badge}
                      </span>
                    )}

                    {/* Active dot */}
                    {isActive && (
                      <span
                        className="absolute -bottom-1 left-0 right-0 flex justify-center"
                        aria-hidden="true"
                      >
                        <span className="w-1 h-1 rounded-full bg-[hsl(var(--gold))]" />
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* CENTER wordmark */}
          <Link
            to="/"
            className={`font-serif text-lg md:text-xl lg:text-2xl tracking-wide transition-colors text-center leading-tight ${
              solid ? "text-foreground" : "text-cream"
            }`}
          >
            <span className="block leading-none">Interiors</span>
            <span
              className={`block text-[0.7em] tracking-[0.2em] uppercase font-sans font-light transition-colors ${
                solid
                  ? "text-[hsl(var(--gold))]"
                  : "text-[hsl(var(--gold-soft))]"
              }`}
            >
              by Dinesh
            </span>
          </Link>

          {/* RIGHT links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10 justify-end">
            {rightLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) => linkClass(isActive)}
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`font-serif text-[10px] transition-colors duration-300 ${
                        solid
                          ? isActive
                            ? "text-[hsl(var(--gold))]"
                            : "text-[hsl(var(--border))] group-hover:text-[hsl(var(--gold)/0.6)]"
                          : isActive
                          ? "text-[hsl(var(--gold-soft))]"
                          : "text-cream/30 group-hover:text-cream/50"
                      }`}
                    >
                      {l.n}
                    </span>
                    <span>{l.label}</span>
                    {isActive && (
                      <span
                        className="absolute -bottom-1 left-0 right-0 flex justify-center"
                        aria-hidden="true"
                      >
                        <span className="w-1 h-1 rounded-full bg-[hsl(var(--gold))]" />
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Mobile hamburger — span full right */}
          <div className="md:hidden col-start-3 flex justify-end">
            <button
              className={`h-10 w-10 flex flex-col justify-center items-center gap-[5px] transition-colors ${
                open ? "text-foreground" : solid ? "text-foreground" : "text-cream"
              }`}
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span
                className={`block h-px w-6 bg-current transition-all duration-300 origin-center ${
                  open ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px bg-current transition-all duration-300 ${
                  open ? "w-0 opacity-0" : "w-4 opacity-100 ml-auto"
                }`}
              />
              <span
                className={`block h-px w-6 bg-current transition-all duration-300 origin-center ${
                  open ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ─── Full-screen mobile overlay ─── */}
      <div
        className={`fixed inset-0 z-30 md:hidden transition-all duration-500 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "hsl(var(--cream))" }}
        aria-hidden={!open}
      >
        {/* Faint arch background */}
        <svg
          aria-hidden="true"
          viewBox="0 0 400 500"
          className="absolute bottom-0 right-0 w-3/4 opacity-[0.06] pointer-events-none"
        >
          <path
            d="M30 480 L30 200 Q30 20 200 20 Q370 20 370 200 L370 480"
            fill="none"
            stroke="hsl(var(--wood-deep))"
            strokeWidth="2"
          />
        </svg>

        <nav className="flex flex-col justify-center h-full px-8 pt-24 pb-12 gap-0">
          {allLinks.map((l, i) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `group flex items-baseline gap-4 py-5 border-b border-[hsl(var(--border))] transition-all duration-300 ${
                  isActive
                    ? "text-[hsl(var(--wood-deep))]"
                    : "text-muted-foreground"
                }`
              }
              style={{
                transitionDelay: open ? `${i * 60}ms` : "0ms",
                transform: open ? "translateX(0)" : "translateX(-24px)",
                opacity: open ? 1 : 0,
                transition: `transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${i * 60}ms, opacity 0.4s ease ${i * 60}ms, color 0.3s`,
              }}
            >
              <span className="font-serif text-sm text-[hsl(var(--gold)/0.5)] w-6">
                {l.n}
              </span>
              <span className="font-serif text-4xl group-hover:text-[hsl(var(--wood-deep))] transition-colors">
                {l.label}
              </span>
              {"badge" in l && (
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] bg-[hsl(var(--gold))] text-[hsl(var(--wood-deep))] px-2 py-0.5 rounded-sm leading-none self-center shadow-sm">
                  {l.badge}
                </span>
              )}
            </NavLink>
          ))}

          {/* Footer strip */}
          <div
            className="mt-auto pt-8 flex items-center justify-between"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 0.5s ease ${allLinks.length * 60 + 100}ms, transform 0.5s ease ${allLinks.length * 60 + 100}ms`,
            }}
          >
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
              Pune
            </p>
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] uppercase tracking-[0.28em] text-[hsl(var(--gold))] inline-flex items-center gap-2"
            >
              WhatsApp →
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
