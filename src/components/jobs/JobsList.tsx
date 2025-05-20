import React from 'react';
import JobCard from './JobCard';
import { Job } from '../../types';

interface JobsListProps {
  jobs: Job[];
  isLoading?: boolean;
  error?: string | null;
}

const JobsList: React.FC<JobsListProps> = ({ jobs, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-neutral-200 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-neutral-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-neutral-200 rounded w-5/6 mb-4"></div>
              <div className="flex gap-2 mb-4">
                <div className="h-4 bg-neutral-200 rounded w-16"></div>
                <div className="h-4 bg-neutral-200 rounded w-16"></div>
              </div>
              <div className="flex justify-between mt-4">
                <div className="h-3 bg-neutral-200 rounded w-1/4"></div>
                <div className="h-3 bg-neutral-200 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-error-50 border border-error-200 rounded-lg p-4 text-error-700">
        <p className="font-medium">Error loading jobs</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-8 text-center">
        <h3 className="text-lg font-medium text-neutral-900 mb-2">No jobs found</h3>
        <p className="text-neutral-600">
          There are no jobs matching your criteria. Try adjusting your filters or check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobsList;