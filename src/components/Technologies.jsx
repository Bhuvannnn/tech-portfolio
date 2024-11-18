import React, { useState } from 'react';
import { RiReactjsLine } from "react-icons/ri";
import { FaNodeJs } from "react-icons/fa";
import { SiPython, SiMongodb, SiJavascript, SiDocker, SiTensorflow } from 'react-icons/si';
import { BiLogoPostgresql } from "react-icons/bi";
import { motion } from 'framer-motion';

const TechnologiesGrid = () => {
  const [hoveredTech, setHoveredTech] = useState(null);

  const technologies = [
    {
      id: 'react',
      icon: RiReactjsLine,
      name: 'React',
      color: 'text-cyan-400',
      experience: '3+ years',
      type: 'Frontend Development'
    },
    {
      id: 'nodejs',
      icon: FaNodeJs,
      name: 'Node.js',
      color: 'text-green-500',
      experience: '3+ years',
      type: 'Backend Development'
    },
    {
      id: 'python',
      icon: SiPython,
      name: 'Python',
      color: 'text-blue-500',
      experience: '4+ years',
      type: 'Programming Language'
    },
    {
      id: 'mongodb',
      icon: SiMongodb,
      name: 'MongoDB',
      color: 'text-green-500',
      experience: '2+ years',
      type: 'Database'
    },
    {
      id: 'javascript',
      icon: SiJavascript,
      name: 'JavaScript',
      color: 'text-yellow-400',
      experience: '4+ years',
      type: 'Programming Language'
    },
    {
      id: 'tensorflow',
      icon: SiTensorflow,
      name: 'TensorFlow',
      color: 'text-orange-500',
      experience: '2+ years',
      type: 'Machine Learning'
    },
    {
      id: 'docker',
      icon: SiDocker,
      name: 'Docker',
      color: 'text-blue-400',
      experience: '2+ years',
      type: 'DevOps'
    },
    {
      id: 'postgresql',
      icon: BiLogoPostgresql,
      name: 'PostgreSQL',
      color: 'text-sky-700',
      experience: '3+ years',
      type: 'Database'
    }
  ];

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: 'easeOut'
      }
    })
  };

  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-light text-center text-neutral-200">Technical Expertise</h2>
        <div className="mt-2 w-24 h-1 bg-neutral-700 mx-auto"></div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto px-4">
        {technologies.map((tech, index) => {
          const Icon = tech.icon;
          return (
            <motion.div
              key={tech.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              variants={fadeInVariants}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredTech(tech.id)}
              onMouseLeave={() => setHoveredTech(null)}
              className="group relative"
            >
              <div className="relative overflow-hidden bg-neutral-900 rounded-lg p-6 transition-all duration-300 ease-in-out border border-neutral-800 hover:border-neutral-700">
                <div className="flex flex-col items-center space-y-3">
                  <Icon className={`text-4xl ${tech.color} transition-all duration-300 group-hover:scale-110`} />
                  <span className="text-sm text-neutral-400 font-light">
                    {tech.name}
                  </span>
                </div>

                {hoveredTech === tech.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute inset-0 bg-neutral-900/95 flex flex-col items-center justify-center p-4 backdrop-blur-sm"
                  >
                    <p className="text-sm text-neutral-400 text-center">
                      {tech.type}
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">
                      {tech.experience}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default TechnologiesGrid;