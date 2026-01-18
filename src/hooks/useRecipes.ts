import { useQuery } from '@tanstack/react-query';
import { 
  searchRecipesByIngredients, 
  getRecipeDetails, 
} from '../api/spoonacular';
import type { SearchByIngredientsParams } from '../api/spoonacular';

export const useSearchRecipes = (params: SearchByIngredientsParams) => {
  return useQuery({
    queryKey: ['recipes', 'search', params.ingredients],
    queryFn: () => searchRecipesByIngredients(params),
    enabled: params.ingredients.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useRecipeDetails = (recipeId: number | null) => {
  return useQuery({
    queryKey: ['recipes', 'detail', recipeId],
    queryFn: () => getRecipeDetails(recipeId!),
    enabled: recipeId !== null,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
};
