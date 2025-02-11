import { PROJECTS } from "../constants";
import { motion } from "framer-motion";

const Projects = () => {
  return (
    <div id="projects" className="border-b border-neutral-900 pb-4">
      <motion.h2 
        whileInView={{ opacity: 1, y: 0, scale: 1.2 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="my-20 text-center text-4xl"
      >
        Projects
      </motion.h2>
      <div className="space-y-16"> {/* Added space between projects */}
        {PROJECTS.map((project, index) => (
          <div key={index} className="flex flex-wrap lg:justify-center items-start"> {/* Added items-start */}
            <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -100 }}
              transition={{ duration: 1 }}
              className="w-full lg:w-1/4 lg:pr-8" // Consistent padding
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(project.github, "_blank")}
              style={{ cursor: "pointer" }}
            >
              <div className="relative h-64 w-full mb-6"> {/* Fixed aspect ratio container */}
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="rounded absolute inset-0 w-full h-full object-contain object-center"
                />
                <motion.div
                  className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <motion.span
                    className="text-white text-lg font-bold"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                  >
                    View on GitHub
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>
            <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 100 }}
              transition={{ duration: 1 }}
              className="w-full lg:w-3/4"
            >
              <h6 className="mb-2 font-semibold text-xl text-purple-400"> {/* Increased text size */}
                {project.title}
              </h6>
              <p className="mb-6 text-neutral-400 text-justify"> {/* Increased bottom margin */}
                {project.title === "Me, Myself and Time: A Game based on Time Travel" ? (
                  <>
                    The is a 6-month project for my class 'Advanced Mobile Devices and Game Consoles'. Unity 2D game focused on time travel, hosted on WebGL for global access. It features intricate time-travel mechanics and integrates robust analytics to monitor gameplay. Technologies used include C# for scripting, Python for data processing, and Firebase for real-time data storage. Visual analytics are implemented using Tableau, with tools like heatmaps, Sankey diagrams, and bar plots to provide detailed insights into player behavior. Conducted under Professor Scott Easley in the Advanced Games Development course at USC, the project combines advanced game development with comprehensive data analysis to enhance player engagement and experience. To play the game, visit <a href="https://bhuvannnn.github.io/Me-Myself-and-Time/WebGL%20Builds/Gold%20Build/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">this link</a>.
                  </>
                ) : (
                  project.description
                )}
              </p>
              <div className="flex flex-wrap gap-2"> {/* Added gap between tags */}
                {project.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex} 
                    className="rounded bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-300"
                  > 
                    {tech} 
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;