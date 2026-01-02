import React, { useState } from 'react';
import { EDUCATION } from "../constants";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import { BlurFade } from "./BlurFade";

const Education = () => {
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
    <section id="education" className="corporate-section">
      <div className="max-w-6xl mx-auto">
        <BlurFade direction="up" duration={0.7}>
          <h2 className="corporate-heading border-b border-[#7C9A9A]/30 pb-4 mb-8">
            <span className="unified-accent">Education</span>
          </h2>
        </BlurFade>

        <div className="space-y-6">
          {EDUCATION.map((education, index) => (
            <BlurFade key={index} delay={0.15 * index} inView>
              <div
                className="corporate-card p-6 group cursor-pointer hover:border-[#7C9A9A]/50"
                onClick={() => handleCardClick(index)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
              <div className="flex items-start space-x-3 sm:space-x-4 w-full">
                {/* Institution Logo/Avatar */}
                <div className="flex-shrink-0 mb-0 sm:mb-0">
                  {education.logo ? (
                    <div className={`${
                        education.institution === "University of Southern California"
                          ? "w-14 h-14"
                          : "w-12 h-12"
                      } rounded-full bg-white flex items-center justify-center overflow-hidden shadow-sm border border-gray-200`}>
                      <img 
                        src={education.logo} 
                        alt={`${education.institution} logo`}
                        className={`${
                          education.institution === "University of Southern California" ? "w-12 h-12 scale-125" : "w-11 h-11 scale-110"
                        }`}
                        style={{ 
                          filter: 'contrast(1.1) brightness(1.05)',
                          imageRendering: 'crisp-edges',
                          ...(education.institution === "University of Southern California" && {
                            transform: 'scale(1.5)',
                            maxWidth: '64px',
                            maxHeight: '64px'
                          }),
                          ...(education.institution === "Indus University" && {
                            transform: 'scale(1.4)',
                            maxWidth: '52px',
                            maxHeight: '52px'
                          })
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7C9A9A] to-[#D4A5A5] flex items-center justify-center text-slate-800 font-bold text-lg shadow-sm">
                      {education.institution.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between w-full">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-800 mb-1 flex items-center gap-1 relative">
                        {education.degree}
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
                      <p className="unified-accent font-medium text-sm mb-1">
                        {education.institution}
                      </p>
                      <span className="text-sm text-slate-600 sm:hidden mb-2 block">
                        {education.year}
                      </span>
                      
                      {/* GPA and relevant courses */}
                      <div className="flex-wrap gap-2 mb-3 justify-center sm:justify-start hidden sm:flex">
                        {education.gpa && (
                          <span className="inline-block rounded-full bg-white/60 px-3 py-1.5 text-sm text-slate-700 border border-[#7C9A9A]/40">
                            GPA: {education.gpa}
                          </span>
                        )}
                        {education.relevantCourses?.slice(0, 3).map((course, courseIndex) => (
                          <span
                            key={courseIndex}
                            className="inline-block rounded-full bg-white/60 px-3 py-1.5 text-sm text-slate-700 border border-[#7C9A9A]/40"
                          >
                            {course}
                          </span>
                        ))}
                        {education.relevantCourses?.length > 3 && (
                          <span className="inline-block rounded-full bg-white/60 px-3 py-1.5 text-sm text-slate-700 border border-[#7C9A9A]/40">
                            +{education.relevantCourses.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Date and Chevron */}
                    <div className="hidden sm:flex items-center space-x-2 ml-auto sm:ml-4 mt-0 sm:mt-0">
                      <span className="text-sm text-slate-600 whitespace-nowrap">
                        {education.year}
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
                          <div className="space-y-3">
                            {education.description && (
                              <p className="corporate-text text-sm leading-relaxed">
                                {education.description}
                              </p>
                            )}
                            
                            {education.relevantCourses && education.relevantCourses.length > 0 && (
                              <div>
                                <h4 className="text-sm font-semibold text-slate-800 mb-2">Relevant Coursework:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {education.relevantCourses.map((course, courseIndex) => (
                                    <span
                                      key={courseIndex}
                                      className="inline-block rounded-full bg-white/60 px-3 py-1.5 text-sm text-slate-700 border border-[#7C9A9A]/40"
                                    >
                                      {course}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {education.achievements && education.achievements.length > 0 && (
                              <div>
                                <h4 className="text-sm font-semibold text-slate-800 mb-2">Key Achievements:</h4>
                                <ul className="list-none space-y-2 corporate-text text-sm">
                                  {education.achievements.map((achievement, achievementIndex) => (
                                    <li key={achievementIndex} className="flex items-start gap-3">
                                      <span className="unified-accent mt-1">•</span>
                                      <span>{achievement}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
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
    </section>
  );
};

export default Education;
