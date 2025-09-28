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
    <section id="projects" className="corporate-section">
      <div className="max-w-7xl mx-auto">
        <h2 className="corporate-heading">
          Featured <span className="text-blue-400">Projects</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project, index) => (
          <div
            key={index}
            className="corporate-card overflow-hidden group cursor-pointer hover:scale-[1.02] hover:border-blue-400/50"
            tabIndex={0}
            onClick={() => handleOpenModal(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleOpenModal(index);
              }
            }}
          >
            {/* Project Image */}
            <div className="w-full aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden relative">
              <img
                src={project.image}
                alt={project.title}
                className="object-contain w-full h-full pointer-events-none transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            {/* Project Info */}
            <div className="flex-1 flex flex-col p-6">
              <h3
                className="text-xl font-semibold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300"
                tabIndex={-1}
              >
                {project.title}
              </h3>
              <p className="corporate-text text-sm mb-4 line-clamp-3">
                {project.shortDescription}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="px-3 py-1 text-xs font-medium bg-gray-700/50 text-gray-300 rounded-full border border-gray-600/50">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3 mt-auto">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 hover:text-blue-200 transition-all duration-300 text-sm font-medium border border-blue-500/30"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaGithub className="w-4 h-4" /> View Code
                </a>
                <div className="ml-auto px-4 py-2 rounded-lg bg-gray-700/50 text-gray-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 border border-gray-600/50">
                  View Details
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
      {/* Modal for project details */}
      <AnimatePresence>
        {modalIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/70 p-2 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="bg-neutral-900 rounded-2xl shadow-lg border border-neutral-700 w-full max-w-4xl mx-2 sm:mx-4 p-4 sm:p-6 lg:p-8 relative max-h-[90vh] overflow-y-auto"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ 
                duration: 0.3,
                ease: "easeOut"
              }}
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 text-gray-900 hover:bg-cyan-500 hover:text-white text-2xl font-extrabold shadow-lg border border-gray-300 transition-all duration-200 z-10"
                onClick={handleCloseModal}
                aria-label="Close"
              >
                ×
              </button>
              {/* Project Header */}
              <div className="text-center mb-6">
                <h3 className="text-2xl lg:text-4xl font-bold mb-4 text-white">
                  {PROJECTS[modalIndex].title}
                </h3>
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {PROJECTS[modalIndex].technologies.map((tech, i) => (
                    <span key={i} className="rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 px-4 py-2 text-sm font-medium text-purple-300 border border-purple-500/30">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Image - Centered and larger */}
              <div className="mb-8">
                <img
                  src={PROJECTS[modalIndex].image}
                  alt={PROJECTS[modalIndex].title}
                  className="object-contain w-full h-72 lg:h-96 rounded-xl bg-neutral-800 mx-auto shadow-2xl"
                />
              </div>

              {/* Project Description */}
              <div className="text-neutral-300 text-base lg:text-lg mb-8 leading-relaxed max-w-4xl mx-auto">
                {(() => {
                  const description = PROJECTS[modalIndex].description;
                  
                  // Split by lines first
                  const lines = description.split('\n');
                  const elements = [];
                  
                  for (let i = 0; i < lines.length; i++) {
                    const line = lines[i].trim();
                    if (!line) continue;
                    
                    // Handle section headers
                    if (line.includes('Key Technical Achievements:')) {
                      elements.push(
                        <h4 key={`header-${i}`} className="text-xl font-semibold text-white mb-4 mt-6">
                          {line}
                        </h4>
                      );
                    }
                    // Handle bullet points
                    else if (line.startsWith('-')) {
                      elements.push(
                        <div key={`bullet-${i}`} className="mb-4 flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 mr-3 mt-1">
                            <span className="text-white text-lg">•</span>
                          </div>
                          <span className="text-white leading-relaxed">{line.substring(1).trim()}</span>
                        </div>
                      );
                    }
                    // Handle regular paragraphs - split by sentences
                    else {
                      const sentences = line.split('. ');
                      sentences.forEach((sentence, sentenceIndex) => {
                        const trimmedSentence = sentence.trim();
                        if (!trimmedSentence) return;
                        
                        elements.push(
                          <p key={`para-${i}-${sentenceIndex}`} className="mb-4 last:mb-0 text-justify">
                            {trimmedSentence}{!trimmedSentence.endsWith('.') && !trimmedSentence.endsWith(':') ? '.' : ''}
                          </p>
                        );
                      });
                    }
                  }
                  
                  return elements;
                })()}
              </div>

              {/* Action Buttons - Centered */}
              <div className="flex justify-center gap-4">
                <a
                  href={PROJECTS[modalIndex].github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-purple-500/25 hover:scale-105"
                >
                  <FaGithub className="w-5 h-5" /> View Source Code
                </a>
                
                {/* Check if project has a live demo link */}
                {PROJECTS[modalIndex].github && PROJECTS[modalIndex].github.includes('github.io') && (
                  <a
                    href={PROJECTS[modalIndex].github.replace('/github.com/', '/').replace('/tree/main', '').replace('/blob/main', '')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-cyan-500/25 hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;