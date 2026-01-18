import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between py-6 lg:py-8">
          {/* Logo */}
          <div className="flex items-center gap-4 lg:gap-5">
            <div className="w-14 h-14 lg:w-16 lg:h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-3xl lg:text-4xl">🍳</span>
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Receepee</h1>
              <p className="text-orange-100 text-sm lg:text-base mt-0.5">Find recipes with your ingredients</p>
            </div>
          </div>
          
          {/* Info Badge */}
          <div className="hidden md:flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-full px-5 py-3">
            <svg
              className="w-5 h-5 text-orange-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm font-medium text-orange-100">Powered by Spoonacular</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
