import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      when: 'beforeChildren',
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const AboutUsPage: React.FC = () => {
  return (
    <motion.main
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-3xl font-bold text-primary-700 mb-6"
        variants={itemVariants}
      >
        About Us
      </motion.h1>

      <motion.p className="text-neutral-700 leading-relaxed mb-6" variants={itemVariants}>
        Welcome to <strong>BlockWork</strong> — a next-generation freelancing platform designed to connect skilled professionals with innovative clients in the blockchain and tech industry.
      </motion.p>

      <motion.p className="text-neutral-700 leading-relaxed mb-6" variants={itemVariants}>
        Our mission is to empower both freelancers and clients by providing a secure, transparent, and decentralized marketplace where trust is established through blockchain technology. We leverage smart contracts and escrow mechanisms to facilitate safe, efficient payments and project delivery.
      </motion.p>

      <motion.p className="text-neutral-700 leading-relaxed mb-6" variants={itemVariants}>
        At BlockWork, clients can post detailed job listings specifying their project requirements and budgets. Freelancers can browse and bid on projects that match their skills and interests. Once hired, payments are securely held in blockchain escrow until the job is successfully completed and approved, ensuring fairness for all parties.
      </motion.p>

      <motion.p className="text-neutral-700 leading-relaxed mb-6" variants={itemVariants}>
        Whether you are a developer, designer, project manager, or entrepreneur, BlockWork is committed to fostering a collaborative environment that supports career growth and innovation. Our platform is designed to reduce friction and increase trust in freelance transactions using decentralized technology.
      </motion.p>

      <motion.p className="text-neutral-700 leading-relaxed" variants={itemVariants}>
        Join BlockWork today and experience the future of freelancing — where blockchain meets opportunity.
      </motion.p>
    </motion.main>
  );
};

export default AboutUsPage;
