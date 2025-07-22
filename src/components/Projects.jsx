import React, { useState, useEffect } from "react";
import { PROJECTS } from "../constants";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";

const Projects = () => {
  const [modalIndex, setModalIndex] = useState(null);

  const handleOpenModal = (index) => setModalIndex(index);
  const handleCloseModal = () => setModalIndex(null);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (modalIndex !== null) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [modalIndex]);

  return (
    <section id="projects" className="my-24 scroll-mt-24">
      <h2 className="mb-10 text-left text-3xl font-bold tracking-tight bg-gradient-to-r from-pink-500 via-blue-500 to-violet-500 bg-clip-text text-transparent">
        Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2 sm:px-0">
        {PROJECTS.map((project, index) => (
          <div
            key={index}
            className="relative flex flex-col bg-neutral-900 rounded-2xl shadow-md border border-neutral-800 overflow-hidden group transition-all duration-300 hover:shadow-xl hover:border-cyan-500"
            tabIndex={0}
          >
            {/* Project Image */}
            <div className="w-full aspect-[4/3] bg-neutral-800 flex items-center justify-center overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="object-contain w-full h-full rounded-t-2xl pointer-events-none"
                loading="lazy"
              />
            </div>
            {/* Project Info */}
            <div className="flex-1 flex flex-col p-5">
              <h3
                className="text-xl font-bold mb-2 text-white flex items-center gap-2 transition-all duration-300 group-hover:text-2xl group-hover:tracking-tight"
                tabIndex={-1}
              >
                {project.title}
              </h3>
              <p className="text-neutral-400 text-sm mb-3 line-clamp-3">
                {project.shortDescription}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="rounded bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3 mt-auto">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-neutral-800 text-purple-300 hover:bg-purple-700/20 hover:text-purple-200 transition-colors text-xs font-semibold"
                >
                  <FaGithub className="mr-1" /> Source Code
                </a>
                <button
                  className="ml-auto px-3 py-1.5 rounded bg-cyan-700/80 text-white text-xs font-semibold shadow hover:bg-cyan-600 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 z-0"
                  onClick={() => handleOpenModal(index)}
                  tabIndex={0}
                  style={{ pointerEvents: 'auto' }}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Modal for project details */}
      <AnimatePresence>
        {modalIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-2 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="bg-neutral-900 rounded-2xl shadow-lg border border-neutral-700 w-full max-w-lg mx-2 sm:mx-4 p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 text-gray-900 hover:bg-cyan-500 hover:text-white text-2xl font-extrabold shadow-lg border border-gray-300 transition-all duration-200 z-10"
                onClick={handleCloseModal}
                aria-label="Close"
              >
                ×
              </button>
              <img
                src={PROJECTS[modalIndex].image}
                alt={PROJECTS[modalIndex].title}
                className="object-contain w-full h-48 rounded-lg mb-4 bg-neutral-800"
              />
              <h3 className="text-2xl font-bold mb-2 text-white">
                {PROJECTS[modalIndex].title}
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {PROJECTS[modalIndex].technologies.map((tech, i) => (
                  <span key={i} className="rounded bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-neutral-300 text-base mb-2">
                {PROJECTS[modalIndex].description}
              </p>
              <a
                href={PROJECTS[modalIndex].github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-neutral-800 text-purple-300 hover:bg-purple-700/20 hover:text-purple-200 transition-colors text-xs font-semibold mt-2"
              >
                <FaGithub className="mr-1" /> Source Code
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;