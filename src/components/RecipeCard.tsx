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
    if (matchPercentage >= 80) return 'text-green-600 bg-green-100';
    if (matchPercentage >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div
      className={`recipe-card animate-fade-in ${
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
          className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Match Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-bold ${getMatchColor()}`}
          >
            {matchPercentage}% match
          </span>
        </div>

        {/* Selected Indicator */}
        {isSelected && (
          <div className="absolute top-3 right-3 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg animate-fade-in">
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
          className={`absolute bottom-3 left-3 right-3 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="text-white text-sm font-medium">
            Click to view details →
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-2 leading-tight">
          {recipe.title}
        </h3>

        {/* Ingredient Stats */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-green-600">
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
            <span>{recipe.usedIngredientCount} have</span>
          </div>
          {recipe.missedIngredientCount > 0 && (
            <div className="flex items-center gap-1.5 text-orange-600">
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
              <span>{recipe.missedIngredientCount} need</span>
            </div>
          )}
        </div>

        {/* Missing Ingredients Preview */}
        {recipe.missedIngredients.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-1.5">Missing:</p>
            <div className="flex flex-wrap gap-1">
              {recipe.missedIngredients.slice(0, 3).map((ing) => (
                <span
                  key={ing.id}
                  className="px-2 py-0.5 bg-orange-50 text-orange-700 rounded text-xs"
                >
                  {ing.name}
                </span>
              ))}
              {recipe.missedIngredients.length > 3 && (
                <span className="px-2 py-0.5 text-gray-500 text-xs">
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
