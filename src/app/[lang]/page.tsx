import { getDictionary } from "../../get-dictionary";
import { Locale } from "../../i18n-config";
import Hero from "@/components/Hero";
import SectionTitle from "@/components/ui/SectionTitle";
import CourseCard from "@/components/CourseCard";
import DiveSiteCard from "@/components/DiveSiteCard";
import Stats from "@/components/Stats";
import TrustIndicators from "@/components/TrustIndicators";
import FeaturedDiveSite from "@/components/FeaturedDiveSite";
import PreFooter from "@/components/PreFooter";
import Showcase from "@/components/Showcase";
import coursesData from "@/data/courses.json";
import sitesData from "@/data/sites.json";
import packagesData from "@/data/packages.json";
import { Star, Shield, Anchor, Award, Image as ImageIcon, Users, MapPin, Compass } from "lucide-react";
import Link from "next/link";

export default async function Home({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    const features = [
        { icon: Award, title: dict.home.whyUs.items[0].title, desc: dict.home.whyUs.items[0].desc },
        { icon: Shield, title: dict.home.whyUs.items[1].title, desc: dict.home.whyUs.items[1].desc },
        { icon: Anchor, title: dict.home.whyUs.items[2].title, desc: dict.home.whyUs.items[2].desc },
    ];

    // Showcase items data
    const showcaseItems = [
        {
            id: 1,
            title: dict.home.showcase.items[0].title,
            description: dict.home.showcase.items[0].description,
            icon: "Image",
            image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
            stats: dict.home.showcase.items[0].stats
        },
        {
            id: 2,
            title: dict.home.showcase.items[1].title,
            description: dict.home.showcase.items[1].description,
            icon: "Users",
            image: "/images/Night-Diver-Specialty-Course.webp",
            stats: dict.home.showcase.items[1].stats
        },
        {
            id: 3,
            title: dict.home.showcase.items[2].title,
            description: dict.home.showcase.items[2].description,
            icon: "MapPin",
            image: "/images/werck-diver-course-in-dahab-4.png",
            stats: dict.home.showcase.items[2].stats
        },
        {
            id: 4,
            title: dict.home.showcase.items[3].title,
            description: dict.home.showcase.items[3].description,
            icon: "Compass",
            image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
            stats: dict.home.showcase.items[3].stats
        }
    ];

    // Get the best value package for featured display (highest rated with reasonable price)
    const bestValuePackage = packagesData.reduce((best, pkg) => {
        const pkgScore = (pkg.rating || 0) * 10 - parseInt(pkg.price.replace(/[^0-9]/g, '') || '0') / 10;
        const bestScore = (best.rating || 0) * 10 - parseInt(best.price.replace(/[^0-9]/g, '') || '0') / 10;
        return pkgScore > bestScore ? pkg : best;
    }, packagesData[0]);

    return (
        <main className="min-h-screen">
            <Hero
                title={dict.home.hero.title}
                subtitle={dict.home.hero.subtitle}
                cta={dict.home.hero.cta}
                lang={lang}
            />

            {/* Stats Section */}
            <Stats dict={dict} />

            {/* Trust Indicators */}
            <TrustIndicators dict={dict} />

            {/* Why Choose Us */}
            <section className="py-24 bg-white relative">
                <div className="container mx-auto px-6">
                    <SectionTitle title={dict.home.whyUs.title} subtitle={dict.home.whyUs.subtitle} />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
                        {features.map((feature, idx) => (
                            <div 
                                key={idx}
                                className="text-center p-10 rounded-sm bg-slate-50 hover:bg-white hover:shadow-2xl transition-all duration-300 border border-slate-100 group"
                            >
                                <div className="w-20 h-20 bg-navy rounded-full flex items-center justify-center mx-auto mb-8 text-turquoise group-hover:scale-110 transition-transform shadow-lg">
                                    <feature.icon size={36} />
                                </div>
                                <h3 className="text-2xl font-header font-bold text-navy mb-4 uppercase tracking-wide">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed font-light text-lg">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Dive Site Parallax */}
            <FeaturedDiveSite
                lang={lang}
                title="Blue Hole"
                description="The world-famous Blue Hole is a cylindrical sinkhole that plunges over 130 meters deep, offering an unparalleled diving experience. Known for its crystal-clear waters and spectacular stalactites, it's a bucket-list destination for divers worldwide."
                cta={dict.home.featuredSite.cta}
                legendaryText={dict.home.featuredSite.legendary}
            />

            {/* Featured Dive Package */}
            <section className="py-16 bg-gradient-to-r from-navy to-navy-light text-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">{dict.home.specialOffer.title}</h2>
                        <p className="text-gray-300 max-w-2xl mx-auto">
                            {dict.home.specialOffer.subtitle}
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8">
                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                <div className="md:w-2/3">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="bg-turquoise text-navy text-xs font-bold px-3 py-1 rounded-full">
                                            {dict.home.specialOffer.bestValue}
                                        </span>
                                        <span className="text-gray-300 text-sm">{bestValuePackage.level}</span>
                                    </div>
                                    
                                    <h3 className="text-2xl md:text-3xl font-bold mb-3">{bestValuePackage.title}</h3>
                                    
                                    <div className="flex flex-wrap items-center gap-4 mb-6">
                                        <div className="text-3xl font-bold text-turquoise">{bestValuePackage.price}</div>
                                        <div className="text-gray-300">• {bestValuePackage.dives} Dives</div>
                                        <div className="text-gray-300">• {bestValuePackage.duration}</div>
                                    </div>
                                    
                                    <ul className="space-y-2 mb-6">
                                        {bestValuePackage.features.slice(0, 3).map((feature, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <span className="text-turquoise mt-1">✓</span>
                                                <span className="text-gray-300">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                <div className="md:w-1/3 w-full">
                                    <Link 
                                        href={`/${lang}/diving`}
                                        className="w-full bg-turquoise hover:bg-turquoise/90 text-navy font-bold py-4 px-6 rounded-full transition-colors duration-300 transform hover:scale-105 text-center block"
                                    >
                                        {dict.home.specialOffer.bookNow}
                                    </Link>
                                    <p className="text-center text-gray-400 text-sm mt-3">
                                        {dict.home.specialOffer.limitedOffer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Courses */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-end mb-12">
                        <SectionTitle
                            title={dict.home.popularCourses.title}
                            subtitle={dict.home.popularCourses.subtitle}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {coursesData.map((course) => (
                            <CourseCard
                                key={course.id}
                                course={course}
                                lang={lang}
                                ctaLabel={dict.home.popularCourses.cta}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Dive Sites */}
            <section className="py-24 bg-navy text-white overflow-hidden">
                <div className="container mx-auto px-6">
                    <SectionTitle
                        title={dict.home.diveSites.title}
                        subtitle={dict.home.diveSites.subtitle}
                        className="text-white [&>h2]:text-white [&>span]:text-turquoise"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        {sitesData.map((site) => (
                            <DiveSiteCard
                                key={site.id}
                                site={site}
                                lang={lang}
                                ctaLabel={dict.home.diveSites.cta}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Showcase Section */}
            <Showcase
                title={dict.home.showcase.title}
                subtitle={dict.home.showcase.subtitle}
                items={showcaseItems}
            />

            {/* Testimonials */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <SectionTitle
                        title={dict.home.testimonials.title}
                        subtitle={dict.home.testimonials.subtitle}
                        center
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <p className="text-gray-600 mb-4">
                                "{dict.home.testimonials.items[0].text}"
                            </p>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-navy rounded-full flex items-center justify-center text-white font-bold mr-3">
                                    M
                                </div>
                                <div>
                                    <h4 className="font-bold text-navy">{dict.home.testimonials.items[0].name}</h4>
                                    <p className="text-sm text-gray-500">{dict.home.testimonials.items[0].course}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg">
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <p className="text-gray-600 mb-4">
                                "{dict.home.testimonials.items[1].text}"
                            </p>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-navy rounded-full flex items-center justify-center text-white font-bold mr-3">
                                    S
                                </div>
                                <div>
                                    <h4 className="font-bold text-navy">{dict.home.testimonials.items[1].name}</h4>
                                    <p className="text-sm text-gray-500">{dict.home.testimonials.items[1].course}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg">
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <p className="text-gray-600 mb-4">
                                "{dict.home.testimonials.items[2].text}"
                            </p>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-navy rounded-full flex items-center justify-center text-white font-bold mr-3">
                                    T
                                </div>
                                <div>
                                    <h4 className="font-bold text-navy">{dict.home.testimonials.items[2].name}</h4>
                                    <p className="text-sm text-gray-500">{dict.home.testimonials.items[2].course}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pre-Footer CTA */}
            <PreFooter
                title={dict.home.prefooter.title}
                description={dict.home.prefooter.desc}
                cta={dict.home.prefooter.cta}
                lang={lang}
            />
        </main>
    );
}