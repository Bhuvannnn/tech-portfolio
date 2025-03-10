import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = e => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleHover = () => {
      setIsHovering(true);
    };
    
    const handleLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', mouseMove);
    
    document.querySelectorAll('a, button, .interactive').forEach(el => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleLeave);
    });

    // Hide the default cursor
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      document.querySelectorAll('a, button, .interactive').forEach(el => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleLeave);
      });
      // Restore default cursor
      document.body.style.cursor = 'auto';
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 15,
      y: mousePosition.y - 15,
      borderColor: '#808080',
    },
    hover: {
      x: mousePosition.x - 22.5,
      y: mousePosition.y - 22.5,
      scale: 1.5,
      borderColor: '#9333ea',
    }
  };

  const dotVariants = {
    default: {
      x: mousePosition.x - 3,
      y: mousePosition.y - 3,
      backgroundColor: '#ffffff',
    },
    hover: {
      x: mousePosition.x - 3.6,
      y: mousePosition.y - 3.6,
      scale: 1.2,
    }
  };

  return (
    <>
      <motion.div
        className="cursor-ring fixed top-0 left-0 w-[30px] h-[30px] rounded-full border-2 border-gray-400 pointer-events-none z-50"
        variants={variants}
        animate={isHovering ? "hover" : "default"}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300
        }}
      />
      
      <motion.div
        className="cursor-dot fixed top-0 left-0 w-[6px] h-[6px] rounded-full bg-white pointer-events-none z-50"
        variants={dotVariants}
        animate={isHovering ? "hover" : "default"}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 500
        }}
      />
    </>
  );
};

export default CustomCursor;