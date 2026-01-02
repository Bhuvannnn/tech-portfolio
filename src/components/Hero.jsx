import React, { useState, useEffect } from 'react';
import { HERO_CONTENT } from "../constants";
import profilePic from "../assets/BhuvanProfile.jpg";
import mouse from "../assets/mouse.png";
import { motion } from "framer-motion";
import { BlurFade } from "./BlurFade";

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
    // Split hero content into lines
    const heroLines = HERO_CONTENT.split(/\n|\. /).filter(Boolean);
    return (
        <div className="relative min-h-screen flex flex-col justify-center border-b border-[#7C9A9A]/20 overflow-hidden" style={{ minHeight: 'calc(100vh - env(safe-area-inset-bottom))' }}>
            <div className="flex flex-wrap items-center justify-center px-4 py-8 sm:py-12 lg:py-16">
                <div className="w-full lg:w-1/2">
                    <div className="flex flex-col items-center lg:items-start">
                        <div className="whitespace-nowrap">
                            <TextMorph
                                initialText="こんにちは こんにちは"
                                finalText="Bhuvan Shah"
                            />
                        </div>
                        <div className="relative flex flex-col items-start">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                                className="flowing-gradient-text text-3xl tracking-tight"
                            >
                                Software Engineer
                            </motion.div>
                        </div>
                        {/* Animated hero content using BlurFade */}
                        <div className="my-2 max-w-xl py-6 font-light tracking-tighter text-justify">
                            {heroLines.map((line, idx) => (
                                <BlurFade key={idx} delay={0.2 * idx} inView>
                                    <div style={{ fontSize: '1.2em', marginBottom: '0.5em' }}>{line.trim()}</div>
                                </BlurFade>
                            ))}
                        </div>
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
                            className="rounded-2xl h-80 w-80 lg:h-[28rem] lg:w-[28rem] xl:h-[32rem] xl:w-[32rem] object-cover"
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-center pb-32 sm:pb-24 lg:pb-28 mt-auto">
                <motion.img
                    src={mouse}
                    alt="Scroll indicator"
                    className="h-10 w-10 sm:h-10 sm:w-10 lg:h-12 lg:w-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
            </div>
        </div>
    );
};

export default Hero;