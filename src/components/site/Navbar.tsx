import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const links = [
  { label: "Home", to: "/" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" },
];

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

  // On non-home pages, navbar should always show solid background
  const solid = scrolled || !isHome;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        solid
          ? "bg-background/85 backdrop-blur-md border-b border-border shadow-[0_4px_30px_-20px_hsl(var(--wood-deep)/0.4)]"
          : "bg-transparent"
      }`}
    >
      <div className={`container-luxe flex items-center justify-between transition-all duration-500 ${solid ? "py-4" : "py-6 md:py-7"}`}>
        <Link to="/" className={`font-serif text-xl md:text-2xl tracking-wide transition-colors ${solid ? "text-foreground" : "text-cream"}`}>
          Interiors{" "}
          <span className={solid ? "text-[hsl(var(--gold))]" : "text-[hsl(var(--gold-soft))]"}>
            by Dinesh
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `relative text-sm tracking-wide transition-colors ${
                  solid
                    ? isActive
                      ? "text-[hsl(var(--wood-deep))]"
                      : "text-muted-foreground hover:text-foreground"
                    : isActive
                    ? "text-[hsl(var(--gold-soft))]"
                    : "text-cream/85 hover:text-[hsl(var(--gold-soft))]"
                } after:absolute after:left-0 after:-bottom-1 after:h-px after:bg-[hsl(var(--gold))] after:transition-all after:duration-300 ${
                  isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/contact"
          className={`hidden md:inline-block text-xs uppercase tracking-[0.28em] border-b pb-1 transition-colors ${
            solid
              ? "text-foreground border-[hsl(var(--gold))] hover:text-[hsl(var(--gold))]"
              : "text-cream border-[hsl(var(--gold-soft))] hover:text-[hsl(var(--gold-soft))]"
          }`}
        >
          Book a Call
        </Link>

        <button
          className={`md:hidden h-10 w-10 flex flex-col justify-center items-center gap-1.5 ${solid ? "text-foreground" : "text-cream"}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          <span className={`block h-px w-6 bg-current transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`} />
          <span className={`block h-px w-6 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block h-px w-6 bg-current transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden bg-background border-t border-border transition-[max-height] duration-500 ease-out ${open ? "max-h-96" : "max-h-0"}`}
      >
        <nav className="container-luxe py-6 flex flex-col gap-4">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-sm tracking-wide ${isActive ? "text-[hsl(var(--wood-deep))]" : "text-muted-foreground"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/contact" onClick={() => setOpen(false)} className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--gold))] mt-2">
            Book a Call →
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
