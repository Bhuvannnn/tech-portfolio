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
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

// Variants for content inside timeline elements
const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut"
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
        className="mb-16"
      >
        <motion.h2 
          variants={item}
          className="text-4xl font-bold text-center text-gray-900 mb-4"
        >
          Work <span className="text-blue-600">Experience</span>
        </motion.h2>
        <motion.div 
          variants={item}
          className="h-1 w-16 bg-blue-600 mx-auto"
        ></motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <VerticalTimeline lineColor="#3b82f6" animate={true}>
          {EXPERIENCES.map((experience, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work"
              contentStyle={{ 
                background: 'white', 
                color: '#374151',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                borderRadius: '1rem',
                border: '1px solid #e5e7eb'
              }}
              contentArrowStyle={{ borderRight: '7px solid white' }}
              date={experience.year}
              iconStyle={{ background: '#3b82f6', color: '#fff' }}
              icon={<Briefcase size={20} />}
            >
              <motion.h3
                variants={contentVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={0}
                className="vertical-timeline-element-title text-xl font-semibold text-gray-900"
              >
                {experience.role}
              </motion.h3>
              <motion.h4
                variants={contentVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={1}
                className="vertical-timeline-element-subtitle text-lg text-blue-600 font-medium"
              >
                {experience.company}
              </motion.h4>
              <motion.p
                variants={contentVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={2}
                className="text-gray-600 mt-3 leading-relaxed"
              >
                {experience.description}
              </motion.p>
              <motion.div
                variants={contentVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={3}
                className="mt-4 flex flex-wrap gap-2"
              >
                {experience.technologies.map((tech, techIndex) => (
                  <motion.span
                    key={techIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: techIndex * 0.05, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="inline-block rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-sm font-medium"
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </motion.div>
    </div>
  );
};

export default Experience;