'use client';

import Link from 'next/link';
import WaveSeparator from './ui/WaveSeparator';

interface FeaturedDiveSiteProps {
    lang: string;
    title: string;
    description: string;
    cta: string;
    legendaryText: string;
}

export default function FeaturedDiveSite({ lang, title, description, cta, legendaryText }: FeaturedDiveSiteProps) {
    return (
        <section 
            className="relative py-48 flex items-center bg-fixed bg-center bg-cover"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1682687981922-7b55dbb30892?q=80&w=2071&auto=format&fit=crop")' }}
        >
            <WaveSeparator position="top" color="text-white" flip />
            
            <div className="absolute inset-0 bg-navy/60" />
            
            <div className="container mx-auto px-6 relative z-30 text-white text-center">
                <div>
                    <span className="text-turquoise font-bold uppercase tracking-[0.3em] mb-4 block">{legendaryText}</span>
                    <h2 className="text-4xl md:text-6xl lg:text-8xl font-header font-bold mb-8 uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
                        {title}
                    </h2>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 text-slate-100 font-light leading-relaxed">
                        {description}
                    </p>
                    <Link 
                        href={`/${lang}/diving`}
                        className="inline-block bg-transparent border-2 border-turquoise text-turquoise hover:bg-turquoise hover:text-white px-10 py-4 font-bold uppercase tracking-widest transition-all"
                    >
                        {cta}
                    </Link>
                </div>
            </div>
            
            <WaveSeparator position="bottom" color="text-navy" />
        </section>
    );
}