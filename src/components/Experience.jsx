import { EXPERIENCES } from "../constants";
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Briefcase, Code, Users, Calendar } from 'lucide-react';

const Experience = () => {
  const getIcon = (role) => {
    if (role.toLowerCase().includes('teaching')) return BookOpen;
    if (role.toLowerCase().includes('data')) return Code;
    if (role.toLowerCase().includes('developer')) return Briefcase;
    return Users;
  };

  return (
    <div id="experience" className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 py-10 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10 md:mb-20 text-center"
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Professional Journey
        </h2>
      </motion.div>

      <div className="relative mx-auto max-w-6xl px-4">
        {/* Timeline line - centered */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-purple-500/50 to-pink-500/50" />

        {EXPERIENCES.map((experience, index) => {
          const IconComponent = getIcon(experience.role);
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="mb-8 md:mb-16"
            >
              <div className="relative flex flex-col lg:flex-row lg:items-center">
                {/* Timeline icon - centered */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="absolute left-1/2 -translate-x-1/2 z-10 rounded-full bg-neutral-900 p-2 shadow-lg border border-purple-500/30"
                >
                  <IconComponent className="h-5 w-5 md:h-6 md:w-6 text-purple-400" />
                </motion.div>

                {/* Content wrapper */}
                <div className="grid lg:grid-cols-2 w-full gap-4 md:gap-8 mt-8 md:mt-12">
                  {/* Date section */}
                  <motion.div
                    initial={{ x: isEven ? -50 : 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className={`mb-4 md:mb-8 lg:mb-0 ${
                      isEven ? 'lg:pr-8 lg:text-right' : 'lg:pl-8 lg:col-start-2'
                    }`}
                    style={{
                      marginLeft: isEven ? '50%' : '0',
                      marginRight: isEven ? '0' : '50%',
                      paddingLeft: isEven ? '2rem' : '0',
                      paddingRight: isEven ? '0' : '2rem'
                    }}
                  >
                    <div className="inline-flex items-center gap-2 rounded-lg bg-purple-500/10 px-3 py-2 md:px-4 md:py-3 backdrop-blur-sm
                                  border border-purple-500/20 hover:border-purple-500/40 transition-all">
                      <Calendar className="h-3 w-3 md:h-4 md:w-4 text-purple-400" />
                      <span className="text-sm md:text-base font-medium text-purple-400">
                        {experience.year}
                      </span>
                    </div>
                  </motion.div>

                  {/* Content card */}
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    whileHover={{ scale: 1.02 }}
                    className={`${
                      isEven ? 'lg:pl-8' : 'lg:pr-8 lg:col-start-1 lg:row-start-1'
                    }`}
                  >
                    <div className="rounded-xl bg-neutral-900/80 p-4 md:p-6 backdrop-blur-md border border-purple-500/10 
                                  hover:border-purple-500/30 transition-all shadow-lg hover:shadow-purple-500/5">
                      <div className="flex items-start justify-between mb-3 md:mb-4">
                        <div>
                          <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                            {experience.role}
                          </h3>
                          <h4 className="text-base md:text-lg bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                            {experience.company}
                          </h4>
                        </div>
                      </div>
                      <div className="mb-3 md:mb-4 text-neutral-300 space-y-1 md:space-y-2">
                        {experience.description.split('\n').map((line, i) => (
                          <p key={i} className="text-xs md:text-sm leading-relaxed">
                            {line.trim()}
                          </p>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {experience.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            whileHover={{ scale: 1.1 }}
                            className="rounded-full bg-purple-500/10 px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs font-medium text-purple-300 
                                     border border-purple-500/20 hover:border-purple-500/40 transition-colors"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Experience;