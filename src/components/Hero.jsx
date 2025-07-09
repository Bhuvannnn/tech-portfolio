import React, { useState, useEffect } from 'react';
import { HERO_CONTENT } from "../constants";
import { TypeAnimation } from 'react-type-animation';
import profilePic from "../assets/BhuvanProfile.jpg";
import { motion } from "framer-motion";

const TextMorph = ({ initialText, finalText }) => {
    const [displayedText, setDisplayedText] = useState(initialText);

    useEffect(() => {
        const intervalDuration = 125;
        let currentStep = 0;

        const timer = setInterval(() => {
            setDisplayedText(prevText => {
                const newText = prevText
                    .split('')
                    .map((char, index) => {
                        return index <= currentStep ? finalText[index] : char;
                    })
                    .join('');

                return newText;
            });

            if (currentStep >= finalText.length - 1) {
                clearInterval(timer);
            }

            currentStep++;
        }, intervalDuration);

        return () => clearInterval(timer);
    }, [initialText, finalText]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="pb-8 text-5xl lg:text-6xl font-bold tracking-tight lg:mt-16"
        >
            {displayedText.split('').map((char, index) => (
                <motion.span
                    key={index}
                    className="inline-block"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </motion.div>
    );
};

const Hero = () => {
    return (
        <div className="relative border-b border-gray-200 pb-16 lg:mb-20">
            <div className="flex flex-wrap items-center min-h-[80vh]">
                <div className="w-full lg:w-1/2">
                    <div className="flex flex-col items-center lg:items-start">
                        <div className="whitespace-nowrap">
                            <TextMorph
                                initialText="こんにちは こんにちは"
                                finalText="Bhuvan Shah"
                            />
                        </div>
                        
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mb-6"
                        >
                            <TypeAnimation
                                sequence={[
                                    'AI Engineer',
                                    2000,
                                    'Full-Stack Developer',
                                    2000,
                                    'Data Scientist',
                                    2000,
                                    'NLP Specialist',
                                    2000,
                                ]}
                                wrapper="span"
                                speed={50}
                                className="text-2xl lg:text-3xl text-blue-600 font-semibold"
                                repeat={Infinity}
                            />
                        </motion.div>
                        
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-lg text-gray-600 max-w-xl text-center lg:text-left leading-relaxed mb-8"
                        >
                            {HERO_CONTENT}
                        </motion.p>
                        
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <a
                                href="#projects"
                                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-center"
                            >
                                View Projects
                            </a>
                            <a
                                href="#contact"
                                className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium text-center"
                            >
                                Get in Touch
                            </a>
                        </motion.div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 lg:p-8">
                    <div className="flex justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="relative"
                        >
                            <img
                                src={profilePic}
                                alt='Bhuvan Shah'
                                className="rounded-2xl h-80 w-80 lg:h-96 lg:w-96 object-cover shadow-2xl"
                            />
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
