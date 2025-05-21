import React, { ReactNode, useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Wallet, Briefcase as BriefcaseBusiness, Briefcase, Home, Menu, X, User, Bell, ChevronDown } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';
import WalletButton from '../wallet/WalletButton';
import LoginModal from '../auth/LoginModal';
import SignupModal from '../auth/SignupModal';
import Button from '../common/Button';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isConnected } = useWallet();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Jobs', href: '/jobs', icon: Briefcase },
    { name: 'Post a Job', href: '/post-job', icon: BriefcaseBusiness },
    { name: 'Dashboard', href: '/dashboard', icon: Wallet },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setIsProfileDropdownOpen(false);
    navigate('/');
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
              {/* Auth Buttons or Profile Dropdown */}
              <div className="hidden md:flex md:items-center md:space-x-4">
                {!isAuthenticated ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsLoginModalOpen(true)}
                    >
                      Log In
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setIsSignupModalOpen(true)}
                    >
                      Sign Up
                    </Button>
                  </>
                ) : (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                      className="flex items-center space-x-2 rounded-md border border-neutral-300 px-3 py-1 text-sm font-medium text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <User className="h-5 w-5" />
                      <ChevronDown className="h-3 w-3" />
                    </button>
                    {isProfileDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border border-neutral-200 rounded-md shadow-lg z-20">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

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

              {/* Mobile Auth Buttons or Profile Dropdown */}
              <div className="pt-4 pb-3 border-t border-neutral-200">
                {!isAuthenticated ? (
                  <>
                    <Button
                      variant="outline"
                      className="w-full mb-2"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsLoginModalOpen(true);
                      }}
                    >
                      Log In
                    </Button>
                    <Button
                      className="w-full"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsSignupModalOpen(true);
                      }}
                    >
                      Sign Up
                    </Button>
                  </>
                ) : (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                      className="flex items-center space-x-2 rounded-md border border-neutral-300 px-3 py-1 text-sm font-medium text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500 w-full justify-center"
                    >
                      <User className="h-5 w-5" />
                      <ChevronDown className="h-3 w-3" />
                    </button>
                    {isProfileDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border border-neutral-200 rounded-md shadow-lg z-20">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50"
                          onClick={() => {
                            setIsProfileDropdownOpen(false);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          Profile
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsMobileMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
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

      {/* Auth Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSignupClick={() => {
          setIsLoginModalOpen(false);
          setIsSignupModalOpen(true);
        }}
      />
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        onLoginClick={() => {
          setIsSignupModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
    </div>
  );
};

export default Layout;
