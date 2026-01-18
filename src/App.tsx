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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 via-white to-orange-50/30">
      <Header />
      
      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 sm:py-12 lg:py-16">
          {/* Ingredient Input Section */}
          <section className="mb-12 lg:mb-16">
            <IngredientInput
              ingredients={ingredients}
              onAddIngredient={handleAddIngredient}
              onRemoveIngredient={handleRemoveIngredient}
              onClearAll={handleClearIngredients}
            />
          </section>

          {/* Results Section */}
          {ingredients.length === 0 ? (
            <section>
              <EmptyState />
            </section>
          ) : (
            <section>
              {/* Loading State */}
              {isLoading && (
                <div className="card p-16 sm:p-24">
                  <LoadingSpinner message="Finding delicious recipes for you..." size="lg" />
                </div>
              )}

              {/* Error State */}
              {isError && (
                <div className="max-w-xl mx-auto">
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
                    <div className="card p-12 sm:p-16 text-center">
                      <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">No matching recipes</h3>
                      <p className="text-gray-500 text-lg">
                        Try increasing the maximum missing ingredients to see more results.
                      </p>
                    </div>
                  )}
                </>
              )}
            </section>
          )}
        </div>
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
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🍳</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-white">Receepee</span>
                <p className="text-gray-500 mt-0.5">Your smart kitchen companion</p>
              </div>
            </div>
            <p className="text-gray-500">
              Powered by{' '}
              <a
                href="https://spoonacular.com/food-api"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 hover:text-orange-300 transition-colors font-semibold"
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
