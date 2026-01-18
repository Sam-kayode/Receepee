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
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    maxMissingIngredients: 5,
    sortBy: 'relevance',
  });

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

  const filteredRecipes = useMemo(() => {
    return filterRecipes(recipes, filters);
  }, [recipes, filters]);

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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="flex-1 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 right-1/3 w-96 h-96 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-25 blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
          {/* Ingredient Input Section */}
          <section className="mb-14 lg:mb-16">
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
                <div className="card p-20 sm:p-28 animate-fade-in">
                  <LoadingSpinner message="Finding delicious recipes for you..." size="lg" />
                </div>
              )}

              {/* Error State */}
              {isError && (
                <div className="max-w-2xl mx-auto">
                  <ErrorMessage
                    title="Failed to fetch recipes"
                    message={
                      error instanceof Error
                        ? error.message
                        : 'An unexpected error occurred. Please check your connection and try again.'
                    }
                    onRetry={() => refetch()}
                  />
                </div>
              )}

              {/* Results */}
              {!isLoading && !isError && (
                <>
                  {recipes.length > 0 && (
                    <FilterPanel
                      filters={filters}
                      onFilterChange={setFilters}
                      totalResults={recipes.length}
                      filteredResults={filteredRecipes.length}
                    />
                  )}

                  <RecipeGrid
                    recipes={filteredRecipes}
                    selectedRecipeId={selectedRecipe?.id ?? null}
                    onSelectRecipe={handleSelectRecipe}
                  />

                  {recipes.length > 0 && filteredRecipes.length === 0 && (
                    <div className="card p-14 sm:p-20 text-center animate-fade-in">
                      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">No Matching Recipes</h3>
                      <p className="text-gray-500 text-lg max-w-md mx-auto">
                        Try increasing the maximum missing ingredients to discover more recipes.
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
      <footer className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-400 mt-auto overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                <span className="text-2xl">🍳</span>
              </div>
              <div>
                <span className="text-2xl font-extrabold text-white">Receepee</span>
                <p className="text-gray-500 mt-0.5">Your smart kitchen companion</p>
              </div>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors font-medium">About</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors font-medium">Privacy</a>
              <a
                href="https://spoonacular.com/food-api"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg shadow-orange-500/20"
              >
                <span>Powered by Spoonacular</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-10 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Receepee. Made with ❤️ for food lovers everywhere.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
