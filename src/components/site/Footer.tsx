const social = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
];

const Footer = () => (
  <footer className="bg-[hsl(var(--wood-deep))] text-cream">
    <div className="container-luxe py-16 md:py-20">
      <div className="grid md:grid-cols-3 gap-12">
        <div>
          <p className="font-serif text-2xl">
            Interiors <span className="text-[hsl(var(--gold-soft))]">by Dinesh</span>
          </p>
          <p className="mt-4 text-cream/60 text-sm leading-relaxed max-w-xs">
            A premium interior design studio crafting homes where Indian heritage meets modern living.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--gold-soft))] mb-5">Studio</p>
          <ul className="space-y-2 text-sm text-cream/75">
            <li>14 Lavelle Road, Bengaluru</li>
            <li>hello@interiorsbydinesh.com</li>
            <li>+91 99999 99999</li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[hsl(var(--gold-soft))] mb-5">Follow</p>
          <ul className="space-y-2 text-sm">
            {social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="text-cream/75 hover:text-[hsl(var(--gold-soft))] transition-colors">
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between gap-4 text-xs text-cream/50 tracking-wide">
        <p>© {new Date().getFullYear()} Interiors by Dinesh. All rights reserved.</p>
        <p>Crafted with care.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
