import React from 'react';

const EmptyState: React.FC = () => {
  return (
    <div className="text-center py-12 md:py-20 px-4">
      <div className="max-w-lg mx-auto">
        {/* Animated Icon */}
        <div className="w-36 h-36 mx-auto mb-10 relative">
          <div className="absolute inset-0 bg-orange-100 rounded-full animate-pulse-subtle" />
          <div className="absolute inset-3 bg-orange-50 rounded-full flex items-center justify-center">
            <span className="text-7xl animate-float">🥘</span>
          </div>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Ready to Cook Something Amazing?
        </h2>
        <p className="text-gray-500 mb-10 text-lg leading-relaxed">
          Tell us what ingredients you have in your kitchen, and we'll find 
          delicious recipes you can make right now!
        </p>

        {/* Ingredient Icons Grid */}
        <div className="grid grid-cols-6 gap-3 max-w-xs mx-auto mb-10">
          {['🥩', '🍅', '🧅', '🥕', '🍳', '🧄'].map((emoji, index) => (
            <div
              key={index}
              className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-md border border-gray-100 animate-float"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {emoji}
            </div>
          ))}
        </div>

        {/* Pro Tip Box */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100 text-left">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg">💡</span>
            </div>
            <div>
              <h3 className="font-bold text-orange-800 mb-1">Pro Tip</h3>
              <p className="text-sm text-orange-700 leading-relaxed">
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
