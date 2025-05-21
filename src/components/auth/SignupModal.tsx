import React, { useState } from 'react';
import { X } from 'lucide-react';
import Button from '../common/Button';
import { authAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose, onLoginClick }) => {
  const [accountType, setAccountType] = useState<'client' | 'freelancer' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountType) return;

    setError('');
    setIsLoading(true);

    try {
      const data = await authAPI.register(name, email, password, accountType);
      localStorage.setItem('token', data.token);
      onClose();
      navigate('/'); // Navigate to homepage after signup
    } catch (error) {
      setError('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-neutral-500 hover:text-neutral-700"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Create an Account</h2>

        {error && (
          <div className="mb-4 p-3 bg-error-50 border border-error-200 rounded-lg text-error-700">
            {error}
          </div>
        )}

        {!accountType ? (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-neutral-900">Join as a client or freelancer</h3>
            <button
              onClick={() => setAccountType('client')}
              className="w-full p-4 border border-neutral-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
            >
              <h4 className="text-lg font-medium text-neutral-900">I'm a client</h4>
              <p className="text-neutral-600">Hiring for a project</p>
            </button>
            <button
              onClick={() => setAccountType('freelancer')}
              className="w-full p-4 border border-neutral-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
            >
              <h4 className="text-lg font-medium text-neutral-900">I'm a freelancer</h4>
              <p className="text-neutral-600">Looking for work</p>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Create Account
            </Button>

            <p className="text-sm text-neutral-500 text-center">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
          </form>
        )}

        <div className="mt-6 text-center">
          <p className="text-neutral-600">
            Already have an account?{' '}
            <button
              onClick={() => {
                onClose();
                onLoginClick();
              }}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
