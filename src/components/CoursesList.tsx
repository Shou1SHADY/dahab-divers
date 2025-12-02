'use client';

import { useState, useMemo } from 'react';
import CourseCard from './CourseCard';
import Button from './ui/Button';

interface CoursesListProps {
    courses: any[];
    lang: string;
}

export default function CoursesList({ courses, lang }: CoursesListProps) {
    const [filter, setFilter] = useState('All');
    const categories = ['All', 'Beginner', 'Advanced', 'Pro'];

    // Memoize the filtered courses to avoid recalculating on every render
    const filteredCourses = useMemo(() => {
        return filter === 'All'
            ? courses
            : courses.filter(course => course.level === filter);
    }, [courses, filter]);

    return (
        <div>
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {categories.map((category) => (
                    <Button
                        key={category}
                        variant={filter === category ? 'secondary' : 'outline'}
                        onClick={() => setFilter(category)}
                        className="rounded-full px-6"
                    >
                        {category}
                    </Button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filteredCourses.map((course) => (
                    <CourseCard
                        key={course.id}
                        course={course}
                        lang={lang}
                        ctaLabel="View Details"
                    />
                ))}
            </div>
        </div>
    );
}