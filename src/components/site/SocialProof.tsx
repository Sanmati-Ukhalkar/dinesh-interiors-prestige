import Reveal from "./Reveal";
import SplitText from "./SplitText";
import DecryptedText from "./DecryptedText";
import BorderGlow from "./BorderGlow";
import BounceCards from "./BounceCards";
import LineWaves from "./LineWaves";

const stats = [
  { platform: "Instagram", handle: "@interiorsbydinesh", count: "182K", label: "Followers" },
  { platform: "YouTube", handle: "Interiors by Dinesh", count: "94K", label: "Subscribers" },
  { platform: "Pinterest", handle: "@interiorsbydinesh", count: "1.2M", label: "Monthly Views" },
];

import reel1 from "@/assets/reel-1.jpg";
import pBedroom from "@/assets/portfolio-bedroom.jpg";
import pKitchen from "@/assets/portfolio-kitchen.jpg";
import pStorage from "@/assets/portfolio-storage.jpg";
import pLiving from "@/assets/portfolio-living.jpg";

const SocialProof = () => (
  <section className="py-24 md:py-36 bg-[hsl(var(--wood-deep))] relative overflow-hidden grain border-y border-[hsl(var(--gold)/0.15)]">
    {/* LineWaves background effect */}
    <div className="absolute inset-0 z-0 pointer-events-none opacity-20 mix-blend-screen">
      <LineWaves 
        color1="#d4af37" 
        color2="#f3ead3" 
        color3="#2a221b" 
        brightness={0.4}
        enableMouseInteraction={false}
      />
    </div>

    {/* Faint diagonal texture lines */}
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none opacity-[0.05] z-[1]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, hsl(var(--gold-soft)) 0, hsl(var(--gold-soft)) 1px, transparent 0, transparent 50%)",
        backgroundSize: "24px 24px",
      }}
    />

    <div className="relative z-10 container-luxe">
      <Reveal className="text-center mb-14">
        <p className="eyebrow text-[hsl(var(--gold-soft))] mb-4" style={{ letterSpacing: "0.38em" }}>
          A Community of Homemakers
        </p>
        <SplitText
          tag="h2"
          className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight max-w-2xl mx-auto text-cream"
          delay={0.06}
          duration={0.8}
          from={{ opacity: 0, y: 20 }}
        >
          Trusted by hundreds of thousands across India.
        </SplitText>
      </Reveal>

      {/* Moodboard Cards via BounceCards */}
      <Reveal className="flex justify-center mb-20 mt-8" delay={200}>
        <BounceCards
          images={[
            reel1,
            pBedroom,
            pKitchen,
            pStorage,
            pLiving
          ]}
          containerWidth={500}
          containerHeight={250}
          animationDelay={0.5}
          animationStagger={0.06}
          enableHover={true}
        />
      </Reveal>

      <div className="grid md:grid-cols-3 gap-px bg-[hsl(var(--gold)/0.15)] ring-1 ring-[hsl(var(--gold)/0.15)]">
        {stats.map((s, i) => (
          <Reveal key={s.platform} delay={i * 120}>
            <BorderGlow glowColor="43 75 65" borderRadius={0} backgroundColor="hsl(var(--wood-deep))">
              <div className="group bg-[hsl(var(--wood-deep))] px-10 py-12 text-center hover:bg-[hsl(var(--wood)/0.5)] transition-colors duration-500 cursor-default h-full flex flex-col justify-center items-center">
                <p className="text-[11px] uppercase tracking-[0.32em] text-[hsl(var(--gold-soft))] mb-6">
                  {s.platform}
                </p>
                <p className="font-serif text-6xl md:text-7xl text-cream leading-none group-hover:scale-105 transition-transform duration-500">
                  <DecryptedText
                    text={s.count}
                    speed={45}
                    animateOn="view"
                    revealDirection="start"
                    className="text-cream"
                    encryptedClassName="text-cream/30"
                  />
                </p>
                <p className="mt-4 text-[10px] uppercase tracking-[0.24em] text-cream/50">
                  {s.label}
                </p>
                <div className="gold-line my-7 max-w-[50px] opacity-40 group-hover:opacity-80 transition-opacity duration-500 group-hover:max-w-[70px]" />
                <p className="text-sm text-cream/40 group-hover:text-cream/60 transition-colors duration-300">
                  {s.handle}
                </p>
              </div>
            </BorderGlow>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default SocialProof;
