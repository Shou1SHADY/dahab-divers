import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from './ui/Card';
import Button from './ui/Button';
import { ArrowRight, Anchor, MapPin, Star, Users, Waves, Fish } from 'lucide-react';

interface DiveSiteCardProps {
    site: {
        id: string;
        title: string;
        depth: string;
        level: string;
        description: string;
        image: string;
        rating?: number;
        location?: string;
        marineLife?: string[];
        bestTime?: string;
        difficulty?: string;
    };
    lang: string;
    ctaLabel: string;
}

export default function DiveSiteCard({ site, lang, ctaLabel }: DiveSiteCardProps) {
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
        switch(level.toLowerCase()) {
            case 'beginner': return 'bg-green-100 text-green-800';
            case 'intermediate': return 'bg-blue-100 text-blue-800';
            case 'advanced': return 'bg-orange-100 text-orange-800';
            case 'expert': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <Card className="overflow-hidden border-none shadow-lg bg-white group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 w-full max-w-full" style={{ boxSizing: 'border-box', minWidth: 0 }}>
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src={site.image}
                    alt={site.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={85}
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Level badge */}
                <div className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-bold ${getLevelColor(site.level)} backdrop-blur-sm`}>
                    {site.level}
                </div>
                
                {/* Rating */}
                {site.rating && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-bold text-navy flex items-center gap-1">
                        {renderRating(site.rating)}
                    </div>
                )}

                {/* Quick info overlay on hover */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 text-navy">
                            <Anchor className="w-3 h-3" />
                            <span>{site.depth}</span>
                        </div>
                        {site.bestTime && (
                            <div className="flex items-center gap-1 text-navy">
                                <Waves className="w-3 h-3" />
                                <span>{site.bestTime}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-navy mb-1 group-hover:text-turquoise transition-colors">
                            {site.title}
                        </h3>
                        {site.location && (
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                <MapPin className="w-3.5 h-3.5" />
                                <span>{site.location}</span>
                            </div>
                        )}
                    </div>
                    {site.difficulty && (
                        <div className="flex items-center gap-1">
                            {[...Array(3)].map((_, i) => (
                                <div 
                                    key={i} 
                                    className={`w-1.5 h-1.5 rounded-full ${
                                        i < (site.difficulty === 'Easy' ? 1 : site.difficulty === 'Moderate' ? 2 : 3) 
                                            ? 'bg-orange-400' 
                                            : 'bg-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </CardHeader>
            
            <CardContent className="pb-3">
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                    <div className="flex items-center gap-1">
                        <Anchor className="w-3.5 h-3.5" />
                        <span>{site.depth}</span>
                    </div>
                    {site.marineLife && site.marineLife.length > 0 && (
                        <div className="flex items-center gap-1">
                            <Fish className="w-3.5 h-3.5" />
                            <span>{site.marineLife.length} Species</span>
                        </div>
                    )}
                </div>
                <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">{site.description}</p>
                
                {site.marineLife && site.marineLife.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                        {site.marineLife.slice(0, 3).map((life, index) => (
                            <span 
                                key={index} 
                                className="text-xs bg-turquoise/10 text-turquoise px-2 py-0.5 rounded-full"
                            >
                                {life}
                            </span>
                        ))}
                        {site.marineLife.length > 3 && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                +{site.marineLife.length - 3} more
                            </span>
                        )}
                    </div>
                )}
            </CardContent>
            
            <CardFooter className="p-0 px-4 pb-4">
                <Link href={`/${lang}/contact?site=${encodeURIComponent(site.title)}`} prefetch={true} className="w-full">
                    <Button variant="secondary" className="w-full rounded-full py-2.5 text-sm font-semibold group/btn">
                        <span>{ctaLabel}</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}