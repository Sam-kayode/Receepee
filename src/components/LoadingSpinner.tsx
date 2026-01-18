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
    sm: 'w-10 h-10 border-3',
    md: 'w-14 h-14 border-4',
    lg: 'w-20 h-20 border-4',
  };

  const iconSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="relative">
        <div
          className={`${sizeClasses[size]} border-orange-200 border-t-orange-500 rounded-full animate-spin`}
          style={{ borderStyle: 'solid' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={iconSizes[size]}>🍳</span>
        </div>
      </div>
      {message && (
        <p className="text-gray-600 text-lg font-medium animate-pulse">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
