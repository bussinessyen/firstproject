import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Button from '../components/common/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-neutral-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-neutral-700 mb-4">Page Not Found</h2>
      <p className="text-neutral-600 mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button
        variant="primary"
        icon={<Home className="h-4 w-4" />}
      >
        <Link to="/">Return Home</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;