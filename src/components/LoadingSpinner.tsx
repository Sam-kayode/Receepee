import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Loading...', 
  size = 'md' 
}) => {
  const sizes = {
    sm: { spinner: 'w-12 h-12', icon: 'text-2xl', border: 'border-[3px]' },
    md: { spinner: 'w-16 h-16', icon: 'text-3xl', border: 'border-4' },
    lg: { spinner: 'w-24 h-24', icon: 'text-5xl', border: 'border-4' },
  };

  const { spinner, icon, border } = sizes[size];

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="relative">
        {/* Glow effect */}
        <div className={`absolute inset-0 ${spinner} bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-xl opacity-30 animate-pulse`}></div>
        
        {/* Spinner */}
        <div className={`relative ${spinner} ${border} border-orange-200 border-t-orange-500 rounded-full animate-spin`} />
        
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`${icon} animate-pulse`}>🍳</span>
        </div>
      </div>
      
      {message && (
        <div className="text-center">
          <p className="text-gray-700 text-lg font-semibold animate-pulse">{message}</p>
          <div className="flex items-center justify-center gap-1 mt-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner;
