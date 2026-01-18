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
    <div className="card">
      {/* Main Content Area */}
      <div className="p-8 sm:p-10 lg:p-12">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            What ingredients do you have?
          </h2>
          <p className="text-gray-500 text-base sm:text-lg">
            Add the ingredients available in your kitchen and we'll find recipes you can make.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
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
                onFocus={() => setShowSuggestions(true)}
                placeholder="Type an ingredient (e.g., chicken, rice, tomato...)"
                className="input-field pl-14"
              />
            </div>
            <button
              onClick={() => addIngredient(inputValue)}
              disabled={!inputValue.trim()}
              className="btn-primary whitespace-nowrap"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Ingredient
            </button>
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && inputValue && filteredSuggestions.length > 0 && (
            <div className="absolute z-20 w-full mt-3 bg-white border border-gray-200 rounded-2xl shadow-2xl max-h-72 overflow-y-auto">
              <div className="p-3">
                {filteredSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => addIngredient(suggestion)}
                    className="w-full px-5 py-4 text-left hover:bg-orange-50 transition-colors text-gray-700 rounded-xl flex items-center gap-4"
                  >
                    <span className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-lg">🥗</span>
                    <span className="font-semibold capitalize text-base">{suggestion}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Add Suggestions */}
        {ingredients.length === 0 && (
          <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-6 sm:p-8">
            <p className="text-sm font-semibold text-gray-600 mb-5 uppercase tracking-wide">
              Quick add popular ingredients
            </p>
            <div className="flex flex-wrap gap-3">
              {SUGGESTED_INGREDIENTS.slice(0, 10).map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => addIngredient(suggestion)}
                  className="px-5 py-3 bg-white hover:bg-orange-50 text-gray-700 hover:text-orange-700 rounded-xl text-sm font-semibold transition-all border-2 border-gray-200 hover:border-orange-300 shadow-sm hover:shadow-md"
                >
                  + {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Selected Ingredients */}
        {ingredients.length > 0 && (
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <div>
                  <span className="text-gray-900 font-bold text-xl">
                    Your Ingredients
                  </span>
                  <p className="text-gray-600 text-sm">{ingredients.length} ingredient{ingredients.length !== 1 ? 's' : ''} selected</p>
                </div>
              </div>
              <button
                onClick={onClearAll}
                className="text-sm text-red-600 hover:text-red-700 font-semibold transition-colors flex items-center gap-2 hover:bg-red-50 px-4 py-2.5 rounded-xl border border-transparent hover:border-red-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear all
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {ingredients.map((ingredient) => (
                <span
                  key={ingredient}
                  className="ingredient-tag"
                >
                  <span className="capitalize">{ingredient}</span>
                  <button
                    onClick={() => onRemoveIngredient(ingredient)}
                    className="ml-1 p-1 hover:bg-red-100 hover:text-red-600 transition-colors rounded-full"
                    aria-label={`Remove ${ingredient}`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IngredientInput;
