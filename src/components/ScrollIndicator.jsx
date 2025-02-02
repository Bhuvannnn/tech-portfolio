import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollIndicator = () => {
  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <svg width="50" height="50" viewBox="0 0 50 50">
        <motion.path
          d="M 25,5 A 20 20 0 1 1 25,45 A 20 20 0 1 1 25,5"
          fill="none"
          strokeWidth="3"
          stroke="#9333ea"
          strokeLinecap="round"
          style={{ pathLength }}
        />
        <motion.circle
          cx="25"
          cy="25"
          r="8"
          fill="#9333ea"
          animate={{
            y: [0, 10, 0],
            opacity: [1, 0.5, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </svg>
    </div>
  );
};

export default ScrollIndicator;