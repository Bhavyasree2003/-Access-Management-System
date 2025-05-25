import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-primary-600">404</h1>
        <h2 className="mt-6 text-3xl font-bold text-slate-900">Page not found</h2>
        <p className="mt-3 text-slate-600">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-8">
          <Link to="/" className="btn btn-primary px-6 py-3">
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;