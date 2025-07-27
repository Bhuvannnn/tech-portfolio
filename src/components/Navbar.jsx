import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaGithub, FaInstagram, FaFileAlt, FaArrowUp, FaTerminal, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
// Removed unused logo import

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLinkedInClick = () => {
        window.open("https://www.linkedin.com/in/bhuvanshah/", "_blank");
    }

    const handleGithubClick = () => {
        window.open("https://github.com/Bhuvannnn", "_blank");
    }

    const handleInstagramClick = () => {
        window.open("https://www.instagram.com/bhu._.one/", "_blank");
    }

    const handleResumeClick = () => {
        const baseUrl = process.env.NODE_ENV === 'development' ? '' : '/tech-portfolio';
        window.open(`${baseUrl}/Bhuvan%20Resume.pdf`, "_blank");
    }

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
            setShowBackToTop(window.scrollY > 300);

            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = `${totalScroll / windowHeight * 100}%`;
            setScrollProgress(scroll);
            
            // Determine active section based on scroll position
            const sections = ['about', 'experience', 'projects', 'contact'];
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? 'bg-black border-b border-cyan-900' : 'bg-transparent'
            } py-3 px-4`}>
                <div className="container mx-auto">
                    <div className="flex items-center justify-between">
                        {/* Logo Area */}
                        <div className="flex items-center">
                            <motion.div 
                                className="flex items-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                            >
                                <FaTerminal className="text-cyan-400 mr-2" />
                                <span className="font-mono text-cyan-400 text-lg">bhuvan@portfolio:~$</span>
                            </motion.div>
                        </div>
                        
                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button 
                                className="text-cyan-400 p-2 focus:outline-none" 
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
                            {['about', 'skills', 'experience', 'projects', 'contact'].map((section, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    variants={{ // Add variants for individual items
                                        hidden: { opacity: 0, y: -10 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                    className={`px-3 py-1 rounded border ${
                                        activeSection === section 
                                            ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400' 
                                            : 'border-gray-700 hover:border-cyan-500 hover:bg-cyan-900/20'
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
                                        <span className="text-cyan-400 mr-1">$</span>
                                        <span>{section}</span>
                                    </Link>
                                </motion.div>
                            ))}
                            
                            {/* Social Links as Terminal Commands */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                variants={{ // Add variants for individual items
                                    hidden: { opacity: 0, y: -10 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                className="px-3 py-1 rounded border border-gray-700 hover:border-cyan-500 hover:bg-cyan-900/20 cursor-pointer"
                                onClick={handleResumeClick}
                            >
                                <span className="text-cyan-400 mr-1">$</span>
                                <span>resume</span>
                            </motion.div>
                            
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                variants={{ // Add variants for individual items
                                    hidden: { opacity: 0, y: -10 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                className="px-3 py-1 rounded border border-gray-700 hover:border-cyan-500 hover:bg-cyan-900/20 cursor-pointer"
                                onClick={handleLinkedInClick}
                            >
                                <span className="text-cyan-400 mr-1">$</span>
                                <span>linkedin</span>
                            </motion.div>
                            
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                variants={{ // Add variants for individual items
                                    hidden: { opacity: 0, y: -10 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                className="px-3 py-1 rounded border border-gray-700 hover:border-cyan-500 hover:bg-cyan-900/20 cursor-pointer"
                                onClick={handleGithubClick}
                            >
                                <span className="text-cyan-400 mr-1">$</span>
                                <span>github</span>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </nav>
            
            {/* Mobile Navigation Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div 
                        className="fixed top-[60px] left-0 right-0 bg-black border-b border-cyan-900 z-40 py-4 px-6 md:hidden"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="flex flex-col gap-3 font-mono text-sm">
                            {['about', 'skills', 'experience', 'projects', 'contact'].map((section, index) => (
                                <motion.div
                                    key={index}
                                    whileTap={{ scale: 0.95 }}
                                    className={`px-3 py-2 rounded border ${
                                        activeSection === section 
                                            ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400' 
                                            : 'border-gray-700 hover:border-cyan-500 hover:bg-cyan-900/20'
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
                                        <span className="text-cyan-400 mr-1">$</span>
                                        <span>{section}</span>
                                    </Link>
                                </motion.div>
                            ))}
                            
                            {/* Social Links as Terminal Commands */}
                            <div className="flex flex-wrap gap-2 mt-2">
                                <motion.div
                                    whileTap={{ scale: 0.95 }}
                                    className="px-3 py-2 rounded border border-gray-700 hover:border-cyan-500 hover:bg-cyan-900/20 cursor-pointer"
                                    onClick={() => {
                                        handleResumeClick();
                                        closeMobileMenu();
                                    }}
                                >
                                    <span className="text-cyan-400 mr-1">$</span>
                                    <span>resume</span>
                                </motion.div>
                                
                                <motion.div
                                    whileTap={{ scale: 0.95 }}
                                    className="px-3 py-2 rounded border border-gray-700 hover:border-cyan-500 hover:bg-cyan-900/20 cursor-pointer"
                                    onClick={() => {
                                        handleLinkedInClick();
                                        closeMobileMenu();
                                    }}
                                >
                                    <span className="text-cyan-400 mr-1">$</span>
                                    <span>linkedin</span>
                                </motion.div>
                                
                                <motion.div
                                    whileTap={{ scale: 0.95 }}
                                    className="px-3 py-2 rounded border border-gray-700 hover:border-cyan-500 hover:bg-cyan-900/20 cursor-pointer"
                                    onClick={() => {
                                        handleGithubClick();
                                        closeMobileMenu();
                                    }}
                                >
                                    <span className="text-cyan-400 mr-1">$</span>
                                    <span>github</span>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Progress Bar - Terminal Style */}
            <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
                <div 
                    className="h-full bg-cyan-500 transition-all duration-300 ease-out"
                    style={{ width: scrollProgress }}
                ></div>
            </div>
            
            {/* Back to Top Button - Terminal Style */}
            <AnimatePresence>
                {showBackToTop && (
                    <motion.button
                        className="fixed bottom-8 right-8 bg-black text-cyan-400 p-3 rounded border border-cyan-700 shadow-lg z-50 font-mono"
                        onClick={scrollToTop}
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(8, 145, 178, 0.1)' }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <span className="text-cyan-400 mr-1">$</span>cd ~
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;