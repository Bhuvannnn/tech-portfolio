import { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Technologies from "./components/Technologies";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import ScrollIndicator from "./components/ScrollIndicator";


const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 9000); // Adjust time

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="overflow-x-hidden text-neutral-300 antialiased 
      selection:bg-cyan-300 selection:text-cyan-900">
      {isLoading && <Loader />}

      <CustomCursor />
      <ScrollIndicator />
      
      <div className="fixed top-0 -z-10 h-full w-full">
        <div 
          className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
        </div>
      </div>

      <div className="container mx-auto px-8"> 
        <Navbar/>
        <main className="pt-24">
          <Hero/>
          <About/>
          <Technologies/>
          <Experience/>
          <Projects/>
          <Contact/>
        </main>
      </div>
    </div>
  );
}

export default App;