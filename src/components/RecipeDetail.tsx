import React, { useState } from 'react';
import type { Recipe } from '../types/recipe';
import { useRecipeDetails } from '../hooks/useRecipes';
import { stripHtmlTags, getIngredientImageUrl } from '../utils/helpers';
import LoadingSpinner from './LoadingSpinner';

interface RecipeDetailProps {
  recipe: Recipe;
  onClose: () => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onClose }) => {
  const { data: details, isLoading, error } = useRecipeDetails(recipe.id);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions'>('ingredients');
  const [mainImage, setMainImage] = useState(recipe.image);

  const allImages = [
    recipe.image,
    ...recipe.usedIngredients.slice(0, 4).map((ing) => getIngredientImageUrl(ing.image)),
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[92vh] overflow-hidden animate-scale-in">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 w-12 h-12 bg-white/95 hover:bg-white rounded-xl shadow-xl flex items-center justify-center transition-all hover:scale-110 border border-gray-200 group"
          >
            <svg className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="overflow-y-auto max-h-[92vh]">
            {/* Hero Image Section */}
            <div className="relative">
              <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src={mainImage}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x450?text=Recipe';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>

              {/* Thumbnail Gallery */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setMainImage(img)}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all ${
                        mainImage === img
                          ? 'ring-4 ring-orange-500 ring-offset-2 scale-105'
                          : 'opacity-80 hover:opacity-100 ring-2 ring-white/50'
                      }`}
                    >
                      <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 sm:p-10 lg:p-12">
              {/* Title */}
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                {recipe.title}
              </h2>

              {/* Stats Badges */}
              <div className="flex flex-wrap gap-4 mb-8">
                <span className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl text-base font-bold shadow-lg shadow-green-500/30">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {recipe.usedIngredientCount} ingredients you have
                </span>
                {recipe.missedIngredientCount > 0 && (
                  <span className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl text-base font-bold shadow-lg shadow-orange-500/30">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    {recipe.missedIngredientCount} needed
                  </span>
                )}
              </div>

              {/* Recipe Meta */}
              {details && (
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center gap-3 bg-gray-100 px-5 py-3 rounded-xl">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">Ready In</p>
                      <p className="text-gray-900 font-bold">{details.readyInMinutes} mins</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-100 px-5 py-3 rounded-xl">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">Servings</p>
                      <p className="text-gray-900 font-bold">{details.servings}</p>
                    </div>
                  </div>
                  {details.healthScore > 0 && (
                    <div className="flex items-center gap-3 bg-gray-100 px-5 py-3 rounded-xl">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase">Health Score</p>
                        <p className="text-gray-900 font-bold">{details.healthScore}%</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Diet Tags */}
              {details && (
                <div className="flex flex-wrap gap-3 mb-10">
                  {details.vegetarian && <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-bold">🥬 Vegetarian</span>}
                  {details.vegan && <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-bold">🌱 Vegan</span>}
                  {details.glutenFree && <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-bold">🌾 Gluten-free</span>}
                  {details.dairyFree && <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-bold">🥛 Dairy-free</span>}
                  {details.veryHealthy && <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-bold">💪 Very Healthy</span>}
                </div>
              )}

              {/* Loading */}
              {isLoading && (
                <div className="py-20">
                  <LoadingSpinner message="Loading recipe details..." />
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="py-12 px-8 text-center bg-red-50 rounded-2xl">
                  <p className="text-red-600 font-semibold text-lg">Failed to load details. Please try again.</p>
                </div>
              )}

              {/* Tabs */}
              {!isLoading && !error && (
                <>
                  <div className="flex gap-2 p-2 bg-gray-100 rounded-2xl mb-10">
                    <button
                      onClick={() => setActiveTab('ingredients')}
                      className={`flex-1 py-4 px-6 rounded-xl text-base font-bold transition-all ${
                        activeTab === 'ingredients'
                          ? 'bg-white text-gray-900 shadow-lg'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span className="text-xl">🥗</span> Ingredients
                      </span>
                    </button>
                    <button
                      onClick={() => setActiveTab('instructions')}
                      className={`flex-1 py-4 px-6 rounded-xl text-base font-bold transition-all ${
                        activeTab === 'instructions'
                          ? 'bg-white text-gray-900 shadow-lg'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span className="text-xl">📝</span> Instructions
                      </span>
                    </button>
                  </div>

                  {/* Ingredients Tab */}
                  {activeTab === 'ingredients' && (
                    <div className="space-y-8">
                      {/* Have */}
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-100">
                        <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          Ingredients You Have
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {recipe.usedIngredients.map((ing) => (
                            <div
                              key={ing.id}
                              onClick={() => setMainImage(getIngredientImageUrl(ing.image))}
                              className="flex items-center gap-4 p-5 bg-white rounded-xl cursor-pointer border-2 border-green-100 hover:border-green-300 hover:shadow-lg transition-all"
                            >
                              <img
                                src={getIngredientImageUrl(ing.image)}
                                alt={ing.name}
                                className="w-14 h-14 rounded-xl object-cover bg-gray-100"
                              />
                              <div>
                                <p className="font-bold text-gray-900 capitalize">{ing.name}</p>
                                <p className="text-sm text-gray-500">{ing.original}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Need */}
                      {recipe.missedIngredients.length > 0 && (
                        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 border-2 border-orange-100">
                          <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                              </svg>
                            </div>
                            Ingredients You Need
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {recipe.missedIngredients.map((ing) => (
                              <div
                                key={ing.id}
                                onClick={() => setMainImage(getIngredientImageUrl(ing.image))}
                                className="flex items-center gap-4 p-5 bg-white rounded-xl cursor-pointer border-2 border-orange-100 hover:border-orange-300 hover:shadow-lg transition-all"
                              >
                                <img
                                  src={getIngredientImageUrl(ing.image)}
                                  alt={ing.name}
                                  className="w-14 h-14 rounded-xl object-cover bg-gray-100"
                                />
                                <div>
                                  <p className="font-bold text-gray-900 capitalize">{ing.name}</p>
                                  <p className="text-sm text-gray-500">{ing.original}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Full List */}
                      {details?.extendedIngredients && (
                        <div className="bg-gray-50 rounded-2xl p-8">
                          <h4 className="text-xl font-bold text-gray-900 mb-6">Full Ingredient List</h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {details.extendedIngredients.map((ing, idx) => (
                              <li key={ing.id || idx} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100">
                                <span className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex-shrink-0"></span>
                                <span className="text-gray-700">{ing.original}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Instructions Tab */}
                  {activeTab === 'instructions' && (
                    <div>
                      {details?.analyzedInstructions?.[0]?.steps ? (
                        <ol className="space-y-6">
                          {details.analyzedInstructions[0].steps.map((step) => (
                            <li key={step.number} className="flex gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                              <span className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl flex items-center justify-center font-bold shadow-lg">
                                {step.number}
                              </span>
                              <div className="flex-1">
                                <p className="text-gray-700 text-lg leading-relaxed">{step.step}</p>
                                {step.length && (
                                  <p className="text-gray-500 mt-3 text-sm font-medium">⏱️ {step.length.number} {step.length.unit}</p>
                                )}
                              </div>
                            </li>
                          ))}
                        </ol>
                      ) : details?.instructions ? (
                        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                            {stripHtmlTags(details.instructions)}
                          </p>
                        </div>
                      ) : (
                        <div className="text-center py-16 bg-gray-50 rounded-2xl">
                          <span className="text-6xl mb-6 block">📄</span>
                          <p className="text-gray-500 text-lg">No instructions available.</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Summary */}
                  {details?.summary && (
                    <div className="mt-10 pt-10 border-t-2 border-gray-100">
                      <h4 className="text-xl font-bold text-gray-900 mb-4">About This Recipe</h4>
                      <p className="text-gray-600 leading-relaxed">
                        {stripHtmlTags(details.summary).slice(0, 500)}...
                      </p>
                    </div>
                  )}

                  {/* Source */}
                  {details?.sourceUrl && (
                    <div className="mt-8">
                      <a
                        href={details.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg"
                      >
                        View Original Recipe
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
