import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import "../terminal.css";

const TerminalLoader = ({ onComplete }) => {
  const [input, setInput] = useState('');
  const [lines, setLines] = useState([]);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isTyping, setIsTyping] = useState(true); // Reverted state name
  const [skipAnimation, setSkipAnimation] = useState(false);
  const [activeLineIndex, setActiveLineIndex] = useState(-1);
  const [targetSection, setTargetSection] = useState(null);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  
  // Skip the typing animation and show all content immediately
  // Reverted handleSkip logic
  const handleSkip = () => {
    setSkipAnimation(true);
    const asciiArt = getAsciiArt(); // Need to ensure getAsciiArt is available
    
    const finalLines = [
      {
        id: 'ascii-art',
        type: 'system',
        content: asciiArt,
        isComplete: true
      },
      {
        id: 'welcome',
        type: 'system',
        content: '> Welcome to Bhuvan Shah\'s Portfolio Terminal',
        isComplete: true
      },
      {
        id: 'enter-info',
        type: 'system',
        content: '> Type "enter" or "start" to access the portfolio',
        isComplete: true
      },
      {
        id: 'help-info',
        type: 'system',
        content: '> Type "help" for more commands',
        isComplete: true
      }
    ];
    
    setLines(finalLines);
    setActiveLineIndex(-1);
    setIsTyping(false);
  };
  
  // ASCII art for different screen sizes
  const getAsciiArt = () => {
    // For small mobile screens, show a simpler version
    if (window.innerWidth < 480) {
      return `<pre>
 ████████╗███████╗██████╗ ███╗   ███╗
 ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║
    ██║   █████╗  ██████╔╝██╔████╔██║
    ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║
    ██║   ███████╗██║  ██║██║ ╚═╝ ██║
    ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝</pre>`;
    }
    
    // For tablets and medium screens
    if (window.innerWidth < 768) {
      return `<pre>
 ████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗     
 ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║     
    ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║     
    ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║     
    ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║███████╗
    ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝</pre>`;
    }
    
    // For large screens, full version
    return `<pre>
 ████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗     
 ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║     
    ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║     
    ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║     
    ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║███████╗
    ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝</pre>`;
  };
  
  // Effect to set initial lines instantly and handle resize
  useEffect(() => {
    // Define the complete initial messages
    const asciiArt = getAsciiArt();
    const initialLines = [
      {
        id: 'ascii-art',
        type: 'system',
        content: asciiArt,
        isComplete: true
      },
      {
        id: 'welcome',
        type: 'system',
        content: '> Welcome to Bhuvan Shah\'s Portfolio Terminal',
        isComplete: true
      },
      {
        id: 'enter-info',
        type: 'system',
        content: '> Type "enter" or "start" to access the portfolio',
        isComplete: true
      },
      {
        id: 'help-info',
        type: 'system',
        content: '> Type "help" for more commands',
        isComplete: true
      }
    ];

    // Set all initial lines at once if not skipped
    if (!skipAnimation) {
      setLines(initialLines);
      setIsTyping(false); // Mark "typing" as complete immediately
      setActiveLineIndex(-1); // Ensure no line is marked active
    }

    // Handle resize events for ASCII art
    const handleResize = () => {
      const newAsciiArt = getAsciiArt();
      setLines(prevLines => {
        // Update ASCII art line if it exists
        const updatedLines = [...prevLines];
        const asciiArtIndex = updatedLines.findIndex(line => line.id === 'ascii-art');
        if (asciiArtIndex !== -1) {
          updatedLines[asciiArtIndex] = {
            ...updatedLines[asciiArtIndex],
            content: newAsciiArt,
            isComplete: true // Ensure it's marked complete
          };
        }
        return updatedLines;
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [skipAnimation]); // Run only when skipAnimation changes or on mount
  
  // Auto-focus the input field and scroll to bottom on new lines
  // Reverted effect for focusing input and blinking cursor
  useEffect(() => {
    if (inputRef.current && !isTyping) { // Use original state check
      inputRef.current.focus();
    }
    
    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    
    // Scroll to the latest message
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
    
    return () => clearInterval(cursorInterval);
  }, [lines, isTyping]); // Reverted dependencies
  
  // Re-focus when clicking anywhere in the terminal
  // Reverted Re-focus logic
  const handleTerminalClick = () => {
    if (inputRef.current && !isTyping) { // Use original state check
      inputRef.current.focus();
    }
  };

  // Track the previous command to check for sequences
  const [previousCommand, setPreviousCommand] = useState('');

  // Process commands and generate appropriate responses
  const processCommand = (command) => {
    switch(command) {
      case 'enter':
      case 'start':
        return [
          { type: 'system', content: '> Access granted. Loading portfolio...' }
        ];
      case 'help':
        return [
          { type: 'system', content: '> Available commands:' },
          { type: 'system', content: '>   enter / start  - Access Bhuvan\'s portfolio' },
          { type: 'system', content: '>   about         - Brief information about Bhuvan' },
          { type: 'system', content: '>   skills        - List of technical skills' },
          { type: 'system', content: '>   contact       - Contact information' },
          { type: 'system', content: '>   projects      - View highlighted projects' },
          { type: 'system', content: '>   experience    - Work experience' },
          { type: 'system', content: '>   clear         - Clear terminal' },
          { type: 'system', content: '>   help          - Show available commands' },
          { type: 'system', content: '>   [command] enter - Navigate directly to section' }
        ];
      case 'about':
        setPreviousCommand('about');
        return [
          { type: 'system', content: '> About Bhuvan Shah:' },
          { type: 'system', content: '> Full-stack developer and technology enthusiast' },
          { type: 'system', content: '> with experience in modern web technologies.' },
          { type: 'system', content: '> Type "enter" to navigate to this section.' }
        ];
      case 'skills':
        setPreviousCommand('skills');
        return [
          { type: 'system', content: '> Technical Skills:' },
          { type: 'system', content: '>   - Front-end: React, JavaScript, HTML, CSS' },
          { type: 'system', content: '>   - Back-end: Node.js, Express' },
          { type: 'system', content: '>   - Other: Git, RESTful APIs' },
          { type: 'system', content: '> Type "enter" to navigate to this section.' }
        ];
      case 'contact':
        setPreviousCommand('contact');
        return [
          { type: 'system', content: '> Contact Information:' },
          { type: 'system', content: '>   LinkedIn: linkedin.com/in/bhuvanshah/' },
          { type: 'system', content: '>   GitHub: github.com/Bhuvannnn' },
          { type: 'system', content: '>   Instagram: instagram.com/bhu._.one/' },
          { type: 'system', content: '> Type "enter" to navigate to this section.' }
        ];
      case 'projects':
        setPreviousCommand('projects');
        return [
          { type: 'system', content: '> Highlighted Projects:' },
          { type: 'system', content: '> View Bhuvan\'s portfolio projects.' },
          { type: 'system', content: '> Type "enter" to navigate to this section.' }
        ];
      case 'experience':
        setPreviousCommand('experience');
        return [
          { type: 'system', content: '> Professional Experience:' },
          { type: 'system', content: '> Bhuvan\'s work history and accomplishments.' },
          { type: 'system', content: '> Type "enter" to navigate to this section.' }
        ];
      case 'clear':
        setPreviousCommand('');
        return [
          { type: 'system', content: '> Terminal cleared.' },
          { type: 'system', content: '> Type "help" for available commands.' }
        ];
      case '':
        return []; // Empty response for empty command
      default:
        setPreviousCommand('');
        return [
          { type: 'system', content: `> Command not found: ${command}. Type "help" for commands.` }
        ];
    }
  };
  
  // Handle key input
  // Reverted Handle key input logic
  const handleKeyDown = (e) => {
    if (isTyping) return; // Use original state check
    
    if (e.key === 'Enter') {
      const command = input.trim().toLowerCase();
      const userInput = { type: 'user', content: `guest@bhuvan-portfolio:~$ ${input}` };
      
      if (command === 'clear') {
        setLines(processCommand(command));
      } else if (command === 'enter' && previousCommand) {
        // If 'enter' is typed after a valid section command, set target section
        const section = previousCommand;
        setTargetSection(section);
        
        const commandResponse = [
          { type: 'system', content: `> Navigating to ${section} section...` }
        ];
        setLines([...lines, userInput, ...commandResponse]);
        
        // Navigate to the section with a delay
        setTimeout(() => {
          onComplete(section);
        }, 800);
      } else {
        const commandResponse = processCommand(command);
        setLines([...lines, userInput, ...commandResponse]);
        
        // If command is 'enter' or 'start' without a previous command, just enter the portfolio
        if ((command === 'enter' || command === 'start') && !previousCommand) {
          setTimeout(() => {
            onComplete();
          }, 800);
        }
      }
      
      setInput('');
    }
  };
  
  return (
    <div 
      className="fixed inset-0 bg-neutral-950 z-50 flex flex-col justify-center p-2 sm:p-4 md:p-8"
      onClick={handleTerminalClick}
    >
      
      <motion.div 
        className="max-w-3xl mx-auto w-full bg-black bg-opacity-90 rounded-md border border-gray-800 shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Terminal header with dots */}
        <div className="bg-gray-900 px-2 sm:px-4 py-2 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
            <div className="ml-2 sm:ml-4 text-neutral-400 text-xs font-mono truncate">guest@bhuvan-portfolio ~ terminal</div>
          </div>
          
          {/* Skip animation button for recruiters */}
          {/* Reverted Skip button logic */}
          {isTyping && ( // Use original state check
            <button
              onClick={handleSkip}
              className="text-xs text-gray-400 hover:text-white px-2 py-1 rounded hover:bg-gray-800 transition-colors"
            >
              Skip
            </button>
          )}
        </div>
        
        {/* Terminal content */}
        <div 
          ref={terminalRef}
          className="h-[60vh] sm:h-72 md:h-96 overflow-y-auto p-2 sm:p-4 font-mono text-xs sm:text-sm terminal-output"
        >
          {/* Display full lines only */}
          {/* Simplified rendering logic: Display all lines */}
          {lines.map((line, index) => (
            <div
              key={line.id || index}
              className={`mb-1 whitespace-pre-wrap break-words ${line.type === 'system' ? 'text-cyan-400' : 'text-white'}`}
              dangerouslySetInnerHTML={{ __html: line.content }}
            >
            </div>
          ))}
          
          {/* Command input line - show when initial "typing" is done */}
          {!isTyping && (
            <div className="flex items-center flex-wrap">
              <span className="text-green-500 text-xs sm:text-sm">guest@bhuvan-portfolio:~$</span>
              <span className="ml-2 text-white text-xs sm:text-sm">{input}</span>
              {/* Show blinking cursor only when input is focused */}
              {cursorVisible && document.activeElement === inputRef.current && <span className="ml-px w-2 h-4 sm:h-5 bg-white inline-block cursor-blink"></span>}
            </div>
          )}
        </div>
        
        {/* Recruiter-friendly tip */}
        <div className="bg-gray-900 p-2 sm:p-3 border-t border-gray-800 text-center">
          <div className="text-xs text-gray-300 font-mono">
            <span className="text-cyan-400">Tip:</span> Type <span className="text-yellow-400">enter</span> or <span className="text-yellow-400">start</span> and press Enter
          </div>
        </div>
        
        {/* Hidden input field for capturing keystrokes */}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="opacity-0 absolute"
          autoFocus
        />
      </motion.div>
    </div>
  );
};

export default TerminalLoader; 