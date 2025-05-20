import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { jobsAPI } from '../services/api';
import Button from '../components/common/Button';
import JobsList from '../components/jobs/JobsList';

const JobsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const { data: jobs, isLoading, error } = useQuery({
    queryKey: ['jobs'],
    queryFn: jobsAPI.getAllJobs,
  });

  const categories = ['All Categories', 'Development', 'Design', 'Smart Contracts', 'Web3', 'dApp'];

  const skills = [
    'React', 'Node.js', 'TypeScript', 'Solidity', 'Web3',
    'Smart Contracts', 'Frontend', 'Backend', 'Full Stack'
  ];

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    setSelectedSkills([]);
  };

  const filteredJobs = jobs?.filter(job => {
    const matchesSearch =
      searchTerm === '' ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      !selectedCategory || selectedCategory === 'All Categories' || job.category === selectedCategory;

    const matchesSkills =
      selectedSkills.length === 0 || selectedSkills.some(skill => job.skills.includes(skill));

    return matchesSearch && matchesCategory && matchesSkills;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-4xl font-bold text-neutral-900 tracking-tight">Find Jobs</h1>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-6 rounded-2xl shadow-lg border border-neutral-200"
      >
        {/* Search */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-neutral-400" />
          </div>
          <input
            type="text"
            placeholder="Search for jobs..."
            className="w-full pl-10 pr-3 py-3 rounded-lg border border-neutral-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-6 gap-4">
          {/* Category Filter */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-neutral-700 mb-1">Category</label>
            <select
              value={selectedCategory || 'All Categories'}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2 px-3 rounded-lg border border-neutral-300 focus:ring-primary-500 focus:border-primary-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Skill Tags */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-neutral-700 mb-1">Skills</label>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <button
                  key={skill}
                  onClick={() => handleSkillToggle(skill)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedSkills.includes(skill)
                      ? 'bg-primary-100 text-primary-800'
                      : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <div className="md:col-span-1 flex items-end">
            <Button
              variant="outline"
              onClick={clearFilters}
              className="w-full"
              icon={<X className="h-4 w-4" />}
            >
              Clear
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        {(selectedCategory || selectedSkills.length > 0 || searchTerm) && (
          <div className="mt-4">
            <span className="text-sm text-neutral-500">Active filters:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedCategory && selectedCategory !== 'All Categories' && (
                <span className="px-2.5 py-0.5 rounded-full text-xs bg-neutral-100 text-neutral-800">
                  {selectedCategory}
                </span>
              )}
              {selectedSkills.map(skill => (
                <span key={skill} className="px-2.5 py-0.5 rounded-full text-xs bg-primary-100 text-primary-800">
                  {skill}
                </span>
              ))}
              {searchTerm && (
                <span className="px-2.5 py-0.5 rounded-full text-xs bg-neutral-100 text-neutral-800">
                  "{searchTerm}"
                </span>
              )}
            </div>
          </div>
        )}
      </motion.div>

      {/* Job Listings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">
          {filteredJobs ? `${filteredJobs.length} jobs found` : 'Loading jobs...'}
        </h2>
        <JobsList jobs={filteredJobs || []} isLoading={isLoading} error={error as string} />
      </motion.div>
    </motion.div>
  );
};

export default JobsPage;