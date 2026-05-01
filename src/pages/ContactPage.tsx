import PageHero from "@/components/site/PageHero";
import Contact from "@/components/site/Contact";

const ContactPage = () => (
  <>
    <PageHero
      eyebrow="Contact"
      title={<>Let's design your <em className="not-italic text-[hsl(var(--gold-soft))]">home</em> together.</>}
      intro="Tell us a little about your space and timeline. We respond personally within one working day."
    />
    <Contact showHeading={false} />
  </>
);

export default ContactPage;
