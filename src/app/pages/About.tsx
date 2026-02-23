import { Footer } from '../components/Footer';
import { AboutHero } from '../components/sections/AboutHero';
import { AboutSections } from '../components/sections/AboutSections';

export function About() {
  return (
    <>
      <div className="min-h-screen pt-20">
        <AboutHero />
        <AboutSections />
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}