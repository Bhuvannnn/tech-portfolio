import aboutImg from '../assets/aboutbhuvan.jpeg';
import { ABOUT_TEXT } from '../constants';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div id='about' className="border-b border-neutral-900 pb-4">
            <motion.h1
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -20 }} // Start slightly above and faded out
                transition={{ duration: 0.5 }}
                className="my-20 text-center text-4xl"
            >
                About <span className="text-neutral-500">Me</span>
            </motion.h1>
            <div className="flex flex-wrap">
                <motion.div 
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="w-full lg:w-1/2 lg:p-8"
                >
                    <div className="flex items-center justify-center">
                        <img className="rounded-2xl h-80 object-contain" src={aboutImg} alt="about" />
                    </div>
                </motion.div>
                <motion.div 
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.5 }}
                    className="w-full lg:w-1/2"
                >
                    <div className='flex justify-center lg:justify-start items-center h-full'> 
                        <div className='my-2 max-w-xl py-6 text-xl leading-relaxed'>
                            <p className='mb-4 text-center lg:text-left'>{ABOUT_TEXT}</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;