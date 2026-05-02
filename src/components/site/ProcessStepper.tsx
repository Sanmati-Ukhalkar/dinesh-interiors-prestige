/**
 * ProcessStepper — visual "Our Process" step indicator.
 * Replaces the generic ServicesSection process steps with an animated stepper.
 * Performance: Framer Motion InView trigger, CSS transitions only.
 * NOT an interactive multi-step wizard — purely visual / informational.
 */
import { useRef } from "react";
import { motion, useInView } from "motion/react";

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface ProcessStepperProps {
  steps: ProcessStep[];
  className?: string;
}

const ProcessStepper = ({ steps, className = "" }: ProcessStepperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Connector line */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute top-10 left-[10%] right-[10%] h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(var(--gold)/0.4) 20%, hsl(var(--gold)/0.4) 80%, transparent)",
        }}
      />

      <div className="grid md:grid-cols-4 gap-10 md:gap-8">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            className="relative group cursor-default"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Number circle */}
            <div className="relative h-20 w-20 flex items-center justify-center rounded-full bg-background border border-[hsl(var(--gold)/0.4)] group-hover:border-[hsl(var(--gold))] group-hover:bg-[hsl(var(--gold)/0.08)] transition-all duration-500 mb-8 mx-auto md:mx-0 shadow-sm">
              <span className="font-serif text-xl text-[hsl(var(--wood-deep))] transition-transform duration-500 group-hover:scale-110">
                {step.number}
              </span>
            </div>

            {/* Active dot on top of circle */}
            <motion.div
              className="absolute top-0 left-10 md:left-0 w-2.5 h-2.5 rounded-full bg-[hsl(var(--gold))]"
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: i * 0.14 + 0.3, duration: 0.4, ease: "backOut" }}
              aria-hidden="true"
            />

            <h3 className="font-serif text-2xl mt-1 text-center md:text-left">{step.title}</h3>
            <p className="mt-3 text-muted-foreground leading-[1.8] text-sm text-center md:text-left">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProcessStepper;
