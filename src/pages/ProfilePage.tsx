import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { User, Mail, Wallet as WalletIcon, Star, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 30 },
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
  exit: { opacity: 0, y: -30, transition: { duration: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function ProfilePage() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="container mx-auto px-4 py-12"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.div className="max-w-3xl mx-auto" variants={itemVariants}>
          <motion.h1
            className="text-4xl font-extrabold text-neutral-900 mb-10 text-center"
            whileHover={{ scale: 1.02 }}
          >
            Your Profile
          </motion.h1>

          <motion.div
            className="bg-white shadow-lg rounded-2xl border border-neutral-200 overflow-hidden"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 140, damping: 18 }}
          >
            {/* Profile Header */}
            <motion.div
              className="p-8 bg-gradient-to-r from-primary-50 to-primary-100 border-b border-neutral-200"
              variants={itemVariants}
            >
              <div className="flex items-center space-x-6">
                <motion.div
                  className="h-24 w-24 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-3xl shadow-inner"
                  whileHover={{ rotate: 10, scale: 1.05 }}
                  whileTap={{ rotate: -10 }}
                >
                  <User className="h-12 w-12" />
                </motion.div>
                <div>
                  <motion.h2 className="text-2xl font-bold text-neutral-900">{user?.name}</motion.h2>
                  <p className="text-neutral-600 capitalize">{user?.accountType}</p>
                </div>
              </div>
            </motion.div>

            {/* Profile Details */}
            <motion.div className="p-8 space-y-10" variants={itemVariants}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Contact Info */}
                <motion.div className="space-y-5" variants={itemVariants}>
                  <h3 className="text-lg font-semibold text-neutral-800">Contact Information</h3>
                  <div className="space-y-3 text-neutral-700">
                    <motion.div className="flex items-center" whileHover={{ scale: 1.02 }}>
                      <Mail className="h-5 w-5 mr-2 text-primary-500" />
                      <span>{user?.email}</span>
                    </motion.div>
                    <motion.div className="flex items-center" whileHover={{ scale: 1.02 }}>
                      <WalletIcon className="h-5 w-5 mr-2 text-primary-500" />
                      <span>{user?.walletAddress || 'No wallet connected'}</span>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Stats */}
                <motion.div className="space-y-5" variants={itemVariants}>
                  <h3 className="text-lg font-semibold text-neutral-800">Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      className="bg-primary-50 p-5 rounded-xl shadow-sm cursor-pointer"
                      whileHover={{ scale: 1.08 }}
                    >
                      <div className="flex items-center text-primary-700 mb-1">
                        <Star className="h-5 w-5 mr-2 text-yellow-400" />
                        <span>Rating</span>
                      </div>
                      <motion.p
                        className="text-2xl font-bold text-neutral-900"
                        animate={{ opacity: [0, 1], y: [10, 0] }}
                        transition={{ delay: 0.2 }}
                      >
                        {user?.rating || '0.0'}
                      </motion.p>
                    </motion.div>

                    <motion.div
                      className="bg-primary-50 p-5 rounded-xl shadow-sm cursor-pointer"
                      whileHover={{ scale: 1.08 }}
                    >
                      <div className="flex items-center text-primary-700 mb-1">
                        <Briefcase className="h-5 w-5 mr-2 text-blue-500" />
                        <span>Jobs</span>
                      </div>
                      <motion.p
                        className="text-2xl font-bold text-neutral-900"
                        animate={{ opacity: [0, 1], y: [10, 0] }}
                        transition={{ delay: 0.3 }}
                      >
                        {user?.completedJobs || '0'}
                      </motion.p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Bio */}
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Bio</h3>
                <motion.p
                  className="text-neutral-600 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {user?.bio || (
                    <motion.span
                      className="italic text-neutral-400"
                      animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      No bio available.
                    </motion.span>
                  )}
                </motion.p>
              </motion.div>

              {/* Skills */}
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold text-neutral-800 mb-3">Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {user?.skills?.length ? (
                    user.skills.map((skill, index) => (
                      <motion.span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 shadow-sm"
                        whileHover={{ scale: 1.1, rotate: 1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        {skill}
                      </motion.span>
                    ))
                  ) : (
                    <motion.p
                      className="text-neutral-500 italic"
                      animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.03, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      No skills listed
                    </motion.p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ProfilePage;
