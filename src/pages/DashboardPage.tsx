import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      when: 'beforeChildren',
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  whileHover: { scale: 1.03 },
};

const emptyTextVariants = {
  animate: {
    opacity: [0.6, 1, 0.6],
    transition: { duration: 2, repeat: Infinity },
  },
};

function DashboardPage() {
  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.h1
        className="text-3xl font-bold mb-6 text-neutral-900"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Active Jobs Card */}
        <motion.div
          className="bg-white rounded-lg shadow p-6"
          variants={cardVariants}
          whileHover="whileHover"
        >
          <h2 className="text-xl font-semibold mb-4 text-neutral-800">Active Jobs</h2>
          <motion.p
            className="text-gray-500 italic"
            variants={emptyTextVariants}
            animate="animate"
          >
            No active jobs found
          </motion.p>
        </motion.div>

        {/* Applications Card */}
        <motion.div
          className="bg-white rounded-lg shadow p-6"
          variants={cardVariants}
          whileHover="whileHover"
        >
          <h2 className="text-xl font-semibold mb-4 text-neutral-800">Applications</h2>
          <motion.p
            className="text-gray-500 italic"
            variants={emptyTextVariants}
            animate="animate"
          >
            No applications found
          </motion.p>
        </motion.div>

        {/* Earnings Card */}
        <motion.div
          className="bg-white rounded-lg shadow p-6"
          variants={cardVariants}
          whileHover="whileHover"
        >
          <h2 className="text-xl font-semibold mb-4 text-neutral-800">Earnings</h2>
          <motion.p
            className="text-gray-500 italic"
            variants={emptyTextVariants}
            animate="animate"
          >
            No earnings to display
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default DashboardPage;
