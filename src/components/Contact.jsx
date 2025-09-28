import React from 'react';
import { CONTACT } from "../constants";
import { motion } from "framer-motion";
import { useForm, ValidationError } from '@formspree/react';
import { BlurFade } from "./BlurFade";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  const [state, handleSubmit] = useForm("manwwenq"); // Replace with your Formspree form ID

  // Form submission success message
  if (state.succeeded) {
    return (
      <section id='contact' className="corporate-section">
        <div className="max-w-6xl mx-auto">
          <BlurFade direction="up" duration={0.7}>
            <h2 className="corporate-heading">
              <span className="unified-accent">Contact</span>
            </h2>
          </BlurFade>
        
          <BlurFade direction="up" duration={0.7} delay={0.2}>
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-6">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Message Sent Successfully!</h3>
              <p className="corporate-text text-lg">Thanks for reaching out! I'll get back to you soon.</p>
            </div>
          </BlurFade>
        </div>
      </section>
    );
  }

  return (
    <section id='contact' className="corporate-section">
      <div className="max-w-6xl mx-auto">
        <BlurFade direction="up" duration={0.7}>
          <h2 className="corporate-heading">
            Get in <span className="unified-accent">Touch</span>
          </h2>
        </BlurFade>
      
        {/* Contact details */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <BlurFade direction="up" duration={0.7} delay={0.1}>
            <div className="corporate-card p-6 text-center group cursor-pointer hover:border-blue-400/50">
              <div className="inline-flex items-center justify-center w-16 h-16 unified-accent-bg rounded-full mb-4 group-hover:bg-blue-500/30 transition-all duration-300 group-hover:scale-110">
                <FaMapMarkerAlt className="w-6 h-6 unified-accent group-hover:text-blue-300 transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">Location</h3>
              <p className="corporate-text group-hover:text-gray-200 transition-colors duration-300">{CONTACT.address}</p>
            </div>
          </BlurFade>
          
          <BlurFade direction="up" duration={0.7} delay={0.2}>
            <div className="corporate-card p-6 text-center group cursor-pointer hover:border-blue-400/50">
              <div className="inline-flex items-center justify-center w-16 h-16 unified-accent-bg rounded-full mb-4 group-hover:bg-blue-500/30 transition-all duration-300 group-hover:scale-110">
                <FaPhone className="w-6 h-6 unified-accent group-hover:text-blue-300 transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">Phone</h3>
              <p className="corporate-text group-hover:text-gray-200 transition-colors duration-300">{CONTACT.phoneNo}</p>
            </div>
          </BlurFade>
          
          <BlurFade direction="up" duration={0.7} delay={0.3}>
            <div className="corporate-card p-6 text-center group cursor-pointer hover:border-blue-400/50">
              <div className="inline-flex items-center justify-center w-16 h-16 unified-accent-bg rounded-full mb-4 group-hover:bg-blue-500/30 transition-all duration-300 group-hover:scale-110">
                <FaEnvelope className="w-6 h-6 unified-accent group-hover:text-blue-300 transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">Email</h3>
              <a 
                href={`mailto:${CONTACT.email}`} 
                className="unified-accent hover:text-blue-300 transition-colors duration-300 block group-hover:text-blue-200"
              >
                {CONTACT.email}
              </a>
            </div>
          </BlurFade>
        </div>

        {/* Form section */}
        <BlurFade direction="up" duration={0.7} delay={0.4}>
          <div className="max-w-2xl mx-auto">
            <div className="corporate-card p-8 hover:shadow-blue-500/10 transition-all duration-500">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 unified-accent-bg rounded-full mb-4">
                  <svg className="w-6 h-6 unified-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Send me a message</h3>
                <p className="corporate-text text-sm">I'd love to hear from you. Let's start a conversation!</p>
              </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group">
                <label htmlFor="name" className="block text-sm font-medium corporate-text mb-2 group-focus-within:text-blue-400 transition-colors duration-300">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-gray-800/70 transition-all duration-300 hover:border-gray-600"
                  placeholder="Your name"
                />
                <ValidationError 
                  prefix="Name" 
                  field="name"
                  errors={state.errors}
                />
              </div>
              
              <div className="group">
                <label htmlFor="email" className="block text-sm font-medium corporate-text mb-2 group-focus-within:text-blue-400 transition-colors duration-300">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-gray-800/70 transition-all duration-300 hover:border-gray-600"
                  placeholder="your.email@example.com"
                />
                <ValidationError 
                  prefix="Email" 
                  field="email"
                  errors={state.errors}
                />
              </div>
              
              <div className="group">
                <label htmlFor="message" className="block text-sm font-medium corporate-text mb-2 group-focus-within:text-blue-400 transition-colors duration-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-gray-800/70 transition-all duration-300 resize-none hover:border-gray-600"
                  placeholder="Tell me about your project or just say hello!"
                />
                <ValidationError 
                  prefix="Message" 
                  field="message"
                  errors={state.errors}
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={state.submitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full unified-gradient text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/25 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {state.submitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Send Message
                    </>
                  )}
                </span>
              </motion.button>
            </form>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
};

export default Contact;
