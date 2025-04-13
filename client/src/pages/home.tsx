import { Header } from "@/components/header";
import { Banner } from "@/components/banner";
import { LocationDisplay } from "@/components/location-display";
import { Introduction } from "@/components/introduction";
import { JobListings } from "@/components/job-listings";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { useEffect } from "react";

export default function Home() {
  // Smooth scrolling for navigation
  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href');
        const targetElement = document.querySelector(targetId || '');
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    
    return () => {
      document.removeEventListener('click', handleSmoothScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-whatsapp-bg font-roboto">
      <Header />
      <Banner />
      <LocationDisplay />
      <Introduction />
      <JobListings />
      <Contact />
      <Footer />
    </div>
  );
}
