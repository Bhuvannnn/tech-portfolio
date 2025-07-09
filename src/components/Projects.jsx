import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { PROJECTS } from "../constants";
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = () => {
  const [loadedImages, setLoadedImages] = useState({});

  // Handle image load for lazy loading
  const handleImageLoad = (projectIndex) => {
    setLoadedImages(prev => ({
      ...prev,
      [projectIndex]: true
    }));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15
      }
    }
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      } 
    }
  };

  return (
    <div id="projects" className="border-b border-gray-200 pb-16">
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl font-bold text-center text-gray-900 mb-16"
      >
        Featured <span className="text-blue-600">Projects</span>
      </motion.h2>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {PROJECTS.map((project, index) => (
          <ProjectCard 
            key={index} 
            project={project} 
            index={index}
            variants={projectVariants}
            onImageLoad={() => handleImageLoad(index)}
            isLoaded={loadedImages[index]}
          />
        ))}
      </motion.div>
    </div>
  );
};

// Project Card Component with Bento Grid Layout
const ProjectCard = ({ project, index, variants, onImageLoad, isLoaded }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isHovered, setIsHovered] = useState(false);

  // Determine card size based on index for bento grid effect
  const getCardSize = (index) => {
    if (index === 0) return "md:col-span-2 md:row-span-2"; // Large card
    if (index === 1) return "md:col-span-1 md:row-span-2"; // Tall card
    if (index === 2) return "md:col-span-1 md:row-span-1"; // Regular card
    if (index === 3) return "md:col-span-2 md:row-span-1"; // Wide card
    return "md:col-span-1 md:row-span-1"; // Default regular card
  };

  const handleGitHubClick = (e) => {
    e.stopPropagation();
    window.open(project.github, "_blank");
  };

  const handleLiveClick = (e) => {
    e.stopPropagation();
    if (project.live) {
      window.open(project.live, "_blank");
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 ${getCardSize(index)}`}
      variants={variants}
      animate={isInView ? "visible" : "hidden"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.open(project.github, "_blank");
        }
      }}
      role="button"
      aria-label={`View ${project.title} project`}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <div className="aspect-video bg-gray-200 animate-pulse">
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <motion.img
            src={project.image}
            alt={project.title}
            className={`w-full h-full object-cover transition-transform duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${isHovered ? 'scale-105' : 'scale-100'}`}
            onLoad={onImageLoad}
            loading="lazy"
          />
        </div>
        
        {/* Overlay with project info */}
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-xl font-semibold mb-2"
            >
              {project.title}
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-sm text-gray-200 mb-4 line-clamp-3"
            >
              {project.description}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="flex gap-2"
            >
              <button
                onClick={handleGitHubClick}
                data-project-link="github"
                data-project-name={project.title}
                className="flex items-center gap-2 px-3 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors duration-200 text-sm"
                aria-label={`View ${project.title} on GitHub`}
              >
                <FaGithub size={16} />
                GitHub
              </button>
              {project.live && (
                <button
                  onClick={handleLiveClick}
                  data-project-link="live"
                  data-project-name={project.title}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
                  aria-label={`View ${project.title} live demo`}
                >
                  <FaExternalLinkAlt size={14} />
                  Live Demo
                </button>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Content for non-hover state */}
      <div className="p-6">
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200"
        >
          {project.title}
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-gray-600 text-sm mb-4 line-clamp-3"
        >
          {project.description}
        </motion.p>
        
        {/* Technologies */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-wrap gap-2 mb-4"
        >
          {project.technologies.slice(0, 4).map((tech, techIndex) => (
            <motion.span
              key={techIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: techIndex * 0.05, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md font-medium"
            >
              {tech}
            </motion.span>
          ))}
          {project.technologies.length > 4 && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium"
            >
              +{project.technologies.length - 4} more
            </motion.span>
          )}
        </motion.div>

        {/* Action buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex gap-2"
        >
          <button
            onClick={handleGitHubClick}
            data-project-link="github"
            data-project-name={project.title}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium"
            aria-label={`View ${project.title} on GitHub`}
          >
            <FaGithub size={14} />
            Code
          </button>
          {project.live && (
            <button
              onClick={handleLiveClick}
              data-project-link="live"
              data-project-name={project.title}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
              aria-label={`View ${project.title} live demo`}
            >
              <FaExternalLinkAlt size={12} />
              Demo
            </button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Projects;