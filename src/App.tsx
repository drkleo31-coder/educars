import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { GallerySection } from './components/GallerySection';
import { AboutSection } from './components/AboutSection';
import { SchedulingLocationSection } from './components/SchedulingLocationSection';
import { FinalCtaFooter } from './components/FinalCtaFooter';

export default function App() {
  const [selectedService, setSelectedService] = useState<string>('');

  return (
    <div className="min-h-screen bg-[#070908] text-[#F4F7F5] overflow-x-clip">
      <Navbar />
      <main>
        <Hero />
        <ServicesSection onSelectServiceForSchedule={setSelectedService} />
        <BeforeAfterSection />
        <GallerySection />
        <AboutSection />
        <SchedulingLocationSection
          selectedService={selectedService}
          onSelectService={setSelectedService}
        />
      </main>
      <FinalCtaFooter />
    </div>
  );
}
