import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, X } from 'lucide-react';
import { jobsAPI } from '../services/api';
import Button from '../components/common/Button';
import JobsList from '../components/jobs/JobsList';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const JobsPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const { data: jobs, isLoading, error } = useQuery({
    queryKey: ['jobs'],
    queryFn: jobsAPI.getAllJobs,
  });

  const categories = [
    'All Categories',
    'Development',
    'Design',
    'Smart Contracts',
    'Web3',
    'dApp',
  ];

  const skills = [
    'React',
    'Node.js',
    'TypeScript',
    'Solidity',
    'Web3',
    'Smart Contracts',
    'Frontend',
    'Backend',
    'Full Stack',
  ];

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    setSelectedSkills([]);
  };

  const filteredJobs = jobs?.filter(job => {
    const matchesSearch =
      !searchTerm ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      !selectedCategory || selectedCategory === 'All Categories' || job.category === selectedCategory;

    const matchesSkills =
      selectedSkills.length === 0 || selectedSkills.some(skill => job.skills.includes(skill));

    return matchesSearch && matchesCategory && matchesSkills;
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-neutral-900">Find Jobs</h1>
      </div>

      {/* Filters Panel */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-neutral-400" />
          </div>
          <input
            type="text"
            placeholder="Search for jobs..."
            className="block w-full pl-10 pr-3 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category & Skill Filters */}
        <div className="grid md:grid-cols-6 gap-4">
          {/* Category */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Category
            </label>
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={selectedCategory || 'All Categories'}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Skills */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Skills
            </label>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleSkillToggle(skill)}
                  className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
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

          {/* Clear Button */}
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
          <div className="mt-2 flex items-center flex-wrap gap-2">
            <span className="text-sm text-neutral-500">Active filters:</span>
            {selectedCategory && selectedCategory !== 'All Categories' && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                {selectedCategory}
              </span>
            )}
            {selectedSkills.map(skill => (
              <span
                key={skill}
                className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
              >
                {skill}
              </span>
            ))}
            {searchTerm && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                "{searchTerm}"
              </span>
            )}
          </div>
        )}
      </div>

      {/* Jobs Result Section */}
      <div>
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">
          {isLoading ? 'Loading jobs...' : `${filteredJobs?.length || 0} job(s) found`}
        </h2>

        {error ? (
          <div className="p-4 bg-error-50 border border-error-200 text-error-700 rounded-lg">
            Failed to load jobs. Please try again later.
          </div>
        ) : (
          <JobsList jobs={filteredJobs || []} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
};

export default JobsPage;
