import React, { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wallet, Briefcase, Home, Menu, X, User, Bell } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';
import WalletButton from '../wallet/WalletButton';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { isConnected } = useWallet();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Jobs', href: '/jobs', icon: Briefcase },
    { name: 'Post a Job', href: '/post-job', icon: Briefcase },
    { name: 'Dashboard', href: '/dashboard', icon: Wallet },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo and desktop navigation */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Wallet className="h-8 w-8 text-primary-600" />
                <span className="ml-2 text-xl font-bold text-primary-900">BlockWork</span>
              </Link>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:ml-10 md:flex md:space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors duration-150 ${
                      isActive(item.href)
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'
                    }`}
                  >
                    <item.icon className="h-4 w-4 mr-1.5" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            
            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="p-1.5 rounded-full text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              
              {/* Wallet */}
              <WalletButton />
              
              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <span className="sr-only">Open main menu</span>
                  {isMobileMenuOpen ? (
                    <X className="block h-6 w-6" />
                  ) : (
                    <Menu className="block h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-b-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                    isActive(item.href)
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
      
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Wallet className="h-6 w-6 text-primary-600" />
              <span className="ml-2 text-lg font-semibold text-neutral-900">BlockWork</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-neutral-600 hover:text-primary-600 transition-colors">
                About
              </a>
              <a href="#" className="text-neutral-600 hover:text-primary-600 transition-colors">
                Terms
              </a>
              <a href="#" className="text-neutral-600 hover:text-primary-600 transition-colors">
                Privacy
              </a>
              <a href="#" className="text-neutral-600 hover:text-primary-600 transition-colors">
                Help
              </a>
            </div>
          </div>
          <div className="mt-4 text-center text-neutral-500 text-sm">
            &copy; {new Date().getFullYear()} BlockWork. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;