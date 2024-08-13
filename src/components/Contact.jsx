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
        initial={{opacity:0, y:-100}}
        transition={{duration:1}}
        className="my-10 text-center text-4xl font-bold">
        Get in Touch
      </motion.h1>
      
      {/* Contact details */}
      <div className="text-center tracking-tighter">
        <motion.p 
          whileInView={{opacity:1, x:0}}
          initial={{opacity:0, x:-100}}
          transition={{duration:1}}
          className="my-4 text-lg"
        >
          {CONTACT.address}
        </motion.p>
        <motion.p 
          whileInView={{opacity:1, x:0}}
          initial={{opacity:0, x:100}}
          transition={{duration:1}}
          className="my-4 text-lg"
        >
          {CONTACT.phoneNo}
        </motion.p>
        <motion.a 
          whileInView={{opacity:1, x:0}}
          initial={{opacity:0, x:-100}}
          transition={{duration:1}}
          href={`mailto:${CONTACT.email}`} 
          className="border-b text-lg text-blue-500 hover:text-blue-700"
        >
          {CONTACT.email}
        </motion.a>
      </div>

      {/* Form section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }} 
        className="mt-10 mx-auto max-w-lg"
      >
        <form onSubmit={handleSubmit} className="text-center space-y-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-bold mb-2">Name</label>
            <motion.input 
              whileInView={{opacity:1, x:0}}
              initial={{opacity:0, x:-100}}
              transition={{duration:0.5}}
              whileFocus={{ scale: 1.05, borderColor: '#2563eb' }}
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
            <label htmlFor="email" className="block text-sm font-bold mb-2">Email Address</label>
            <motion.input
              whileInView={{opacity:1, x:0}}
              initial={{opacity:0, x:-100}}
              transition={{duration:0.5}}
              whileFocus={{ scale: 1.05, borderColor: '#2563eb' }}
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
            <label htmlFor="message" className="block text-sm font-bold mb-2">Message</label>
            <motion.textarea
              whileInView={{opacity:1, x:0}}
              initial={{opacity:0, x:-100}}
              transition={{duration:0.5}}
              whileFocus={{ scale: 1.05, borderColor: '#2563eb' }}
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
            whileInView={{opacity:1, x:0}}
            initial={{opacity:0, x:-100}}
            transition={{duration:0.5}}
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
