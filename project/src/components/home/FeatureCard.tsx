import React from 'react';
import { cn } from '../../utils/cn';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  className 
}) => {
  return (
    <div className={cn(
      "card p-8 flex flex-col items-center text-center animate-slide-up",
      className
    )}>
      <div className="mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
};

export default FeatureCard;