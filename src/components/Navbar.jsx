import React, { useState, useEffect } from 'react';
import { FaFileAlt, FaTerminal, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
// Removed unused logo import

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeSection, setActiveSection] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);



    const handleResumeClick = () => {
        const baseUrl = process.env.NODE_ENV === 'development' ? '' : '';
        window.open(`${baseUrl}/Bhuvan%20Resume.pdf`, "_blank");
    }

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = `${totalScroll / windowHeight * 100}%`;
            setScrollProgress(scroll);
            
            // Determine active section based on scroll position
            // Map section IDs to navbar section names
            const sectionMap = {
                'about': 'about',
                'education': 'education',
                'experience': 'experience',
                'technologies': 'skills',  // technologies section maps to 'skills' in navbar
                'projects': 'projects',
                'contact': 'contact'
            };
            
            // Check sections in order of appearance
            const sectionIds = ['about', 'education', 'experience', 'technologies', 'projects', 'contact'];
            for (const sectionId of sectionIds) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(sectionMap[sectionId]);
                        break;
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);



    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? 'bg-white/60 backdrop-blur-md border-b border-[#7C9A9A]/30' : 'bg-transparent'
            } py-3 px-4`}>
                <div className="container mx-auto">
                    <div className="flex items-center justify-between">
                        {/* Logo Area */}
                        <div className="flex items-center">
                            <motion.div 
                                className="flex items-center bg-white/40 backdrop-blur-sm border border-[#7C9A9A]/40 rounded-lg px-4 py-2 shadow-lg shadow-[#7C9A9A]/20"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <FaTerminal className="text-[#A8B8D1] mr-3 text-lg drop-shadow-sm" />
                                <span className="font-mono text-slate-700 text-lg tracking-wide">
                                    <span className="text-[#A8B8D1]">bhuvan</span>
                                    <span className="text-slate-600">@</span>
                                    <span className="text-[#7C9A9A]">portfolio</span>
                                    <span className="text-slate-600">:</span>
                                    <span className="text-[#D4A5A5]">~</span>
                                    <span className="text-slate-700 cursor-flicker">$</span>
                                </span>
                            </motion.div>
                        </div>
                        
                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button 
                                className="text-[#7C9A9A] p-2 focus:outline-none" 
                                onClick={toggleMobileMenu}
                            >
                                {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                            </button>
                        </div>

                        {/* Desktop Navigation */}
                        {/* Container for desktop nav items with stagger animation */}
                        <motion.div
                            className="hidden md:flex flex-wrap items-center justify-center md:justify-end gap-3 md:gap-4 font-mono text-xs md:text-sm"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        delayChildren: 0.5, // Start after logo fades in
                                        staggerChildren: 0.1
                                    }
                                }
                            }}
                        >
                            {['about', 'education', 'experience', 'skills', 'projects', 'contact'].map((section, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    variants={{ // Add variants for individual items
                                        hidden: { opacity: 0, y: -10 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                    className={`px-4 py-2 rounded-lg border transition-all duration-300 backdrop-blur-sm ${
                                        activeSection === section 
                                            ? 'border-[#7C9A9A] bg-[#7C9A9A]/30 text-slate-800 shadow-lg shadow-[#7C9A9A]/30' 
                                            : 'border-[#7C9A9A]/40 bg-white/40 hover:border-[#7C9A9A] hover:bg-[#7C9A9A]/20 hover:shadow-lg hover:shadow-[#7C9A9A]/20 text-slate-700'
                                    }`}
                                >
                                    <Link
                                        to={section === 'skills' ? 'technologies' : section}
                                        smooth={true}
                                        duration={500}
                                        offset={-80}
                                        className="cursor-pointer flex items-center"
                                        onSetActive={() => setActiveSection(section)}
                                    >
                                        <span className="text-green-400 mr-2 font-bold">$</span>
                                        <span>{section}</span>
                                    </Link>
                                </motion.div>
                            ))}
                            
                            {/* Resume Link */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                variants={{ // Add variants for individual items
                                    hidden: { opacity: 0, y: -10 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                className="px-4 py-2 rounded-lg border border-[#7C9A9A]/40 bg-white/40 hover:border-[#7C9A9A] hover:bg-[#7C9A9A]/20 hover:shadow-lg hover:shadow-[#7C9A9A]/20 cursor-pointer transition-all duration-300 backdrop-blur-sm text-slate-700"
                                onClick={handleResumeClick}
                            >
                                <span className="text-[#A8B8D1] mr-2 font-bold">$</span>
                                <span>resume</span>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </nav>
            
            {/* Mobile Navigation Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div 
                        className="fixed top-[60px] left-0 right-0 bg-white/90 backdrop-blur-md border-b border-[#7C9A9A]/40 shadow-2xl shadow-[#7C9A9A]/20 z-40 py-6 px-6 md:hidden"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="flex flex-col gap-3 font-mono text-sm">
                            {['about', 'education', 'experience', 'skills', 'projects', 'contact'].map((section, index) => (
                                <motion.div
                                    key={index}
                                    whileTap={{ scale: 0.95 }}
                                    className={`px-4 py-3 rounded-lg border transition-all duration-300 backdrop-blur-sm ${
                                        activeSection === section 
                                            ? 'border-[#7C9A9A] bg-[#7C9A9A]/30 text-slate-800 shadow-lg shadow-[#7C9A9A]/30' 
                                            : 'border-[#7C9A9A]/40 bg-white/40 hover:border-[#7C9A9A] hover:bg-[#7C9A9A]/20 hover:shadow-lg hover:shadow-[#7C9A9A]/20 text-slate-700'
                                    }`}
                                >
                                    <Link
                                        to={section === 'skills' ? 'technologies' : section}
                                        smooth={true}
                                        duration={500}
                                        offset={-80}
                                        className="cursor-pointer flex items-center"
                                        onSetActive={() => setActiveSection(section)}
                                        onClick={closeMobileMenu}
                                    >
                                        <span className="text-[#A8B8D1] mr-2 font-bold">$</span>
                                        <span>{section}</span>
                                    </Link>
                                </motion.div>
                            ))}
                            
                            {/* Resume Link */}
                            <div className="flex flex-wrap gap-2 mt-2">
                                <motion.div
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-3 rounded-lg border border-[#7C9A9A]/40 bg-white/40 hover:border-[#7C9A9A] hover:bg-[#7C9A9A]/20 hover:shadow-lg hover:shadow-[#7C9A9A]/20 cursor-pointer transition-all duration-300 backdrop-blur-sm text-slate-700"
                                    onClick={() => {
                                        handleResumeClick();
                                        closeMobileMenu();
                                    }}
                                >
                                    <span className="text-[#A8B8D1] mr-1">$</span>
                                    <span>resume</span>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Progress Bar - Pastel Style */}
            <div className="fixed top-0 left-0 w-full h-1 bg-white/50 backdrop-blur-sm z-50">
                <div 
                    className="h-full bg-gradient-to-r from-[#7C9A9A] via-[#D4A5A5] to-[#A8B8D1] transition-all duration-300 ease-out shadow-lg shadow-[#7C9A9A]/30"
                    style={{ width: scrollProgress }}
                ></div>
            </div>
            

        </>
    );
};

export default Navbar;