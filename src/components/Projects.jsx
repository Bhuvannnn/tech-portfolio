import React, { useState, useEffect } from "react";
import { PROJECTS } from "../constants";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaNpm } from "react-icons/fa";

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
          Featured <span className="unified-accent">Projects</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
        {PROJECTS.map((project, index) => (
          <div
            key={index}
            className="corporate-card overflow-hidden group cursor-pointer hover:scale-[1.02] hover:border-[#7C9A9A]/50 flex flex-col h-full"
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
            <div className="w-full aspect-[16/9] bg-gradient-to-br from-[#E8E0F0] to-[#F0E8E0] flex items-center justify-center overflow-hidden relative flex-shrink-0">
              <img
                src={project.image}
                alt={project.title}
                className={`${project.title.includes('CJSON') ? 'object-contain scale-105' : 'object-contain'} w-full h-full pointer-events-none transition-transform duration-300 group-hover:scale-105`}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
            </div>
            {/* Project Info */}
            <div className="flex-1 flex flex-col p-3 min-h-0">
              <h3
                className="text-base font-semibold mb-1.5 text-slate-800 group-hover:text-[#7C9A9A] transition-colors duration-300 leading-tight"
                tabIndex={-1}
              >
                {project.title}
              </h3>
              <p className="corporate-text text-xs mb-2 line-clamp-2 leading-relaxed">
                {project.shortDescription}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="px-2 py-0.5 text-xs font-medium bg-white/60 text-slate-700 rounded-full border border-[#7C9A9A]/40">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between gap-2 mt-auto">
                <div className="flex items-center gap-1.5 flex-shrink-0">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#7C9A9A]/30 text-[#5A7A7A] hover:bg-[#7C9A9A]/40 hover:text-[#4A6A6A] transition-all duration-300 text-xs font-medium border border-[#7C9A9A]/50"
                  onClick={(e) => e.stopPropagation()}
                >
                    <FaGithub className="w-3.5 h-3.5" /> View Code
                </a>
                  {project.title.includes('CJSON') && (
                    <a
                      href="https://www.npmjs.com/package/@bhuvanshah/cjson"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#D4A5A5]/30 text-[#A57575] hover:bg-[#D4A5A5]/40 hover:text-[#855555] transition-all duration-300 text-xs font-medium border border-[#D4A5A5]/50"
                      onClick={(e) => e.stopPropagation()}
                      title="View on npm"
                    >
                      <FaNpm className="w-4 h-4" />
                    </a>
                  )}
                </div>
                <div className="inline-flex items-center px-2.5 py-1 rounded-lg bg-white/60 text-slate-700 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 border border-[#7C9A9A]/40 flex-shrink-0 whitespace-nowrap">
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
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/80 p-2 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-[#7C9A9A]/40 w-full max-w-4xl mx-2 sm:mx-4 p-4 sm:p-6 lg:p-8 relative max-h-[90vh] overflow-y-auto"
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
                className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 text-slate-700 hover:bg-[#7C9A9A] hover:text-white text-2xl font-extrabold shadow-lg border border-[#7C9A9A]/40 transition-all duration-200 z-10"
                onClick={handleCloseModal}
                aria-label="Close"
              >
                ×
              </button>
              {/* Project Header */}
              <div className="text-center mb-6">
                <h3 className="text-2xl lg:text-4xl font-bold mb-4 text-slate-800">
                  {PROJECTS[modalIndex].title}
                </h3>
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {PROJECTS[modalIndex].technologies.map((tech, i) => (
                    <span key={i} className="rounded-full bg-gradient-to-r from-[#7C9A9A]/30 to-[#D4A5A5]/30 px-4 py-2 text-sm font-medium text-slate-700 border border-[#7C9A9A]/40">
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
                  className="object-contain w-full h-72 lg:h-96 rounded-xl bg-[#F0E8E0] mx-auto shadow-2xl"
                />
              </div>

              {/* Project Description */}
              <div className="text-slate-700 text-base lg:text-lg mb-8 leading-relaxed max-w-4xl mx-auto">
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
                        <h4 key={`header-${i}`} className="text-xl font-semibold text-slate-800 mb-4 mt-6">
                          {line}
                        </h4>
                      );
                    }
                    // Handle bullet points
                    else if (line.startsWith('-')) {
                      elements.push(
                        <div key={`bullet-${i}`} className="mb-4 flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 mr-3 mt-1">
                            <span className="text-[#7C9A9A] text-lg">•</span>
                          </div>
                          <span className="text-slate-700 leading-relaxed">{line.substring(1).trim()}</span>
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
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#7C9A9A] to-[#A8B8D1] text-slate-800 hover:from-[#6B8A8A] hover:to-[#98A8C1] transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-[#7C9A9A]/40 hover:scale-105"
                >
                  <FaGithub className="w-5 h-5" /> View Source Code
                </a>
                
                {/* Check if project has a live demo link */}
                {PROJECTS[modalIndex].github && PROJECTS[modalIndex].github.includes('github.io') && (
                  <a
                    href={PROJECTS[modalIndex].github.replace('/github.com/', '/').replace('/tree/main', '').replace('/blob/main', '')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#A8B8D1] to-[#98A8C1] text-slate-800 hover:from-[#98A8C1] hover:to-[#8898B1] transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-[#A8B8D1]/40 hover:scale-105"
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