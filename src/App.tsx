import { useState, useMemo, useCallback } from 'react';
import {
  Header,
  IngredientInput,
  FilterPanel,
  RecipeGrid,
  RecipeDetail,
  LoadingSpinner,
  ErrorMessage,
  EmptyState,
} from './components';
import { useSearchRecipes } from './hooks/useRecipes';
import { filterRecipes } from './utils/helpers';
import type { Recipe, SearchFilters } from './types/recipe';

function App() {
  // Ingredients state
  const [ingredients, setIngredients] = useState<string[]>([]);
  
  // Selected recipe for detail view
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  
  // Filter state
  const [filters, setFilters] = useState<SearchFilters>({
    maxMissingIngredients: 5,
    sortBy: 'relevance',
  });

  // Fetch recipes using TanStack Query
  const {
    data: recipes = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useSearchRecipes({
    ingredients,
    number: 24,
    ranking: 1,
    ignorePantry: true,
  });

  // Filter recipes based on current filters
  const filteredRecipes = useMemo(() => {
    return filterRecipes(recipes, filters);
  }, [recipes, filters]);

  // Handlers
  const handleAddIngredient = useCallback((ingredient: string) => {
    setIngredients((prev) => [...prev, ingredient]);
  }, []);

  const handleRemoveIngredient = useCallback((ingredient: string) => {
    setIngredients((prev) => prev.filter((i) => i !== ingredient));
  }, []);

  const handleClearIngredients = useCallback(() => {
    setIngredients([]);
    setSelectedRecipe(null);
  }, []);

  const handleSelectRecipe = useCallback((recipe: Recipe) => {
    setSelectedRecipe(recipe);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setSelectedRecipe(null);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Ingredient Input Section */}
        <IngredientInput
          ingredients={ingredients}
          onAddIngredient={handleAddIngredient}
          onRemoveIngredient={handleRemoveIngredient}
          onClearAll={handleClearIngredients}
        />

        {/* Results Section */}
        {ingredients.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Loading State */}
            {isLoading && (
              <div className="py-16">
                <LoadingSpinner message="Finding delicious recipes for you..." size="lg" />
              </div>
            )}

            {/* Error State */}
            {isError && (
              <div className="max-w-md mx-auto">
                <ErrorMessage
                  title="Failed to fetch recipes"
                  message={
                    error instanceof Error
                      ? error.message
                      : 'An unexpected error occurred. Please try again.'
                  }
                  onRetry={() => refetch()}
                />
              </div>
            )}

            {/* Results */}
            {!isLoading && !isError && (
              <>
                {/* Filter Panel */}
                {recipes.length > 0 && (
                  <FilterPanel
                    filters={filters}
                    onFilterChange={setFilters}
                    totalResults={recipes.length}
                    filteredResults={filteredRecipes.length}
                  />
                )}

                {/* Recipe Grid */}
                <RecipeGrid
                  recipes={filteredRecipes}
                  selectedRecipeId={selectedRecipe?.id ?? null}
                  onSelectRecipe={handleSelectRecipe}
                />

                {/* No Results After Filtering */}
                {recipes.length > 0 && filteredRecipes.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      No recipes match your current filters. Try increasing the maximum missing ingredients.
                    </p>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </main>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <RecipeDetail
          recipe={selectedRecipe}
          onClose={handleCloseDetail}
        />
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">🍳</span>
            <span className="text-xl font-bold text-white">Receepee</span>
          </div>
          <p className="text-sm mb-2">
            Your smart kitchen companion for finding perfect recipes
          </p>
          <p className="text-xs text-gray-500">
            Powered by{' '}
            <a
              href="https://spoonacular.com/food-api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300"
            >
              Spoonacular API
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
