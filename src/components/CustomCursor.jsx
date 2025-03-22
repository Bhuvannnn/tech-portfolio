import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
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
      
      // Add touch events for mobile
      document.addEventListener('touchstart', onTouchStart);
      document.addEventListener('touchmove', onTouchMove);
      document.addEventListener('touchend', onTouchEnd);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      
      // Remove touch events
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        setPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
        setVisible(true);
      }
    };

    const onTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        setPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
        setVisible(true);
        setClicked(true);
        
        // Hide the cursor after a short delay (simulating tap)
        setTimeout(() => {
          setClicked(false);
          setTimeout(() => {
            setVisible(false);
          }, 150);
        }, 150);
      }
    };

    const onTouchEnd = () => {
      setClicked(false);
      
      // Hide cursor after touch end with a small delay
      setTimeout(() => {
        setVisible(false);
      }, 100);
    };

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

  return (
    <div 
      className={`custom-cursor fixed pointer-events-none z-[9999] mix-blend-difference transition-transform duration-150 ${
        visible ? 'opacity-100' : 'opacity-0'
      } ${
        clicked ? 'scale-50' : 'scale-100'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div className="h-5 w-5 rounded-full bg-white"></div>
    </div>
  );
};

export default CustomCursor;