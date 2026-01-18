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
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-slide-up">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
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

          <div className="overflow-y-auto max-h-[90vh]">
            {/* Hero Section with Image Gallery */}
            <div className="relative">
              <div className="aspect-video bg-gray-100">
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
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setMainImage(img)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        mainImage === img
                          ? 'border-orange-500 scale-105 shadow-lg'
                          : 'border-white/50 opacity-80 hover:opacity-100'
                      }`}
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Title and Stats */}
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  {recipe.title}
                </h2>

                {/* Match Stats */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {recipe.usedIngredientCount} ingredients you have
                  </span>
                  {recipe.missedIngredientCount > 0 && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
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
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {details.readyInMinutes} mins
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {details.servings} servings
                    </span>
                    {details.healthScore > 0 && (
                      <span className="flex items-center gap-1.5">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Health: {details.healthScore}%
                      </span>
                    )}
                  </div>
                )}

                {/* Diet Tags */}
                {details && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {details.vegetarian && (
                      <span className="px-2 py-1 bg-green-50 text-green-600 rounded text-xs font-medium">🥬 Vegetarian</span>
                    )}
                    {details.vegan && (
                      <span className="px-2 py-1 bg-green-50 text-green-600 rounded text-xs font-medium">🌱 Vegan</span>
                    )}
                    {details.glutenFree && (
                      <span className="px-2 py-1 bg-yellow-50 text-yellow-600 rounded text-xs font-medium">🌾 Gluten-free</span>
                    )}
                    {details.dairyFree && (
                      <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-medium">🥛 Dairy-free</span>
                    )}
                    {details.veryHealthy && (
                      <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded text-xs font-medium">💪 Very Healthy</span>
                    )}
                  </div>
                )}
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="py-12">
                  <LoadingSpinner message="Loading recipe details..." />
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="py-8 text-center">
                  <p className="text-red-500">Failed to load recipe details. Please try again.</p>
                </div>
              )}

              {/* Tabs */}
              {!isLoading && !error && (
                <>
                  <div className="flex border-b border-gray-200 mb-6">
                    <button
                      onClick={() => setActiveTab('ingredients')}
                      className={`flex-1 py-3 px-4 text-sm font-semibold transition-colors ${
                        activeTab === 'ingredients'
                          ? 'text-orange-600 border-b-2 border-orange-500'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span>🥗</span> Ingredients
                      </span>
                    </button>
                    <button
                      onClick={() => setActiveTab('instructions')}
                      className={`flex-1 py-3 px-4 text-sm font-semibold transition-colors ${
                        activeTab === 'instructions'
                          ? 'text-orange-600 border-b-2 border-orange-500'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span>📝</span> Instructions
                      </span>
                    </button>
                  </div>

                  {/* Tab Content */}
                  {activeTab === 'ingredients' && (
                    <div className="space-y-4">
                      {/* Ingredients You Have */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm">✓</span>
                          Ingredients You Have
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {recipe.usedIngredients.map((ing) => (
                            <div
                              key={ing.id}
                              className="flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer"
                              onClick={() => setMainImage(getIngredientImageUrl(ing.image))}
                            >
                              <img
                                src={getIngredientImageUrl(ing.image)}
                                alt={ing.name}
                                className="w-10 h-10 rounded-lg object-cover bg-white"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40?text=🥗';
                                }}
                              />
                              <div>
                                <p className="font-medium text-gray-800 capitalize">{ing.name}</p>
                                <p className="text-sm text-gray-500">{ing.original}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Missing Ingredients */}
                      {recipe.missedIngredients.length > 0 && (
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <span className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-sm">+</span>
                            Ingredients You Need
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {recipe.missedIngredients.map((ing) => (
                              <div
                                key={ing.id}
                                className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors cursor-pointer"
                                onClick={() => setMainImage(getIngredientImageUrl(ing.image))}
                              >
                                <img
                                  src={getIngredientImageUrl(ing.image)}
                                  alt={ing.name}
                                  className="w-10 h-10 rounded-lg object-cover bg-white"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40?text=🛒';
                                  }}
                                />
                                <div>
                                  <p className="font-medium text-gray-800 capitalize">{ing.name}</p>
                                  <p className="text-sm text-gray-500">{ing.original}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Full Ingredients from Details */}
                      {details?.extendedIngredients && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <h4 className="text-lg font-semibold text-gray-800 mb-3">
                            Full Ingredient List
                          </h4>
                          <ul className="space-y-2">
                            {details.extendedIngredients.map((ing, idx) => (
                              <li key={ing.id || idx} className="flex items-start gap-2 text-gray-700">
                                <span className="text-orange-500 mt-1">•</span>
                                <span>{ing.original}</span>
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
                        <ol className="space-y-4">
                          {details.analyzedInstructions[0].steps.map((step) => (
                            <li key={step.number} className="flex gap-4">
                              <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                {step.number}
                              </span>
                              <div className="flex-1 pt-1">
                                <p className="text-gray-700 leading-relaxed">{step.step}</p>
                                {step.length && (
                                  <p className="text-sm text-gray-500 mt-1">
                                    ⏱️ {step.length.number} {step.length.unit}
                                  </p>
                                )}
                              </div>
                            </li>
                          ))}
                        </ol>
                      ) : details?.instructions ? (
                        <div className="prose prose-orange max-w-none">
                          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {stripHtmlTags(details.instructions)}
                          </p>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <p>No detailed instructions available for this recipe.</p>
                          {details?.sourceUrl && (
                            <a
                              href={details.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block mt-4 text-orange-600 hover:underline"
                            >
                              View full recipe on source website →
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Summary */}
                  {details?.summary && (
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">About This Recipe</h4>
                      <p className="text-gray-600 leading-relaxed">
                        {stripHtmlTags(details.summary).slice(0, 500)}
                        {details.summary.length > 500 && '...'}
                      </p>
                    </div>
                  )}

                  {/* Source Link */}
                  {details?.sourceUrl && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <a
                        href={details.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
                      >
                        View original recipe
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
