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
    <div id="experience" className="my-24 scroll-mt-24">
      <BlurFade direction="up" duration={0.7}>
        <h2 className="mb-12 text-3xl font-bold tracking-tight bg-gradient-to-r from-pink-500 via-blue-500 to-violet-500 bg-clip-text text-transparent">
          Work Experience
        </h2>
      </BlurFade>

      <div className="space-y-8">
        {EXPERIENCES.map((experience, index) => (
          <BlurFade key={index} delay={0.15 * index} inView>
            <div
              className="group cursor-pointer"
              onClick={() => handleCardClick(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-start space-x-3 sm:space-x-4 w-full">
                {/* Company Logo/Avatar */}
                <div className="flex-shrink-0 mb-0 sm:mb-0">
                  {experience.logo ? (
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-sm border border-gray-200">
                      <img 
                        src={experience.logo} 
                        alt={`${experience.company} logo`}
                        className={`object-contain ${
                          experience.company === "University of Southern California" ? "w-11 h-11" :
                          experience.company === "VueInternational" ? "w-11 h-11 scale-125" :
                          "w-10 h-10"
                        }`}
                        style={{ 
                          filter: 'contrast(1.1) brightness(1.05)',
                          imageRendering: 'crisp-edges',
                          ...(experience.company === "VueInternational" && { 
                            transform: 'scale(1.25)',
                            maxWidth: '44px',
                            maxHeight: '44px'
                          })
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                      {experience.company.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between w-full">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1 flex items-center gap-1 relative">
                        {experience.role}
                        <motion.span
                          initial={{ x: -8, opacity: 0, rotate: 0 }}
                          animate={expandedIndexes.includes(index)
                            ? { x: 4, opacity: 1, rotate: 90 }
                            : hoveredIndex === index
                              ? { x: 4, opacity: 1, rotate: 0 }
                              : { x: -8, opacity: 0, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 30, duration: 0.3 }}
                          className="inline-block ml-1 text-gray-400 group-hover:opacity-100"
                        >
                          <ChevronRightIcon className="w-4 h-4" />
                        </motion.span>
                      </h3>
                      <p className="text-cyan-400 font-medium text-sm mb-1">
                        {experience.company}
                      </p>
                      <span className="text-sm text-gray-400 sm:hidden mb-2 block">
                        {experience.year}
                      </span>
                      
                      {/* Technologies */}
                      <div className="flex flex-wrap gap-1.5 mb-3 justify-center sm:justify-start hidden sm:flex">
                        {experience.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="inline-block rounded-md bg-gray-800/50 px-2 py-1 text-xs text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Date and Chevron */}
                    <div className="hidden sm:flex items-center space-x-2 ml-auto sm:ml-4 mt-0 sm:mt-0">
                      <span className="text-sm text-gray-400 whitespace-nowrap">
                        {experience.year}
                      </span>
                      <ChevronRightIcon
                        className={`w-4 h-4 text-gray-400 transition-all duration-300 ease-out group-hover:translate-x-1 ${
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
                        <div className="pt-4 mt-4 border-t border-gray-800/50">
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {experience.description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
};

export default Experience;