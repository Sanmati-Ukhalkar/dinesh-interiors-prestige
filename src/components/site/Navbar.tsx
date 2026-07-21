import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import GradualBlur from "./GradualBlur";

const leftLinks = [
  { label: "Portfolio", to: "/portfolio", n: "01", badge: "New" },
  { label: "About", to: "/about", n: "02" },
];

const rightLinks = [
  { label: "Services", to: "/services", n: "03" },
  { label: "Contact", to: "/contact", n: "04" },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(() => typeof window !== "undefined" ? window.scrollY > 40 : false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  const solid = scrolled;

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
        className={`fixed top-0 left-0 right-0 z-40 transition-colors transition-opacity transition-transform duration-500 ${
          solid
            ? "bg-transparent"
            : "bg-transparent"
        }`}
      >
        {/* GradualBlur background */}
        {solid && (
          <GradualBlur preset="header" zIndex={-1} className="absolute top-0 left-0 w-full pointer-events-none" />
        )}
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
          className={`relative z-10 container-luxe flex justify-between md:grid md:grid-cols-[1fr_auto_1fr] items-center transition-colors transition-opacity transition-transform duration-500 ${
            solid ? "py-3.5" : "py-5 md:py-6"
          }`}
        >
          {/* LEFT links */}
          <div className="hidden md:flex justify-start">
            <nav className="hidden md:flex items-center gap-8 lg:gap-10">
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
                          <span className="size-1 rounded-full bg-[hsl(var(--gold))]" />
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* CENTER wordmark */}
          <div className="flex justify-start md:justify-center">
            <Link
              to="/"
              className={`font-serif text-xl md:text-2xl tracking-wide transition-colors leading-none flex items-center gap-1.5 ${
                solid ? "text-foreground" : "text-cream"
              }`}
            >
              <span>Interiors</span>
              <span
                className={`transition-colors ${
                  solid
                    ? "text-[hsl(var(--gold))]"
                    : "text-[hsl(var(--gold-soft))]"
                }`}
              >
                by Dinesh
              </span>
            </Link>
          </div>

          {/* RIGHT links */}
          <div className="flex justify-end">
            <nav className="hidden md:flex items-center gap-8 lg:gap-10">
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
                          <span className="size-1 rounded-full bg-[hsl(var(--gold))]" />
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* MOBILE MENU TOGGLE */}
            <button 
              type="button" 
              onClick={() => setMobileMenuOpen(true)}
              className={`md:hidden p-2 -mr-2 transition-colors ${solid ? "text-foreground" : "text-cream"}`}
              aria-label="Open menu"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* ─── Mobile Menu Overlay ─── */}
      <div 
        className={`fixed inset-0 z-50 bg-background/98 backdrop-blur-md flex flex-col items-center justify-center transition-colors transition-opacity transition-transform duration-500 md:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <button 
          type="button" 
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-6 right-6 p-2 text-foreground/80 hover:text-foreground transition-colors"
          aria-label="Close menu"
        >
          <X size={26} strokeWidth={1.5} />
        </button>

        <nav className="flex flex-col items-center gap-8">
          {[...leftLinks, ...rightLinks].map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => 
                `font-serif text-3xl tracking-widest uppercase transition-colors duration-300 ${
                  isActive ? "text-[hsl(var(--gold))]" : "text-foreground hover:text-[hsl(var(--gold)/0.7)]"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        
        <div className="absolute bottom-10 flex flex-col items-center gap-3">
          <p className="eyebrow text-muted-foreground">Interiors by Dinesh</p>
          <div className="h-px w-10 bg-[hsl(var(--gold))]" />
        </div>
      </div>

    </>
  );
};

export default Navbar;
