import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Briefcase, DollarSign, Calendar, Tag, X } from 'lucide-react';
import Button from '../components/common/Button';
import { jobsAPI } from '../services/api';
import { useWallet } from '../context/WalletContext';

interface JobFormData {
  title: string;
  description: string;
  category: string;
  budget: string;
  deadline: string;
  skills: string[];
}

const PostJobPage: React.FC = () => {
  const navigate = useNavigate();
  const { isConnected } = useWallet();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skill, setSkill] = useState('');
  
  const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm<JobFormData>({
    defaultValues: {
      skills: [],
    }
  });
  
  const selectedSkills = watch('skills', []);
  
  const addSkill = () => {
    if (skill && !selectedSkills.includes(skill)) {
      setValue('skills', [...selectedSkills, skill]);
      setSkill('');
    }
  };
  
  const removeSkill = (skillToRemove: string) => {
    setValue('skills', selectedSkills.filter(s => s !== skillToRemove));
  };
  
  const onSubmit = async (data: JobFormData) => {
    if (!isConnected) {
      alert('Please connect your wallet to post a job');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const job = await jobsAPI.createJob({
        title: data.title,
        description: data.description,
        category: data.category,
        budget: parseFloat(data.budget),
        deadline: new Date(data.deadline).toISOString(),
        skills: data.skills,
      });
      
      navigate(`/jobs/${job.id}`);
    } catch (error) {
      console.error('Error creating job:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const categories = [
    'Development',
    'Design',
    'Smart Contracts',
    'Web3',
    'dApp',
    'Marketing',
    'Content',
    'Other',
  ];
  
  const handleSkillKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-neutral-900 mb-8">Post a New Job</h1>
      
      {!isConnected && (
        <div className="mb-6 p-4 bg-warning-50 border border-warning-200 rounded-lg">
          <p className="text-warning-800">
            Please connect your wallet to post a job and fund the escrow.
          </p>
        </div>
      )}
      
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Job Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-1">
              Job Title
            </label>
            <input
              type="text"
              id="title"
              className={`block w-full px-4 py-2.5 border ${errors.title ? 'border-error-500' : 'border-neutral-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
              placeholder="e.g. Build a DeFi dashboard using React and Web3"
              {...register('title', { required: 'Job title is required' })}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-error-600">{errors.title.message}</p>
            )}
          </div>
          
          {/* Job Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">
              Job Description
            </label>
            <textarea
              id="description"
              rows={5}
              className={`block w-full px-4 py-2.5 border ${errors.description ? 'border-error-500' : 'border-neutral-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
              placeholder="Describe your project in detail, including requirements, deliverables, and timeline..."
              {...register('description', { required: 'Job description is required' })}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-error-600">{errors.description.message}</p>
            )}
          </div>
          
          {/* Category and Budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-neutral-700 mb-1">
                Category
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Tag className="h-5 w-5 text-neutral-400" />
                </div>
                <select
                  id="category"
                  className={`block w-full pl-10 pr-3 py-2.5 border ${errors.category ? 'border-error-500' : 'border-neutral-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                  {...register('category', { required: 'Category is required' })}
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              {errors.category && (
                <p className="mt-1 text-sm text-error-600">{errors.category.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-neutral-700 mb-1">
                Budget (ETH)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="number"
                  id="budget"
                  step="0.01"
                  min="0.01"
                  className={`block w-full pl-10 pr-3 py-2.5 border ${errors.budget ? 'border-error-500' : 'border-neutral-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                  placeholder="0.00"
                  {...register('budget', { 
                    required: 'Budget is required',
                    min: { value: 0.01, message: 'Budget must be at least 0.01 ETH' }
                  })}
                />
              </div>
              {errors.budget && (
                <p className="mt-1 text-sm text-error-600">{errors.budget.message}</p>
              )}
            </div>
          </div>
          
          {/* Deadline */}
          <div>
            <label htmlFor="deadline" className="block text-sm font-medium text-neutral-700 mb-1">
              Deadline
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                type="date"
                id="deadline"
                className={`block w-full pl-10 pr-3 py-2.5 border ${errors.deadline ? 'border-error-500' : 'border-neutral-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                min={new Date().toISOString().split('T')[0]}
                {...register('deadline', { required: 'Deadline is required' })}
              />
            </div>
            {errors.deadline && (
              <p className="mt-1 text-sm text-error-600">{errors.deadline.message}</p>
            )}
          </div>
          
          {/* Skills */}
          <div>
            <label htmlFor="skills" className="block text-sm font-medium text-neutral-700 mb-1">
              Required Skills
            </label>
            <div className="flex">
              <input
                type="text"
                id="skills"
                className="block w-full px-4 py-2.5 border border-neutral-300 rounded-l-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g. React, Solidity, Web3.js"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                onKeyDown={handleSkillKeyDown}
              />
              <button
                type="button"
                onClick={addSkill}
                className="inline-flex items-center px-4 py-2.5 border border-l-0 border-primary-600 bg-primary-600 text-white rounded-r-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                Add
              </button>
            </div>
            
            <Controller
              name="skills"
              control={control}
              rules={{ required: 'At least one skill is required' }}
              render={({ field }) => (
                <div className="hidden">
                  <input type="hidden" {...field} />
                </div>
              )}
            />
            
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedSkills.map((skill, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full bg-primary-200 text-primary-800 hover:bg-primary-300"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              
              {selectedSkills.length === 0 && (
                <span className="text-sm text-neutral-500">No skills added yet</span>
              )}
            </div>
            
            {errors.skills && (
              <p className="mt-1 text-sm text-error-600">{errors.skills.message}</p>
            )}
          </div>
          
          {/* Submit Button */}
          <div className="flex items-center justify-end pt-4">
            <Button
              type="submit"
              isLoading={isSubmitting}
              disabled={!isConnected}
              icon={<Briefcase className="h-4 w-4" />}
              className="px-6"
            >
              Post Job
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJobPage;