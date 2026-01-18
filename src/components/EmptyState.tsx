import React from 'react';

const EmptyState: React.FC = () => {
  return (
    <div className="text-center py-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="w-32 h-32 mx-auto mb-8 relative">
          <div className="absolute inset-0 bg-orange-100 rounded-full animate-pulse-subtle" />
          <div className="absolute inset-2 bg-orange-50 rounded-full flex items-center justify-center">
            <span className="text-6xl">🥘</span>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Ready to Cook Something Amazing?
        </h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Tell us what ingredients you have in your kitchen, and we'll find 
          delicious recipes you can make right now. Start by adding your 
          first ingredient above!
        </p>

        <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
          {['🥩', '🍅', '🧅', '🥕', '🍳', '🧄'].map((emoji, index) => (
            <div
              key={index}
              className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-2xl animate-bounce"
              style={{ animationDelay: `${index * 0.1}s`, animationDuration: '2s' }}
            >
              {emoji}
            </div>
          ))}
        </div>

        <div className="mt-10 p-4 bg-orange-50 rounded-xl border border-orange-100">
          <h3 className="font-semibold text-orange-800 mb-2">💡 Pro Tip</h3>
          <p className="text-sm text-orange-700">
            Add 3-5 main ingredients for the best recipe matches. 
            Common pantry items like salt, pepper, and oil are automatically considered!
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
