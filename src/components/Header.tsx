import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <span className="text-2xl">🍳</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Receepee</h1>
              <p className="text-orange-100 text-sm">Find recipes with your ingredients</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-orange-100">
            <svg
              className="w-5 h-5"
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
            <span className="text-sm">Powered by Spoonacular API</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
