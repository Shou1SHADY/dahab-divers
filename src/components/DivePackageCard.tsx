import { Card, CardContent, CardFooter, CardHeader } from './ui/Card';
import Button from './ui/Button';
import Link from 'next/link';
import { Users, Clock, Star, Award, CheckCircle, Zap, Heart } from 'lucide-react';

interface DivePackageCardProps {
    package: {
        id: string;
        title: string;
        price: string;
        duration: string;
        dives: number;
        level: string;
        features: string[];
        rating?: number;
        bestValue?: boolean;
        popular?: boolean;
        equipmentIncluded?: boolean;
        certification?: string;
    };
    ctaLabel: string;
    lang?: string;
}

export default function DivePackageCard({ package: pkg, ctaLabel, lang }: DivePackageCardProps) {
    // Render star ratings
    const renderRating = (rating: number) => {
        return (
            <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                ))}
                <span className="text-xs text-gray-600 ml-1">({rating})</span>
            </div>
        );
    };

    // Get level color
    const getLevelColor = (level: string) => {
        switch (level.toLowerCase()) {
            case 'beginner': return 'bg-green-100 text-green-800';
            case 'intermediate': return 'bg-blue-100 text-blue-800';
            case 'advanced': return 'bg-orange-100 text-orange-800';
            case 'expert': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <Card 
            className={`h-full w-full flex flex-col overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative max-w-full ${pkg.bestValue ? 'ring-2 ring-turquoise' : ''} ${pkg.popular ? 'ring-2 ring-orange-400' : ''}`}
            style={{ boxSizing: 'border-box', minWidth: 0 }}
        >
            {/* Badge */}
            {pkg.bestValue && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-turquoise to-blue-500 text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap z-10 shadow-lg">
                    <Zap className="w-3 h-3 inline mr-1" />
                    BEST VALUE
                </div>
            )}
            {pkg.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap z-10 shadow-lg">
                    <Heart className="w-3 h-3 inline mr-1" />
                    POPULAR
                </div>
            )}

            <CardHeader className="pb-4 bg-gradient-to-br from-gray-50 to-white">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-2 ${getLevelColor(pkg.level)}`}>
                            {pkg.level}
                        </span>
                        <h3 className="text-xl font-bold text-navy mb-1.5 group-hover:text-turquoise transition-colors">
                            {pkg.title}
                        </h3>
                        {pkg.certification && (
                            <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                <Award className="w-3.5 h-3.5 text-turquoise" />
                                <span>{pkg.certification}</span>
                            </div>
                        )}
                    </div>
                    {pkg.rating && (
                        <div className="flex flex-col items-end">
                            {renderRating(pkg.rating)}
                        </div>
                    )}
                </div>

                <div className="mt-4 flex items-baseline gap-1.5">
                    <span className="text-3xl font-bold text-navy">{pkg.price}</span>
                    <span className="text-base text-gray-500">/{pkg.duration}</span>
                </div>
            </CardHeader>

            <CardContent className="flex-1 pb-4">
                <div className="flex items-center gap-4 text-xs text-gray-600 mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-1.5">
                        <div className="w-7 h-7 bg-turquoise/10 rounded-full flex items-center justify-center">
                            <Users className="w-3.5 h-3.5 text-turquoise" />
                        </div>
                        <span className="font-semibold">{pkg.dives} Dives</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-7 h-7 bg-turquoise/10 rounded-full flex items-center justify-center">
                            <Clock className="w-3.5 h-3.5 text-turquoise" />
                        </div>
                        <span className="font-semibold">{pkg.duration}</span>
                    </div>
                </div>

                {/* Equipment included indicator */}
                {pkg.equipmentIncluded && (
                    <div className="flex items-center gap-1.5 text-xs text-green-600 mb-3 bg-green-50 px-2.5 py-1.5 rounded-lg">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span className="font-medium">Equipment Included</span>
                    </div>
                )}

                <div className="space-y-2">
                    {pkg.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-2 group">
                            <div className="w-4 h-4 rounded-full bg-turquoise/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-turquoise/20 transition-colors">
                                <CheckCircle className="w-2.5 h-2.5 text-turquoise" />
                            </div>
                            <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                        </div>
                    ))}
                </div>
            </CardContent>

            <CardFooter className="p-0 px-4 pb-4 bg-gradient-to-t from-gray-50 to-white">
                <Link href={`/${lang || 'en'}/contact?package=${encodeURIComponent(pkg.title)}`} prefetch={true} className="w-full">
                    <Button variant="secondary" className="w-full rounded-full py-2.5 text-sm font-semibold group/btn hover:shadow-lg transition-all">
                        <span>{ctaLabel}</span>
                        <div className="w-4 h-4 ml-2 rounded-full bg-turquoise text-white flex items-center justify-center group-hover/btn:scale-110 transition-transform">
                            <span className="text-xs">→</span>
                        </div>
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}