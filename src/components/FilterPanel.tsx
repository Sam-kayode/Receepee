import React from 'react';
import type { SearchFilters } from '../types/recipe';

interface FilterPanelProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  totalResults: number;
  filteredResults: number;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  totalResults,
  filteredResults,
}) => {
  return (
    <div className="card p-6 sm:p-8 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Results Count */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center">
            <svg
              className="w-7 h-7 text-orange-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-xl">Filter Results</h3>
            <p className="text-gray-500 text-base mt-0.5">
              Showing <span className="font-semibold text-orange-600">{filteredResults}</span> of {totalResults} recipes
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-5">
          {/* Missing Ingredients Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Max Missing Ingredients
            </label>
            <select
              value={filters.maxMissingIngredients}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  maxMissingIngredients: Number(e.target.value),
                })
              }
              className="px-5 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base font-medium text-gray-700 min-w-[200px] cursor-pointer hover:border-gray-300 transition-colors"
            >
              <option value={0}>0 (exact match)</option>
              <option value={1}>1 ingredient</option>
              <option value={2}>2 ingredients</option>
              <option value={3}>3 ingredients</option>
              <option value={5}>5 ingredients</option>
              <option value={10}>10+ ingredients</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  sortBy: e.target.value as SearchFilters['sortBy'],
                })
              }
              className="px-5 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base font-medium text-gray-700 min-w-[200px] cursor-pointer hover:border-gray-300 transition-colors"
            >
              <option value="relevance">Relevance</option>
              <option value="missedIngredients">Fewest Missing</option>
              <option value="likes">Most Popular</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
