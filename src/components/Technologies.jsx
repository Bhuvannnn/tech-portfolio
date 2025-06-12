import React, { useState } from 'react';
import { motion } from "framer-motion";
import { SKILLS } from "../constants";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

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
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

const Technologies = () => {
  const [selectedCategory, setSelectedCategory] = useState("Programming Languages");
  const selectedCategoryData = SKILLS.categories.find(cat => cat.name === selectedCategory);

  const renderSkillBars = () => {
    return selectedCategoryData.skills.map((skill, index) => (
      <motion.div
        key={skill.name}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="mb-4"
      >
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-300">{skill.name}</span>
          <span className="text-xs font-medium text-gray-400">{skill.level}%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2.5">
          <motion.div 
            className="h-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${skill.level}%` }}
            transition={{ duration: 1, delay: index * 0.1 }}
          ></motion.div>
        </div>
      </motion.div>
    ));
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 p-2 rounded-md border border-gray-700">
          <p className="text-cyan-400">{payload[0].payload.skill}: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <section id="technologies" className="my-24 scroll-mt-24">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mb-10"
      >
        <h2 className="mb-2 text-3xl font-bold tracking-tight">
          <motion.span variants={item} className="bg-gradient-to-r from-pink-500 via-blue-500 to-violet-500 bg-clip-text text-transparent">
            Skills & Technologies
          </motion.span>
        </h2>
        <motion.div variants={item} className="h-1 w-16 bg-cyan-600"></motion.div>
      </motion.div>

      <div className="mt-10 flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 mt-4 lg:mt-0 lg:pr-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-200">My Expertise</h3>
            
            <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
              {SKILLS.categories.map((category) => (
                <motion.button // Convert to motion.button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors duration-200 ${ // Use transition-colors
                    selectedCategory === category.name
                      ? "bg-cyan-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700" // Keep hover style for non-motion fallback
                  }`}
                  whileHover={{ scale: 1.05, backgroundColor: "#4b5563" }} // Scale up and change bg on hover (adjust color if needed)
                  whileTap={{ scale: 0.95 }} // Scale down on tap
                  transition={{ type: "spring", stiffness: 400, damping: 17 }} // Springy transition
                >
                  {category.name}
                </motion.button>
              ))}
            </div>
            
            <div className="mt-6">
              {renderSkillBars()}
            </div>
          </motion.div>
        </div>
        
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="h-80 p-4"
          >
            <h3 className="text-xl font-semibold mb-4 text-center text-gray-200">Skill Domains</h3>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={SKILLS.radarData}>
                <PolarGrid strokeOpacity={0.3} />
                <PolarAngleAxis dataKey="skill" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8' }} />
                <Radar
                  name="Skills"
                  dataKey="value"
                  stroke="#0891b2"
                  fill="#0891b2"
                  fillOpacity={0.5}
                />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;