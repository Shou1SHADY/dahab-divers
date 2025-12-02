import { getDictionary } from "../../../get-dictionary";
import { Locale } from "../../../i18n-config";
import PageHeader from "@/components/PageHeader";
import CourseCard from "@/components/CourseCard";
import coursesData from "@/data/courses.json";
import { Award, Users, Shield } from "lucide-react";

export default async function CoursesPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <main className="min-h-screen bg-gray-50">
            <PageHeader
                title={dict.nav.courses}
                breadcrumbs={[{ label: dict.nav.courses }]}
            />

            {/* Course Information */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">{dict.courses.info.title}</h2>
                        <p className="text-gray-600 mb-6">
                            {dict.courses.info.subtitle}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <div className="flex items-center gap-2 bg-navy/5 px-4 py-2 rounded-full">
                                <Award className="w-5 h-5 text-turquoise" />
                                <span className="text-navy font-medium">{dict.courses.info.badges.recognized}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-navy/5 px-4 py-2 rounded-full">
                                <Users className="w-5 h-5 text-turquoise" />
                                <span className="text-navy font-medium">{dict.courses.info.badges.smallGroups}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-navy/5 px-4 py-2 rounded-full">
                                <Shield className="w-5 h-5 text-turquoise" />
                                <span className="text-navy font-medium">{dict.courses.info.badges.safety}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Courses Grid */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {coursesData.map((course) => (
                            <CourseCard
                                key={course.id}
                                course={course}
                                lang={lang}
                                ctaLabel={dict.courses.cta}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Course Progression */}
            <section className="py-16 bg-navy text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">{dict.courses.progression.title}</h2>
                        <p className="text-gray-300 max-w-2xl mx-auto">
                            {dict.courses.progression.subtitle}
                        </p>
                    </div>

                    <div className="relative">
                        {/* Progression line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-turquoise/30 hidden md:block"></div>
                        
                        <div className="space-y-12">
                            {coursesData.filter(c => c.level !== "Specialized" && c.level !== "Technical").map((course, index) => (
                                <div key={course.id} className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                    {/* Connector dot */}
                                    <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-turquoise border-4 border-navy z-10 hidden md:block"></div>
                                    
                                    {/* Content */}
                                    <div className={`md:w-5/12 mb-6 md:mb-0 ${index % 2 === 0 ? 'md:pr-12 text-right' : 'md:pl-12 text-left'}`}>
                                        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                                            <span className="text-turquoise text-sm font-bold uppercase tracking-wider">{course.level}</span>
                                            <h3 className="text-xl font-bold mt-2 mb-3">{course.title}</h3>
                                            <p className="text-gray-300 mb-4">
                                                {course.id === 'open-water' && dict.courses.progression.descriptions.openWater}
                                                {course.id === 'advanced' && dict.courses.progression.descriptions.advanced}
                                                {course.id === 'rescue' && dict.courses.progression.descriptions.rescue}
                                                {course.id === 'divemaster' && dict.courses.progression.descriptions.divemaster}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="bg-turquoise/20 text-turquoise text-xs px-2 py-1 rounded">
                                                    {course.duration}
                                                </span>
                                                <span className="bg-turquoise/20 text-turquoise text-xs px-2 py-1 rounded">
                                                    {course.price}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Spacer for line */}
                                    <div className="md:w-2/12 hidden md:block"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}