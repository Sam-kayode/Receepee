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
      <div className="text-center py-16 md:py-24">
        <div className="w-28 h-28 mx-auto mb-8 bg-orange-100 rounded-full flex items-center justify-center">
          <span className="text-6xl">🔍</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          No recipes found
        </h3>
        <p className="text-gray-500 max-w-md mx-auto text-lg">
          Try adjusting your filters or adding different ingredients to discover more recipes.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
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
