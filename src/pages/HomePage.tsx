import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Search, Briefcase, CheckCircle, DollarSign, Shield } from 'lucide-react';
import { jobsAPI } from '../services/api';
import Button from '../components/common/Button';
import JobsList from '../components/jobs/JobsList';

const fadeIn = (direction = 'up', delay = 0) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : -40,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
      },
    },
  };
  return variants;
};

const HomePage: React.FC = () => {
  const { data: recentJobs, isLoading } = useQuery({
    queryKey: ['recentJobs'],
    queryFn: async () => {
      const jobs = await jobsAPI.getAllJobs();
      return jobs.slice(0, 3);
    },
  });

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <motion.section
        variants={fadeIn('up', 0.1)}
        initial="hidden"
        animate="show"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl text-white shadow-xl"
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            variants={fadeIn('up', 0.2)}
            className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6"
          >
            Blockchain-Powered Freelance Marketplace
          </motion.h1>
          <motion.p
            variants={fadeIn('up', 0.3)}
            className="text-2xl sm:text-3xl opacity-90 mb-10"
          >
            Secure, transparent, and efficient freelancing with blockchain escrow payments
          </motion.p>

          <motion.div
            variants={fadeIn('up', 0.4)}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <Button
              size="lg"
              variant="primary"
              className="bg-white text-indigo-700 hover:bg-neutral-100 transition duration-300 shadow-lg"
              icon={<Briefcase className="h-5 w-5 text-indigo-700" />}
            >
              <Link to="/post-job" className="text-indigo-700 hover:text-indigo-900">Post a Job</Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="bg-white text-indigo-700 hover:bg-neutral-100 transition duration-300 shadow-lg"
              icon={<Search className="h-5 w-5 text-indigo-700" />}
            >
              <Link to="/jobs" className="text-indigo-700 hover:text-indigo-900">Find Work</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeIn('up', 0.1)}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-neutral-900">How It Works</h2>
          <p className="mt-4 text-xl text-neutral-600 max-w-3xl mx-auto">
            Our platform combines the best of freelancing with blockchain technology for secure payments
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          {[{
            icon: <Briefcase className="h-6 w-6" />, title: 'Post a Job',
            desc: 'Describe your project, set your budget, and publish your job listing to find the perfect talent.',
            bg: 'bg-primary-100', color: 'text-primary-600',
          }, {
            icon: <CheckCircle className="h-6 w-6" />, title: 'Choose Freelancer',
            desc: 'Review bids from qualified freelancers, check portfolios, and select the best match for your project.',
            bg: 'bg-secondary-100', color: 'text-secondary-600',
          }, {
            icon: <DollarSign className="h-6 w-6" />, title: 'Secure Payment',
            desc: 'Fund the escrow with cryptocurrency. Payment is only released when you approve the completed work.',
            bg: 'bg-success-100', color: 'text-success-600',
          }].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeIn('up', 0.2 + i * 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="bg-white p-10 rounded-2xl shadow-lg border text-center transition hover:shadow-xl"
            >
              <div className={`w-14 h-14 ${item.bg} rounded-full flex items-center justify-center ${item.color} mx-auto mb-5`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-semibold text-neutral-900 mb-4">{item.title}</h3>
              <p className="text-neutral-600 text-base">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-4 bg-neutral-50 rounded-3xl shadow-inner">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeIn('up', 0.1)}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-neutral-900">Why Choose BlockWork?</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {["Secure Escrow", "Transparent Process", "Lower Fees", "Global Access"].map((title, i) => (
            <motion.div
              key={i}
              variants={fadeIn('up', 0.2 + i * 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex items-start"
            >
              <div className="mr-5 text-primary-600">
                <Shield className="h-6 w-6 mt-1" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">{title}</h3>
                <p className="text-neutral-600">
                  {title === "Secure Escrow" && "Our smart contract escrow system ensures your funds are secure until work is completed and approved."}
                  {title === "Transparent Process" && "All transactions are recorded on the blockchain, providing complete transparency and auditability."}
                  {title === "Lower Fees" && "By eliminating intermediaries, we can offer lower fees than traditional freelancing platforms."}
                  {title === "Global Access" && "Connect with talent and clients worldwide, with cryptocurrency payments that work across borders."}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent Jobs Section */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeIn('up', 0.1)}
        className="py-16 px-4"
      >
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-neutral-900">Recent Jobs</h2>
          <Link to="/jobs" className="text-primary-600 hover:text-primary-700 font-semibold transition">
            View all jobs →
          </Link>
        </div>
        <JobsList jobs={recentJobs || []} isLoading={isLoading} />
      </motion.section>
    </div>
  );
};

export default HomePage;
