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
    <div id="experience" className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 py-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-20 text-center"
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Professional Journey
        </h2>
        {/* <p className="mt-4 text-neutral-400 max-w-2xl mx-auto">
          From teaching at USC to developing AI solutions, every role has shaped my expertise
        </p> */}
      </motion.div>

      <div className="relative mx-auto max-w-6xl px-4">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-purple-500/50 to-pink-500/50 lg:left-1/2" />

        {EXPERIENCES.map((experience, index) => {
          const IconComponent = getIcon(experience.role);
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="mb-16"
            >
              <div className="relative flex flex-col lg:flex-row lg:items-center">
                {/* Timeline icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="absolute left-6 z-10 rounded-full bg-neutral-900 p-2 shadow-lg border border-purple-500/30 lg:left-[calc(50%-1rem)]"
                >
                  <IconComponent className="h-6 w-6 text-purple-400" />
                </motion.div>

                {/* Content wrapper */}
                <div className="grid lg:grid-cols-2 w-full gap-8">
                  {/* Date section with enhanced styling */}
                  <motion.div
                    initial={{ x: isEven ? -50 : 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className={`mb-8 lg:mb-0 ${
                      isEven ? 'lg:pr-16 lg:text-right' : 'lg:pl-16 lg:col-start-2'
                    }`}
                  >
                    <div className="inline-flex items-center gap-2 rounded-lg bg-purple-500/10 px-4 py-3 backdrop-blur-sm
                                  border border-purple-500/20 hover:border-purple-500/40 transition-all">
                      <Calendar className="h-4 w-4 text-purple-400" />
                      <span className="text-base font-medium text-purple-400">
                        {experience.year}
                      </span>
                    </div>
                  </motion.div>

                  {/* Content card with refined styling */}
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    whileHover={{ scale: 1.02 }}
                    className={`${
                      isEven ? 'lg:pl-16' : 'lg:pr-16 lg:col-start-1 lg:row-start-1'
                    }`}
                  >
                    <div className="rounded-xl bg-neutral-900/80 p-6 backdrop-blur-md border border-purple-500/10 
                                  hover:border-purple-500/30 transition-all shadow-lg hover:shadow-purple-500/5">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">
                            {experience.role}
                          </h3>
                          <h4 className="text-lg bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                            {experience.company}
                          </h4>
                        </div>
                      </div>
                      <div className="mb-4 text-neutral-300 space-y-2">
                        {experience.description.split('\n').map((line, i) => (
                          <p key={i} className="text-sm leading-relaxed">
                            {line.trim()}
                          </p>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            whileHover={{ scale: 1.1 }}
                            className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300 
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