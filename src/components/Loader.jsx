import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

const Loader = () => {
  const typingSpeed = 50;
  const texts = [

    { text: 'Loading...', delay: 500 },
    { text: 'Loading...', delay: 1250 },
    { text: 'Building Portfolio...', delay: 200 },
    { text: 'Almost There...', delay: 1500 },
  ];

  const sequence = texts.flatMap(({ text, delay }) => [
    text,
    text.length * typingSpeed + delay,
  ]);

  return (
    <div className="fixed inset-0 bg-neutral-950 z-50 flex items-center justify-center">
      <motion.div 
        className="text-4xl font-bold"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          repeatType: 'mirror',
          repeatDelay: 3.5
        }}
      >
        <TypeAnimation
          sequence={sequence}
          speed={typingSpeed}
          repeat={Infinity}
          className="flowing-gradient-text"
          style={{
            background: "linear-gradient(45deg, #8BADC1, #FFFFFF, #8BADC1)",
            backgroundSize: "200% auto",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        />
      </motion.div>
    </div>
  );
};

export default Loader;