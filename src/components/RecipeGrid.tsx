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
      <div className="card p-12 sm:p-16 text-center">
        <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center">
          <span className="text-7xl">🔍</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          No recipes found
        </h3>
        <p className="text-gray-500 max-w-md mx-auto text-lg leading-relaxed">
          Try adjusting your filters or adding different ingredients to discover more delicious recipes.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
