import React from 'react';

const EmptyState: React.FC = () => {
  return (
    <div className="card overflow-hidden animate-fade-in">
      {/* Gradient Header */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-1">
        <div className="bg-gradient-to-br from-white to-orange-50 p-12 sm:p-16 lg:p-20 text-center">
          <div className="max-w-2xl mx-auto">
            {/* Animated Icon */}
            <div className="relative w-44 h-44 mx-auto mb-12">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full animate-pulse-glow"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full animate-ping opacity-20"></div>
              <div className="absolute inset-4 bg-gradient-to-br from-orange-50 to-white rounded-full flex items-center justify-center shadow-inner">
                <span className="text-8xl animate-float">🥘</span>
              </div>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Ready to Cook Something
              <span className="block gradient-text">Amazing?</span>
            </h2>
            <p className="text-gray-500 mb-14 text-lg sm:text-xl leading-relaxed max-w-lg mx-auto">
              Tell us what ingredients you have in your kitchen, and we'll find delicious recipes you can make right now!
            </p>

            {/* Ingredient Icons */}
            <div className="flex justify-center gap-4 sm:gap-5 mb-14">
              {[
                { emoji: '🥩', delay: '0s' },
                { emoji: '🍅', delay: '0.1s' },
                { emoji: '🧅', delay: '0.2s' },
                { emoji: '🥕', delay: '0.3s' },
                { emoji: '🍳', delay: '0.4s' },
                { emoji: '🧄', delay: '0.5s' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="w-16 h-16 sm:w-18 sm:h-18 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-lg border border-gray-100 animate-float hover:scale-110 transition-transform cursor-default"
                  style={{ animationDelay: item.delay, width: '72px', height: '72px' }}
                >
                  {item.emoji}
                </div>
              ))}
            </div>

            {/* Pro Tip */}
            <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 rounded-2xl p-8 border-2 border-orange-100 text-left max-w-xl mx-auto">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/30">
                  <span className="text-2xl">💡</span>
                </div>
                <div>
                  <h3 className="font-bold text-orange-900 text-lg mb-2">Pro Tip</h3>
                  <p className="text-orange-700 leading-relaxed">
                    Add 3-5 main ingredients for the best recipe matches. Common pantry items like salt, pepper, and oil are automatically considered!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
