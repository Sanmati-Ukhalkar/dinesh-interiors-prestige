import { useState } from "react";

const WhatsAppFab = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="https://wa.me/919999999999"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-0 overflow-hidden h-12 rounded-none transition-all duration-500 ease-out shadow-[0_12px_40px_-12px_hsl(var(--wood-deep)/0.45)] hover:shadow-[0_20px_50px_-15px_hsl(var(--gold)/0.5)] animate-float hover:[animation-play-state:paused]"
      style={{
        background: "hsl(var(--wood-deep))",
        border: "1px solid hsl(var(--gold)/0.4)",
        width: hovered ? "auto" : "48px",
      }}
    >
      {/* Icon container */}
      <span className="flex items-center justify-center w-12 h-12 flex-shrink-0">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="hsl(var(--gold-soft))"
          aria-hidden="true"
        >
          <path d="M20.52 3.48A11.86 11.86 0 0012.04 0C5.5 0 .2 5.3.2 11.84a11.7 11.7 0 001.62 5.94L0 24l6.39-1.67a11.86 11.86 0 005.65 1.44h.01c6.54 0 11.84-5.3 11.84-11.84 0-3.16-1.23-6.13-3.37-8.45zM17.6 14.28c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.63-.93-2.23-.25-.6-.5-.5-.68-.51l-.58-.01c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.5 0 1.48 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.07-.13-.27-.2-.57-.35z" />
        </svg>
      </span>

      {/* Label that expands on hover */}
      <span
        className="text-[10px] uppercase tracking-[0.3em] font-medium pr-5 whitespace-nowrap transition-all duration-500"
        style={{
          color: "hsl(var(--gold-soft))",
          opacity: hovered ? 1 : 0,
          maxWidth: hovered ? "120px" : "0px",
          overflow: "hidden",
        }}
      >
        Chat Now
      </span>
    </a>
  );
};

export default WhatsAppFab;
