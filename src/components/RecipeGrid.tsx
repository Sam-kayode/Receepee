import React from 'react';
import type { Recipe } from '../types/recipe';
import RecipeCard from './RecipeCard';

interface RecipeGridProps {
  recipes: Recipe[];
  selectedRecipeId: number | null;
  onSelectRecipe: (recipe: Recipe) => void;
}

const RecipeGrid: React.FC<RecipeGridProps> = ({
  recipes,
  selectedRecipeId,
  onSelectRecipe,
}) => {
  if (recipes.length === 0) {
    return (
      <div className="card p-16 sm:p-20 text-center animate-fade-in">
        <div className="relative w-36 h-36 mx-auto mb-10">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full animate-pulse-glow"></div>
          <div className="absolute inset-2 bg-gradient-to-br from-orange-50 to-white rounded-full flex items-center justify-center">
            <span className="text-7xl">🔍</span>
          </div>
        </div>
        <h3 className="text-3xl font-extrabold text-gray-900 mb-4">
          No Recipes Found
        </h3>
        <p className="text-gray-500 max-w-md mx-auto text-lg leading-relaxed">
          Try adjusting your filters or adding different ingredients to discover more delicious recipes.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
      {recipes.map((recipe, index) => (
        <div
          key={recipe.id}
          className="animate-slide-up"
          style={{ animationDelay: `${index * 60}ms` }}
        >
          <RecipeCard
            recipe={recipe}
            isSelected={recipe.id === selectedRecipeId}
            onClick={() => onSelectRecipe(recipe)}
          />
        </div>
      ))}
    </div>
  );
};

export default RecipeGrid;
