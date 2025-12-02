'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import WaveSeparator from './ui/WaveSeparator';
import Image from 'next/image';

interface PreFooterProps {
  title: string;
  description: string;
  cta: string;
  lang: string;
}

export default function PreFooter({ title, description, cta, lang }: PreFooterProps) {
  return (
    <section className="relative py-20 md:py-32 flex items-center justify-center overflow-hidden bg-navy">
      {/* Background Image with Fixed/Parallax feel */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1511316695145-4992006ffddb?q=80&w=2071&auto=format&fit=crop" 
          alt="Underwater" 
          fill
          sizes="100vw"
          quality={75}
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/80" />
      </div>

      {/* Top Wave: Transitions from the generic page background (usually slate-50 or white) into this dark section */}
      <WaveSeparator position="top" color="text-slate-50" flip />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-header font-bold text-white mb-6 uppercase tracking-widest">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            {description}
          </p>
          <Link 
            href={`/${lang}/contact`}
            className="inline-block bg-turquoise text-navy hover:bg-white hover:text-navy px-12 py-5 font-bold uppercase tracking-widest transition-all rounded-sm shadow-2xl hover:shadow-white/20 transform hover:-translate-y-1"
          >
            {cta}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}