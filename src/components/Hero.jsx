import React, { useState, useEffect } from 'react';
import { HERO_CONTENT } from "../constants";
import { TypeAnimation } from 'react-type-animation';
import profilePic from "../assets/BhuvanProfile.jpg";
import mouse from "../assets/mouse.png";
import { motion } from "framer-motion";
import ParticlesBackground from './ParticlesBackground'; 

const container = (delay) => ({
    hidden: { x: -100, opacity: 0 },
    visible: {
        x: 0, opacity: 1,
        transition: { delay: delay, duration: 0.5 }
    },
});

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
            className="pb-16 text-6xl font-thin tracking-tight lg:mt-16 lg:text-6xl"
        >
            {displayedText.split('').map((char, index) => (
                <motion.span
                    key={index}
                    className="inline-block"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                    {char === ' ' ? '\u00A0' : char} {/* Non-breaking space for spaces */}
                </motion.span>
            ))}
        </motion.div>
    );
};

const Hero = () => {
    return (
        <div className="relative border-b border-neutral-900 pb-4 lg:mb-35 overflow-hidden">
            <ParticlesBackground />
            <div className="flex flex-wrap">
                <div className="w-full lg:w-1/2">
                    <div className="flex flex-col items-center lg:items-start">
                        <div className="whitespace-nowrap"> {/* Added wrapper div with whitespace-nowrap */}
                            <TextMorph
                                initialText="こんにちは こんにちは"
                                finalText="Bhuvan Shah"
                            />
                        </div>
                        <div className="relative flex flex-col items-start">
                            <div className="relative inline-block overflow-hidden">
                            <TypeAnimation
                                    sequence={[
                                        'Software Developer',
                                        2000,
                                        'Data Scientist',
                                        2000,
                                        'Data Engineer',
                                        2000,
                                        'Data Analyst',
                                        2000,
                                        'AI Engineer',
                                        2000,
                                        'LLM Developer',
                                        2000,
                                    ]}
                                    wrapper="span"
                                    speed={50}
                                    style={{ fontSize: '2em', display: 'inline-block' }}
                                    repeat={Infinity}
                                    className="flowing-gradient-text text-3xl tracking-tight"
                                />
                                {/* Animate the cover box */}
                                <motion.div
                                    className="absolute top-0 left-0 h-full bg-cyan-300 z-30"
                                    initial={{ width: '100%', left: '-100%' }}
                                    animate={{ left: ['-100%', '0%', '100%'] }}
                                    transition={{
                                        duration: 2,
                                        ease: 'easeInOut',
                                        times: [0, 0.5, 1]
                                    }}
                                />
                                {/* <motion.span
                                    className="relative z-10 bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-3xl tracking-tight text-transparent"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6, duration: 1 }}
                                >
                                    Software Developer
                                </motion.span> */}
                            </div>
                        </div>
                        <motion.p
                            variants={container(1)}
                            initial='hidden'
                            animate='visible'
                            className="my-2 max-w-xl py-6 font-light tracking-tighter text-justify"
                        >
                            {HERO_CONTENT}
                        </motion.p>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 lg:p-8">
                    <div className="flex justify-center">
                        <motion.img
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.5 }}
                            src={profilePic}
                            alt='Bhuvan Shah'
                            className="rounded-2xl h-80 w-80 lg:h-96 lg:w-96 object-cover"
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-8">
                <motion.img
                    src={mouse}
                    alt="Scroll indicator"
                    className="h-10 w-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
            </div>
        </div>
    );
};

export default Hero;
