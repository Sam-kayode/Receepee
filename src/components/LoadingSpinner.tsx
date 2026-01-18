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
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div
          className={`${sizeClasses[size]} border-orange-200 border-t-orange-500 rounded-full animate-spin`}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm">🍳</span>
        </div>
      </div>
      {message && (
        <p className="text-gray-500 text-sm animate-pulse">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
