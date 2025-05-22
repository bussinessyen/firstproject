import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: { opacity: 1, x: 0 },
};

const linkVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const PrivacyPage: React.FC = () => {
  return (
    <motion.main
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-3xl font-bold text-primary-700 mb-6"
        variants={sectionVariants}
      >
        Privacy Policy
      </motion.h1>

      <motion.p
        className="text-neutral-700 leading-relaxed mb-4"
        variants={sectionVariants}
      >
        Your privacy is important to us. This page explains how BlockWork collects, uses, and protects your personal data in the context of our blockchain-enabled freelancing platform.
      </motion.p>

      {/* Sections */}

      <motion.section className="mb-8" variants={sectionVariants}>
        <motion.h2 className="text-2xl font-semibold mb-3">Information We Collect</motion.h2>
        <motion.p className="text-neutral-700 leading-relaxed mb-2">
          We collect information that you provide directly when you create an account, post jobs, bid on projects, or communicate with others on BlockWork. This includes your:
        </motion.p>
        <motion.ul
          className="list-disc list-inside text-neutral-700 mb-2"
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
            'Name, email address, and profile information',
            'Cryptocurrency wallet addresses used for payments and identity verification',
            'Job postings, bids, and project details',
            'Messages and communications with other users',
          ].map((item, i) => (
            <motion.li key={i} variants={listItemVariants} className="mb-1">
              {item}
            </motion.li>
          ))}
        </motion.ul>
        <motion.p className="text-neutral-700 leading-relaxed mb-2">
          Additionally, we collect technical data such as IP addresses, device types, browser info, and usage analytics to help improve the platform.
        </motion.p>
        <motion.p className="text-neutral-700 leading-relaxed">
          Note that blockchain transactions are publicly recorded on the blockchain network and are outside our control.
        </motion.p>
      </motion.section>

      <motion.section className="mb-8" variants={sectionVariants}>
        <motion.h2 className="text-2xl font-semibold mb-3">How We Use Your Information</motion.h2>
        <motion.p className="text-neutral-700 leading-relaxed mb-2">
          Your information helps us to:
        </motion.p>
        <motion.ul
          className="list-disc list-inside text-neutral-700 mb-2"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {[
            'Operate and maintain the platform services',
            'Enable wallet-based authentication and smart contract interactions',
            'Facilitate secure escrow payments and project completion verification',
            'Communicate important updates, notifications, and support',
            'Prevent fraud and ensure platform security',
            'Analyze usage patterns to improve user experience',
          ].map((item, i) => (
            <motion.li key={i} variants={listItemVariants} className="mb-1">
              {item}
            </motion.li>
          ))}
        </motion.ul>
        <motion.p className="text-neutral-700 leading-relaxed">
          We do not sell or rent your personal information to third parties. Any sharing with service providers is limited to those necessary to operate the platform and is subject to confidentiality agreements.
        </motion.p>
      </motion.section>

      <motion.section className="mb-8" variants={sectionVariants}>
        <motion.h2 className="text-2xl font-semibold mb-3">Data Security</motion.h2>
        <motion.p className="text-neutral-700 leading-relaxed">
          We implement industry-standard security protocols including encryption, access controls, and regular audits to protect your data. While we strive to protect your information, no system is completely secure, so please take steps to protect your account credentials.
        </motion.p>
        <motion.p className="text-neutral-700 leading-relaxed mt-2">
          Blockchain transactions are immutable and public by nature, so be mindful of what you share on-chain.
        </motion.p>
      </motion.section>

      <motion.section className="mb-8" variants={sectionVariants}>
        <motion.h2 className="text-2xl font-semibold mb-3">Your Rights</motion.h2>
        <motion.p className="text-neutral-700 leading-relaxed mb-2">
          You have rights concerning your personal data, including:
        </motion.p>
        <motion.ul
          className="list-disc list-inside text-neutral-700"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {[
            'Accessing and correcting your personal information',
            'Requesting deletion of your account and data (subject to legal or blockchain-related retention requirements)',
            'Opting out of marketing communications',
            'Requesting data portability',
          ].map((item, i) => (
            <motion.li key={i} variants={listItemVariants} className="mb-1">
              {item}
            </motion.li>
          ))}
        </motion.ul>
        <motion.p className="text-neutral-700 leading-relaxed mt-2">
          To exercise these rights, please contact us through the Contact page.
        </motion.p>
      </motion.section>

      <motion.section className="mb-8" variants={sectionVariants}>
        <motion.h2 className="text-2xl font-semibold mb-3">Changes to This Policy</motion.h2>
        <motion.p className="text-neutral-700 leading-relaxed">
          We may update this privacy policy periodically to reflect changes in our practices or legal requirements. We encourage you to review this page regularly. Continued use of BlockWork after changes signifies your acceptance.
        </motion.p>
      </motion.section>

      <motion.section variants={sectionVariants}>
        <motion.h2 className="text-2xl font-semibold mb-3">Contact Us</motion.h2>
        <motion.p className="text-neutral-700 leading-relaxed">
          If you have any questions or concerns about this privacy policy or your data, please contact us at{' '}
          <motion.a
            href="mailto:support@blockwork.com"
            className="text-primary-600 hover:underline"
            variants={linkVariants}
            whileHover="hover"
            whileTap="tap"
            transition={{ type: 'spring', stiffness: 300 }}
          >
            support@blockwork.com
          </motion.a>
          .
        </motion.p>
      </motion.section>
    </motion.main>
  );
};

export default PrivacyPage;
