import React from 'react';
import { EXPERIENCES } from "../constants";
import { motion } from "framer-motion";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Briefcase } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

// Variants for content inside timeline elements
const contentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({ // Custom function to accept delay index
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1, // Stagger delay based on index
      duration: 0.4
    }
  })
};

const Experience = () => {
  return (
    <div id="experience" className="my-24 scroll-mt-24">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="mb-2 text-3xl font-bold tracking-tight">
          <motion.span variants={item} className="bg-gradient-to-r from-pink-500 via-blue-500 to-violet-500 bg-clip-text text-transparent">
            Experience
          </motion.span>
        </h2>
        <motion.div variants={item} className="h-1 w-16 bg-cyan-600"></motion.div>
      </motion.div>

      <VerticalTimeline lineColor="#0891b2" animate={true}>
        {EXPERIENCES.map((experience, index) => (
          <VerticalTimelineElement
            key={index}
            className="vertical-timeline-element--work"
            contentStyle={{ 
              background: 'rgba(15, 23, 42, 0.8)', 
              color: '#e2e8f0',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              borderRadius: '0.75rem',
              border: '1px solid rgba(30, 41, 59, 0.5)'
            }}
            contentArrowStyle={{ borderRight: '7px solid rgba(15, 23, 42, 0.8)' }}
            date={experience.year}
            iconStyle={{ background: '#0891b2', color: '#fff' }}
            icon={<Briefcase size={20} />}
          >
            <motion.h3
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              custom={0} // Delay index 0
              className="vertical-timeline-element-title text-xl font-semibold"
            >
              {experience.role}
            </motion.h3>
            <motion.h4
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              custom={1} // Delay index 1
              className="vertical-timeline-element-subtitle text-md text-cyan-400"
            >
              {experience.company}
            </motion.h4>
            <motion.p
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              custom={2} // Delay index 2
              className="text-sm mt-2 text-gray-300"
            >
              {experience.description}
            </motion.p>
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              custom={3} // Delay index 3
              className="mt-4 flex flex-wrap gap-2"
            >
              {experience.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="inline-block rounded-full bg-gray-800 px-3 py-1 text-xs"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default Experience;