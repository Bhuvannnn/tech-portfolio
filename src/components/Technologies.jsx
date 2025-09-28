import React from 'react';
import { SKILLS } from "../constants";
import { BlurFade } from "./BlurFade";
// Optionally import icons from react-icons
import { SiPython, SiJavascript, SiCsharp, SiMysql, SiSwift, SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiFirebase, SiReact, SiNextdotjs, SiTailwindcss, SiHtml5, SiCss3 } from "react-icons/si";
import { FaBrain, FaNetworkWired, FaRobot, FaDatabase, FaPalette } from "react-icons/fa";

// Map skill names to icons (add more as needed)
const skillIcons = {
  Python: <SiPython className="inline mr-2 text-blue-400" />, 
  "JavaScript": <SiJavascript className="inline mr-2 text-yellow-400" />, 
  "C#": <SiCsharp className="inline mr-2 text-purple-400" />, 
  SQL: <SiMysql className="inline mr-2 text-teal-400" />, 
  Swift: <SiSwift className="inline mr-2 text-pink-400" />,
  "Node.js": <SiNodedotjs className="inline mr-2 text-green-500" />,
  Express: <SiExpress className="inline mr-2 text-gray-400" />,
  MongoDB: <SiMongodb className="inline mr-2 text-green-700" />,
  PostgreSQL: <SiPostgresql className="inline mr-2 text-blue-700" />,
  Firebase: <SiFirebase className="inline mr-2 text-yellow-500" />,
  React: <SiReact className="inline mr-2 text-cyan-400" />,
  "Next.js": <SiNextdotjs className="inline mr-2 text-gray-200" />,
  "HTML/CSS": <><SiHtml5 className="inline mr-1 text-orange-500" /><SiCss3 className="inline mr-1 text-blue-500" /></>,
  Tailwind: <SiTailwindcss className="inline mr-2 text-cyan-500" />,
  "UI/UX": <FaPalette className="inline mr-2 text-pink-300" />,
  NLP: <FaBrain className="inline mr-2 text-purple-300" />,
  "Generative AI": <FaRobot className="inline mr-2 text-green-300" />,
  LLMs: <FaBrain className="inline mr-2 text-blue-300" />,
  "Neural Networks": <FaNetworkWired className="inline mr-2 text-indigo-300" />,
  "Data Science": <FaDatabase className="inline mr-2 text-teal-300" />,
};

const Technologies = () => {
  return (
    <section id="technologies" className="corporate-section">
      <div className="max-w-6xl mx-auto">
        <h2 className="corporate-heading">
          Skills & <span className="unified-accent">Technologies</span>
        </h2>
        <div className="corporate-card p-8">
          <div className="space-y-8">
            {SKILLS.map((cat, i) => (
              <BlurFade key={cat.category} delay={0.05 * (i + 1)} inView>
                <div>
                  <h4 className="corporate-subheading unified-accent">{cat.category}</h4>
                  <div className="flex flex-wrap gap-3">
                    {cat.skills.map(skill => (
                      <span
                        key={skill}
                        className="flex items-center px-4 py-2 bg-gray-700/50 rounded-full text-sm text-gray-200 transition-all duration-300 hover:bg-blue-500/20 hover:text-blue-300 hover:border-blue-500/30 border border-gray-600/50 cursor-pointer"
                      >
                        {skillIcons[skill] || null}{skill}
                      </span>
                    ))}
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;