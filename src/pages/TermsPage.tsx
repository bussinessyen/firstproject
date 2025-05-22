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

const TermsPage: React.FC = () => {
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
        Terms of Service
      </motion.h1>

      <motion.p
        className="text-neutral-700 leading-relaxed mb-4"
        variants={sectionVariants}
      >
        These terms and conditions govern your use of BlockWork. By accessing or using our platform, you agree to comply with these terms. Please read them carefully.
      </motion.p>

      {/* Section 1 */}
      <motion.section className="mb-8" variants={sectionVariants}>
        <motion.h2 className="text-2xl font-semibold mb-3">1. Use of the Platform</motion.h2>
        <motion.p className="text-neutral-700 leading-relaxed mb-2">
          BlockWork is a freelance job marketplace that connects clients who post jobs with freelancers who complete them. Users must be at least 18 years old and comply with all applicable laws when using the platform.
        </motion.p>
        <motion.p className="text-neutral-700 leading-relaxed">
          You agree not to use the platform for any unlawful or fraudulent purposes, including but not limited to posting false information or infringing intellectual property rights.
        </motion.p>
      </motion.section>

      {/* Section 2 */}
      <motion.section className="mb-8" variants={sectionVariants}>
        <motion.h2 className="text-2xl font-semibold mb-3">2. Account Registration and Security</motion.h2>
        <motion.p className="text-neutral-700 leading-relaxed mb-2">
          To use certain features, you must register an account and connect a compatible blockchain wallet. You are responsible for maintaining the confidentiality of your account credentials and wallet security.
        </motion.p>
        <motion.p className="text-neutral-700 leading-relaxed">
          You agree to notify us immediately of any unauthorized use or breach of your account.
        </motion.p>
      </motion.section>

      {/* Section 3 */}
      <motion.section className="mb-8" variants={sectionVariants}>
        <motion.h2 className="text-2xl font-semibold mb-3">3. Job Posting and Bidding</motion.h2>
        <motion.p className="text-neutral-700 leading-relaxed">
          Clients can post jobs describing the project details, budget, and deadlines. Freelancers may submit bids to apply for these jobs. BlockWork does not guarantee the completion or success of any job.
        </motion.p>
      </motion.section>

      {/* Section 4 */}
      <motion.section className="mb-8" variants={sectionVariants}>
        <motion.h2 className="text-2xl font-semibold mb-3">4. Payments and Blockchain Escrow</motion.h2>
        <motion.p className="text-neutral-700 leading-relaxed mb-2">
          Payments between clients and freelancers are handled through blockchain smart contracts and escrow to ensure secure and transparent transactions.
        </motion.p>
        <motion.p className="text-neutral-700 leading-relaxed mb-2">
          Once a job is completed and approved, funds held in escrow will be released to the freelancer. Any disputes should be resolved according to the dispute resolution process outlined below.
        </motion.p>
        <motion.p className="text-neutral-700 leading-relaxed">
          Users are responsible for all transaction fees associated with blockchain payments.
        </motion.p>
      </motion.section>

      {/* Section 5 */}
      <motion.section className="mb-8" variants={sectionVariants}>
        <motion.h2 className="text-2xl font-semibold mb-3">5. Dispute Resolution</motion.h2>
        <motion.p className="text-neutral-700 leading-relaxed">
          In case of a dispute between clients and freelancers, both parties agree to negotiate in good faith to resolve the issue.
        </motion.p>
        <motion.p className="text-neutral-700 leading-relaxed">
          BlockWork may provide mediation services but is not liable for the outcome. Users may also seek independent legal remedies if necessary.
        </motion.p>
      </motion.section>

      {/* Section 6 */}
      <motion.section className="mb-8" variants={sectionVariants}>
        <motion.h2 className="text-2xl font-semibold mb-3">6. Intellectual Property</motion.h2>
        <motion.p className="text-neutral-700 leading-relaxed">
          Users retain ownership of the content they create but grant BlockWork a license to use and display it on the platform.
        </motion.p>
        <motion.p className="text-neutral-700 leading-relaxed">
          You agree not to upload content that infringes on others’ rights.
        </motion.p>
      </motion.section>

      {/* Section 7 */}
      <motion.section className="mb-8" variants={sectionVariants}>
        <motion.h2 className="text-2xl font-semibold mb-3">7. Limitation of Liability</motion.h2>
        <motion.p className="text-neutral-700 leading-relaxed">
          BlockWork is provided “as is” without warranties. We are not liable for damages resulting from use of the platform, including lost profits, data loss, or blockchain network issues.
        </motion.p>
      </motion.section>

      {/* Section 8 */}
      <motion.section className="mb-8" variants={sectionVariants}>
        <motion.h2 className="text-2xl font-semibold mb-3">8. Termination</motion.h2>
        <motion.p className="text-neutral-700 leading-relaxed">
          We reserve the right to suspend or terminate accounts that violate these terms or engage in harmful behavior.
        </motion.p>
      </motion.section>

      {/* Section 9 */}
      <motion.section className="mb-8" variants={sectionVariants}>
        <motion.h2 className="text-2xl font-semibold mb-3">9. Changes to Terms</motion.h2>
        <motion.p className="text-neutral-700 leading-relaxed">
          BlockWork may update these terms from time to time. We will notify users of significant changes. Continued use constitutes acceptance of the updated terms.
        </motion.p>
      </motion.section>

      {/* Section 10 */}
      <motion.section variants={sectionVariants}>
        <motion.h2 className="text-2xl font-semibold mb-3">10. Contact Us</motion.h2>
        <motion.p className="text-neutral-700 leading-relaxed">
          If you have questions or concerns about these terms, please contact us at{' '}
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

export default TermsPage;
