import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Loading...', 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 border-2',
    md: 'w-12 h-12 border-3',
    lg: 'w-16 h-16 border-4',
  };

  const iconSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="relative">
        <div
          className={`${sizeClasses[size]} border-orange-200 border-t-orange-500 rounded-full animate-spin`}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={iconSizes[size]}>🍳</span>
        </div>
      </div>
      {message && (
        <p className="text-gray-500 text-base font-medium animate-pulse">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
