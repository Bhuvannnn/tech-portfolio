import aboutImg from '../assets/aboutbhuvan.jpeg';
import { ABOUT_TEXT } from '../constants';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id='about' className="corporate-section">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6 }}
                    className="corporate-heading"
                >
                    About <span className="text-blue-400">Me</span>
                </motion.h2>
                
                <div className="corporate-card p-8 lg:p-12">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div 
                            whileInView={{ opacity: 1, x: 0 }}
                            initial={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="order-2 lg:order-1"
                        >
                            <div className="flex justify-center lg:justify-start">
                                <div className="relative">
                                    <img 
                                        className="rounded-2xl h-80 w-80 object-cover shadow-2xl" 
                                        src={aboutImg} 
                                        alt="Bhuvan Shah" 
                                    />
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-500/20 to-transparent"></div>
                                </div>
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            whileInView={{ opacity: 1, x: 0 }}
                            initial={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="order-1 lg:order-2"
                        >
                            <div className="space-y-6">
                                <h3 className="corporate-subheading text-center lg:text-left">
                                    Passionate About Technology & Innovation
                                </h3>
                                <div className="corporate-text text-lg text-center lg:text-left">
                                    <p className="mb-6">{ABOUT_TEXT}</p>
                                </div>
                                
                                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                                    <span className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30">
                                        Software Engineering
                                    </span>
                                    <span className="px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm font-medium border border-green-500/30">
                                        Data Science
                                    </span>
                                    <span className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30">
                                        Innovation
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;