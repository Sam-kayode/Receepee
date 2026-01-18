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
    <div className="card p-6 sm:p-8 lg:p-10 mb-10 animate-slide-up">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
        {/* Results Summary */}
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl blur-lg opacity-30"></div>
            <div className="relative w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="font-extrabold text-gray-900 text-2xl">Filter Results</h3>
            <p className="text-gray-500 text-base mt-1">
              Showing <span className="font-bold text-orange-600">{filteredResults}</span> of{' '}
              <span className="font-semibold">{totalResults}</span> recipes
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Missing Ingredients Filter */}
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
              <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Max Missing
            </label>
            <select
              value={filters.maxMissingIngredients}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  maxMissingIngredients: Number(e.target.value),
                })
              }
              className="select-field min-w-[200px]"
            >
              <option value={0}>0 (exact match only)</option>
              <option value={1}>Up to 1 ingredient</option>
              <option value={2}>Up to 2 ingredients</option>
              <option value={3}>Up to 3 ingredients</option>
              <option value={5}>Up to 5 ingredients</option>
              <option value={10}>Up to 10 ingredients</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
              <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
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
              className="select-field min-w-[200px]"
            >
              <option value="relevance">Best Match</option>
              <option value="missedIngredients">Fewest Missing First</option>
              <option value="likes">Most Popular First</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
