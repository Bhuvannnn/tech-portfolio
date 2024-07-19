import { PROJECTS } from "../constants";
import { motion } from "framer-motion";

const Projects = () => {
  return (
    <div className="border-b border-neutral-900 pb-4">
      <motion.h2 
        whileInView={{ opacity: 1, y: 0, scale: 1.2 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="my-20 text-center text-4xl"
      >
        Projects
      </motion.h2>
      <div>
        {PROJECTS.map((project, index) => (
          <div key={index} className="mb-8 flex flex-wrap lg:justify-center lg:text-justify">
            <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -100 }}
              transition={{ duration: 1 }}
              className={`w-full lg:w-1/4 ${index === 0 || index === 1 || index === 3 ? 'mr-4' : ''}`} // Add margin-right for projects 1, 2, and 4
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className={`rounded mb-6 ${index === 0 || index === 1 || index === 3 ? 'h-64 w-auto object-contain' : 'w-auto h-auto' }`} // Adjust height for projects 1, 2, and 4
              />
            </motion.div>
            <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 100 }}
              transition={{ duration: 1 }}
              className="w-full max-w-xl lg:w-3/4"
            >
              <h6 className="mb-2 font-semibold text-base text-purple-400">
                {project.title}
              </h6>
              <p className="mb-4 text-neutral-400" style={{ textAlign: 'justify' }}>
                {project.title === "Me, Myself and Time: A Game based on Time Travel" ? (
                  <>
                    The is a 6-month project for my class 'Advanced Mobile Devices and Game Consoles'. Unity 2D game focused on time travel, hosted on WebGL for global access. It features intricate time-travel mechanics and integrates robust analytics to monitor gameplay. Technologies used include C# for scripting, Python for data processing, and Firebase for real-time data storage. Visual analytics are implemented using Tableau, with tools like heatmaps, Sankey diagrams, and bar plots to provide detailed insights into player behavior. Conducted under Professor Scott Easley in the Advanced Games Development course at USC, the project combines advanced game development with comprehensive data analysis to enhance player engagement and experience. To play the game, visit <a href="https://taylorashley30.github.io/GoldBuild/" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">this link</a>.
                  </>
                ) : (
                  project.description
                )}
              </p>
              {project.technologies.map((tech, techIndex) => (
                <span 
                  key={techIndex} 
                  className="mr-2 rounded bg-white px-2 py-1 text-sm font-medium text-black"
                > 
                  {tech} 
                </span>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
