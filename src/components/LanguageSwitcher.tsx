'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { i18n, type Locale } from '@/i18n-config';
import { useState } from 'react';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const redirectedPathName = (locale: Locale) => {
        if (!pathname) return '/';
        const segments = pathname.split('/');
        segments[1] = locale;
        return segments.join('/');
    };

    // Get current locale from pathname
    const currentLocale = pathname?.split('/')[1] as Locale || i18n.defaultLocale;

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white hover:text-turquoise transition-colors"
            >
                <Globe className="w-4 h-4" />
                <span className="uppercase">{currentLocale}</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                    {i18n.locales.map((locale) => (
                        <Link
                            key={locale}
                            href={redirectedPathName(locale)}
                            prefetch={true}
                            onClick={() => setIsOpen(false)}
                            className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${currentLocale === locale ? 'text-turquoise font-bold' : 'text-navy'}`}
                        >
                            {locale.toUpperCase()}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}