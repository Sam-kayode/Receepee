import React from 'react';

const EmptyState: React.FC = () => {
  return (
    <div className="card p-10 sm:p-14 lg:p-20 text-center">
      <div className="max-w-xl mx-auto">
        {/* Animated Icon */}
        <div className="w-40 h-40 mx-auto mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full animate-pulse-subtle" />
          <div className="absolute inset-4 bg-gradient-to-br from-orange-50 to-white rounded-full flex items-center justify-center shadow-inner">
            <span className="text-8xl animate-float">🥘</span>
          </div>
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5">
          Ready to Cook Something Amazing?
        </h2>
        <p className="text-gray-500 mb-12 text-lg sm:text-xl leading-relaxed">
          Tell us what ingredients you have in your kitchen, and we'll find 
          delicious recipes you can make right now!
        </p>

        {/* Ingredient Icons Grid */}
        <div className="flex justify-center gap-4 mb-12">
          {['🥩', '🍅', '🧅', '🥕', '🍳', '🧄'].map((emoji, index) => (
            <div
              key={index}
              className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-lg border border-gray-100 animate-float"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {emoji}
            </div>
          ))}
        </div>

        {/* Pro Tip Box */}
        <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 rounded-2xl p-8 border-2 border-orange-100 text-left">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="text-white text-2xl">💡</span>
            </div>
            <div>
              <h3 className="font-bold text-orange-900 text-lg mb-2">Pro Tip</h3>
              <p className="text-orange-700 leading-relaxed">
                Add 3-5 main ingredients for the best recipe matches. 
                Common pantry items like salt, pepper, and oil are automatically considered!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
