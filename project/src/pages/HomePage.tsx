import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Users, CheckCircle, Settings } from 'lucide-react';
import FeatureCard from '../components/home/FeatureCard';

const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            User Access Management System
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Streamline the process of managing user access to software applications within your organization. Enhance security and efficiency with role-based access control.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {user ? (
              <Link
                to={user.role === 'admin' ? '/admin' : user.role === 'manager' ? '/manager' : '/employee'}
                className="btn btn-primary text-base px-6 py-3"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/signup" className="btn btn-primary text-base px-6 py-3">
                  Get Started
                </Link>
                <Link to="/login" className="btn btn-secondary text-base px-6 py-3">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Shield className="w-10 h-10 text-primary-500 bg-primary-50 p-2 rounded-full" />}
              title="Employee Portal"
              description="Request access to software applications with detailed reasoning and track your request status."
            />
            
            <FeatureCard 
              icon={<CheckCircle className="w-10 h-10 text-secondary-500 bg-secondary-50 p-2 rounded-full" />}
              title="Manager Approval"
              description="Review pending access requests and make informed approval decisions with detailed context."
            />
            
            <FeatureCard 
              icon={<Settings className="w-10 h-10 text-success-500 bg-success-50 p-2 rounded-full" />}
              title="Admin Control"
              description="Manage software applications, configure access levels, and oversee the entire system."
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Why Choose Our Solution?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our access management system provides numerous benefits to organizations of all sizes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Enhanced Security",
                description: "Reduce security risks with granular access controls and comprehensive audit trails."
              },
              {
                title: "Increased Efficiency",
                description: "Streamline the request and approval process, reducing administrative overhead."
              },
              {
                title: "Better Compliance",
                description: "Meet regulatory requirements with detailed access logs and approval documentation."
              },
              {
                title: "Improved Visibility",
                description: "Gain insights into access patterns and make informed decisions."
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{benefit.title}</h3>
                <p className="text-slate-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Streamline Your Access Management?
          </h2>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-8">
            Join thousands of organizations that trust our platform for secure and efficient access management.
          </p>
          <Link to="/signup" className="btn bg-white text-primary-600 hover:bg-slate-100 text-base px-8 py-3 font-medium">
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;