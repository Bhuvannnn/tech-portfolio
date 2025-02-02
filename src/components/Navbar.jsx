import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaGithub, FaInstagram, FaFileAlt, FaArrowUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import logo from '/Users/rahulshah/Desktop/tech-portfolio/src/assets/BS LOGO-JULY 2024.png';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [showBackToTop, setShowBackToTop] = useState(false);

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
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? 'bg-black shadow-md' : 'bg-transparent'
            } flex flex-col md:flex-row items-center justify-between py-6 px-4`}>
                <div className="flex items-center">
                    <motion.img 
                        className="mx-2 w-10" 
                        src={logo} 
                        alt="logo" 
                        initial={{ rotate: -180, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                    />
                    <div className="ml-4 flex items-center gap-2 sm:gap-4 text-xs sm:text-sm md:text-lg">
                        {['about', 'experience', 'projects', 'contact'].map((section, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.1, color: '#6366F1' }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Link
                                    to={section}
                                    smooth={true}
                                    duration={500}
                                    className="cursor-pointer hover:text-purple-500"
                                >
                                    {section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' ')}
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <div className='mt-4 md:mt-0 flex items-center gap-2 md:gap-4 text-sm md:text-2xl'>
                    <motion.div
                        className='flex items-center cursor-pointer'
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleResumeClick}
                    >
                        <FaFileAlt />
                        <span className="ml-2 text-sm md:text-lg">Resume</span>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <FaLinkedin onClick={handleLinkedInClick} className='cursor-pointer'/>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <FaGithub onClick={handleGithubClick} className='cursor-pointer'/>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <FaInstagram onClick={handleInstagramClick} className='cursor-pointer'/>
                    </motion.div>
                </div>
            </nav>
            <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
                <div 
                    className="h-full bg-purple-500 transition-all duration-300 ease-out"
                    style={{ width: scrollProgress }}
                ></div>
            </div>
            {/* <AnimatePresence>
                {showBackToTop && (
                    <motion.button
                        className="fixed bottom-8 right-8 bg-purple-500 text-white p-3 rounded-full shadow-lg z-50"
                        onClick={scrollToTop}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <FaArrowUp />
                    </motion.button>
                )}
            </AnimatePresence> */}
        </>
    );
};

export default Navbar;