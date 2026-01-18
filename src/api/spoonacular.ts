import type { Recipe, RecipeDetail } from '../types/recipe';

// Spoonacular API configuration
// Users should get their own API key from https://spoonacular.com/food-api
const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY || 'demo';
const BASE_URL = 'https://api.spoonacular.com';

export interface SearchByIngredientsParams {
  ingredients: string[];
  number?: number;
  ranking?: 1 | 2; // 1 = maximize used, 2 = minimize missing
  ignorePantry?: boolean;
}

export const searchRecipesByIngredients = async (
  params: SearchByIngredientsParams
): Promise<Recipe[]> => {
  const { ingredients, number = 20, ranking = 1, ignorePantry = false } = params;
  
  if (ingredients.length === 0) {
    return [];
  }

  const queryParams = new URLSearchParams({
    apiKey: API_KEY,
    ingredients: ingredients.join(','),
    number: number.toString(),
    ranking: ranking.toString(),
    ignorePantry: ignorePantry.toString(),
  });

  const response = await fetch(
    `${BASE_URL}/recipes/findByIngredients?${queryParams}`
  );

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} - ${response.statusText}`);
  }

  const data: Recipe[] = await response.json();
  return data;
};

export const getRecipeDetails = async (recipeId: number): Promise<RecipeDetail> => {
  const queryParams = new URLSearchParams({
    apiKey: API_KEY,
  });

  const response = await fetch(
    `${BASE_URL}/recipes/${recipeId}/information?${queryParams}`
  );

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} - ${response.statusText}`);
  }

  const data: RecipeDetail = await response.json();
  return data;
};

export const getRandomRecipes = async (number: number = 12): Promise<{ recipes: RecipeDetail[] }> => {
  const queryParams = new URLSearchParams({
    apiKey: API_KEY,
    number: number.toString(),
  });

  const response = await fetch(
    `${BASE_URL}/recipes/random?${queryParams}`
  );

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} - ${response.statusText}`);
  }

  return await response.json();
};
