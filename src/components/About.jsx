import { useEffect, useRef } from 'react';
import { ABOUT_TEXT } from '../constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const badgesRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const text = textRef.current;
        const badges = badgesRef.current;
        const container = containerRef.current;

        if (!section || !text || !badges || !container) return;

        // Split text into sentences
        const sentences = ABOUT_TEXT.split('. ').filter(s => s.trim());
        
        // Animate text reveal with stagger
        gsap.fromTo(
            text.querySelectorAll('.sentence'),
            {
                opacity: 0,
                y: 50,
                rotationX: -90
            },
            {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                    toggleActions: 'play none none none'
                }
            }
        );

        // Parallax effect for badges
        gsap.fromTo(
            badges.querySelectorAll('.badge'),
            {
                opacity: 0,
                scale: 0.8,
                y: 30
            },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 60%',
                    toggleActions: 'play none none none'
                }
            }
        );

        // Subtle parallax on scroll
        gsap.to(container, {
            y: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });

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
                    style={{ perspective: '1000px' }}
                >
                    {/* Animated text with 3D reveal */}
                    <div ref={textRef} className="mb-12">
                        {sentences.map((sentence, index) => (
                            <p 
                                key={index}
                                className="sentence text-lg lg:text-xl font-light text-slate-700 leading-relaxed mb-4 text-justify"
                                style={{ 
                                    transformStyle: 'preserve-3d',
                                    transformOrigin: '50% 50%'
                                }}
                            >
                                {sentence.trim()}{index < sentences.length - 1 ? '.' : ''}
                            </p>
                        ))}
                    </div>
                    
                    {/* Animated badges with parallax */}
                    <div 
                        ref={badgesRef}
                        className="flex flex-wrap gap-4 justify-center lg:justify-start mt-8"
                    >
                        <span className="badge px-6 py-3 bg-[#7C9A9A]/30 text-slate-700 rounded-full text-base font-medium border border-[#7C9A9A]/40 shadow-lg transform-gpu">
                            Software Engineering
                        </span>
                        <span className="badge px-6 py-3 bg-[#A8B8D1]/30 text-slate-700 rounded-full text-base font-medium border border-[#A8B8D1]/40 shadow-lg transform-gpu">
                            Data Science
                        </span>
                        <span className="badge px-6 py-3 bg-[#D4A5A5]/30 text-slate-700 rounded-full text-base font-medium border border-[#D4A5A5]/40 shadow-lg transform-gpu">
                            Innovation
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
