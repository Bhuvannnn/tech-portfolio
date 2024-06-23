import React, { useEffect, useState, useRef } from 'react';
import { HERO_CONTENT } from "../constants";
import profilePic from "../assets/BhuvanProfile.jpg";
import { motion } from "framer-motion";

const container = (delay) => ({
    hidden: { x: -100, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { delay: delay, duration: 0.5 }
    },
});

const TextMorph = ({ initialText, finalText }) => {
    const [displayedText, setDisplayedText] = useState(initialText);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentStep((prevStep) => {
                if (prevStep < finalText.length) {
                    setDisplayedText(
                        initialText
                            .split('')
                            .map((char, index) => {
                                // Log each character and index for debugging
                                console.log(`Index: ${index}, Char: ${char}`);
                                return index < prevStep ? finalText[index] : char;
                            })
                            .join('')
                    );
                    return prevStep + 1;
                } else {
                    setDisplayedText(finalText);
                    clearInterval(timer);
                    return prevStep;
                }
            });
        }, 100);

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
                    {char === ' ' ? '\u00A0' : char} {/* Use non-breaking space for space characters */}
                </motion.span>
            ))}
        </motion.div>
    );
};

const Hero = () => {
    const textRef = useRef(null);
    const [textWidth, setTextWidth] = useState(0);

    useEffect(() => {
        // Calculate the width of the text element
        if (textRef.current) {
            setTextWidth(textRef.current.offsetWidth);
        }
    }, []);

    return (
        <div className="border-b border-neutral-900 pb-4 lg:mb-35">
            <div className="flex flex-wrap">
                <div className="w-full lg:w-1/2">
                    <div className="flex flex-col items-center lg:items-start">
                        {/* Use the TextMorph component for the name */}
                        <TextMorph
                            initialText="こんにちは こんにちは"
                            finalText="Bhuvan Shah"
                        />
                        <div className="relative flex flex-col items-start">
                            <div
                                className="relative inline-block overflow-hidden whitespace-nowrap"
                                style={{ width: textWidth }} // Restricting the width to the width of the text
                            >
                                {/* Animate the cover box */}
                                <motion.div
                                    className="absolute top-0 left-0 h-full bg-cyan-300 z-30"
                                    initial={{ width: '100%', left: `calc(-100% - ${textWidth}px)` }} // Assuming textWidth is the width of the text
                                    animate={{
                                        left: [`calc(-100% - ${textWidth}px)`, '0%', '100%'], // Moves from left (off-screen), covers the text, then moves to the right
                                    }}
                                    transition={{
                                        duration: 2, // Adjust duration as needed
                                        ease: 'easeInOut',
                                        times: [0, 0.5, 1] // Adjust these values as needed for timing
                                    }}
                                />
                                <motion.span
                                    ref={textRef}
                                    className="relative z-10 bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-3xl tracking-tight text-transparent"
                                    initial={{ opacity: 0 }} // Start with the text being invisible
                                    animate={{ opacity: 1 }} // Animate to fully visible
                                    transition={{ delay: 0.6, duration: 1 }} // Delay of 2.5 seconds, adjust as needed
                                >
                                    Software Developer
                                </motion.span>
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
        </div>
    );
};

export default Hero;
