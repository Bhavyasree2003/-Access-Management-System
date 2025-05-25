import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../utils/cn';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    closeMenu();
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <Shield className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-semibold text-slate-900">Access Manager</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {user ? (
              <>
                {user.role === 'employee' || user.role === 'manager' || user.role === 'admin' ? (
                  <Link to="/employee" className="text-slate-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
                    Employee Portal
                  </Link>
                ) : null}
                
                {user.role === 'manager' || user.role === 'admin' ? (
                  <Link to="/manager" className="text-slate-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
                    Manager Approval
                  </Link>
                ) : null}
                
                {user.role === 'admin' ? (
                  <Link to="/admin" className="text-slate-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
                    Admin Control
                  </Link>
                ) : null}
                
                <button 
                  onClick={handleLogout}
                  className="btn btn-outline ml-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button 
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:text-primary-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        "sm:hidden",
        isMenuOpen ? "block" : "hidden"
      )}>
        <div className="pt-2 pb-3 space-y-1">
          {user ? (
            <>
              {user.role === 'employee' || user.role === 'manager' || user.role === 'admin' ? (
                <Link 
                  to="/employee" 
                  className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-slate-50"
                  onClick={closeMenu}
                >
                  Employee Portal
                </Link>
              ) : null}
              
              {user.role === 'manager' || user.role === 'admin' ? (
                <Link 
                  to="/manager" 
                  className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-slate-50"
                  onClick={closeMenu}
                >
                  Manager Approval
                </Link>
              ) : null}
              
              {user.role === 'admin' ? (
                <Link 
                  to="/admin" 
                  className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-slate-50"
                  onClick={closeMenu}
                >
                  Admin Control
                </Link>
              ) : null}
              
              <button 
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-slate-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-slate-50"
                onClick={closeMenu}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-primary-600 hover:bg-slate-50"
                onClick={closeMenu}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;