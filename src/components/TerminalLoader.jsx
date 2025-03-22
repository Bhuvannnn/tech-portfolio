import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const TerminalLoader = ({ onComplete }) => {
  const [input, setInput] = useState('');
  const [lines, setLines] = useState([]);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isTyping, setIsTyping] = useState(true);
  const [skipAnimation, setSkipAnimation] = useState(false);
  const [activeLineIndex, setActiveLineIndex] = useState(-1);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  
  // Skip the typing animation and show all content immediately
  const handleSkip = () => {
    setSkipAnimation(true);
    const finalLines = [
      { 
        id: 'ascii-art',
        type: 'system', 
        content: `
 ████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗     
 ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║     
    ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║     
    ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║     
    ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║███████╗
    ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝`,
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
  
  // Initial welcome message typing animation
  useEffect(() => {
    // Define the complete messages to be shown
    const completedMessages = [
      { 
        id: 'ascii-art',
        content: `
 ████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗     
 ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║     
    ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║     
    ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║     
    ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║███████╗
    ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝` 
      },
      { 
        id: 'welcome',
        content: '> Welcome to Bhuvan Shah\'s Portfolio Terminal' 
      },
      { 
        id: 'enter-info',
        content: '> Type "enter" or "start" to access the portfolio' 
      },
      { 
        id: 'help-info',
        content: '> Type "help" for more commands' 
      }
    ];
    
    // Display ASCII art immediately without typing effect
    setLines([
      { 
        id: 'ascii-art',
        type: 'system', 
        content: completedMessages[0].content,
        isComplete: true
      }
    ]);
    
    // Start typing from the second message
    let currentMessageIndex = 1;
    let currentTypingTimeout = null;
    
    const typeMessage = () => {
      if (skipAnimation) {
        if (currentTypingTimeout) clearTimeout(currentTypingTimeout);
        return;
      }
      
      if (currentMessageIndex < completedMessages.length) {
        const message = completedMessages[currentMessageIndex];
        
        // Add a new line with the completed content immediately
        // This prevents partial messages from being visible
        setLines(prev => [
          ...prev, 
          { 
            id: message.id,
            type: 'system', 
            content: message.content,
            isComplete: true
          }
        ]);
        
        // Move to the next message
        currentMessageIndex++;
        
        // Add a delay before typing the next message
        if (currentMessageIndex < completedMessages.length) {
          currentTypingTimeout = setTimeout(typeMessage, 300);
        } else {
          // All messages are typed
          setActiveLineIndex(-1);
          setIsTyping(false);
        }
      }
    };
    
    // Start typing text messages after a short delay
    currentTypingTimeout = setTimeout(typeMessage, 200);
    
    return () => {
      if (currentTypingTimeout) clearTimeout(currentTypingTimeout);
    };
  }, [skipAnimation]);
  
  // Auto-focus the input field and scroll to bottom on new lines
  useEffect(() => {
    if (inputRef.current && !isTyping) {
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
  }, [lines, isTyping]);
  
  // Re-focus when clicking anywhere in the terminal
  const handleTerminalClick = () => {
    if (inputRef.current && !isTyping) {
      inputRef.current.focus();
    }
  };

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
          { type: 'system', content: '>   help          - Show available commands' }
        ];
      case 'about':
        return [
          { type: 'system', content: '> About Bhuvan Shah:' },
          { type: 'system', content: '> Full-stack developer and technology enthusiast with experience in modern web' },
          { type: 'system', content: '> technologies and a passion for creating engaging user experiences.' },
          { type: 'system', content: '> Currently focused on building innovative web applications and exploring' },
          { type: 'system', content: '> new technologies to enhance user experiences.' }
        ];
      case 'skills':
        return [
          { type: 'system', content: '> Technical Skills:' },
          { type: 'system', content: '>   - Front-end: React, JavaScript, HTML, CSS, TailwindCSS' },
          { type: 'system', content: '>   - Back-end: Node.js, Express' },
          { type: 'system', content: '>   - Other: Git, RESTful APIs' }
        ];
      case 'contact':
        return [
          { type: 'system', content: '> Contact Information:' },
          { type: 'system', content: '>   LinkedIn: linkedin.com/in/bhuvanshah/' },
          { type: 'system', content: '>   GitHub: github.com/Bhuvannnn' },
          { type: 'system', content: '>   Instagram: instagram.com/bhu._.one/' }
        ];
      case 'projects':
        return [
          { type: 'system', content: '> Highlighted Projects:' },
          { type: 'system', content: '> Type "enter" to access full portfolio with detailed project information.' }
        ];
      case 'experience':
        return [
          { type: 'system', content: '> Professional Experience:' },
          { type: 'system', content: '> Type "enter" to access full portfolio with detailed work experience.' }
        ];
      case 'clear':
        return [
          { type: 'system', content: '> Terminal cleared.' },
          { type: 'system', content: '> Type "help" for available commands.' }
        ];
      case '':
        return []; // Empty response for empty command
      default:
        return [
          { type: 'system', content: `> Command not found: ${command}. Type "help" for available commands.` }
        ];
    }
  };
  
  // Handle key input
  const handleKeyDown = (e) => {
    if (isTyping) return; // Prevent input while welcome message is typing
    
    if (e.key === 'Enter') {
      const command = input.trim().toLowerCase();
      const userInput = { type: 'user', content: `guest@bhuvan-portfolio:~$ ${input}` };
      
      if (command === 'clear') {
        setLines(processCommand(command));
      } else {
        const commandResponse = processCommand(command);
        setLines([...lines, userInput, ...commandResponse]);
        
        // If command is 'enter' or 'start', redirect to portfolio after a delay
        if (command === 'enter' || command === 'start') {
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
      className="fixed inset-0 bg-neutral-950 z-50 flex flex-col justify-center p-4 md:p-8"
      onClick={handleTerminalClick}
    >
      <motion.div 
        className="max-w-3xl mx-auto w-full bg-black bg-opacity-90 rounded-md border border-gray-800 shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Terminal header with dots */}
        <div className="bg-gray-900 px-4 py-2 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="ml-4 text-neutral-400 text-xs font-mono">guest@bhuvan-portfolio ~ terminal</div>
          </div>
          
          {/* Skip animation button for recruiters */}
          {isTyping && (
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
          className="h-72 md:h-96 overflow-y-auto p-4 font-mono text-sm terminal-output"
        >
          {/* Display full lines only */}
          {lines.map((line, index) => (
            <div 
              key={line.id || index} 
              className={`mb-1 whitespace-pre-wrap ${line.type === 'system' ? 'text-cyan-400' : 'text-white'}`}
            >
              {line.content}
            </div>
          ))}
          
          {/* Command input line - only show when not typing welcome message */}
          {!isTyping && (
            <div className="flex items-center">
              <span className="text-green-500">guest@bhuvan-portfolio:~$</span>
              <span className="ml-2 text-white">{input}</span>
              {cursorVisible && <span className="ml-px w-2 h-5 bg-white inline-block cursor-blink"></span>}
            </div>
          )}
        </div>
        
        {/* Recruiter-friendly tip */}
        <div className="bg-gray-900 p-3 border-t border-gray-800 text-center">
          <div className="text-xs text-gray-300 font-mono">
            <span className="text-cyan-400">Tip:</span> Type <span className="text-yellow-400">enter</span> or <span className="text-yellow-400">start</span> and press Enter to access portfolio
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