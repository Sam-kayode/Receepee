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

  const getMatchStyles = () => {
    if (matchPercentage >= 80) return {
      bg: 'bg-gradient-to-r from-green-500 to-emerald-500',
      text: 'text-white',
      shadow: 'shadow-green-500/30'
    };
    if (matchPercentage >= 50) return {
      bg: 'bg-gradient-to-r from-yellow-500 to-orange-500',
      text: 'text-white',
      shadow: 'shadow-yellow-500/30'
    };
    return {
      bg: 'bg-gradient-to-r from-orange-500 to-red-500',
      text: 'text-white',
      shadow: 'shadow-orange-500/30'
    };
  };

  const matchStyles = getMatchStyles();

  return (
    <div
      className={`recipe-card group ${
        isSelected ? 'ring-4 ring-orange-500 ring-offset-4 scale-[1.02]' : ''
      }`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        {!imageError ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isHovered ? 'scale-110 brightness-90' : 'scale-100'
            }`}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100">
            <span className="text-8xl opacity-80">🍽️</span>
          </div>
        )}

        {/* Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-60'
        }`} />

        {/* Match Badge */}
        <div className="absolute top-4 left-4">
          <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold ${matchStyles.bg} ${matchStyles.text} shadow-lg ${matchStyles.shadow}`}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {matchPercentage}% match
          </span>
        </div>

        {/* Selected Indicator */}
        {isSelected && (
          <div className="absolute top-4 right-4 w-11 h-11 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-xl animate-scale-in">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}

        {/* Bottom Content on Hover */}
        <div className={`absolute bottom-0 left-0 right-0 p-5 transition-all duration-500 ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <button className="w-full py-3.5 bg-white/95 backdrop-blur-sm rounded-xl font-bold text-gray-900 flex items-center justify-center gap-2 shadow-lg hover:bg-white transition-colors">
            View Recipe
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-bold text-gray-900 text-lg mb-4 line-clamp-2 leading-snug group-hover:text-orange-600 transition-colors">
          {recipe.title}
        </h3>

        {/* Ingredient Stats */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div className="inline-flex items-center gap-2 text-green-700 bg-green-50 px-4 py-2 rounded-xl border border-green-100">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-bold">{recipe.usedIngredientCount} have</span>
          </div>
          {recipe.missedIngredientCount > 0 && (
            <div className="inline-flex items-center gap-2 text-orange-700 bg-orange-50 px-4 py-2 rounded-xl border border-orange-100">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-bold">{recipe.missedIngredientCount} need</span>
            </div>
          )}
        </div>

        {/* Missing Ingredients */}
        {recipe.missedIngredients.length > 0 && (
          <div className="mt-auto pt-5 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Missing</p>
            <div className="flex flex-wrap gap-2">
              {recipe.missedIngredients.slice(0, 3).map((ing) => (
                <span key={ing.id} className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">
                  {ing.name}
                </span>
              ))}
              {recipe.missedIngredients.length > 3 && (
                <span className="px-3 py-1.5 text-gray-400 text-sm font-medium">
                  +{recipe.missedIngredients.length - 3}
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
