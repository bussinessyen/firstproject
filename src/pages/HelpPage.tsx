import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const messageVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const HelpPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // TODO: Implement sending form data to backend or email service

    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <motion.main
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-3xl font-bold text-primary-700 mb-6"
        variants={sectionVariants}
      >
        Help & Support
      </motion.h1>

      <motion.p
        className="text-neutral-700 leading-relaxed mb-6"
        variants={sectionVariants}
      >
        Welcome to BlockWork Support! Whether you are a client looking to post a job or a freelancer ready to apply and get paid securely using blockchain technology, we are here to assist you.
      </motion.p>

      <motion.section className="mb-8" variants={sectionVariants}>
        <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
        <p className="text-neutral-700 leading-relaxed mb-2">
          To get started, create an account and connect your cryptocurrency wallet. Clients can post jobs with detailed requirements, while freelancers can browse and bid on projects.
        </p>
        <p className="text-neutral-700 leading-relaxed">
          Payments are facilitated securely through blockchain escrow smart contracts, ensuring trust and transparency.
        </p>
      </motion.section>

      <motion.section className="mb-8" variants={sectionVariants}>
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <motion.ul
          className="list-disc list-inside text-neutral-700 mb-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {[
            "How do I connect my wallet? Use the wallet connect feature on your profile page to link your preferred crypto wallet.",
            "How are payments handled? Payments are locked in escrow on the blockchain until the job is completed and approved by the client.",
            "Can I dispute a payment? Yes, we have a dispute resolution process facilitated via the platform and smart contracts.",
            "Is my personal data safe? We prioritize your privacy and security; please see our Privacy Policy for details.",
          ].map((text, i) => (
            <motion.li
              key={i}
              className="mb-2"
              variants={listItemVariants}
              custom={i}
            >
              <strong>{text.split('?')[0]}?</strong> {text.split('?')[1].trim()}
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>

      {/* Contact Form */}
      <motion.section variants={sectionVariants}>
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <AnimatePresence>
          {submitted ? (
            <motion.div
              key="success-message"
              className="bg-green-100 text-green-800 p-4 rounded mb-6"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={messageVariants}
              transition={{ duration: 0.3 }}
            >
              Thank you for contacting us! We will get back to you shortly.
            </motion.div>
          ) : (
            <motion.form
              key="contact-form"
              onSubmit={handleSubmit}
              noValidate
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence>
                {error && (
                  <motion.div
                    className="bg-red-100 text-red-700 p-3 rounded mb-4"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    key="error-message"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mb-4">
                <label htmlFor="name" className="block mb-1 font-medium text-neutral-800">
                  Name
                </label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-neutral-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 8px rgb(59 130 246 / 0.7)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block mb-1 font-medium text-neutral-800">
                  Email
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-neutral-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 8px rgb(59 130 246 / 0.7)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block mb-1 font-medium text-neutral-800">
                  Message
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-neutral-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 8px rgb(59 130 246 / 0.7)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                ></motion.textarea>
              </div>

              <motion.button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2 rounded transition"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                transition={{ type: "spring", stiffness: 300 }}
              >
                Send Message
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.section>
    </motion.main>
  );
};

export default HelpPage;
