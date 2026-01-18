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
      className={`recipe-card ${
        isSelected ? 'ring-4 ring-orange-500 ring-offset-4' : ''
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
            <span className="text-7xl">🍽️</span>
          </div>
        )}

        {/* Overlay on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Match Badge */}
        <div className="absolute top-5 left-5">
          <span
            className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${getMatchColor()}`}
          >
            {matchPercentage}% match
          </span>
        </div>

        {/* Selected Indicator */}
        {isSelected && (
          <div className="absolute top-5 right-5 w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg animate-fade-in">
            <svg
              className="w-6 h-6 text-white"
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
          className={`absolute bottom-5 left-5 right-5 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="text-white font-semibold flex items-center gap-2 text-base">
            View Recipe Details
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-bold text-gray-900 text-lg mb-4 line-clamp-2 leading-snug">
          {recipe.title}
        </h3>

        {/* Ingredient Stats */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div className="flex items-center gap-2 text-green-700 bg-green-50 px-4 py-2.5 rounded-xl border border-green-100">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-bold">{recipe.usedIngredientCount} have</span>
          </div>
          {recipe.missedIngredientCount > 0 && (
            <div className="flex items-center gap-2 text-orange-700 bg-orange-50 px-4 py-2.5 rounded-xl border border-orange-100">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-bold">{recipe.missedIngredientCount} need</span>
            </div>
          )}
        </div>

        {/* Missing Ingredients Preview */}
        {recipe.missedIngredients.length > 0 && (
          <div className="mt-auto pt-5 border-t-2 border-gray-100">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Missing Ingredients</p>
            <div className="flex flex-wrap gap-2">
              {recipe.missedIngredients.slice(0, 3).map((ing) => (
                <span
                  key={ing.id}
                  className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium"
                >
                  {ing.name}
                </span>
              ))}
              {recipe.missedIngredients.length > 3 && (
                <span className="px-3 py-1.5 text-gray-400 text-sm font-medium">
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
