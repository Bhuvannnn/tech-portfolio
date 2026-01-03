import project1 from "../assets/projects/project-1.jpg";
import project2 from "../assets/projects/project-2.png";
import project3 from "../assets/projects/project-3.png";
import project4 from "../assets/projects/project-4.jpg";
import project5 from "../assets/projects/project-5.png";
import project6 from "../assets/projects/project-6.png";
import project7 from "../assets/projects/project-7.png";
import project8 from "../assets/projects/project-8.png";
import project9 from "../assets/projects/project-9.png";
import project10 from "../assets/projects/project-10.png";

import uscLogo from "../assets/companies/usc.png";
import promptSoftechLogo from "../assets/companies/prompt-softech.png";
import tornadoComputersLogo from "../assets/companies/tornado-computers.png";
import vueInternationalLogo from "../assets/companies/vue-international.svg";
import easleyDunnLogo from "../assets/companies/easley_dunn_productions_logo.jpeg";
import indusUniversityLogo from "../assets/companies/indus.svg";

const getCompanyLogo = (companyName) => {
  switch (companyName) {
    case "University of Southern California":
      return uscLogo;
    case "Prompt Softech":
      return promptSoftechLogo;
    case "Tornado Computers":
      return tornadoComputersLogo;
    case "VueInternational":
      return vueInternationalLogo;
    case "Easley-Dunn Productions, Inc.":
      return easleyDunnLogo;
    case "Easley Dunn Productions":
      return easleyDunnLogo;
    case "Indus University":
      return indusUniversityLogo;
    default:
      return null;
  }
};

export const HERO_CONTENT = `Software Engineer & Data Practitioner blending full-stack engineering, ML pipelines, and real-time systems to build scalable, intelligent products. `;

export const ABOUT_TEXT = `Software Engineer specializing in scalable systems and machine learning applications. 

Expertise spans transformers, LSTMs, backend engineering (Node.js, Python, SQL), and cloud data pipelines on AWS/GCP.

Delivering real-world ML solutions in NLP, privacy, and analytics with solid engineering practices.`;

export const EXPERIENCES = [
  {
    year: "July 2025 - Present",
    role: "Software Development Engineer",
    company: "Easley-Dunn Productions, Inc.",
    logo: getCompanyLogo("Easley-Dunn Productions, Inc."),
    bullets: [
      "Led cross-functional Agile team in aligning runtime data flow across 5 systems; reduced integration bugs by 40% and accelerated QA by 30% via schema validation and telemetry workflows.",
      "Developed real-time telemetry and crash logging pipeline in Unity (C#) using JSON and runtime hooks, improving observability and debugging efficiency by 60% during Agile sprints.",
      "Orchestrated Apache Kafka streaming pipelines across 5 distributed systems with schema validation frameworks, reducing data integration errors by 40% and improving ML deployment cycles by 30%.",
      "Architected real-time data ingestion pipelines processing 100K+ events/hour using Python and JSON, implementing automated anomaly detection that improved system observability and reduced debugging time by 60%."
    ],
    technologies: ["C#", "RESTAPIs", "JSON", "Runtime Hooks", "Agile", "Telemetry", "Crash Logging", "Apache Kafka", "Distributed Systems"],
  },
  {
    year: "May 2024 - May 2025",
    role: "Teaching Assistant",
    company: "University of Southern California",
    logo: getCompanyLogo("University of Southern California"),
    bullets: [
      "Mentored 360+ students in system architecture design and algorithm optimization, implementing design patterns and OOP principles in Python and C#, achieving 90% success rate in scalable, production-ready applications.",
      "Architected 6+ DevOps simulation environments with Firebase real-time databases and automated CI/CD pipelines, enabling students to process 10K+ events and implement microservices testing frameworks using JUnit.",
      "Mentored 360+ students in data-driven game analytics, teaching Python statistical analysis and machine learning algorithms for player behavior prediction, resulting in 90% of teams implementing predictive models.",
      "Engineered data science curricula integrating real-time analytics frameworks, enabling students to process 10K+ gameplay events through ETL pipelines and build recommendation systems using collaborative filtering."
    ],
    technologies: ["C#", "Python", "SQL", "Firebase"],
  },
  {
    year: "December 2022 - May 2023",
    role: "Data Scientist Intern", 
    company: "Prompt Softech",
    logo: getCompanyLogo("Prompt Softech"),
    bullets: [
      "Developed distributed microservices architecture using Spring Boot and Kubernetes orchestration; implemented asynchronous processing with PostgreSQL, improving pipeline scalability by 40% and enabling fault-tolerant model deployment.",
      "Designed CI/CD pipelines with Jenkins and GitHub Actions to automate build, test, and deployment across microservices, cutting integration overhead by 30% and improving release frequency with GitOps-enabled rollbacks.",
      "Deployed production LSTM model achieving 93% accuracy in stock price prediction, processing multi-modal datasets (price + sentiment) through feature engineering pipelines and generating $12K+ in trading profits for 12 clients.",
      "Optimized big data workflows using Apache Hadoop and Spark, reducing 50GB+ dataset retrieval time by 35% and enabling real-time predictive analytics."
    ],
    technologies: ["PyTorch", "ML", "SQL", "Tensorflow", "MetaTrader", "MQL", "JavaScript", "React.js", "Node.js"],
  },
  {
    year: "June 2021 - July 2021",
    role: "Data Analyst Intern",
    company: "Tornado Computers",
    logo: getCompanyLogo("Tornado Computers"),
    bullets: [
      "Built real-time anomaly detection system achieving 92% accuracy using Apache Kafka streaming and IoT sensor fusion, implementing ensemble machine learning models for predictive maintenance across 50+ hardware systems.",
      "Implemented TensorFlow-based neural networks and Airflow-orchestrated pipelines processing 120K+ sensor readings daily, reducing operational costs by 87%."
    ],
    technologies: ["Python", "IOT", "Raspberry Pi", "Postgres", 'Spatial Recognition'],
  },
  {
    year: "June 2020 - October 2020",
    role: "Software Developer Intern",
    company: "VueInternational",
    logo: getCompanyLogo("VueInternational"),
    bullets: [
      "Implemented React/Node.js architecture with Redis caching and MongoDB clustering, boosting API throughput by 25% and supporting 2x concurrent users via optimized indexing.",
      "Dockerized and integrated Stripe APIs to streamline secure payment workflows, reducing transaction errors by 20%."
    ],
    technologies: ["SqLite", "Stripe", "API Integration"],
  },
];

export const PROJECTS = [
  {
    title: "Compact JSON (CJSON): Token-Efficient Serialization Format",
    image: project10,
    shortDescription: "A token-efficient, human-readable serialization format optimized for LLM interactions with 40-70% token reduction.",
    description: `Compact JSON (CJSON) is a production-ready token-efficient serialization format inspired by TOON and optimized for LLM interactions. The library provides encode/decode/parsing APIs with rich error reporting.

Key Technical Achievements:
- Achieved 40-70% token reduction compared to standard JSON, significantly improving LLM interaction efficiency
- Designed familiar key/value syntax with optional compact array headers for human readability
- Implemented inline, multi-line, and compact array formats for flexible data representation
- Built-in comment support (# comment) for better documentation and configuration files
- Zero runtime dependencies, written entirely in TypeScript for maximum compatibility
- Comprehensive encode/decode/parsing APIs with rich error reporting and validation support
- Published as npm package @bhuvanshah/cjson with full CI/CD pipeline via GitHub Actions
- Includes AST-based parsing architecture for flexible document processing and transformation
- Full test coverage with Vitest and comprehensive benchmarks for performance optimization`,
    technologies: ["TypeScript", "JSON", "Parsing", "Encoding", "AST", "NPM Package", "CI/CD"],
    github: "https://github.com/Bhuvannnn/CJSON",
  },
  {
    title: "NoteScape: Semantic Knowledge Graph Visualization System",
    image: project9,
    shortDescription: "A full-stack app that turns your notes into an interactive knowledge graph.",
    description: `Developed NoteScape, a full-stack application that transforms scattered notes into an interactive knowledge graph by automatically detecting relationships between ideas.

Key Technical Features:
- Built with React.js and D3.js for interactive frontend visualization and user interface
- Implemented FastAPI backend with custom NLP algorithms for relationship extraction
- Utilized Neo4j graph database for efficient relationship storage and querying
- Created responsive UI with Material UI components for seamless user experience
- Developed automatic relationship detection system using natural language processing
- Added support for importing notes from various formats (text, markdown, etc.)
- Implemented real-time graph visualization with zoom, pan, and search capabilities`,
    technologies: ["React.js", "D3.js", "FastAPI", "Neo4j", "Python", "NLP", "Docker"],
    github: "https://github.com/Bhuvannnn/NoteScape",
  },

  {title: "SpotifyDash: Desktop Music Control Widget",
    image: project8,
    shortDescription: "A macOS widget for instant Spotify control.",
    description: `SpotifyDash is a macOS widget application built with SwiftUI and WidgetKit that provides users with instant access to their Spotify playback controls and real-time track information directly from their desktop.

Key Features:
- Built with SwiftUI and WidgetKit for native macOS integration and optimal performance
- Implemented sophisticated dual-control architecture combining Spotify Web API with AppleScript
- Achieved 95% functionality even during API outages through intelligent fallback systems
- Automated authentication system for seamless user experience
- Intelligent caching of album artwork for instant loading and reduced API calls
- Responsive UI that updates within 1 second of track changes for real-time experience
- Reduced music control time by 65% compared to opening the full Spotify application`,
    technologies: ["SwiftUI", "WidgetKit", "Spotify API", "AppleScript", "Rest APIs", "Swift"],
    github: "https://github.com/Bhuvannnn/MusicWidgetApp",
  },

  {title: "Healthcare Resource Optimization and Dashboard",
    image: project7,
    shortDescription: "A real-time dashboard for healthcare resource monitoring.",
    description: `Designed and developed a real-time Healthcare Resource Dashboard using Python, Flask, and PostgreSQL, enabling administrators to monitor bed occupancy, staff workload, and equipment usage.

Key Achievements:
- Achieved 95% resource utilization across 4 departments and 20+ medical equipment units
- Implemented ETL pipelines processing 1000+ daily healthcare records with real-time processing
- Built interactive analytics dashboard with Chart.js for comprehensive data visualization
- Leveraged microservices architecture and Docker containerization, reducing deployment time by 30%
- Established CI/CD pipelines with Jenkins for automated testing and deployment
- Ensured scalability and security through RESTful API design and environment variable protection
- Integrated database security configurations for HIPAA compliance and data protection`,
    technologies: ["Python", "Flask", "PostgreSQL", "ETL", "Chart.js", "Docker", "Jenkins", "CI/CD"],
    github: "https://github.com/Bhuvannnn/Healthcare-Resource-Optimisation-",
  },

  {title: "Statistical Analysis of Cultural Representation in Video Games and it's Impact on Player Anxiety & Engagement",
    image: project6,
    shortDescription: "Research on cultural representation and player anxiety in video games.",
    description: `In this project, I spearheaded a research initiative to explore how culturally relevant elements in video games affect player anxiety and engagement.

Research Methodology:
- Designed mixed experimental study with 27 participants from Indian cultural backgrounds
- Assessed pre- and post-exposure anxiety levels using State-Trait Anxiety Inventory
- Measured engagement through comprehensive Likert scales and behavioral analysis
- Applied rigorous statistical methods including 2×2 and 2×2×2 mixed ANOVAs
- Conducted multiple regression analyses in Python and SPSS for comprehensive data analysis

Key Findings:
- Revealed significant interaction effects (p = 0.030, partial η² = 0.174, Cohen's d = 0.92)
- Confirmed that culturally aligned game content reduces anxiety and enhances engagement
- Engineered robust data pipelines improving data quality by 15% through advanced processing
- Provided actionable recommendations for integrating cultural sensitivity into game design
- Contributed to understanding of cultural representation impact on player psychology`,
technologies: ["Python", "SPSS", "ANOVA", "Regression Analysis", "Statistical Analysis", "Data Engineering"],
github: "https://github.com/Bhuvannnn/Statistical-Analysis-of-Cultural-Representation-in-Video-Games",
  },
  
  {title: "Real-Time Collaborative Document Platform",
    image: project5,
    shortDescription: "A real-time collaborative document editing platform.",
    description: `Developed a full-stack real-time collaborative document editing platform using microservices architecture, enabling multiple users to simultaneously edit and collaborate on documents with features similar to Google Docs.
Key Technical Achievements:
- Engineered a scalable microservices architecture using Node.js and Express.js, implementing JWT authentication, real-time WebSocket communication, and document management services, achieving 99.9% service availability
- Architected real-time collaboration system using Socket.IO, enabling simultaneous document editing with <100ms latency and automatic conflict resolution for concurrent edits
- Implemented secure document sharing system with role-based access control (read/write permissions) and real-time user presence tracking, supporting 100+ concurrent users
- Designed responsive frontend using React.js and Material-UI, featuring real-time typing indicators, user presence awareness, and seamless document synchronization
- Utilized MongoDB Atlas for scalable data storage, implementing efficient document versioning and access control mechanisms
- Deployed microservices on Render with continuous integration/deployment via GitHub Actions, and frontend on Vercel, ensuring high availability and scalable performance`,
technologies: ["React.js", "Node.js", "Express.js", "MongoDB Atlas", "Socket.IO", "JWT"],
github: "https://github.com/Bhuvannnn/real-time-collab",
  },
  {
    title: "Assessing and Masking of Personally Identifiable Information (PII)",
    image: project1,
    shortDescription: "A PII detection and masking system.",
    description: `The project involves advancing privacy protection by designing a Named Entity Recognition (NER) system using the DeBERTaV3 model as its backbone.

Key Technical Innovations:
- Designed advanced NER system using DeBERTaV3 model as backbone for superior contextual understanding
- Integrated additional dense layer with softmax activation function for enhanced prediction accuracy
- Implemented relative position embedding for decoupling attention scores and improving PII detection
- Achieved 99.56% F-Beta Score, surpassing conventional NER systems with limited predefined PII tags
- Leveraged advanced contextual understanding and token-level prediction capabilities
- Ensured adaptable and comprehensive data privacy solutions for regulatory compliance
- Addressed dynamic nature of PII with flexible detection and masking mechanisms`,
technologies: ["PyTorch", "DebertaV3", "Transformers", "MongoDB"],
github: "https://github.com/Bhuvannnn/PII-Detection-and-Masking",
  },
  {
    title: "Me, Myself and Time: A Game based on Time Travel",
    image: project2,
    shortDescription: "A Unity 2D game about time travel.",
    description: `A comprehensive 6-month project for the 'Advanced Mobile Devices and Game Consoles' course, developing a Unity 2D game focused on time travel mechanics.

Game Development Features:
- Built intricate time-travel mechanics using Unity 2D with C# scripting for complex gameplay
- Hosted on WebGL for global accessibility and cross-platform compatibility
- Implemented robust analytics system to monitor and analyze player behavior patterns
- Integrated Firebase for real-time data storage and seamless multiplayer capabilities
- Developed comprehensive data processing pipeline using Python for analytics

Analytics and Visualization:
- Created visual analytics dashboard using Tableau with interactive heatmaps and Sankey diagrams
- Implemented bar plots and statistical visualizations for detailed player behavior insights
- Conducted comprehensive data analysis to enhance player engagement and experience
- Combined advanced game development with data science for optimal user experience
- Project supervised by Professor Scott Easley in USC's Advanced Games Development course`,
    technologies: ["C#", "Python", "Tableau", "Firebase", "Unity", "Git"],
    github: "https://github.com/Bhuvannnn/Me-Myself-and-Time",
  },
  {
    title: "Portfolio Website",
    image: project3,
    shortDescription: "My personal portfolio website.",
    description: `A modern, responsive portfolio website showcasing my projects and professional experience with a sleek, interactive design.

Technical Implementation:
- Built with React.js for dynamic, interactive user interface and component-based architecture
- Styled using Tailwind CSS for modern, responsive design across all device sizes
- Integrated Bootstrap components for enhanced UI elements and consistent styling
- Implemented smooth animations and transitions using Framer Motion for engaging user experience
- Designed with mobile-first approach ensuring optimal performance on all devices

Key Features:
- Responsive design that adapts seamlessly to desktop, tablet, and mobile devices
- Interactive project showcase with detailed modals and live demo links
- Professional contact form with real-time validation and submission handling
- Smooth scrolling navigation with active section highlighting
- Modern glassmorphism design elements with gradient backgrounds and blur effects`,
    technologies: ["React", "Tailwind", "Bootstrap", "JavaScript"],
    github:"https://github.com/Bhuvannnn/tech-portfolio",
  },
  {
    title: "Forecast Finesse: Analysing stock performance",
    image: project4,
    shortDescription: "A platform for sentiment analysis and real-time stock trading.",
    description: `A comprehensive platform integrating advanced sentiment analysis with real-time stock trading capabilities for NASDAQ-listed companies.

Sentiment Analysis Engine:
- Developed customized NLTK and BeautifulSoup algorithms for real-time data extraction
- Analyzed live Twitter and Google News feeds with 92% accuracy for market sentiment
- Implemented advanced natural language processing for sentiment classification
- Created robust data pipeline for continuous feed monitoring and analysis

Trading Platform Features:
- Built dynamic dashboard using MERN stack (MongoDB, Express.js, React, Node.js)
- Hosted on Google Cloud Platform (GCP) for scalable and reliable performance
- Integrated live streaming data from Yahoo Finance for real-time market updates
- Implemented interactive real-time stock graphs with technical indicators
- Developed secure buy/sell transaction system with real-time execution

Performance Results:
- Achieved 24% improvement in user profitability compared to other trading platforms
- Provided comprehensive sentiment insights combined with technical trading capabilities
- Enabled data-driven trading decisions through advanced analytics and visualization`,
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "GCP", "NLTK",],
    github:"https://github.com/Bhuvannnn/Dashboard-Stock-Forecasting-with-Sentiment-Analysis",
  },
];

export const EDUCATION = [
  {
    year: "2023 - 2025",
    degree: "Master of Science in Computer Science",
    institution: "University of Southern California",
    logo: getCompanyLogo("University of Southern California"),
    gpa: "3.61/4.0",
    description: "Specialized in Artificial Intelligence, Machine Learning, and Software Engineering with a focus on advanced algorithms, data structures, and system design. Completed coursework in natural language processing, computer vision, and distributed systems.",
    relevantCourses: [
      "Analysis of Algorithms",
      "Web Technologies",
      "Machine Learning",
      "Deep Learning",
      "Applied Natural Language Processing",
      "Database Systems",
      "Information Retrieval and Web Search Engines",
      "Research Methods and Analysis",
      "Advanced Mobile Devices and Game Consoles",
    ],
    achievements: [
      "Teaching Assistant for Graduate level course on Advanced Mobile Devices and Game Consoles, mentoring 360+ graduate students",
      "Published research on cultural representation in video games and its impact on player anxiety",
      "Developed multiple full-stack applications and machine learning models with real-world applications",
      "Active participant in USC's Computer Science graduate program with focus on AI/ML research",
      "Consistently ranked under 500 out of 25,000+ global participants in LeetCode bi-weekly contests",
      "Open Source Contributor to Docusaurus by Meta",
    ]
  },
  {
    year: "2019 - 2023",
    degree: "Bachelor of Technology in Computer Science",
    institution: "Indus University",
    logo: getCompanyLogo("Indus University"),
    gpa: "4.0/4.0",
    description: "Completed comprehensive coursework in computer science fundamentals including programming, data structures, algorithms, software engineering, and database management. Gained strong foundation in software development and problem-solving skills.",
    relevantCourses: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Database Management Systems",
      "Software Engineering",
      "Computer Networks",
      "Operating Systems",
      "Web Development",
      "Mobile Application Development",
      "Machine Learning Fundamentals",
    ],
    achievements: [
      "Graduated with honors and distinction in Computer Science",
      "Strong foundation in multiple programming languages and development frameworks",
      "Completed multiple software development projects and internships",
      "Active participant in coding competitions and hackathons",
      "Organised multiple coding workshops and events",
    ]
  }
];

export const CONTACT = {
  address: "Los Angeles, California, United States",
  email: "bhuvanshah288@gmail.com",
  phone: "+1 (213) 331-1360",
  website: "bhuvanshah.com",
  pronouns: "he/him",
  timeZone: "America/Los_Angeles",
};

export const JOBS = [
  {
    title: "Founding SWE",
    company: "Easley-Dunn Productions, Inc.",
  },
];

export const SOCIAL_LINKS = [
  {
    title: "GitHub",
    description: "Bhuvannnn",
    href: "https://github.com/Bhuvannnn",
    icon: "github",
  },
  {
    title: "LinkedIn",
    description: "bhuvanshah",
    href: "https://www.linkedin.com/in/bhuvanshah/",
    icon: "linkedin",
  },
];

// Add skills data for the radar chart
export const SKILLS = [
  {
    category: "Languages",
    skills: ["Python", "JavaScript", "TypeScript", "C#", "C++", "SQL", "Swift"]
  },
  {
    category: "AI/ML",
    skills: ["PyTorch", "TensorFlow", "NLP", "Generative AI", "LLMs", "Neural Networks", "Data Science"]
  },
  {
    category: "Frontend",
    skills: ["React", "Next.js", "HTML/CSS", "Tailwind", "UI/UX"]
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express", "Flask", "Django", "FastAPI", "Spring Boot", "REST API", "GraphQL"]
  },
  {
    category: "Databases",
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "Redis", "SQLite"]
  }
];