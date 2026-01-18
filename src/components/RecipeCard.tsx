import React, { useState } from 'react';
import type { Recipe } from '../types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
  isSelected: boolean;
  onClick: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, isSelected, onClick }) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const matchPercentage = Math.round(
    (recipe.usedIngredientCount /
      (recipe.usedIngredientCount + recipe.missedIngredientCount)) *
      100
  );

  const getMatchColor = () => {
    if (matchPercentage >= 80) return 'text-green-700 bg-green-100 border-green-200';
    if (matchPercentage >= 50) return 'text-yellow-700 bg-yellow-100 border-yellow-200';
    return 'text-orange-700 bg-orange-100 border-orange-200';
  };

  return (
    <div
      className={`recipe-card h-full flex flex-col ${
        isSelected ? 'ring-4 ring-orange-500 ring-offset-2' : ''
      }`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {!imageError ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200">
            <span className="text-6xl">🍽️</span>
          </div>
        )}

        {/* Overlay on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Match Badge */}
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-bold border ${getMatchColor()}`}
          >
            {matchPercentage}% match
          </span>
        </div>

        {/* Selected Indicator */}
        {isSelected && (
          <div className="absolute top-4 right-4 w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center shadow-lg animate-fade-in">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        )}

        {/* Hover action hint */}
        <div
          className={`absolute bottom-4 left-4 right-4 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="text-white text-sm font-semibold flex items-center gap-2">
            View Recipe Details
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-bold text-gray-800 text-lg mb-3 line-clamp-2 leading-snug">
          {recipe.title}
        </h3>

        {/* Ingredient Stats */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1.5 rounded-lg">
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-semibold">{recipe.usedIngredientCount} have</span>
          </div>
          {recipe.missedIngredientCount > 0 && (
            <div className="flex items-center gap-2 text-orange-600 bg-orange-50 px-3 py-1.5 rounded-lg">
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-semibold">{recipe.missedIngredientCount} need</span>
            </div>
          )}
        </div>

        {/* Missing Ingredients Preview */}
        {recipe.missedIngredients.length > 0 && (
          <div className="mt-auto pt-4 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Missing:</p>
            <div className="flex flex-wrap gap-1.5">
              {recipe.missedIngredients.slice(0, 3).map((ing) => (
                <span
                  key={ing.id}
                  className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium"
                >
                  {ing.name}
                </span>
              ))}
              {recipe.missedIngredients.length > 3 && (
                <span className="px-2.5 py-1 text-gray-400 text-xs font-medium">
                  +{recipe.missedIngredients.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
