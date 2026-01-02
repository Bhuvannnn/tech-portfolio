import { useEffect, useRef } from 'react';
import { ABOUT_TEXT } from '../constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const text = textRef.current;
        const container = containerRef.current;

        if (!section || !text || !container) return;

        // Split text into sentences
        const sentences = ABOUT_TEXT.split('. ').filter(s => s.trim());
        
        // Animate text reveal with stagger
        gsap.fromTo(
            text.querySelectorAll('.sentence'),
            {
                opacity: 0,
                y: 20
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                    toggleActions: 'play none none none'
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const sentences = ABOUT_TEXT.split('. ').filter(s => s.trim());

    return (
        <section id='about' ref={sectionRef} className="corporate-section relative overflow-hidden">
            <div className="max-w-5xl mx-auto">
                <h2 className="corporate-heading mb-12">
                    About <span className="unified-accent">Me</span>
                </h2>
                
                <div 
                    ref={containerRef}
                    className="corporate-card p-8 lg:p-12 min-h-[50vh] flex flex-col justify-center"
                >
                    {/* Animated text */}
                    <div ref={textRef}>
                        {sentences.map((sentence, index) => (
                            <p 
                                key={index}
                                className="sentence text-base sm:text-lg lg:text-xl font-light text-slate-700 leading-normal sm:leading-relaxed mb-2 sm:mb-3 lg:mb-4 text-left sm:text-justify font-mono"
                            >
                                {sentence.trim()}{index < sentences.length - 1 ? '.' : ''}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
