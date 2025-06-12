import { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // Import motion

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 }); // Start off-screen
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false); // State for hover effect
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile/touch screen
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
      // Touch events removed as component hides on mobile
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      // Touch events removed
    };

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if hovering over interactive elements
      const targetElement = e.target;
      if (targetElement instanceof Element &&
          (targetElement.closest('a') ||
           targetElement.closest('button') ||
           window.getComputedStyle(targetElement).cursor === 'pointer')) {
        setIsHoveringInteractive(true);
      } else {
        setIsHoveringInteractive(false);
      }
    };

    // Removed onTouchMove, onTouchStart, onTouchEnd

    const onMouseEnter = () => {
      setVisible(true);
    };

    const onMouseLeave = () => {
      setVisible(false);
    };

    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    addEventListeners();
    return () => removeEventListeners();
  }, []);

  // Don't render custom cursor on mobile devices
  if (isMobile) return null;

  // Define animation variants
  const variants = {
    default: {
      x: position.x - 8, // Adjust offset based on new size (16px / 2)
      y: position.y - 8,
      scale: clicked ? 0.8 : 1, // Slightly smaller scale on click
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.5,
      }
    },
    interactive: {
      x: position.x - 12, // Adjust offset based on hover size (24px / 2)
      y: position.y - 12,
      scale: 1.5, // Scale up on hover
      backgroundColor: "rgba(255, 255, 255, 0.5)", // Make slightly transparent
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20,
        mass: 0.5,
      }
    }
  };

  return (
    <motion.div
      variants={variants}
      animate={isHoveringInteractive ? "interactive" : "default"}
      className={`custom-cursor fixed pointer-events-none z-[9999] mix-blend-difference rounded-full ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        // Direct style application removed, handled by framer-motion variants
        // left and top are now controlled by variants x/y
        // transform is implicitly handled by framer-motion
        backgroundColor: "white", // Base background color
        width: isHoveringInteractive ? '24px' : '16px', // Animate size change
        height: isHoveringInteractive ? '24px' : '16px',
      }}
    >
      {/* Inner div removed, styling applied directly to motion.div */}
    </motion.div>
  );
};

export default CustomCursor;