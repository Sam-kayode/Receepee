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
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2 text-lg">
          What ingredients do you have?
        </label>
        <p className="text-gray-500 text-sm mb-4">
          Add ingredients to find matching recipes. Press Enter or click suggestions.
        </p>
      </div>

      <div className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
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
              className="input-field pr-10"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <button
            onClick={() => addIngredient(inputValue)}
            disabled={!inputValue.trim()}
            className="btn-primary px-5"
          >
            Add
          </button>
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && inputValue && filteredSuggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
            {filteredSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => addIngredient(suggestion)}
                className="w-full px-4 py-2.5 text-left hover:bg-orange-50 transition-colors text-gray-700 first:rounded-t-xl last:rounded-b-xl"
              >
                <span className="mr-2">🥗</span>
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quick Add Suggestions */}
      {ingredients.length === 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Quick add popular ingredients:</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_INGREDIENTS.slice(0, 8).map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => addIngredient(suggestion)}
                className="px-3 py-1.5 bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-700 rounded-full text-sm transition-colors"
              >
                + {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected Ingredients */}
      {ingredients.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-700 font-medium">
              Your ingredients ({ingredients.length})
            </span>
            <button
              onClick={onClearAll}
              className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
            >
              Clear all
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ingredient) => (
              <span
                key={ingredient}
                className="ingredient-tag group"
              >
                <span className="capitalize">{ingredient}</span>
                <button
                  onClick={() => onRemoveIngredient(ingredient)}
                  className="ml-1 hover:text-red-600 transition-colors"
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
  );
};

export default IngredientInput;
