import { useState, useRef } from 'react';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Technologies from "./components/Technologies";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import TerminalLoader from "./components/TerminalLoader";
import CustomCursor from "./components/CustomCursor";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Create refs for each section
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const handleLoadingComplete = (section) => {
    setIsLoading(false);
    
    // If a specific section is provided, scroll to it after a short delay
    if (section) {
      setTimeout(() => {
        switch(section) {
          case 'about':
            aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
            break;
          case 'skills': // Maps to Technologies component
            skillsRef.current?.scrollIntoView({ behavior: 'smooth' });
            break;
          case 'experience':
            experienceRef.current?.scrollIntoView({ behavior: 'smooth' });
            break;
          case 'projects':
            projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
            break;
          case 'contact':
            contactRef.current?.scrollIntoView({ behavior: 'smooth' });
            break;
          default:
            // No scrolling if no valid section
            break;
        }
      }, 100); // Small delay to ensure components are rendered
    }
  };

  return (
    <div className="overflow-x-hidden text-neutral-300 antialiased 
      selection:bg-cyan-300 selection:text-cyan-900">
      {isLoading && <TerminalLoader onComplete={handleLoadingComplete} />}

      <CustomCursor />
      
      <div className="fixed top-0 -z-10 h-full w-full">
        <div 
          className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-8"> 
        <Navbar/>
        <main className="pt-28 sm:pt-24">
          <Hero/>
          <div ref={aboutRef}>
            <About/>
          </div>
          <div ref={skillsRef}>
            <Technologies/>
          </div>
          <div ref={experienceRef}>
            <Experience/>
          </div>
          <div ref={projectsRef}>
            <Projects/>
          </div>
          <div ref={contactRef}>
            <Contact/>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;