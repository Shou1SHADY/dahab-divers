'use client';

import { useState, useMemo, useCallback } from 'react';
import DiveSiteCard from "@/components/DiveSiteCard";
import DivePackageCard from "@/components/DivePackageCard";
import FilterSortSystem from "@/components/FilterSortSystem";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import sitesData from "@/data/sites.json";
import packagesData from "@/data/packages.json";
import { Award, Clock, Star, MapPin, Users, Shield, Waves, Package, MapPin as MapPinIcon } from "lucide-react";
import { Suspense } from "react";

interface FilterOptions {
    level: string[];
    depthRange: string;
    rating: number;
    sortBy: string;
}

export default function DivingContent({ lang, dict }: { lang: string; dict: any }) {
    const [activeTab, setActiveTab] = useState<'packages' | 'sites'>('packages');
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState<FilterOptions>({
        level: [],
        depthRange: 'all',
        rating: 0,
        sortBy: 'rating'
    });

    // Get available levels
    const availableLevels = useMemo(() => {
        const allLevels = [...packagesData, ...sitesData].map(item => item.level);
        return [...new Set(allLevels)];
    }, []);

    // Parse depth from string
    const parseDepth = (depth: string): number => {
        const match = depth.match(/\d+/);
        return match ? parseInt(match[0]) : 0;
    };

    // Parse price from string
    const parsePrice = (price: string): number => {
        const match = price.match(/\d+/);
        return match ? parseInt(match[0]) : 0;
    };

    // Filter and sort packages
    const filteredPackages = useMemo(() => {
        let filtered = packagesData.filter(pkg => {
            const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pkg.features.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesLevel = filters.level.length === 0 || filters.level.includes(pkg.level);
            const matchesRating = filters.rating === 0 || (pkg.rating || 0) >= filters.rating;

            return matchesSearch && matchesLevel && matchesRating;
        });

        // Sort
        filtered.sort((a, b) => {
            switch (filters.sortBy) {
                case 'rating':
                    return (b.rating || 0) - (a.rating || 0);
                case 'price-low':
                    return parsePrice(a.price) - parsePrice(b.price);
                case 'price-high':
                    return parsePrice(b.price) - parsePrice(a.price);
                case 'name':
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });

        return filtered;
    }, [packagesData, searchTerm, filters]);

    // Filter and sort sites
    const filteredSites = useMemo(() => {
        let filtered = sitesData.filter(site => {
            const matchesSearch = site.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                site.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesLevel = filters.level.length === 0 || filters.level.includes(site.level);
            const matchesDepth = filters.depthRange === 'all' ||
                (() => {
                    const depth = parseDepth(site.depth);
                    switch (filters.depthRange) {
                        case 'shallow': return depth <= 20;
                        case 'medium': return depth > 20 && depth <= 40;
                        case 'deep': return depth > 40;
                        default: return true;
                    }
                })();
            const matchesRating = filters.rating === 0 || (site.rating || 0) >= filters.rating;

            return matchesSearch && matchesLevel && matchesDepth && matchesRating;
        });

        // Sort
        filtered.sort((a, b) => {
            switch (filters.sortBy) {
                case 'rating':
                    return (b.rating || 0) - (a.rating || 0);
                case 'name':
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });

        return filtered;
    }, [sitesData, searchTerm, filters]);

    const handleFiltersChange = useCallback((newFilters: FilterOptions) => {
        setFilters(newFilters);
    }, []);

    const handleSearchChange = useCallback((term: string) => {
        setSearchTerm(term);
    }, []);

    return (
        <>
            {/* Hero Stats Section */}
            <section className="py-12 bg-gradient-to-r from-navy to-navy-light text-white mt-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="p-4">
                            <div className="text-3xl font-bold text-turquoise mb-2">25+</div>
                            <div className="text-sm text-gray-300">Dive Sites</div>
                        </div>
                        <div className="p-4">
                            <div className="text-3xl font-bold text-turquoise mb-2">15+</div>
                            <div className="text-sm text-gray-300">Years Experience</div>
                        </div>
                        <div className="p-4">
                            <div className="text-3xl font-bold text-turquoise mb-2">5000+</div>
                            <div className="text-sm text-gray-300">Happy Divers</div>
                        </div>
                        <div className="p-4">
                            <div className="text-3xl font-bold text-turquoise mb-2">4.9/5</div>
                            <div className="text-sm text-gray-300">Average Rating</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tab Navigation */}
            <section className="py-8 bg-white border-b">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center">
                        <div className="inline-flex bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setActiveTab('packages')}
                                className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-colors ${activeTab === 'packages'
                                        ? 'bg-white text-navy shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <Package className="w-4 h-4" />
                                Dive Packages
                            </button>
                            <button
                                onClick={() => setActiveTab('sites')}
                                className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-colors ${activeTab === 'sites'
                                        ? 'bg-white text-navy shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <MapPinIcon className="w-4 h-4" />
                                Dive Sites
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter and Search System */}
            <section className="py-4 bg-gray-50">
                <div className="container mx-auto px-4">
                    <FilterSortSystem
                        searchTerm={searchTerm}
                        filters={filters}
                        onSearchChange={setSearchTerm}
                        onFiltersChange={setFilters}
                        activeTab={activeTab}
                        availableLevels={availableLevels}
                        dict={dict}
                    />
                </div>
            </section>

            {/* Content Sections */}
            {activeTab === 'packages' ? (
                <Suspense fallback={<LoadingSkeleton />}>
                    <section className="pt-8 pb-20 bg-white relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-turquoise/5 to-blue-500/5"></div>
                        <div className="container mx-auto px-4 relative">
                            <div className="text-center mb-16">
                                <div className="inline-flex items-center gap-2 bg-turquoise/10 text-turquoise px-4 py-2 rounded-full text-sm font-semibold mb-4">
                                    <Waves className="w-4 h-4" />
                                    POPULAR PACKAGES
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">{dict.diving.packages.title}</h2>
                                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                    {dict.diving.packages.subtitle}
                                </p>
                            </div>

                            {filteredPackages.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" style={{ width: '100%' }}>
                                    {filteredPackages.map((pkg) => (
                                        <div key={pkg.id} className="w-full min-w-0 max-w-full" style={{ boxSizing: 'border-box' }}>
                                            <DivePackageCard
                                                package={pkg}
                                                ctaLabel={dict.diving.packages.cta}
                                                lang={lang}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16 px-6">
                                    <div className="max-w-md mx-auto">
                                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Package className="w-10 h-10 text-gray-400" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">No packages found</h3>
                                        <p className="text-gray-600 mb-6">
                                            Try adjusting your filters or search terms to find the perfect diving package for you.
                                        </p>
                                        <button
                                            onClick={() => {
                                                setSearchTerm('');
                                                setFilters({
                                                    level: [],
                                                    depthRange: 'all',
                                                    rating: 0,
                                                    sortBy: 'rating'
                                                });
                                            }}
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-turquoise text-white rounded-lg hover:bg-turquoise-600 transition-colors"
                                        >
                                            Clear all filters
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                </Suspense>
            ) : (
                <Suspense fallback={<LoadingSkeleton />}>
                    <section className="pt-8 pb-20 bg-gray-50">
                        <div className="container mx-auto px-4">
                            <div className="text-center mb-16">
                                <div className="inline-flex items-center gap-2 bg-navy/10 text-navy px-4 py-2 rounded-full text-sm font-semibold mb-4">
                                    <MapPin className="w-4 h-4" />
                                    LEGENDARY SITES
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">{dict.diving.sites.title}</h2>
                                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                    {dict.diving.sites.subtitle}
                                </p>
                            </div>

                            {filteredSites.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" style={{ width: '100%' }}>
                                    {filteredSites.map((site) => (
                                        <div key={site.id} className="w-full min-w-0 max-w-full" style={{ boxSizing: 'border-box' }}>
                                            <DiveSiteCard
                                                site={site}
                                                lang={lang}
                                                ctaLabel={dict.diving.sites.cta}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16 px-6">
                                    <div className="max-w-md mx-auto">
                                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <MapPinIcon className="w-10 h-10 text-gray-400" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">No dive sites found</h3>
                                        <p className="text-gray-600 mb-6">
                                            Try adjusting your filters or search terms to discover amazing dive sites in Dahab.
                                        </p>
                                        <button
                                            onClick={() => {
                                                setSearchTerm('');
                                                setFilters({
                                                    level: [],
                                                    depthRange: 'all',
                                                    rating: 0,
                                                    sortBy: 'rating'
                                                });
                                            }}
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-turquoise text-white rounded-lg hover:bg-turquoise-600 transition-colors"
                                        >
                                            Clear all filters
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                </Suspense>
            )}

            {/* Enhanced Why Dive with Us */}
            <section className="py-20 bg-gradient-to-br from-navy to-navy-light text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="w-full h-full" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundRepeat: 'repeat'
                    }}></div>
                </div>
                <div className="container mx-auto px-4 relative">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            <Shield className="w-4 h-4" />
                            WHY CHOOSE US
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">{dict.diving.whyUs.title}</h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            {dict.diving.whyUs.subtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                            <div className="w-20 h-20 bg-turquoise/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <Award className="w-10 h-10 text-turquoise" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{dict.diving.whyUs.items[0].title}</h3>
                            <p className="text-gray-300 leading-relaxed">
                                {dict.diving.whyUs.items[0].desc}
                            </p>
                        </div>

                        <div className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                            <div className="w-20 h-20 bg-turquoise/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <Clock className="w-10 h-10 text-turquoise" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{dict.diving.whyUs.items[1].title}</h3>
                            <p className="text-gray-300 leading-relaxed">
                                {dict.diving.whyUs.items[1].desc}
                            </p>
                        </div>

                        <div className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                            <div className="w-20 h-20 bg-turquoise/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <Star className="w-10 h-10 text-turquoise" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{dict.diving.whyUs.items[2].title}</h3>
                            <p className="text-gray-300 leading-relaxed">
                                {dict.diving.whyUs.items[2].desc}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-turquoise to-blue-500 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready for Your Underwater Adventure?</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">Join us for an unforgettable diving experience in the crystal-clear waters of the Red Sea.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href={`/${lang}/contact`}
                            className="inline-flex items-center gap-2 bg-white text-navy px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                        >
                            <Users className="w-5 h-5" />
                            Book Your Dive Now
                        </a>
                        <a
                            href={`/${lang}/courses`}
                            className="inline-flex items-center gap-2 bg-navy text-white px-8 py-4 rounded-full font-semibold hover:bg-navy-light transition-colors"
                        >
                            <Award className="w-5 h-5" />
                            View Courses
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
