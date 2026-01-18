import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white shadow-xl">
      <div className="container-app">
        <div className="flex items-center justify-between py-5 md:py-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-2xl md:text-3xl">🍳</span>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Receepee</h1>
              <p className="text-orange-100 text-sm md:text-base">Find recipes with your ingredients</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
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
            <span className="text-sm text-orange-100">Powered by Spoonacular</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
