import React, { useState } from 'react';
import { motion } from "framer-motion";
import { SKILLS } from "../constants";

const Technologies = () => {
  const [selectedCategory, setSelectedCategory] = useState("Programming Languages");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
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

  const renderSkillBars = () => {
    const selectedCategoryData = SKILLS.categories.find(cat => cat.name === selectedCategory);
    if (!selectedCategoryData) return null;

    return selectedCategoryData.skills.map((skill, index) => (
      <motion.div
        key={skill.name}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
        className="mb-6"
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{skill.name}</span>
          <span className="text-xs font-medium text-gray-500">{skill.level}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div 
            className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
            initial={{ width: 0 }}
            animate={{ width: `${skill.level}%` }}
            transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
          ></motion.div>
        </div>
      </motion.div>
    ));
  };

  return (
    <section id="technologies" className="my-24 scroll-mt-24">
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
          Skills & <span className="text-blue-600">Technologies</span>
        </motion.h2>
        <motion.div 
          variants={item}
          className="h-1 w-16 bg-blue-600 mx-auto"
        ></motion.div>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {SKILLS.categories.map((category, index) => (
              <motion.button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.name
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Skill Bars */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-2xl font-semibold mb-6 text-gray-900"
            >
              {selectedCategory}
            </motion.h3>
            {renderSkillBars()}
          </motion.div>

          {/* Skills Overview */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-2xl font-semibold mb-6 text-gray-900"
            >
              Expertise Overview
            </motion.h3>
            <div className="space-y-6">
              {SKILLS.categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="border-l-4 border-blue-600 pl-4"
                >
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {category.name}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.slice(0, 3).map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: skillIndex * 0.05, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium"
                      >
                        {skill.name}
                      </motion.span>
                    ))}
                    {category.skills.length > 3 && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full font-medium"
                      >
                        +{category.skills.length - 3} more
                      </motion.span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl"
        >
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-2xl font-semibold text-center text-gray-900 mb-8"
          >
            Additional Skills & Tools
          </motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Git & GitHub", "Docker", "AWS", "Firebase",
              "REST APIs", "GraphQL", "CI/CD", "Agile/Scrum",
              "Data Analysis", "Machine Learning", "Tableau", "PostgreSQL"
            ].map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
                className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <span className="text-gray-700 font-medium">{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Technologies;