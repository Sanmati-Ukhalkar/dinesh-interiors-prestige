const links = [
  { label: "About", href: "#about" },
  { label: "Styles", href: "#styles" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Tours", href: "#tours" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => (
  <header className="absolute top-0 left-0 right-0 z-30">
    <div className="container-luxe flex items-center justify-between py-6 md:py-8">
      <a href="#" className="font-serif text-xl md:text-2xl text-cream tracking-wide">
        Interiors <span className="text-[hsl(var(--gold-soft))]">by Dinesh</span>
      </a>
      <nav className="hidden md:flex items-center gap-10">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="text-sm tracking-wide text-cream/85 hover:text-[hsl(var(--gold-soft))] transition-colors">
            {l.label}
          </a>
        ))}
      </nav>
      <a href="#contact" className="hidden md:inline-block text-xs uppercase tracking-[0.28em] text-cream border-b border-[hsl(var(--gold-soft))] pb-1 hover:text-[hsl(var(--gold-soft))] transition-colors">
        Book a Call
      </a>
    </div>
  </header>
);

export default Navbar;
