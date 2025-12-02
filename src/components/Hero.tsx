'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import WaveSeparator from './ui/WaveSeparator';

interface HeroProps {
    title: string;
    subtitle: string;
    cta: string;
    lang: string;
}

const HERO_IMAGES = [
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2070&auto=format&fit=crop"
];

export default function Hero({ title, subtitle, cta, lang }: HeroProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
            <div className="absolute inset-0 z-0">
                <AnimatePresence>
                    <motion.div
                        key={currentImageIndex}
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2.0, ease: "easeInOut" }}
                    >
                        <Image
                            src={HERO_IMAGES[currentImageIndex]}
                            alt="Diving background"
                            fill
                            sizes="100vw"
                            quality={75}
                            className="object-cover"
                            priority
                        />
                    </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-navy/30 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-navy/20 z-10" />
            </div>

            <div className="relative z-20 container mx-auto px-6 text-center pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-header font-bold text-white mb-6 uppercase tracking-widest drop-shadow-2xl">
                        {title}
                    </h1>
                    <p className="text-lg md:text-2xl text-slate-100 mb-12 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-lg">
                        {subtitle}
                    </p>
                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                        <Link 
                            href={`/${lang}/diving`}
                            className="inline-flex justify-center items-center gap-2 bg-turquoise text-navy px-10 py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-navy transition-all rounded-sm shadow-lg border border-transparent hover:border-white"
                        >
                            {cta}
                        </Link>
                        <Link 
                            href={`/${lang}/courses`}
                            className="inline-flex justify-center items-center gap-2 bg-transparent border-2 border-white text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-navy transition-all rounded-sm shadow-lg"
                        >
                            View Courses
                        </Link>
                    </div>
                </motion.div>
            </div>
            
            <WaveSeparator position="bottom" color="text-white" />
        </section>
    );
}