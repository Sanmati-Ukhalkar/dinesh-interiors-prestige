import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import Reveal from "./Reveal";
import JaliBackground from "./JaliBackground";
import SplitText from "./SplitText";

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.52 3.48A11.86 11.86 0 0012.04 0C5.5 0 .2 5.3.2 11.84a11.7 11.7 0 001.62 5.94L0 24l6.39-1.67a11.86 11.86 0 005.65 1.44h.01c6.54 0 11.84-5.3 11.84-11.84 0-3.16-1.23-6.13-3.37-8.45zM12.05 21.5a9.66 9.66 0 01-4.93-1.35l-.36-.21-3.79.99 1.01-3.69-.23-.38a9.6 9.6 0 01-1.49-5.13c0-5.32 4.34-9.65 9.66-9.65a9.6 9.6 0 016.83 2.83 9.6 9.6 0 012.83 6.83c0 5.32-4.34 9.65-9.66 9.65zm5.55-7.22c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.63-.93-2.23-.25-.6-.5-.5-.68-.51l-.58-.01c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.5 0 1.48 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.07-.13-.27-.2-.57-.35z" />
  </svg>
);

interface Props {
  showHeading?: boolean;
}

const budgets = ["Under ₹15L", "₹15L – ₹30L", "₹30L – ₹60L", "₹60L+"];

const contactDetails = [
  { label: "Studio", value: "Pune, Maharashtra" },
  { label: "Email", value: "hello@interiorsbydinesh.com", href: "mailto:hello@interiorsbydinesh.com" },
  { label: "Phone", value: "+91 99999 99999", href: "tel:+919999999999" },
  { label: "Hours", value: "Mon–Sat, 10am – 7pm IST" },
];

const Contact = ({ showHeading = true }: Props) => {
  const [submitting, setSubmitting] = useState(false);
  const [budget, setBudget] = useState<string>(budgets[1]);

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
    <section id="contact" className="relative py-24 md:py-36 bg-secondary overflow-hidden">
      <JaliBackground opacity={0.06} type="mandala" />
      <div className="relative container-luxe grid lg:grid-cols-2 gap-16 lg:gap-24">

        {/* Left — info column */}
        <Reveal>
          {showHeading && (
            <>
              <p className="eyebrow mb-5">Begin a Project</p>
              <SplitText
                tag="h2"
                className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1]"
                delay={0.06}
                duration={0.85}
              >
                Let's design something timeless together.
              </SplitText>
              <div className="gold-line my-10 max-w-[100px]" />
            </>
          )}

          <p className="text-muted-foreground leading-[1.85] text-lg max-w-md">
            Tell us a little about your space and how you'd like to live in it. We respond
            personally within one working day.
          </p>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex items-center gap-3 bg-[hsl(var(--wood-deep))] text-cream px-7 h-12 rounded-sm hover:bg-[hsl(var(--wood))] transition-all duration-300 group border border-[hsl(var(--gold)/0.2)] hover:shadow-[0_8px_30px_-10px_hsl(var(--wood-deep)/0.3)] hover:gap-4 hover:-translate-y-0.5"
          >
            <WhatsAppIcon />
            <span className="text-[11px] uppercase tracking-[0.28em]">Chat on WhatsApp</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[hsl(var(--gold-soft))]" aria-hidden="true">→</span>
          </a>

          {/* Contact details */}
          <dl className="mt-12 space-y-4">
            {contactDetails.map((d) => (
               <div key={d.label} className="flex gap-4 text-sm">
                 <dt className="text-foreground font-medium min-w-[52px]">{d.label}</dt>
                 <dd className="text-muted-foreground">
                   {d.href ? (
                     <a href={d.href} className="ink-link hover:text-foreground transition-colors duration-300">
                       {d.value}
                     </a>
                   ) : (
                     d.value
                   )}
                 </dd>
               </div>
            ))}
          </dl>
        </Reveal>

        {/* Right — form column */}
        <Reveal delay={120}>
           <form
             onSubmit={onSubmit}
             className="bg-background p-8 md:p-12 border border-border space-y-8"
           >
             <div className="grid sm:grid-cols-2 gap-8">
               <div>
                 <Label htmlFor="name" className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                   Name
                 </Label>
                 <Input
                   id="name"
                   name="name"
                   required
                   className="mt-3 rounded-none border-0 border-b border-border bg-transparent px-0 focus-visible:ring-0 focus-visible:border-[hsl(var(--gold))] transition-colors duration-300"
                 />
               </div>
               <div>
                 <Label htmlFor="city" className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                   City
                 </Label>
                 <Input
                   id="city"
                   name="city"
                   required
                   className="mt-3 rounded-none border-0 border-b border-border bg-transparent px-0 focus-visible:ring-0 focus-visible:border-[hsl(var(--gold))] transition-colors duration-300"
                 />
               </div>
             </div>
 
             <div>
               <Label className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                 Budget
               </Label>
               <div className="mt-3 flex flex-wrap gap-2">
                 {budgets.map((b) => (
                   <button
                     key={b}
                     type="button"
                     onClick={() => setBudget(b)}
                     className={`relative px-4 h-9 text-[11px] uppercase tracking-[0.2em] rounded-sm border transition-all duration-300 ${
                       budget === b
                         ? "bg-[hsl(var(--wood-deep))] text-cream border-[hsl(var(--wood-deep))] shadow-[0_4px_14px_0_hsl(var(--wood-deep)/0.39)]"
                         : "border-border hover:border-[hsl(var(--gold))] hover:text-foreground"
                     }`}
                   >
                    {budget === b && (
                        <span
                          className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[hsl(var(--gold))] animate-fade-in"
                          aria-hidden="true"
                        />
                      )}
                     {b}
                   </button>
                 ))}
               </div>
               <input type="hidden" name="budget" value={budget} />
             </div>
 
             <div>
               <Label
                 htmlFor="requirement"
                 className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground"
               >
                 Requirement
               </Label>
               <Textarea
                 id="requirement"
                 name="requirement"
                 rows={4}
                 required
                 placeholder="Tell us about your home and timeline…"
                 className="mt-3 rounded-none border-0 border-b border-border bg-transparent px-0 focus-visible:ring-0 focus-visible:border-[hsl(var(--gold))] resize-none transition-colors duration-300"
               />
             </div>
 
             <Button
               type="submit"
               disabled={submitting}
               className="w-full rounded-sm bg-[hsl(var(--wood-deep))] text-cream hover:bg-[hsl(var(--wood))] h-14 text-[11px] uppercase tracking-[0.3em] transition-all duration-500 hover:shadow-[0_8px_30px_-10px_hsl(var(--wood-deep)/0.4)] hover:-translate-y-0.5"
             >
               {submitting ? "Sending…" : "Send Enquiry →"}
             </Button>
           </form>
         </Reveal>
       </div>
     </section>
   );
 };
 
 export default Contact;
