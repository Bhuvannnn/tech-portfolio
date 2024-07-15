import project1 from "../assets/projects/project-1.jpg";
import project2 from "../assets/projects/project-2.jpg";
import project3 from "../assets/projects/project-3.jpg";
import project4 from "../assets/projects/project-4.jpg";

export const HERO_CONTENT = `As a passionate graduate student at the University of Southern California, I specialize in crafting advanced Natural Language Processing (NLP) and Generative AI solutions. With 1.5 years of hands-on experience, I've developed expertise in building Large Language Models (LLMs) like Retrieval-Augmented Generation (RAG), Named Entity Recognition (NER) with DeBERTaV3, and BiLSTM-CNN architectures. Alongside my proficiency in LLMs, I also possess robust skills in full-stack development with technologies such as React, Next.js, Node.js, MySQL, PostgreSQL, and MongoDB. My goal is to blend my deep technical knowledge in AI with my web development skills to create innovative, scalable applications that deliver exceptional user experiences and drive business growth.`;

export const ABOUT_TEXT = `I am a dedicated and versatile professional specializing in software solutions majorly including Natural Language Processing (NLP) and Generative AI. Currently, as a graduate student at the University of Southern California, I am honing my skills in building advanced NLP architectures, including custom LSTM networks, RAG models, and fine-tuned transformers like DeBERTaV3. With a solid foundation in full-stack development, I have 1.5 years of experience working with front-end technologies like React and Next.js, and back-end technologies including Node.js, MySQL, PostgreSQL, and MongoDB. My journey in technology is driven by a deep curiosity and a commitment to solving complex problems through innovative solutions. I thrive in collaborative environments where I can contribute to cutting-edge projects and continuously learn new skills. Outside of my technical pursuits, I enjoy staying active, exploring new technologies, and contributing to open-source projects.`;

export const EXPERIENCES = [
  {
    year: "2024 - Present",
    role: "Teaching Associate",
    company: "University of Southern California",
    description: `As a Teaching Associate for "CSCI 526 - Advanced Mobile Devices and Game Consoles" a masters level course at the University of Southern California, I support the academic journey of 90 students. My responsibilities include conducting office hours where I provide guidance on C# coding challenges and course concepts. 
    I also create and deliver engaging lectures that cover key aspects of mobile and game console development. 
    Additionally, I grade assignments and projects, offering detailed feedback to help students refine their work across various project phases. 
    I develop innovative in-class coding activities to reinforce their learning and assist in integrating analytics into their games.`,
    technologies: ["C#", "Python", "SQL", "Firebase"],
  },
  {
    year: "December 2022 - May 2023",
    role: "Data Scientist Intern", 
    company: "Prompt Softech",
    description: `Created a custom BiLSTM - CNN neural network with a bifurcated architecture, achieving an impressive 83% accuracy.
    Built and fine-tuned proprietary technical indicators, achieving an average accuracy of 83%.
    Conducted comprehensive back testing, resulted in a substantial accuracy boost to 88%, while refining indicator parameters for optimal performance through MetaTrader using MQL4 and MQL5 scripting languages`,
    technologies: ["PyTorch", ,"ML", "SQL", "Tensorflow", "MetaTrader", "MQL", "JavaScript", "React.js", "Node.js"],
  },
  {
    year: "June 2021 - July 2021",
    role: "Data Analyst Intern",
    company: "Tornado Computers",
    description: `Collaborated on a project leveraging algorithms and IOT to optimize hardware performance; identifying bottlenecks, fine-tuning
                  system parameters, and predicting system failures, attaining a remarkable 92% accuracy in performance optimization
                  Implemented neural network for predictive maintenance by collecting and analyzing data from hardware sensors and logs, resulting in an 87% accuracy rate, reducing downtime and repair costs.`,
    technologies: ["Python", "IOT", "Raspberry Pi", "Postgres", 'Spatial Recognition'],
  },
  {
    year: "June 2020 - October 2020",
    role: "Software Developer Intern",
    company: "VueInternational",
    description: `Took proactive measures in designing and implementing interactive components using HTML, CSS, and JavaScript, seamlessly integrating with a sqlite3 database to facilitate secure credit card transactions through the Stripe API
Integrated dynamic components into company's website, sparking a substantial 15% surge in user engagement and modeled a commendable 20% enhancement in transaction security.`,
    technologies: ["SqLite", "Stripe", "API Integration"],
  },
];

export const PROJECTS = [
  {
    title: "Assessing and Masking of Personally Identifiable Information (PII)",
    image: project1,
    description: `The project involves advancing privacy protection by designing a Named Entity Recognition (NER) system using the DeBERTaV3 model as its backbone.
                  The primary enhancement is the integration of another dense layer with softmax activation function and relative position embedding for decoupling the attention scores, which more accurately identifies and obfuscate various types of personally identifiable information (PII) within textual data. This modified architecture leverages advanced contextual understanding and token-level prediction capabilities, surpassing conventional NER systems limited to a narrow set of predefined PII tags. The F-Beta Score generated with this model is 99.56%.
                  The project's innovation ensures adaptable and comprehensive data privacy solutions, aligning with stringent regulatory requirements and addressing the dynamic nature of PII.`,
technologies: ["PyTorch", "DebertaV3", "Transformers", "MongoDB"],
  },
  {
    title: "Me, Myself and Time: A Game based on Time Travel",
    image: project2,
    description:
      "The is a 6-month project for my class 'Advanced Mobile Devices and Game Consoles'. Unity 2D game focused on time travel, hosted on WebGL for global access. It features intricate time-travel mechanics and integrates robust analytics to monitor gameplay. Technologies used include C# for scripting, Python for data processing, and Firebase for real-time data storage. Visual analytics are implemented using Tableau, with tools like heatmaps, Sankey diagrams, and bar plots to provide detailed insights into player behavior. Conducted under Professor Scott Easley in the Advanced Games Development course at USC, the project combines advanced game development with comprehensive data analysis to enhance player engagement and experience, To play the game, visit 'https://taylorashley30.github.io/GoldBuild/' .",
    technologies: ["C#", "Python", "Tableau", "Firebase"],
  },
  {
    title: "Portfolio Website",
    image: project3,
    description:
      "My portfolio website, built with React and styled using Tailwind CSS, showcases my projects with a modern, responsive design. React powers the dynamic, interactive interface, while Tailwind ensures a sleek and professional appearance across all devices. This site reflects my skills in web development and design, integrating various technologies for enhanced functionality and user experience.",
    technologies: ["React", "Tailwind", "Bootstrap"],
  },
  {
    title: "Forecast Finesse: Analysing stock performance",
    image: project4,
    description:
      "Created a robust platform integrating sentiment analysis and real-time stock trading for NASDAQ-listed companies. Utilizing customized NLTK and BeautifulSoup, the system analyzes live Twitter and Google News feeds with 92% accuracy. The platform features a dynamic dashboard built with the MERN stack and hosted on Google Cloud Platform (GCP), offering live streaming data from Yahoo Finance. Users can view real-time graphs of stocks, and execute live buy and sell transactions. This comprehensive tool combines sentiment insights and trading capabilities, boosting general user profitability by 24% compared to other platforms",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "GCP", "NLTK",],
  },
];

export const CONTACT = {
  address: "325 W Adams Blvd, Los Angeles, CA 90007",
  phoneNo: "+1 (213) 331 1360 ",
  email: "bhuvanshah288@gmail.com",
};
