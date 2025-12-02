import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from './ui/Card';
import Button from './ui/Button';
import { Clock, BarChart, Calendar, Award } from 'lucide-react';

interface CourseCardProps {
    course: {
        id: string;
        title: string;
        price: string;
        duration: string;
        level: string;
        image: string;
        certification?: string;
        maxDepth?: string;
    };
    lang: string;
    ctaLabel: string;
}

export default function CourseCard({ course, lang, ctaLabel }: CourseCardProps) {
    return (
        <Card className="overflow-hidden group border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={75}
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-navy">
                    {course.price}
                </div>
                {course.certification && (
                    <div className="absolute bottom-4 left-4 bg-turquoise/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        <span>{course.certification}</span>
                    </div>
                )}
            </div>
            
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div>
                        <span className="text-xs font-bold text-turquoise uppercase tracking-wider">{course.level}</span>
                        <h3 className="text-xl font-bold text-navy mt-1">{course.title}</h3>
                    </div>
                </div>
            </CardHeader>
            
            <CardContent className="pb-4">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                    </div>
                    {course.maxDepth && (
                        <div className="flex items-center gap-1">
                            <BarChart className="w-4 h-4" />
                            <span>{course.maxDepth}</span>
                        </div>
                    )}
                </div>
            </CardContent>
            
            <CardFooter className="p-0 px-6 pb-6">
                <Link href={`/${lang}/courses`} prefetch={true} className="w-full">
                    <Button variant="outline" className="w-full border-navy text-navy hover:bg-navy hover:text-white transition-colors rounded-full">
                        {ctaLabel}
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}