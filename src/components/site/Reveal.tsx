import { ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "figure" | "header" | "footer";
}

const Reveal = ({ children, className, delay = 0, as: Tag = "div" }: RevealProps) => {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <Tag
      ref={ref as never}
      style={shown ? { animationDelay: `${delay}ms` } : undefined}
      className={cn(
        "opacity-0",
        shown && "animate-fade-up opacity-100",
        className
      )}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
