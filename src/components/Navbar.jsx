import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaGithub, FaInstagram, FaFileAlt, FaArrowUp, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';

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
                isScrolled ? 'bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm' : 'bg-transparent'
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
                                <span className="font-bold text-blue-600 text-xl">Bhuvan Shah</span>
                            </motion.div>
                        </div>
                        
                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button 
                                className="text-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md" 
                                onClick={toggleMobileMenu}
                                aria-label="Toggle mobile menu"
                            >
                                {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                            </button>
                        </div>

                        {/* Desktop Navigation */}
                        <motion.div
                            className="hidden md:flex items-center gap-6 font-medium text-gray-700"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        delayChildren: 0.5,
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
                                    variants={{
                                        hidden: { opacity: 0, y: -10 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                    className={`px-3 py-2 rounded-md transition-colors duration-200 ${
                                        activeSection === section 
                                            ? 'bg-blue-100 text-blue-700' 
                                            : 'hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                                >
                                    <Link
                                        to={section === 'skills' ? 'technologies' : section}
                                        smooth={true}
                                        duration={500}
                                        className="cursor-pointer capitalize"
                                        onSetActive={() => setActiveSection(section)}
                                    >
                                        {section}
                                    </Link>
                                </motion.div>
                            ))}
                            
                            {/* Social Links */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                variants={{
                                    hidden: { opacity: 0, y: -10 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
                                onClick={handleResumeClick}
                                data-resume-download="true"
                            >
                                <FaFileAlt className="inline mr-2" />
                                Resume
                            </motion.div>
                            
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                variants={{
                                    hidden: { opacity: 0, y: -10 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                                onClick={handleLinkedInClick}
                                aria-label="LinkedIn Profile"
                            >
                                <FaLinkedin size={20} />
                            </motion.button>
                            
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                variants={{
                                    hidden: { opacity: 0, y: -10 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                                onClick={handleGithubClick}
                                aria-label="GitHub Profile"
                            >
                                <FaGithub size={20} />
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </nav>
            
            {/* Mobile Navigation Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div 
                        className="fixed top-[60px] left-0 right-0 bg-white border-b border-gray-200 z-40 py-4 px-6 md:hidden shadow-lg"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="space-y-4">
                            {['about', 'skills', 'experience', 'projects', 'contact'].map((section, index) => (
                                <Link
                                    key={index}
                                    to={section === 'skills' ? 'technologies' : section}
                                    smooth={true}
                                    duration={500}
                                    className="block py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 capitalize"
                                    onClick={closeMobileMenu}
                                >
                                    {section}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-gray-200">
                                <button
                                    onClick={handleResumeClick}
                                    data-resume-download="true"
                                    className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                                >
                                    <FaFileAlt className="mr-2" />
                                    Download Resume
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Back to Top Button */}
            <AnimatePresence>
                {showBackToTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 z-40 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Back to top"
                    >
                        <FaArrowUp size={20} />
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;