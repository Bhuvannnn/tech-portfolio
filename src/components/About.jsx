import { useEffect, useRef, useState } from 'react';
import { ABOUT_TEXT, CONTACT, JOBS, SOCIAL_LINKS } from '../constants';
import { BlurFade } from './BlurFade';
import profilePic from "../assets/BhuvanProfile.jpg";
import { 
    FaMapMarkerAlt, 
    FaEnvelope, 
    FaPhone, 
    FaGlobe,
    FaGithub,
    FaLinkedin,
    FaCode,
    FaLightbulb,
    FaClock,
    FaMars
} from "react-icons/fa";
import { HiCheckBadge } from "react-icons/hi2";
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
    const [currentTime, setCurrentTime] = useState('');

    // Get current local time
    useEffect(() => {
        const updateTime = () => {
            try {
                const timeZone = CONTACT.timeZone || 'America/Los_Angeles';
                const now = new Date();
                const formatter = new Intl.DateTimeFormat('en-US', {
                    timeZone: timeZone,
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                });
                const timeStr = formatter.format(now);
                setCurrentTime(timeStr);
            } catch (e) {
                setCurrentTime('');
            }
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

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

    const getJobIcon = (title) => {
        if (/(founder|co-founder|founding)/i.test(title)) {
            return <FaLightbulb className="w-4 h-4" />;
        }
        if (/(developer|engineer)/i.test(title)) {
            return <FaCode className="w-4 h-4" />;
        }
        return <FaCode className="w-4 h-4" />;
    };

    const getSocialIcon = (iconName) => {
        switch (iconName) {
            case 'github':
                return <FaGithub className="w-5 h-5" />;
            case 'linkedin':
                return <FaLinkedin className="w-5 h-5" />;
            default:
                return null;
        }
    };

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
                className="opacity-0 translate-y-10 corporate-section screen-line-before screen-line-after border-x border-[#7C9A9A]/30"
                style={{ minHeight: '100vh', paddingTop: '6rem', paddingBottom: '2rem' }}
            >
                <div className="max-w-6xl mx-auto w-full">
                    {/* Profile Header */}
                    <div className="corporate-card screen-line-before screen-line-after border-x border-[#7C9A9A]/30">
                        <div className="flex border-b border-[#7C9A9A]/30">
                            <div className="shrink-0 border-r border-[#7C9A9A]/30 relative">
                                <div className="mx-0.5 my-0.75">
                                    <img
                                        className="size-32 rounded-full ring-1 ring-slate-200 dark:ring-slate-700 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 select-none sm:size-40"
                                        alt="Bhuvan Shah's avatar"
                                            src={profilePic} 
                                    />
                                </div>
                            </div>

                            <div className="flex flex-1 flex-col">
                                <div className="flex grow items-end pb-1 pl-4">
                                    <div className="line-clamp-1 font-mono text-xs text-slate-300 dark:text-slate-700 select-none max-sm:hidden">
                                        Software Engineer & ML Enthusiast
                                    </div>
                                </div>

                                <div className="border-t border-[#7C9A9A]/30">
                                    <div className="flex items-center gap-2 pl-4">
                                        <h1 className="-translate-y-px text-3xl font-semibold text-slate-950 dark:text-slate-50">
                                            Bhuvan Shah
                                        </h1>
                                        <HiCheckBadge className="size-4.5 text-blue-500 select-none" aria-label="Verified" />
                                    </div>

                                    <div className="h-12.5 border-t border-[#7C9A9A]/30 py-1 pl-4 sm:h-9">
                                        <div className="font-mono text-sm text-slate-600 dark:text-slate-400">
                                            Software Engineer
                                        </div>
                                    </div>
                                </div>
                            </div>
                                    </div>
                                </div>

                    {/* Separator */}
                    <div className="relative flex h-8 w-full border-x border-[#7C9A9A]/30">
                        <div 
                            className="absolute -left-[100vw] -z-1 h-8 w-[200vw] opacity-56 dark:opacity-40"
                            style={{
                                backgroundImage: 'repeating-linear-gradient(315deg, rgb(226 232 240) 0, rgb(226 232 240) 1px, transparent 0, transparent 50%)',
                                backgroundSize: '10px 10px'
                            }}
                        ></div>
                        <div 
                            className="absolute -left-[100vw] -z-1 h-8 w-[200vw] opacity-0 dark:opacity-40 hidden dark:block"
                            style={{
                                backgroundImage: 'repeating-linear-gradient(315deg, rgb(51 65 85) 0, rgb(51 65 85) 1px, transparent 0, transparent 50%)',
                                backgroundSize: '10px 10px'
                            }}
                        ></div>
                    </div>
                    
                    {/* Overview Section */}
                    <div className="corporate-card screen-line-before screen-line-after border-x border-[#7C9A9A]/30">
                        <div className="p-4 space-y-2.5">
                            {/* Job Titles */}
                            {JOBS && JOBS.map((job, index) => (
                                <div key={index} className="flex items-center gap-4 font-mono text-sm">
                                    <div className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 ring-offset-1 ring-offset-white dark:ring-offset-slate-900">
                                        {getJobIcon(job.title)}
                                    </div>
                                    <p className="text-balance text-slate-700 dark:text-slate-300">
                                        {job.title} @ <span className="font-medium underline-offset-4 hover:underline">{job.company}</span>
                                    </p>
                                </div>
                            ))}

                            {/* Contact Info Grid */}
                            <div className="grid gap-x-12 gap-y-2.5 sm:grid-cols-2 pt-2">
                                {/* Location */}
                                <div className="flex items-center gap-4 font-mono text-sm">
                                    <div className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 ring-offset-1 ring-offset-white dark:ring-offset-slate-900">
                                        <FaMapMarkerAlt className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                                    </div>
                                    <p className="text-balance text-slate-700 dark:text-slate-300">
                                        <a 
                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline-offset-4 hover:underline"
                                        >
                                            {CONTACT.address}
                                        </a>
                                    </p>
                                </div>

                                {/* Time */}
                                {currentTime && (
                                    <div className="flex items-center gap-4 font-mono text-sm">
                                        <div className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 ring-offset-1 ring-offset-white dark:ring-offset-slate-900">
                                            <FaClock className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                                        </div>
                                        <p className="text-balance text-slate-700 dark:text-slate-300">
                                            {currentTime}
                                        </p>
                                    </div>
                                )}

                                {/* Phone */}
                                {CONTACT.phone && (
                                    <div className="flex items-center gap-4 font-mono text-sm">
                                        <div className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 ring-offset-1 ring-offset-white dark:ring-offset-slate-900">
                                            <FaPhone className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                                        </div>
                                        <p className="text-balance text-slate-700 dark:text-slate-300">
                                            <a 
                                                href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                                                className="underline-offset-4 hover:underline"
                                            >
                                                {CONTACT.phone}
                                            </a>
                                        </p>
                                    </div>
                                )}

                                {/* Email */}
                                <div className="flex items-center gap-4 font-mono text-sm">
                                    <div className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 ring-offset-1 ring-offset-white dark:ring-offset-slate-900">
                                        <FaEnvelope className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                                    </div>
                                    <p className="text-balance text-slate-700 dark:text-slate-300">
                                                <a 
                                                    href={`mailto:${CONTACT.email}`}
                                            className="underline-offset-4 hover:underline"
                                                >
                                                    {CONTACT.email}
                                                </a>
                                    </p>
                                </div>

                                {/* Website */}
                                {CONTACT.website && (
                                    <div className="flex items-center gap-4 font-mono text-sm">
                                        <div className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 ring-offset-1 ring-offset-white dark:ring-offset-slate-900">
                                            <FaGlobe className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                                            </div>
                                        <p className="text-balance text-slate-700 dark:text-slate-300">
                                            <a 
                                                href={`https://${CONTACT.website}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="underline-offset-4 hover:underline"
                                            >
                                                {CONTACT.website}
                                            </a>
                                        </p>
                                            </div>
                                )}

                                {/* Pronouns */}
                                {CONTACT.pronouns && (
                                    <div className="flex items-center gap-4 font-mono text-sm">
                                        <div className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700 ring-offset-1 ring-offset-white dark:ring-offset-slate-900">
                                            <FaMars className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                                        </div>
                                        <p className="text-balance text-slate-700 dark:text-slate-300" aria-label={`Pronouns: ${CONTACT.pronouns}`}>
                                            {CONTACT.pronouns}
                                        </p>
                                    </div>
                                )}
                            </div>
                                            </div>
                                        </div>

                    {/* Separator */}
                    <div className="relative flex h-8 w-full border-x border-[#7C9A9A]/30">
                        <div 
                            className="absolute -left-[100vw] -z-1 h-8 w-[200vw] opacity-56 dark:opacity-40"
                            style={{
                                backgroundImage: 'repeating-linear-gradient(315deg, rgb(226 232 240) 0, rgb(226 232 240) 1px, transparent 0, transparent 50%)',
                                backgroundSize: '10px 10px'
                            }}
                        ></div>
                        <div 
                            className="absolute -left-[100vw] -z-1 h-8 w-[200vw] opacity-0 dark:opacity-40 hidden dark:block"
                            style={{
                                backgroundImage: 'repeating-linear-gradient(315deg, rgb(51 65 85) 0, rgb(51 65 85) 1px, transparent 0, transparent 50%)',
                                backgroundSize: '10px 10px'
                            }}
                        ></div>
                    </div>

                    {/* Social Links Section */}
                    {SOCIAL_LINKS && SOCIAL_LINKS.length > 0 && (
                        <div className="corporate-card screen-line-before screen-line-after border-x border-[#7C9A9A]/30">
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
                                    <div className="border-r border-[#7C9A9A]/30"></div>
                                    <div className="border-l border-[#7C9A9A]/30"></div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {SOCIAL_LINKS.map((link, index) => (
                                        <a
                                            key={index}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group/link flex cursor-pointer items-center gap-4 p-4 pr-2 transition-[background-color] ease-out hover:bg-slate-50 dark:hover:bg-slate-800"
                                        >
                                            <div className="relative size-12 shrink-0 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                                {getSocialIcon(link.icon)}
                                            </div>

                                            <div className="flex-1">
                                                <h3 className="flex items-center font-medium underline-offset-4 group-hover/link:underline text-slate-900 dark:text-slate-100">
                                                    {link.title}
                                                </h3>
                                                {link.description && (
                                                    <p className="text-sm text-slate-600 dark:text-slate-400">{link.description}</p>
                                                )}
                                    </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Separator */}
                    <div className="relative flex h-8 w-full border-x border-[#7C9A9A]/30">
                        <div 
                            className="absolute -left-[100vw] -z-1 h-8 w-[200vw] opacity-56 dark:opacity-40"
                            style={{
                                backgroundImage: 'repeating-linear-gradient(315deg, rgb(226 232 240) 0, rgb(226 232 240) 1px, transparent 0, transparent 50%)',
                                backgroundSize: '10px 10px'
                            }}
                        ></div>
                        <div 
                            className="absolute -left-[100vw] -z-1 h-8 w-[200vw] opacity-0 dark:opacity-40 hidden dark:block"
                            style={{
                                backgroundImage: 'repeating-linear-gradient(315deg, rgb(51 65 85) 0, rgb(51 65 85) 1px, transparent 0, transparent 50%)',
                                backgroundSize: '10px 10px'
                            }}
                        ></div>
                    </div>

                    {/* About Text Section */}
                    <div className="corporate-card screen-line-before screen-line-after border-x border-[#7C9A9A]/30">
                        <div className="p-4">
                            <h2 className="text-3xl font-semibold mb-4 text-slate-900 dark:text-slate-100">About</h2>
                            <div className="font-mono text-sm text-slate-700 dark:text-slate-300 space-y-3">
                                {sentences.map((sentence, index) => (
                                    <p key={index} className="text-balance leading-relaxed">
                                        {sentence.trim()}{index < sentences.length - 1 ? '.' : ''}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;