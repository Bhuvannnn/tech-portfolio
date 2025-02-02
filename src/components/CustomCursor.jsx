import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleHover = () => {
      setIsHovering(true);
    };
    
    const handleLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', moveCursor);
    document.querySelectorAll('a, button, .interactive').forEach(el => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.querySelectorAll('a, button, .interactive').forEach(el => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  return (
    <motion.div
      className="fixed z-50 pointer-events-none"
      style={{
        left: position.x,
        top: position.y,
        translateX: '-50%',
        translateY: '-50%'
      }}
      animate={{
        scale: isHovering ? 2 : 1,
        backgroundColor: isHovering ? '#9333ea' : '#ffffff',
        opacity: isHovering ? 0.5 : 0.2
      }}
      transition={{ type: 'spring', stiffness: 500 }}
    >
      <div className="w-4 h-4 rounded-full" />
    </motion.div>
  );
};

export default CustomCursor;