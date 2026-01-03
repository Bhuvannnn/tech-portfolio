import { useEffect, useRef } from 'react';
import { ABOUT_TEXT, CONTACT } from '../constants';
import { BlurFade } from './BlurFade';
import profilePic from "../assets/BhuvanProfile.jpg";
import { FaMapMarkerAlt, FaEnvelope, FaCode, FaBrain, FaCloud } from "react-icons/fa";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);
    const titleContainerRef = useRef(null);
    const titleRef = useRef(null);
    const contentRef = useRef(null);
    const bgOverlayRef = useRef(null);
    const sentences = ABOUT_TEXT.split('. ').filter(s => s.trim());

    useEffect(() => {
        const section = sectionRef.current;
        const titleContainer = titleContainerRef.current;
        const title = titleRef.current;
        const content = contentRef.current;
        const bgOverlay = bgOverlayRef.current;

        if (!section || !titleContainer || !title || !content || !bgOverlay) return;

        // Calculate the distance to move (from right edge to left)
        const moveDistance = window.innerWidth * 0.8;

        // Set initial state - hide title and container initially to prevent flash
        gsap.set(bgOverlay, { opacity: 0, visibility: 'hidden' });
        gsap.set(titleContainer, { opacity: 0, visibility: 'hidden' });
        gsap.set(title, { 
            x: moveDistance, 
            opacity: 0, 
            scale: 1, 
            transformOrigin: 'center center',
            color: '#1e293b' // Ensure consistent dark color
        });
        gsap.set(content, { opacity: 0, y: 30 });

        // Flag to track if we should skip animation
        let skipAnimation = false;
        let scrollTriggerInstance = null;

        // Function to skip animation and show content directly
        const skipAnimationAndShowContent = () => {
            skipAnimation = true;
            
            // Hide all animation elements immediately
            gsap.set(title, { 
                opacity: 0,
                visibility: 'hidden',
                x: moveDistance,
                scale: 1
            });
            gsap.set(titleContainer, { opacity: 0, visibility: 'hidden' });
            gsap.set(bgOverlay, { opacity: 0, visibility: 'hidden' });
            
            // Show content immediately
            gsap.to(content, { 
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            // Disable ScrollTrigger if it exists
            if (scrollTriggerInstance) {
                scrollTriggerInstance.disable();
                scrollTriggerInstance.kill();
                scrollTriggerInstance = null;
            }
        };

        // Check if user navigated directly to about section
        const checkDirectNavigation = () => {
            // Check if URL has #about-content hash (direct navigation via navbar)
            const hasAboutContentHash = window.location.hash === '#about-content';
            
            // Check if content is in viewport and section is not at top (direct scroll)
            const contentRect = content.getBoundingClientRect();
            const sectionRect = section.getBoundingClientRect();
            const isContentInView = contentRect.top < window.innerHeight * 0.8 && contentRect.bottom > 0;
            const isSectionNotPinned = sectionRect.top > window.innerHeight * 0.5;
            
            if (hasAboutContentHash || (isContentInView && isSectionNotPinned)) {
                skipAnimationAndShowContent();
                return true;
            }
            return false;
        };

        // Listen for hash changes and scroll events
        const handleHashChange = () => {
            if (window.location.hash === '#about-content') {
                setTimeout(() => {
                    checkDirectNavigation();
                }, 100);
            }
        };

        // Listen for when react-scroll finishes scrolling
        const handleScrollEnd = () => {
            setTimeout(() => {
                if (window.location.hash === '#about-content') {
                    checkDirectNavigation();
                }
            }, 300);
        };

        window.addEventListener('hashchange', handleHashChange);
        window.addEventListener('scroll', handleScrollEnd, { passive: true });
        
        // Check immediately and after delays
        checkDirectNavigation();
        setTimeout(checkDirectNavigation, 300);
        setTimeout(checkDirectNavigation, 800);

        // Show background overlay and title container earlier so it appears in center/top-center before section reaches viewport
        const titleTrigger = ScrollTrigger.create({
            trigger: section,
            start: 'top 150%', // Show when section is 150% down (earlier appearance)
            end: 'top top',
            scrub: false,
            onEnter: () => {
                if (skipAnimation) return;
                gsap.to(bgOverlay, { 
                    opacity: 1, 
                    visibility: 'visible',
                    duration: 0.3 
                });
                gsap.to(titleContainer, { 
                    opacity: 1, 
                    visibility: 'visible',
                    duration: 0.3 
                });
                gsap.to(title, { 
                    opacity: 1, 
                    color: '#1e293b', // Ensure dark color on show
                    duration: 0.3 
                });
            },
            onLeaveBack: () => {
                if (skipAnimation) return;
                gsap.to(bgOverlay, { 
                    opacity: 0, 
                    visibility: 'hidden',
                    duration: 0.2 
                });
                gsap.to(titleContainer, { 
                    opacity: 0, 
                    visibility: 'hidden',
                    duration: 0.2 
                });
                gsap.to(title, { opacity: 0, duration: 0.2 });
            }
        });

        // Create horizontal scroll animation with zoom effect and FREEZE period
        // Only create if not skipping animation
        if (!skipAnimation) {
            scrollTriggerInstance = ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: '+=600vh', // Long scroll distance for all phases
                scrub: 1.5, // Smooth scrub
                pin: true,
                anticipatePin: 1,
                onUpdate: (self) => {
                    // Skip animation if direct navigation detected
                    if (skipAnimation) {
                        return;
                    }
                
                const progress = self.progress;
                
                // Phase 1: Horizontal movement (0 to 0.25) - text comes from right to center
                if (progress <= 0.25) {
                    const phase1Progress = progress / 0.25; // 0 to 1
                    // Animate title from right to center
                    gsap.to(title, {
                        x: moveDistance * (1 - phase1Progress),
                        scale: 1,
                        opacity: 1,
                        duration: 0.1,
                        ease: 'power2.out'
                    });
                    // Keep background overlay fully visible
                    gsap.to(bgOverlay, {
                opacity: 1,
                        duration: 0.1,
                        ease: 'none'
                    });
                }
                // Phase 2: FREEZE - text stays centered (0.25 to 0.45) - ~20% of scroll is "frozen"
                else if (progress <= 0.45) {
                    // Text is frozen at center - no animation changes
                    // User must scroll through but text stays still
                    gsap.to(title, {
                        x: 0, // Frozen at center
                scale: 1,
                        opacity: 1,
                        duration: 0.1,
                        ease: 'none'
                    });
                    // Keep background overlay visible
                    gsap.to(bgOverlay, {
                        opacity: 1,
                        duration: 0.1,
                        ease: 'none'
                    });
                }
                // Phase 3: Zoom in effect (0.45 to 0.8) - zoom into center of text
                else if (progress <= 0.8) {
                    const phase3Progress = (progress - 0.45) / 0.35; // 0 to 1
                    // Keep title centered and zoom in
                    gsap.to(title, {
                        x: 0, // Keep centered
                        scale: 1 + (phase3Progress * 20), // Zoom from 1x to 21x
                        opacity: 1,
                        duration: 0.1,
                        ease: 'power2.in'
                    });
                    // Keep background overlay visible during zoom
                    gsap.to(bgOverlay, {
                        opacity: 1,
                        duration: 0.1,
                        ease: 'none'
                    });
                }
                // Phase 4: Fade out title and fade in content (0.8 to 1.0)
                else {
                    const phase4Progress = (progress - 0.8) / 0.2; // 0 to 1
                    // Fade out title and zoom it further
                    gsap.to(title, {
                        opacity: 1 - phase4Progress,
                        scale: 21 + (phase4Progress * 5), // Continue zooming
                        duration: 0.1,
                        ease: 'power2.in'
                    });
                    // Fade out background overlay
                    gsap.to(bgOverlay, {
                        opacity: 1 - phase4Progress,
                        duration: 0.1,
                        ease: 'power2.out'
                    });
                    // Fade in content
                    gsap.to(content, {
                        opacity: phase4Progress,
                        y: 30 * (1 - phase4Progress),
                        duration: 0.1,
                        ease: 'power2.out'
                    });
                }
                }
            });
        } else {
            // If skipping animation, disable pinning by creating a dummy trigger
            ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: 'top top',
                pin: false
            });
        }

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
            window.removeEventListener('scroll', handleScrollEnd);
            if (scrollTriggerInstance) {
                scrollTriggerInstance.kill();
            }
            if (titleTrigger) {
                titleTrigger.kill();
            }
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars && trigger.vars.trigger === section) trigger.kill();
            });
        };
    }, []);

    return (
        <section 
            id='about' 
            ref={sectionRef} 
            className="relative"
        >
            {/* Background overlay to hide Hero section content behind */}
            <div 
                ref={bgOverlayRef}
                className="fixed inset-0 bg-white z-30 pointer-events-none opacity-0"
                style={{ visibility: 'hidden' }}
            />
            
            {/* Sticky Title Container */}
            <div 
                ref={titleContainerRef}
                className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none opacity-0"
                style={{ visibility: 'hidden' }}
            >
                <h2 
                    ref={titleRef}
                    className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold text-slate-800 whitespace-nowrap"
                    style={{ transformOrigin: 'center center' }}
                >
                    About <span className="unified-accent">Me</span>
                </h2>
            </div>

            {/* Content Section */}
            <div 
                id="about-content"
                ref={contentRef}
                className="corporate-section opacity-0 translate-y-10 flex items-center justify-center"
                style={{ minHeight: '100vh' }}
            >
                <div className="max-w-6xl mx-auto w-full">
                    <BlurFade delay={0.15} inView>
                        <div className="corporate-card p-6">
                            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                                {/* Profile Picture Section */}
                                <div className="flex-shrink-0 flex flex-col items-center lg:items-start">
                                    <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-2 border-[#7C9A9A]/30 shadow-lg mb-4">
                                        <img 
                                            src={profilePic} 
                                            alt="Bhuvan Shah" 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="text-center lg:text-left">
                                        <h3 className="text-xl lg:text-2xl font-bold text-slate-800 mb-1">Bhuvan Shah</h3>
                                        <p className="text-sm text-slate-600 mb-4">Software Engineer</p>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="flex-1 space-y-4">
                                    {/* About Text */}
                                    <div className="space-y-3">
                        {sentences.map((sentence, index) => (
                            <p 
                                key={index}
                                                className="text-sm sm:text-base text-slate-700 leading-relaxed text-left font-mono"
                            >
                                {sentence.trim()}{index < sentences.length - 1 ? '.' : ''}
                            </p>
                        ))}
                    </div>
                    
                                    {/* Divider */}
                                    <div className="border-t border-[#7C9A9A]/30 pt-4 mt-4">
                                        {/* Contact Info */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                                            <div className="flex items-center gap-3 text-sm text-slate-700">
                                                <FaEnvelope className="w-4 h-4 text-[#7C9A9A] flex-shrink-0" />
                                                <a 
                                                    href={`mailto:${CONTACT.email}`}
                                                    className="hover:text-[#7C9A9A] transition-colors truncate"
                                                >
                                                    {CONTACT.email}
                                                </a>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-slate-700">
                                                <FaMapMarkerAlt className="w-4 h-4 text-[#7C9A9A] flex-shrink-0" />
                                                <span>{CONTACT.address}</span>
                                            </div>
                                        </div>

                                        {/* Expertise Tags */}
                                        <div className="flex flex-wrap gap-2">
                                            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#7C9A9A]/20 text-slate-700 rounded-full text-xs font-medium border border-[#7C9A9A]/40">
                                                <FaCode className="w-3 h-3" />
                            Software Engineering
                        </span>
                                            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#A8B8D1]/20 text-slate-700 rounded-full text-xs font-medium border border-[#A8B8D1]/40">
                                                <FaBrain className="w-3 h-3" />
                                                Machine Learning
                        </span>
                                            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#D4A5A5]/20 text-slate-700 rounded-full text-xs font-medium border border-[#D4A5A5]/40">
                                                <FaCloud className="w-3 h-3" />
                                                Cloud Infrastructure
                        </span>
                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </BlurFade>
                </div>
            </div>
        </section>
    );
};

export default About;
