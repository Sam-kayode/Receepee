import type { Recipe, SearchFilters } from '../types/recipe';

export const filterRecipes = (
  recipes: Recipe[],
  filters: SearchFilters
): Recipe[] => {
  let filtered = recipes.filter(
    (recipe) => recipe.missedIngredientCount <= filters.maxMissingIngredients
  );

  switch (filters.sortBy) {
    case 'missedIngredients':
      filtered = filtered.sort(
        (a, b) => a.missedIngredientCount - b.missedIngredientCount
      );
      break;
    case 'likes':
      filtered = filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0));
      break;
    case 'relevance':
    default:
      // Keep original order (API's relevance sorting)
      break;
  }

  return filtered;
};

export const formatIngredientAmount = (amount: number, unit: string): string => {
  const formattedAmount = amount % 1 === 0 ? amount.toString() : amount.toFixed(2);
  return `${formattedAmount} ${unit}`.trim();
};

export const stripHtmlTags = (html: string): string => {
  return html.replace(/<[^>]*>/g, '');
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

export const getIngredientImageUrl = (imageName: string): string => {
  return `https://spoonacular.com/cdn/ingredients_100x100/${imageName}`;
};

export const getRecipeImageUrl = (recipeId: number, size: '312x231' | '480x360' | '556x370' | '636x393' = '480x360'): string => {
  return `https://spoonacular.com/recipeImages/${recipeId}-${size}.jpg`;
};
