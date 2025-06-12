import React from 'react';
import { SiHungryjacks } from "react-icons/si";
import { CONTACT } from "../constants";
import { motion } from "framer-motion";
import { useForm, ValidationError } from '@formspree/react';

const Contact = () => {
  const [state, handleSubmit] = useForm("manwwenq"); // Replace with your Formspree form ID

  // Form submission success message
  if (state.succeeded) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 1.5 }} 
        className="text-center py-20"
      >
        <p>Thanks for reaching out! We will get back to you soon.</p>
      </motion.div>
    );
  }

  return (
    <div id='contact' className="border-b border-neutral-900 pb-20">
      <motion.h1 
        whileInView={{opacity:1, y:0}}
        initial={{opacity:0, y:-20}} // Changed initial y from -100 to -20
        transition={{duration:0.5}} // Shortened duration for consistency
        className="my-10 text-center text-4xl font-bold">
        Get in Touch
      </motion.h1>
      
      {/* Contact details */}
      <div className="text-center tracking-tighter">
        <motion.p 
          whileInView={{opacity:1, x:0}}
          initial={{opacity:0, x:-50}} // Reduced initial x offset
          transition={{duration:0.5, delay: 0.1}} // Added stagger delay
          className="my-4 text-lg"
        >
          {CONTACT.address}
        </motion.p>
        <motion.p 
          whileInView={{opacity:1, x:0}}
          initial={{opacity:0, x:50}} // Reduced initial x offset
          transition={{duration:0.5, delay: 0.2}} // Added stagger delay
          className="my-4 text-lg"
        >
          {CONTACT.phoneNo}
        </motion.p>
        <motion.a 
          whileInView={{opacity:1, x:0}}
          initial={{opacity:0, x:-50}} // Reduced initial x offset
          transition={{duration:0.5, delay: 0.3}} // Added stagger delay
          href={`mailto:${CONTACT.email}`} 
          className="border-b text-lg text-blue-500 hover:text-blue-700"
        >
          {CONTACT.email}
        </motion.a>
      </div>

      {/* Form section */}
      {/* Changed form container to use whileInView */}
      <motion.div
        initial={{ opacity: 0, y: 50 }} // Start slightly below
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }} // Trigger when 20% visible
        transition={{ duration: 0.6 }}
        className="mt-10 mx-auto max-w-lg"
      >
        <form onSubmit={handleSubmit} className="text-center space-y-6">
          <div className="mb-4">
            {/* Stagger label and input */}
            <motion.label
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              htmlFor="name"
              className="block text-sm font-bold mb-2"
            >
              Name
            </motion.label>
            <motion.input
              initial={{opacity:0, x:-50}} // Reduced offset
              whileInView={{opacity:1, x:0}}
              transition={{duration:0.5, delay: 0.2}} // Stagger delay
              // Removed whileFocus scale effect
              id="name"
              type="text"
              name="name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
            <ValidationError 
              prefix="Name" 
              field="name"
              errors={state.errors}
            />
          </div>
          <div className="mb-4">
            {/* Stagger label and input */}
            <motion.label
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              htmlFor="email"
              className="block text-sm font-bold mb-2"
            >
              Email Address
            </motion.label>
            <motion.input
              initial={{opacity:0, x:50}} // Changed direction for variety
              whileInView={{opacity:1, x:0}}
              transition={{duration:0.5, delay: 0.4}} // Stagger delay
              // Removed whileFocus scale effect
              id="email"
              type="email"
              name="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
            <ValidationError 
              prefix="Email" 
              field="email"
              errors={state.errors}
            />
          </div>
          <div className="mb-4">
            {/* Stagger label and textarea */}
             <motion.label
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              htmlFor="message"
              className="block text-sm font-bold mb-2"
            >
              Message
            </motion.label>
            <motion.textarea
              initial={{opacity:0, x:-50}} // Reduced offset
              whileInView={{opacity:1, x:0}}
              transition={{duration:0.5, delay: 0.6}} // Stagger delay
              // Removed whileFocus scale effect
              id="message"
              name="message"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
            <ValidationError 
              prefix="Message" 
              field="message"
              errors={state.errors}
            />
          </div>
          <motion.button
            // Stagger button
            initial={{opacity:0, y:20}} // Animate from below
            whileInView={{opacity:1, y:0}}
            transition={{duration:0.5, delay: 0.7}} // Stagger delay
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            disabled={state.submitting}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;
