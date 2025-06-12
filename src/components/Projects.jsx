import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { PROJECTS } from "../constants";

const Projects = () => {
  const [isFlipped, setIsFlipped] = useState({});

  // Handle flip state for each project
  const handleFlip = (index) => {
    setIsFlipped((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // Handle click to open GitHub link
  const handleGitHubClick = (url) => {
    window.open(url, "_blank");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const projectVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring", 
        damping: 15, 
        stiffness: 100,
        duration: 0.6 
      } 
    }
  };

  return (
    <div id="projects" className="border-b border-neutral-900 pb-4">
      <motion.h2 
        className="my-20 text-center text-4xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        Projects
      </motion.h2>
      <motion.div 
        className="space-y-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {PROJECTS.map((project, index) => (
          <ProjectItem 
            key={index} 
            project={project} 
            index={index} 
            isFlipped={isFlipped} 
            handleFlip={handleFlip} 
            handleGitHubClick={handleGitHubClick} 
            variants={projectVariants}
          />
        ))}
      </motion.div>
    </div>
  );
};

// Separate component for each project item
const ProjectItem = ({ project, index, isFlipped, handleFlip, handleGitHubClick, variants }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <motion.div
      ref={ref}
      className="flex flex-wrap lg:justify-center items-start mb-8" // Added mb-8 for spacing if needed
      variants={variants}
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ scale: 1.02 }} // Add subtle scale effect on hover
      transition={{ type: "spring", stiffness: 300, damping: 15 }} // Add transition for hover effect
    >
      {/* Flip Container */}
      <div
        className="w-full lg:w-1/4 lg:pr-8 cursor-pointer"
        onMouseEnter={() => handleFlip(index)}
        onMouseLeave={() => handleFlip(index)}
      >
        <ReactCardFlip isFlipped={isFlipped[index]} flipDirection="horizontal">
          {/* Front Side */}
          <div className="relative h-64 w-full bg-neutral-900 rounded-lg overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-contain" // Use object-contain to maintain aspect ratio
            />
          </div>

          {/* Back Side */}
          <div
            className="relative h-64 w-full bg-neutral-900 rounded-lg flex items-center justify-center"
            onClick={() => handleGitHubClick(project.github)} // Add onClick here
          >
            <div className="text-center p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                className="fill-current text-purple-400 mx-auto"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <p className="mt-4 text-purple-400 font-semibold">View on GitHub</p>
            </div>
          </div>
        </ReactCardFlip>
      </div>

      {/* Project Description with animation */}
      <motion.div 
        className="w-full lg:w-3/4"
        initial={{ opacity: 0, x: 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
        transition={{ 
          duration: 0.5, 
          delay: 0.2,
          type: "spring",
          damping: 15
        }}
      >
        <h6 className="mb-2 font-semibold text-xl text-purple-400">
          {project.title}
        </h6>
        <p className="mb-6 text-neutral-400 text-justify">
          {project.title === "Me, Myself and Time: A Game based on Time Travel" ? (
            <>
              The is a 6-month project for my class 'Advanced Mobile Devices and Game Consoles'. Unity 2D game focused on time travel, hosted on WebGL for global access. It features intricate time-travel mechanics and integrates robust analytics to monitor gameplay. Technologies used include C# for scripting, Python for data processing, and Firebase for real-time data storage. Visual analytics are implemented using Tableau, with tools like heatmaps, Sankey diagrams, and bar plots to provide detailed insights into player behavior. Conducted under Professor Scott Easley in the Advanced Games Development course at USC, the project combines advanced game development with comprehensive data analysis to enhance player engagement and experience. To play the game, visit <a href="https://bhuvannnn.github.io/Me-Myself-and-Time/WebGL%20Builds/Gold%20Build/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">this link</a>.
            </>
          ) : (
            project.description
          )}
        </p>
        <motion.div 
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {project.technologies.map((tech, techIndex) => (
            <motion.span
              key={techIndex}
              className="rounded bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-300"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ 
                duration: 0.3, 
                delay: 0.5 + (techIndex * 0.05),
                type: "spring"
              }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Projects;