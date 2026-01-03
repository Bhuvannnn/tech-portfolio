import React from 'react';
import { SKILLS } from "../constants";
import { BlurFade } from "./BlurFade";
// Optionally import icons from react-icons
import { SiPython, SiJavascript, SiCsharp, SiMysql, SiSwift, SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiFirebase, SiReact, SiNextdotjs, SiTailwindcss, SiHtml5, SiCss3, SiPytorch, SiTensorflow, SiCplusplus, SiRedis, SiSqlite, SiFlask, SiDjango, SiFastapi, SiSpring, SiGraphql, SiTypescript } from "react-icons/si";
import { FaBrain, FaNetworkWired, FaRobot, FaDatabase, FaPalette, FaServer } from "react-icons/fa";

// Map skill names to icons (add more as needed)
const skillIcons = {
  Python: <SiPython className="inline mr-2 text-[#7C9A9A]" />, 
  "JavaScript": <SiJavascript className="inline mr-2 text-[#D4A5A5]" />,
  TypeScript: <SiTypescript className="inline mr-2 text-[#7C9A9A]" />, 
  "C#": <SiCsharp className="inline mr-2 text-[#A8B8D1]" />,
  "C++": <SiCplusplus className="inline mr-2 text-[#A8B8D1]" />,
  SQL: <SiMysql className="inline mr-2 text-[#A8B8D1]" />, 
  Swift: <SiSwift className="inline mr-2 text-[#FFB3BA]" />,
  "Node.js": <SiNodedotjs className="inline mr-2 text-[#A8B8D1]" />,
  Express: <SiExpress className="inline mr-2 text-slate-600" />,
  Flask: <SiFlask className="inline mr-2 text-[#7C9A9A]" />,
  Django: <SiDjango className="inline mr-2 text-[#7C9A9A]" />,
  FastAPI: <SiFastapi className="inline mr-2 text-[#A8B8D1]" />,
  "Spring Boot": <SiSpring className="inline mr-2 text-[#A8E6CF]" />,
  "REST API": <FaServer className="inline mr-2 text-[#D4A5A5]" />,
  GraphQL: <SiGraphql className="inline mr-2 text-[#D4A5A5]" />,
  MongoDB: <SiMongodb className="inline mr-2 text-[#A8B8D1]" />,
  PostgreSQL: <SiPostgresql className="inline mr-2 text-[#7C9A9A]" />,
  MySQL: <SiMysql className="inline mr-2 text-[#A8B8D1]" />,
  Firebase: <SiFirebase className="inline mr-2 text-[#D4A5A5]" />,
  Redis: <SiRedis className="inline mr-2 text-[#D4A5A5]" />,
  SQLite: <SiSqlite className="inline mr-2 text-[#7C9A9A]" />,
  React: <SiReact className="inline mr-2 text-[#A8B8D1]" />,
  "Next.js": <SiNextdotjs className="inline mr-2 text-slate-700" />,
  "HTML/CSS": <><SiHtml5 className="inline mr-1 text-[#D4A5A5]" /><SiCss3 className="inline mr-1 text-[#7C9A9A]" /></>,
  Tailwind: <SiTailwindcss className="inline mr-2 text-[#A8B8D1]" />,
  "UI/UX": <FaPalette className="inline mr-2 text-[#FFB3BA]" />,
  PyTorch: <SiPytorch className="inline mr-2 text-[#D4A5A5]" />,
  TensorFlow: <SiTensorflow className="inline mr-2 text-[#7C9A9A]" />,
  NLP: <FaBrain className="inline mr-2 text-[#A8B8D1]" />,
  "Generative AI": <FaRobot className="inline mr-2 text-[#A8B8D1]" />,
  LLMs: <FaBrain className="inline mr-2 text-[#7C9A9A]" />,
  "Neural Networks": <FaNetworkWired className="inline mr-2 text-[#A8B8D1]" />,
  "Data Science": <FaDatabase className="inline mr-2 text-[#A8B8D1]" />,
};

const Technologies = () => {
  return (
    <section id="technologies" className="corporate-section screen-line-before screen-line-after border-x border-[#7C9A9A]/30 py-8 sm:py-10">
      <div className="max-w-6xl mx-auto">
        <BlurFade direction="up" duration={0.7}>
          <h2 className="corporate-heading mb-6">
            Skills & <span className="unified-accent">Technologies</span>
          </h2>
        </BlurFade>

        <div className="space-y-0">
          {SKILLS.map((cat, i) => (
            <React.Fragment key={cat.category}>
              {i > 0 && <div className="section-grid-divider"></div>}
              <BlurFade delay={0.15 * i} inView>
                <div className="corporate-card p-4 group hover:border-[#7C9A9A]/50 screen-line-before screen-line-after border-x border-[#7C9A9A]/30">
                  <h4 className="corporate-subheading unified-accent text-base mb-3">{cat.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map(skill => (
                      <span
                        key={skill}
                        className="flex items-center px-3 py-1.5 bg-white/60 rounded-full text-xs text-slate-700 transition-all duration-300 hover:bg-[#7C9A9A]/30 hover:text-slate-800 hover:border-[#7C9A9A]/50 border border-[#7C9A9A]/40 cursor-pointer"
                      >
                        {skillIcons[skill] || null}{skill}
                      </span>
                    ))}
                  </div>
                </div>
              </BlurFade>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;