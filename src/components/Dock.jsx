import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaHome, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import LeetCodeLogo from "../assets/leetcode-logo.svg";

const DEFAULT_SIZE = 35;
const DEFAULT_MAGNIFICATION = 50;
const DEFAULT_DISTANCE = 120;

// Custom LeetCode Icon Component - Official SVG Logo
const LeetCodeIcon = ({ className = "" }) => {
  return (
    <img 
      src={LeetCodeLogo} 
      alt="LeetCode" 
      className={`text-white ${className}`}
      style={{ width: '18px', height: '18px', filter: 'brightness(0) invert(1)' }}
    />
  );
};

// Simple Tooltip Component
const Tooltip = ({ children, content, show }) => {
  return (
    <div className="relative group">
      {children}
      {show && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-xs text-white bg-black/90 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg border border-white/10">
          {content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
        </div>
      )}
    </div>
  );
};

const Dock = React.forwardRef(
  (
    {
      className = "",
      children,
      iconSize = DEFAULT_SIZE,
      iconMagnification = DEFAULT_MAGNIFICATION,
      iconDistance = DEFAULT_DISTANCE,
      direction = "middle",
      ...props
    },
    ref,
  ) => {
    const mouseX = useMotionValue(Infinity);

    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (
          React.isValidElement(child) &&
          child.type === DockIcon
        ) {
          return React.cloneElement(child, {
            ...child.props,
            mouseX: mouseX,
            size: iconSize,
            magnification: iconMagnification,
            distance: iconDistance,
          });
        }
        return child;
      });
    };

    const getDirectionClass = () => {
      switch (direction) {
        case "top":
          return "items-start";
        case "bottom":
          return "items-end";
        default:
          return "items-center";
      }
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        {...props}
        className={`bg-black/25 backdrop-blur-md mx-auto mt-8 flex h-[52px] w-max items-center justify-center gap-2 rounded-2xl border border-white/30 p-2 shadow-xl ring-1 ring-white/10 ${getDirectionClass()} ${className}`}
      >
        {renderChildren()}
      </motion.div>
    );
  },
);

Dock.displayName = "Dock";

const DockIcon = ({
  size = DEFAULT_SIZE,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className = "",
  children,
  ...props
}) => {
  const ref = useRef(null);
  const padding = Math.max(6, size * 0.2);
  const defaultMouseX = useMotionValue(Infinity);

  const distanceCalc = useTransform(mouseX ?? defaultMouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const sizeTransform = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [size, magnification, size],
  );

  const scaleSize = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width: scaleSize, height: scaleSize, padding }}
      className={`flex aspect-square cursor-pointer items-center justify-center rounded-full ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

DockIcon.displayName = "DockIcon";

// Separator Component
const Separator = () => {
  return (
    <div className="w-px h-8 bg-white/40 mx-1 shadow-sm"></div>
  );
};

// Default Dock with icons
const DefaultDock = () => {
  const [hoveredIcon, setHoveredIcon] = React.useState(null);

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGithubClick = () => {
    window.open('https://github.com/Bhuvannnn', '_blank');
  };

  const handleLinkedinClick = () => {
    window.open('https://www.linkedin.com/in/bhuvanshah/', '_blank');
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:bhuvanshah@gmail.com';
  };

  const handleLeetcodeClick = () => {
    window.open('https://leetcode.com/bhuvannnn/', '_blank');
  };

  return (
    <Dock>
      <DockIcon 
        onClick={handleHomeClick}
        onMouseEnter={() => setHoveredIcon('home')}
        onMouseLeave={() => setHoveredIcon(null)}
      >
        <Tooltip content="Home" show={hoveredIcon === 'home'}>
          <FaHome className="text-white text-lg" />
        </Tooltip>
      </DockIcon>
      
      <Separator />
      
      <DockIcon 
        onClick={handleGithubClick}
        onMouseEnter={() => setHoveredIcon('github')}
        onMouseLeave={() => setHoveredIcon(null)}
      >
        <Tooltip content="GitHub" show={hoveredIcon === 'github'}>
          <FaGithub className="text-white text-lg" />
        </Tooltip>
      </DockIcon>
      
      <DockIcon 
        onClick={handleLinkedinClick}
        onMouseEnter={() => setHoveredIcon('linkedin')}
        onMouseLeave={() => setHoveredIcon(null)}
      >
        <Tooltip content="LinkedIn" show={hoveredIcon === 'linkedin'}>
          <FaLinkedin className="text-white text-lg" />
        </Tooltip>
      </DockIcon>
      
      <DockIcon 
        onClick={handleEmailClick}
        onMouseEnter={() => setHoveredIcon('email')}
        onMouseLeave={() => setHoveredIcon(null)}
      >
        <Tooltip content="Email" show={hoveredIcon === 'email'}>
          <FaEnvelope className="text-white text-lg" />
        </Tooltip>
      </DockIcon>
      
      <Separator />
      
      <DockIcon 
        onClick={handleLeetcodeClick}
        onMouseEnter={() => setHoveredIcon('leetcode')}
        onMouseLeave={() => setHoveredIcon(null)}
      >
        <Tooltip content="LeetCode" show={hoveredIcon === 'leetcode'}>
          <LeetCodeIcon />
        </Tooltip>
      </DockIcon>
    </Dock>
  );
};

export { Dock, DockIcon, DefaultDock, Tooltip, Separator }; 