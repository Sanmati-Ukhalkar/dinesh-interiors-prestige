import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.52 3.48A11.86 11.86 0 0012.04 0C5.5 0 .2 5.3.2 11.84a11.7 11.7 0 001.62 5.94L0 24l6.39-1.67a11.86 11.86 0 005.65 1.44h.01c6.54 0 11.84-5.3 11.84-11.84 0-3.16-1.23-6.13-3.37-8.45zM12.05 21.5a9.66 9.66 0 01-4.93-1.35l-.36-.21-3.79.99 1.01-3.69-.23-.38a9.6 9.6 0 01-1.49-5.13c0-5.32 4.34-9.65 9.66-9.65a9.6 9.6 0 016.83 2.83 9.6 9.6 0 012.83 6.83c0 5.32-4.34 9.65-9.66 9.65zm5.55-7.22c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.63-.93-2.23-.25-.6-.5-.5-.68-.51l-.58-.01c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.5 0 1.48 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.07-.13-.27-.2-.57-.35z" />
  </svg>
);

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast({ title: "Thank you", description: "We'll be in touch within one working day." });
      (e.target as HTMLFormElement).reset();
    }, 500);
  };

  return (
    <section id="contact" className="py-24 md:py-36 bg-secondary/40">
      <div className="container-luxe grid lg:grid-cols-2 gap-16 lg:gap-24">
        <div>
          <p className="eyebrow mb-5">Begin a Project</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
            Let's design something timeless together.
          </h2>
          <div className="gold-line my-10 max-w-[120px]" />
          <p className="text-muted-foreground leading-relaxed text-lg max-w-md">
            Tell us a little about your space and how you'd like to live in it.
            We respond personally within one working day.
          </p>

          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex items-center gap-3 bg-[hsl(var(--wood-deep))] text-cream px-7 h-12 hover:bg-[hsl(var(--wood))] transition-colors"
          >
            <WhatsAppIcon />
            <span className="text-xs uppercase tracking-[0.28em]">Chat on WhatsApp</span>
          </a>

          <div className="mt-14 space-y-3 text-sm text-muted-foreground">
            <p><span className="text-foreground">Studio</span> — 14 Lavelle Road, Bengaluru</p>
            <p><span className="text-foreground">Email</span> — hello@interiorsbydinesh.com</p>
            <p><span className="text-foreground">Phone</span> — +91 99999 99999</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="bg-background p-8 md:p-12 border border-border space-y-6">
          <div>
            <Label htmlFor="name" className="text-xs uppercase tracking-[0.22em]">Name</Label>
            <Input id="name" name="name" required className="mt-2 rounded-none border-0 border-b border-border bg-transparent px-0 focus-visible:ring-0 focus-visible:border-[hsl(var(--gold))]" />
          </div>
          <div>
            <Label htmlFor="city" className="text-xs uppercase tracking-[0.22em]">City</Label>
            <Input id="city" name="city" required className="mt-2 rounded-none border-0 border-b border-border bg-transparent px-0 focus-visible:ring-0 focus-visible:border-[hsl(var(--gold))]" />
          </div>
          <div>
            <Label htmlFor="requirement" className="text-xs uppercase tracking-[0.22em]">Requirement</Label>
            <Textarea id="requirement" name="requirement" rows={4} required placeholder="Tell us about your home and timeline…" className="mt-2 rounded-none border-0 border-b border-border bg-transparent px-0 focus-visible:ring-0 focus-visible:border-[hsl(var(--gold))] resize-none" />
          </div>
          <Button type="submit" disabled={submitting} className="w-full rounded-none bg-[hsl(var(--wood-deep))] text-cream hover:bg-[hsl(var(--wood))] h-12 text-xs uppercase tracking-[0.28em]">
            {submitting ? "Sending…" : "Send Enquiry"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
