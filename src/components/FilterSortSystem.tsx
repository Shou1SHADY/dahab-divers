'use client';

import { useState } from 'react';
import { Search, Filter, ChevronDown, X, Check } from 'lucide-react';

// --- Types ---
interface FilterOptions {
    level: string[];
    depthRange: string;
    rating: number;
    sortBy: string;
}

interface FilterSortSystemProps {
    searchTerm: string;
    filters: FilterOptions;
    onSearchChange: (term: string) => void;
    onFiltersChange: (filters: FilterOptions) => void;
    activeTab: 'packages' | 'sites';
    availableLevels: string[];
    dict: Record<string, any>;
}

// --- Constants ---
const getDepthRanges = (dict: Record<string, any>) => [
    { value: 'all', label: dict.filter?.allDepths || 'All Depths' },
    { value: 'shallow', label: dict.filter?.shallowDepth || 'Shallow (0-20m)' },
    { value: 'medium', label: dict.filter?.mediumDepth || 'Medium (20-40m)' },
    { value: 'deep', label: dict.filter?.deepDepth || 'Deep (40m+)' }
];

const getSortOptions = (dict: Record<string, any>) => [
    { value: 'rating', label: dict.filter?.highestRated || 'Highest Rated' },
    { value: 'price-low', label: dict.filter?.priceLowHigh || 'Price: Low to High' },
    { value: 'price-high', label: dict.filter?.priceHighLow || 'Price: High to Low' },
    { value: 'name', label: dict.filter?.nameAZ || 'Name A-Z' }
];

// --- Helper Functions ---
const hasActiveFilters = (filters: FilterOptions): boolean => {
    return filters.level.length > 0 || filters.rating > 0 || filters.depthRange !== 'all' || filters.sortBy !== 'rating';
};

const getFilterSummary = (filters: FilterOptions): string => {
    const activeFilters = [
        filters.level.length > 0 ? `${filters.level.length} levels` : null,
        filters.rating > 0 ? `≥${filters.rating}★` : null,
        filters.depthRange !== 'all' ? 'depth' : null,
        filters.sortBy !== 'rating' ? 'sorted' : null
    ].filter(Boolean);

    return activeFilters.length > 0 ? activeFilters.join(', ') : 'None';
};

// --- Components ---
const FilterButton = ({ 
    isActive, 
    onClick, 
    children, 
    showCheck = false 
}: { 
    isActive: boolean; 
    onClick: () => void; 
    children: React.ReactNode; 
    showCheck?: boolean;
}) => (
    <button
        onClick={onClick}
        className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all transform hover:scale-105 text-center relative ${
            isActive
                ? 'bg-turquoise text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
        }`}
    >
        {isActive && showCheck && <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1 inline" />}
        {children}
    </button>
);

const FilterSection = ({ 
    title, 
    onClear, 
    showClear, 
    children,
    dict
}: { 
    title: string; 
    onClear?: () => void; 
    showClear?: boolean; 
    children: React.ReactNode;
    dict?: Record<string, any>;
}) => (
    <div>
        <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900 text-sm md:text-base">{title}</h3>
            {showClear && onClear && (
                <button
                    onClick={onClear}
                    className="text-xs text-turquoise hover:text-turquoise-600"
                >
                    {dict?.filter?.clear || 'Clear'}
                </button>
            )}
        </div>
        {children}
    </div>
);

// --- Main Component ---
export default function FilterSortSystem({ 
    searchTerm,
    filters,
    onSearchChange,
    onFiltersChange,
    activeTab,
    availableLevels,
    dict
}: FilterSortSystemProps) {
    const [showFilters, setShowFilters] = useState(false);

    // Get localized options
    const depthRanges = getDepthRanges(dict);
    const sortOptions = getSortOptions(dict);

    // --- Event Handlers ---
    const toggleLevel = (level: string) => {
        const newLevels = filters.level.includes(level) 
            ? filters.level.filter(l => l !== level)
            : [...filters.level, level];
        
        onFiltersChange({ ...filters, level: newLevels });
    };

    const clearAllFilters = () => {
        onSearchChange('');
        onFiltersChange({
            level: [],
            depthRange: 'all',
            rating: 0,
            sortBy: 'rating'
        });
        setShowFilters(false);
    };

    const resetFilters = () => {
        onFiltersChange({
            level: [],
            depthRange: 'all',
            rating: 0,
            sortBy: 'rating'
        });
    };

    const applyFilters = () => {
        setShowFilters(false);
    };

    // --- Render ---
    return (
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
            {/* Search Bar */}
            <div className="flex flex-col gap-4 mb-6">
                <div className="flex-1 relative group">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 group-focus-within:text-turquoise transition-colors" />
                    <input
                        type="text"
                        placeholder={dict.filter?.searchPlaceholder || `Search ${activeTab === 'packages' ? 'packages' : 'dive sites'} by name or features...`}
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-10 pr-10 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise focus:border-transparent transition-all"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => onSearchChange('')}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                    )}
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-navy text-white rounded-lg hover:bg-navy-light transition-colors w-full sm:w-auto relative text-sm sm:text-base"
                    >
                        <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
                        {dict.filter?.filters || 'Filters'}
                        <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                        {hasActiveFilters(filters) && (
                            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-turquoise rounded-full"></div>
                        )}
                    </button>
                    
                    <div className="text-xs sm:text-sm text-gray-500 sm:ml-auto">
                        {activeTab === 'packages' ? (dict.filter?.packages || 'Packages') : (dict.filter?.sites || 'Sites')}
                    </div>
                </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
                <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6 bg-gray-50 rounded-lg">
                    {/* Experience Level Filter */}
                    <FilterSection
                        title={dict.filter?.experienceLevel || 'Experience Level'}
                        showClear={filters.level.length > 0}
                        onClear={() => onFiltersChange({ ...filters, level: [] })}
                        dict={dict}
                    >
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {availableLevels.map(level => (
                                <FilterButton
                                    key={level}
                                    isActive={filters.level.includes(level)}
                                    onClick={() => toggleLevel(level)}
                                    showCheck
                                >
                                    {level}
                                </FilterButton>
                            ))}
                        </div>
                    </FilterSection>

                    {/* Depth Range Filter */}
                    <FilterSection
                        title={dict.filter?.depthRange || 'Depth Range'}
                        showClear={filters.depthRange !== 'all'}
                        onClear={() => onFiltersChange({ ...filters, depthRange: 'all' })}
                        dict={dict}
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                            {depthRanges.map(range => (
                                <FilterButton
                                    key={range.value}
                                    isActive={filters.depthRange === range.value}
                                    onClick={() => onFiltersChange({ ...filters, depthRange: range.value })}
                                    showCheck
                                >
                                    <span className="text-xs sm:text-sm">{range.label}</span>
                                </FilterButton>
                            ))}
                        </div>
                    </FilterSection>

                    {/* Rating Filter */}
                    <FilterSection
                        title={dict.filter?.minimumRating || 'Minimum Rating'}
                        showClear={filters.rating > 0}
                        onClear={() => onFiltersChange({ ...filters, rating: 0 })}
                        dict={dict}
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                            <div className="flex-1 w-full sm:w-auto">
                                <input
                                    type="range"
                                    min="0"
                                    max="5"
                                    step="0.5"
                                    value={filters.rating}
                                    onChange={(e) => onFiltersChange({ ...filters, rating: parseFloat(e.target.value) })}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                    style={{
                                        background: `linear-gradient(to right, #14b8a6 0%, #14b8a6 ${(filters.rating / 5) * 100}%, #e5e7eb ${(filters.rating / 5) * 100}%, #e5e7eb 100%)`
                                    }}
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>0</span>
                                    <span>2.5</span>
                                    <span>5</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 min-w-[50px] sm:min-w-[60px] justify-center sm:justify-end">
                                {filters.rating > 0 ? (
                                    <>
                                        <span className="text-sm sm:text-lg font-semibold text-turquoise">{filters.rating.toFixed(1)}</span>
                                        <span className="text-yellow-400 text-sm sm:text-base">★</span>
                                    </>
                                ) : (
                                    <span className="text-xs sm:text-sm text-gray-500">{dict.filter?.all || 'All'}</span>
                                )}
                            </div>
                        </div>
                    </FilterSection>

                    {/* Sort Options */}
                    <FilterSection
                        title={dict.filter?.sortBy || 'Sort By'}
                        showClear={filters.sortBy !== 'rating'}
                        onClear={() => onFiltersChange({ ...filters, sortBy: 'rating' })}
                        dict={dict}
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                            {sortOptions.map(option => (
                                <FilterButton
                                    key={option.value}
                                    isActive={filters.sortBy === option.value}
                                    onClick={() => onFiltersChange({ ...filters, sortBy: option.value })}
                                    showCheck
                                >
                                    <span className="text-xs sm:text-sm">{option.label}</span>
                                </FilterButton>
                            ))}
                        </div>
                    </FilterSection>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 p-3 bg-turquoise/10 rounded-lg">
                        <button
                            onClick={applyFilters}
                            className="flex-1 px-4 py-2.5 bg-turquoise text-white rounded-lg hover:bg-turquoise/90 transition-colors font-medium text-sm sm:text-base"
                        >
                            {dict.filter?.applyFilters || 'Apply Filters'}
                        </button>
                        <button
                            onClick={resetFilters}
                            className="flex-1 px-4 py-2.5 bg-white text-turquoise border border-turquoise rounded-lg hover:bg-turquoise/10 transition-colors font-medium text-sm sm:text-base"
                        >
                            {dict.filter?.reset || 'Reset'}
                        </button>
                    </div>
                </div>
            )}

            {/* Results Count */}
            <div className="text-xs sm:text-sm text-gray-600 mt-4 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
                <span className="text-center sm:text-left">
                    {dict.filter?.showingResults || 'Showing'} {activeTab === 'packages' ? (dict.filter?.packages || 'packages') : (dict.filter?.sites || 'sites')} {dict.filter?.matchingCriteria || 'matching your criteria'}
                </span>
                {(searchTerm || hasActiveFilters(filters)) && (
                    <button
                        onClick={clearAllFilters}
                        className="text-turquoise hover:text-turquoise-600 font-medium flex items-center gap-1 justify-center sm:justify-start"
                    >
                        <X className="w-3 h-3" />
                        {dict.filter?.clearAll || 'Clear all'}
                    </button>
                )}
            </div>
        </div>
    );
}
