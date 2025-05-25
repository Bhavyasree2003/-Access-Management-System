import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-slate-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center">
              <Shield className="h-6 w-6 text-primary-600" />
              <span className="ml-2 text-lg font-semibold text-slate-900">Access Manager</span>
            </Link>
            <p className="mt-2 text-sm text-slate-600 max-w-md">
              Streamline the process of managing user access to software applications within your organization. Enhance security and efficiency with role-based access control.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="#" className="text-sm text-slate-600 hover:text-primary-600">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-slate-600 hover:text-primary-600">
                  Support Center
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-slate-600 hover:text-primary-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-slate-600 hover:text-primary-600">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="#" className="text-sm text-slate-600 hover:text-primary-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-slate-600 hover:text-primary-600">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-slate-600 hover:text-primary-600">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-slate-600 hover:text-primary-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500 text-center">
            &copy; {currentYear} Access Manager. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;