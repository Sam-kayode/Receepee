import React, { useState } from 'react';
import type { KeyboardEvent } from 'react';

interface IngredientInputProps {
  ingredients: string[];
  onAddIngredient: (ingredient: string) => void;
  onRemoveIngredient: (ingredient: string) => void;
  onClearAll: () => void;
}

const SUGGESTED_INGREDIENTS = [
  'chicken', 'rice', 'pasta', 'tomato', 'onion', 'garlic', 
  'beef', 'cheese', 'egg', 'potato', 'carrot', 'broccoli',
  'salmon', 'shrimp', 'mushroom', 'spinach', 'bell pepper'
];

const IngredientInput: React.FC<IngredientInputProps> = ({
  ingredients,
  onAddIngredient,
  onRemoveIngredient,
  onClearAll,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      addIngredient(inputValue.trim());
    }
  };

  const addIngredient = (ingredient: string) => {
    const normalized = ingredient.toLowerCase().trim();
    if (normalized && !ingredients.includes(normalized)) {
      onAddIngredient(normalized);
    }
    setInputValue('');
    setShowSuggestions(false);
  };

  const filteredSuggestions = SUGGESTED_INGREDIENTS.filter(
    (s) => 
      s.toLowerCase().includes(inputValue.toLowerCase()) && 
      !ingredients.includes(s.toLowerCase())
  );

  return (
    <div className="card overflow-hidden">
      {/* Header Section with Gradient */}
      <div className="bg-gradient-to-r from-slate-50 via-orange-50/50 to-amber-50/50 border-b border-gray-100">
        <div className="p-8 sm:p-10 lg:p-12">
          <div className="flex items-start gap-5 mb-2">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30 flex-shrink-0">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                What ingredients do you have?
              </h2>
              <p className="text-gray-500 text-base sm:text-lg mt-2 leading-relaxed">
                Enter the ingredients in your kitchen and discover amazing recipes you can make today.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="p-8 sm:p-10 lg:p-12 pt-8">
        <div className="relative">
          {/* Input Row */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className={`relative flex-1 transition-all duration-300 ${isFocused ? 'scale-[1.01]' : ''}`}>
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none transition-colors duration-300" style={{color: isFocused ? '#f97316' : undefined}}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setShowSuggestions(true);
                }}
                onKeyDown={handleKeyDown}
                onFocus={() => { setShowSuggestions(true); setIsFocused(true); }}
                onBlur={() => setIsFocused(false)}
                placeholder="Type an ingredient (e.g., chicken, rice, tomato...)"
                className="input-field pl-16"
              />
            </div>
            <button
              onClick={() => addIngredient(inputValue)}
              disabled={!inputValue.trim()}
              className="btn-primary whitespace-nowrap"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              Add Ingredient
            </button>
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && inputValue && filteredSuggestions.length > 0 && (
            <div className="absolute z-30 w-full mt-4 bg-white border border-gray-200 rounded-2xl shadow-2xl shadow-gray-200/50 max-h-80 overflow-y-auto animate-slide-down">
              <div className="p-3">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-4 py-2">Suggestions</p>
                {filteredSuggestions.map((suggestion, index) => (
                  <button
                    key={suggestion}
                    onClick={() => addIngredient(suggestion)}
                    className="w-full px-4 py-4 text-left hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 transition-all text-gray-700 rounded-xl flex items-center gap-4 group"
                    style={{animationDelay: `${index * 50}ms`}}
                  >
                    <span className="w-11 h-11 bg-gradient-to-br from-orange-100 to-amber-100 group-hover:from-orange-200 group-hover:to-amber-200 rounded-xl flex items-center justify-center text-xl transition-colors">🥗</span>
                    <span className="font-semibold capitalize text-base group-hover:text-orange-700 transition-colors">{suggestion}</span>
                    <svg className="w-5 h-5 ml-auto text-gray-300 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Add Section */}
        {ingredients.length === 0 && (
          <div className="mt-10">
            <div className="bg-gradient-to-br from-gray-50 via-slate-50 to-gray-50 rounded-2xl p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-sm font-bold text-gray-600 uppercase tracking-wider">
                  Quick Add Popular Ingredients
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {SUGGESTED_INGREDIENTS.slice(0, 12).map((suggestion, index) => (
                  <button
                    key={suggestion}
                    onClick={() => addIngredient(suggestion)}
                    className="group px-5 py-3 bg-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 text-gray-600 hover:text-white rounded-xl text-sm font-semibold transition-all duration-300 border-2 border-gray-200 hover:border-transparent shadow-sm hover:shadow-lg hover:shadow-orange-500/25 hover:-translate-y-1"
                    style={{animationDelay: `${index * 30}ms`}}
                  >
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 opacity-50 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      {suggestion}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Selected Ingredients */}
        {ingredients.length > 0 && (
          <div className="mt-10">
            <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 rounded-2xl p-8 border-2 border-orange-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Your Ingredients</h3>
                    <p className="text-gray-600">{ingredients.length} ingredient{ingredients.length !== 1 ? 's' : ''} added</p>
                  </div>
                </div>
                <button
                  onClick={onClearAll}
                  className="group flex items-center gap-2 text-red-500 hover:text-white font-semibold transition-all px-5 py-3 rounded-xl hover:bg-red-500 border-2 border-red-200 hover:border-red-500"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Clear All
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {ingredients.map((ingredient, index) => (
                  <span
                    key={ingredient}
                    className="ingredient-tag animate-scale-in"
                    style={{animationDelay: `${index * 50}ms`}}
                  >
                    <span className="capitalize">{ingredient}</span>
                    <button
                      onClick={() => onRemoveIngredient(ingredient)}
                      className="p-1.5 hover:bg-red-100 hover:text-red-600 transition-all rounded-full ml-1"
                      aria-label={`Remove ${ingredient}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IngredientInput;
