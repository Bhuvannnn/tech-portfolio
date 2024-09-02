import { FaLinkedin, FaGithub, FaInstagram, FaFileAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import logo from '/Users/rahulshah/Desktop/tech-portfolio/src/assets/BS LOGO-JULY 2024.png';

const Navbar = () => {
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
        window.open(`${baseUrl}/Bhuvan%20Resume.pdf`, "_blank"); // Adjusted path
    }

    return (
        <nav className="mb-20 flex flex-col md:flex-row items-center justify-between py-6">
            <div className="flex items-center">
                <img className="mx-2 w-10" src={logo} alt="logo" />
                <div className="ml-4 flex items-center gap-2 sm:gap-4 text-xs sm:text-sm md:text-lg">
                    {['about', 'experience', 'projects', 'contact'].map((section, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.1, color: '#6366F1' }} // Tailwind purple-500 color
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
    );
};

export default Navbar;