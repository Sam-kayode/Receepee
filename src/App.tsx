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
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50/30 flex flex-col">
      <Header />
      
      <main className="flex-1 container-app py-8 md:py-12">
        {/* Ingredient Input Section */}
        <section className="mb-10 md:mb-12">
          <IngredientInput
            ingredients={ingredients}
            onAddIngredient={handleAddIngredient}
            onRemoveIngredient={handleRemoveIngredient}
            onClearAll={handleClearIngredients}
          />
        </section>

        {/* Results Section */}
        {ingredients.length === 0 ? (
          <EmptyState />
        ) : (
          <section>
            {/* Loading State */}
            {isLoading && (
              <div className="py-20">
                <LoadingSpinner message="Finding delicious recipes for you..." size="lg" />
              </div>
            )}

            {/* Error State */}
            {isError && (
              <div className="max-w-lg mx-auto py-12">
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
                  <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">No matching recipes</h3>
                    <p className="text-gray-500">
                      Try increasing the maximum missing ingredients to see more results.
                    </p>
                  </div>
                )}
              </>
            )}
          </section>
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
      <footer className="bg-gray-900 text-gray-400 mt-auto">
        <div className="container-app py-10 md:py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                <span className="text-xl">🍳</span>
              </div>
              <div>
                <span className="text-xl font-bold text-white">Receepee</span>
                <p className="text-sm text-gray-500">Your smart kitchen companion</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Powered by{' '}
              <a
                href="https://spoonacular.com/food-api"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 hover:text-orange-300 transition-colors font-medium"
              >
                Spoonacular API
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
