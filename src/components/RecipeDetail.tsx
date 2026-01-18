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
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[92vh] overflow-hidden animate-slide-up">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-10 w-12 h-12 bg-white/95 hover:bg-white rounded-xl shadow-lg flex items-center justify-center transition-all hover:scale-110 border border-gray-200"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="overflow-y-auto max-h-[92vh]">
            {/* Hero Section with Image Gallery */}
            <div className="relative">
              <div className="aspect-[16/9] sm:aspect-video bg-gray-100">
                <img
                  src={mainImage}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x450?text=Recipe+Image';
                  }}
                />
              </div>

              {/* Image Thumbnails - E-commerce style */}
              <div className="absolute bottom-5 left-5 right-5">
                <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setMainImage(img)}
                      className={`flex-shrink-0 w-18 h-18 sm:w-22 sm:h-22 rounded-xl overflow-hidden border-3 transition-all ${
                        mainImage === img
                          ? 'border-orange-500 scale-105 shadow-xl'
                          : 'border-white/80 opacity-85 hover:opacity-100'
                      }`}
                      style={{ width: '72px', height: '72px' }}
                    >
                      <img
                        src={img}
                        alt={`View ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Content */}
            <div className="p-8 sm:p-10 lg:p-12">
              {/* Title and Stats */}
              <div className="mb-10">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {recipe.title}
                </h2>

                {/* Match Stats */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <span className="inline-flex items-center gap-3 px-5 py-3 bg-green-100 text-green-700 rounded-xl text-base font-bold border-2 border-green-200">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {recipe.usedIngredientCount} ingredients you have
                  </span>
                  {recipe.missedIngredientCount > 0 && (
                    <span className="inline-flex items-center gap-3 px-5 py-3 bg-orange-100 text-orange-700 rounded-xl text-base font-bold border-2 border-orange-200">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {recipe.missedIngredientCount} ingredients needed
                    </span>
                  )}
                </div>

                {/* Additional Info from Details */}
                {details && (
                  <div className="flex flex-wrap gap-4 mb-6">
                    <span className="flex items-center gap-2 bg-gray-100 px-5 py-3 rounded-xl text-gray-700 font-medium">
                      <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {details.readyInMinutes} mins
                    </span>
                    <span className="flex items-center gap-2 bg-gray-100 px-5 py-3 rounded-xl text-gray-700 font-medium">
                      <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {details.servings} servings
                    </span>
                    {details.healthScore > 0 && (
                      <span className="flex items-center gap-2 bg-gray-100 px-5 py-3 rounded-xl text-gray-700 font-medium">
                        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Health: {details.healthScore}%
                      </span>
                    )}
                  </div>
                )}

                {/* Diet Tags */}
                {details && (
                  <div className="flex flex-wrap gap-3">
                    {details.vegetarian && (
                      <span className="px-4 py-2 bg-green-50 text-green-700 rounded-xl text-sm font-bold border-2 border-green-100">🥬 Vegetarian</span>
                    )}
                    {details.vegan && (
                      <span className="px-4 py-2 bg-green-50 text-green-700 rounded-xl text-sm font-bold border-2 border-green-100">🌱 Vegan</span>
                    )}
                    {details.glutenFree && (
                      <span className="px-4 py-2 bg-yellow-50 text-yellow-700 rounded-xl text-sm font-bold border-2 border-yellow-100">🌾 Gluten-free</span>
                    )}
                    {details.dairyFree && (
                      <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm font-bold border-2 border-blue-100">🥛 Dairy-free</span>
                    )}
                    {details.veryHealthy && (
                      <span className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-bold border-2 border-emerald-100">💪 Very Healthy</span>
                    )}
                  </div>
                )}
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="py-20">
                  <LoadingSpinner message="Loading recipe details..." />
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="py-12 px-8 text-center bg-red-50 rounded-2xl">
                  <p className="text-red-600 font-semibold text-lg">Failed to load recipe details. Please try again.</p>
                </div>
              )}

              {/* Tabs */}
              {!isLoading && !error && (
                <>
                  <div className="flex border-b-2 border-gray-100 mb-10">
                    <button
                      onClick={() => setActiveTab('ingredients')}
                      className={`flex-1 py-5 px-6 text-base font-bold transition-colors relative ${
                        activeTab === 'ingredients'
                          ? 'text-orange-600'
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <span className="flex items-center justify-center gap-3">
                        <span className="text-xl">🥗</span> Ingredients
                      </span>
                      {activeTab === 'ingredients' && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500 rounded-t-full" />
                      )}
                    </button>
                    <button
                      onClick={() => setActiveTab('instructions')}
                      className={`flex-1 py-5 px-6 text-base font-bold transition-colors relative ${
                        activeTab === 'instructions'
                          ? 'text-orange-600'
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <span className="flex items-center justify-center gap-3">
                        <span className="text-xl">📝</span> Instructions
                      </span>
                      {activeTab === 'instructions' && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500 rounded-t-full" />
                      )}
                    </button>
                  </div>

                  {/* Tab Content */}
                  {activeTab === 'ingredients' && (
                    <div className="space-y-8">
                      {/* Ingredients You Have */}
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 sm:p-8">
                        <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-4">
                          <span className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white text-lg shadow-lg">✓</span>
                          Ingredients You Have
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {recipe.usedIngredients.map((ing) => (
                            <div
                              key={ing.id}
                              className="flex items-center gap-4 p-5 bg-white rounded-xl hover:shadow-lg transition-shadow cursor-pointer border-2 border-green-100"
                              onClick={() => setMainImage(getIngredientImageUrl(ing.image))}
                            >
                              <img
                                src={getIngredientImageUrl(ing.image)}
                                alt={ing.name}
                                className="w-14 h-14 rounded-xl object-cover bg-gray-50 border-2 border-gray-100"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/56?text=🥗';
                                }}
                              />
                              <div>
                                <p className="font-bold text-gray-900 capitalize text-lg">{ing.name}</p>
                                <p className="text-gray-500">{ing.original}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Missing Ingredients */}
                      {recipe.missedIngredients.length > 0 && (
                        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 sm:p-8">
                          <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-4">
                            <span className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white text-lg shadow-lg">+</span>
                            Ingredients You Need
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {recipe.missedIngredients.map((ing) => (
                              <div
                                key={ing.id}
                                className="flex items-center gap-4 p-5 bg-white rounded-xl hover:shadow-lg transition-shadow cursor-pointer border-2 border-orange-100"
                                onClick={() => setMainImage(getIngredientImageUrl(ing.image))}
                              >
                                <img
                                  src={getIngredientImageUrl(ing.image)}
                                  alt={ing.name}
                                  className="w-14 h-14 rounded-xl object-cover bg-gray-50 border-2 border-gray-100"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/56?text=🛒';
                                  }}
                                />
                                <div>
                                  <p className="font-bold text-gray-900 capitalize text-lg">{ing.name}</p>
                                  <p className="text-gray-500">{ing.original}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Full Ingredients from Details */}
                      {details?.extendedIngredients && (
                        <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
                          <h4 className="text-xl font-bold text-gray-900 mb-6">
                            Full Ingredient List
                          </h4>
                          <ul className="space-y-4">
                            {details.extendedIngredients.map((ing, idx) => (
                              <li key={ing.id || idx} className="flex items-start gap-4 text-gray-700">
                                <span className="w-3 h-3 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                                <span className="text-lg leading-relaxed">{ing.original}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'instructions' && (
                    <div>
                      {details?.analyzedInstructions?.[0]?.steps ? (
                        <ol className="space-y-6">
                          {details.analyzedInstructions[0].steps.map((step) => (
                            <li key={step.number} className="flex gap-6 p-6 bg-gray-50 rounded-2xl">
                              <span className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-lg">
                                {step.number}
                              </span>
                              <div className="flex-1 pt-1">
                                <p className="text-gray-700 text-lg leading-relaxed">{step.step}</p>
                                {step.length && (
                                  <p className="text-gray-500 mt-3 flex items-center gap-2 font-medium">
                                    ⏱️ {step.length.number} {step.length.unit}
                                  </p>
                                )}
                              </div>
                            </li>
                          ))}
                        </ol>
                      ) : details?.instructions ? (
                        <div className="bg-gray-50 rounded-2xl p-8">
                          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                            {stripHtmlTags(details.instructions)}
                          </p>
                        </div>
                      ) : (
                        <div className="text-center py-16 bg-gray-50 rounded-2xl">
                          <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-4xl">📄</span>
                          </div>
                          <p className="text-gray-500 text-lg mb-6">No detailed instructions available for this recipe.</p>
                          {details?.sourceUrl && (
                            <a
                              href={details.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-bold text-lg"
                            >
                              View full recipe on source website
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Summary */}
                  {details?.summary && (
                    <div className="mt-10 pt-10 border-t-2 border-gray-100">
                      <h4 className="text-xl font-bold text-gray-900 mb-5">About This Recipe</h4>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        {stripHtmlTags(details.summary).slice(0, 500)}
                        {details.summary.length > 500 && '...'}
                      </p>
                    </div>
                  )}

                  {/* Source Link */}
                  {details?.sourceUrl && (
                    <div className="mt-10 pt-10 border-t-2 border-gray-100">
                      <a
                        href={details.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 text-orange-600 hover:text-orange-700 font-bold text-lg"
                      >
                        View original recipe
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
