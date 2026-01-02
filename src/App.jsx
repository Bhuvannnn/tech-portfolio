import { useState, useRef, useEffect } from 'react';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Technologies from "./components/Technologies";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import { DefaultDock } from "./components/Dock";

const App = () => {
  // Create refs for each section
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  const educationRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  
  // State for dock visibility
  const [showDock, setShowDock] = useState(false);

  // Handle scroll to show/hide dock
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show dock after scrolling past the hero section (100vh)
      setShowDock(scrollY > windowHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="overflow-x-hidden text-slate-700 antialiased 
      selection:bg-[#7C9A9A] selection:text-white">
      
      <div className="fixed top-0 -z-10 h-full w-full">
        <div 
          className="absolute top-0 z-[-2] h-screen w-screen bg-white">
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-8"> 
        <Navbar/>
        <main className="pt-28 sm:pt-24 pb-24">
          <Hero/>
          <div ref={aboutRef}>
            <About/>
          </div>
          <div ref={educationRef}>
            <Education/>
          </div>
          <div ref={experienceRef}>
            <Experience/>
          </div>
          <div ref={skillsRef}>
            <Technologies/>
          </div>
          <div ref={projectsRef}>
            <Projects/>
          </div>
          <div ref={contactRef}>
            <Contact/>
          </div>
        </main>
      </div>
      
      {/* Floating Dock - Only show after scrolling */}
      {showDock && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
          <DefaultDock />
        </div>
      )}
    </div>
  );
}

export default App;