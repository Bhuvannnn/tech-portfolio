import aboutImg from '../assets/aboutbhuvan.jpeg';
import { ABOUT_TEXT } from '../constants';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div id='about' className="border-b border-gray-200 pb-16">
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
                className="text-4xl font-bold text-center text-gray-900 mb-16"
            >
                About <span className="text-blue-600">Me</span>
            </motion.h2>
            <div className="flex flex-wrap items-center">
                <motion.div 
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="w-full lg:w-1/2 lg:pr-12 mb-8 lg:mb-0"
                >
                    <div className="flex items-center justify-center lg:justify-start">
                        <motion.img 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                            viewport={{ once: true, amount: 0.3 }}
                            className="rounded-2xl h-80 w-80 object-cover shadow-xl" 
                            src={aboutImg} 
                            alt="Bhuvan Shah" 
                        />
                    </div>
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="w-full lg:w-1/2"
                >
                    <div className='flex justify-center lg:justify-start'> 
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                            viewport={{ once: true, amount: 0.3 }}
                            className='text-lg text-gray-600 leading-relaxed max-w-xl'
                        >
                            {ABOUT_TEXT}
                        </motion.p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;