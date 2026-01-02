import React, { useState } from 'react';
import { EXPERIENCES } from "../constants";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import { BlurFade } from "./BlurFade";

const Experience = () => {
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleCardClick = (index) => {
    setExpandedIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const handleMouseEnter = (index) => setHoveredIndex(index);
  const handleMouseLeave = () => setHoveredIndex(null);

  return (
    <section id="experience" className="corporate-section screen-line-before screen-line-after border-x border-[#7C9A9A]/30">
      <div className="max-w-6xl mx-auto">
        <div className="section-grid-divider mb-4"></div>
        <BlurFade direction="up" duration={0.7}>
          <h2 className="corporate-heading border-b border-[#7C9A9A]/30 pb-4 mb-8">
            Professional <span className="unified-accent">Experience</span>
          </h2>
        </BlurFade>

        <div className="space-y-0">
          {EXPERIENCES.map((experience, index) => (
            <React.Fragment key={index}>
              {index > 0 && <div className="section-grid-divider"></div>}
              <BlurFade delay={0.15 * index} inView>
                <div
                  className="corporate-card p-6 group cursor-pointer hover:border-[#7C9A9A]/50 screen-line-before screen-line-after border-x border-[#7C9A9A]/30"
                  onClick={() => handleCardClick(index)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                <div className="flex items-start space-x-4 w-full">
                {/* Company Logo/Avatar */}
                <div className="flex-shrink-0 mb-0 sm:mb-0">
                  {experience.logo ? (
                    <div className={`${
                        (experience.company === "University of Southern California" || experience.company === "VueInternational")
                          ? "w-14 h-14"
                          : "w-12 h-12"
                      } rounded-full bg-white flex items-center justify-center overflow-hidden shadow-sm border border-gray-200`}>
                      <img 
                        src={experience.logo} 
                        alt={`${experience.company} logo`}
                        className={`${
                          experience.company === "VueInternational" ? "object-cover" : "object-contain"
                        } ${
                          experience.company === "University of Southern California" ? "w-12 h-12 scale-125" :
                          experience.company === "VueInternational" ? "w-12 h-12" :
                          "w-10 h-10"
                        }`}
                        style={{ 
                          filter: 'contrast(1.1) brightness(1.05)',
                          imageRendering: 'crisp-edges',
                          ...(experience.company === "University of Southern California" && {
                            transform: 'scale(1.25)',
                            maxWidth: '56px',
                            maxHeight: '56px'
                          }),
                          ...(experience.company === "VueInternational" && { 
                            transform: 'scale(2.4)',
                            objectPosition: 'center',
                            maxWidth: '56px',
                            maxHeight: '56px'
                          })
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7C9A9A] to-[#D4A5A5] flex items-center justify-center text-slate-800 font-bold text-lg shadow-sm">
                      {experience.company.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between w-full">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-800 mb-1 flex items-center gap-1 relative">
                        {experience.role}
                        <motion.span
                          initial={{ x: -8, opacity: 0, rotate: 0 }}
                          animate={expandedIndexes.includes(index)
                            ? { x: 4, opacity: 1, rotate: 90 }
                            : hoveredIndex === index
                              ? { x: 4, opacity: 1, rotate: 0 }
                              : { x: -8, opacity: 0, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 30, duration: 0.3 }}
                          className="inline-block ml-1 text-slate-500 group-hover:opacity-100"
                        >
                          <ChevronRightIcon className="w-4 h-4" />
                        </motion.span>
                      </h3>
                      <p className="unified-accent font-medium text-sm mb-3">
                        {experience.company}
                      </p>
                      <span className="text-sm text-slate-600 sm:hidden mb-4 block">
                        {experience.year}
                      </span>
                      
                      {/* Technologies */}
                      <div className="flex-wrap gap-2 mb-3 justify-center sm:justify-start hidden sm:flex">
                        {experience.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="inline-block rounded-full bg-white/60 px-3 py-1.5 text-sm text-slate-700 border border-[#7C9A9A]/40"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Date and Chevron */}
                    <div className="hidden sm:flex items-center space-x-2 ml-auto sm:ml-4 mt-0 sm:mt-0">
                      <span className="text-sm text-slate-600 whitespace-nowrap">
                        {experience.year}
                      </span>
                      <ChevronRightIcon
                        className={`w-4 h-4 text-slate-500 transition-all duration-300 ease-out group-hover:translate-x-1 ${
                          expandedIndexes.includes(index) ? 'rotate-90' : 'rotate-0'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Expandable Description */}
                  <AnimatePresence>
                    {expandedIndexes.includes(index) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 mt-4 border-t border-[#7C9A9A]/30">
                          {Array.isArray(experience.bullets) && experience.bullets.length > 0 ? (
                            <ul className="list-none space-y-2 corporate-text text-sm">
                              {experience.bullets.map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                  <span className="unified-accent mt-1">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="corporate-text text-sm leading-relaxed">
                              {experience.description}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                </div>
              </div>
              </BlurFade>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;