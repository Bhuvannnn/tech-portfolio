import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
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

  return (
    <div id="projects" className="border-b border-neutral-900 pb-4">
      <h2 className="my-20 text-center text-4xl">Projects</h2>
      <div className="space-y-16">
        {PROJECTS.map((project, index) => (
          <div key={index} className="flex flex-wrap lg:justify-center items-start">
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

            {/* Project Description */}
            <div className="w-full lg:w-3/4">
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
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="rounded bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;