import React from 'react';
import { Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const links = [
    { name: 'About', to: '/about' },
    { name: 'Terms', to: '/terms' },
    { name: 'Privacy', to: '/privacy' },
    { name: 'Help', to: '/help' },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Logo and branding */}
          <div className="flex items-center space-x-3 animate-fadeIn">
            <Wallet className="h-7 w-7 text-primary-600 transition-transform duration-500 ease-in-out hover:scale-110" />
            <span className="text-xl font-semibold text-neutral-900 tracking-wide select-none">
              BlockWork
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex space-x-8 text-neutral-600 font-medium text-sm">
            {links.map(({ name, to }) => (
              <Link
                key={name}
                to={to}
                className="relative group hover:text-primary-600 transition-colors duration-300"
              >
                {name}
                {/* Underline animation */}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-neutral-500 text-sm select-none animate-fadeInSlow">
          &copy; {new Date().getFullYear()} BlockWork. All rights reserved.
        </div>
      </div>

      {/* Custom animation keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease forwards;
        }
        .animate-fadeInSlow {
          animation: fadeIn 1.2s ease forwards;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
