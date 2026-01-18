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
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center">
          <span className="text-5xl">🔍</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No recipes found
        </h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Try adjusting your filters or adding different ingredients to find more recipes.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {recipes.map((recipe, index) => (
        <div
          key={recipe.id}
          className="animate-slide-up"
          style={{ animationDelay: `${index * 50}ms` }}
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
