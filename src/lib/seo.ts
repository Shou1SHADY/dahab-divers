import { Metadata } from 'next';
import { Locale } from '@/i18n-config';

interface SEOProps {
  title: string;
  description: string;
  lang: Locale;
  path?: string;
  keywords?: string[];
  ogImage?: string;
}

export function generateSEO({
  title,
  description,
  lang,
  path = '',
  keywords = [],
  ogImage = '/og-image.jpg'
}: SEOProps): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const fullUrl = `${siteUrl}/${lang}${path}`;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: fullUrl,
      languages: {
        'en': `${siteUrl}/en${path}`,
        'fr': `${siteUrl}/fr${path}`,
        'de': `${siteUrl}/de${path}`,
        'nl': `${siteUrl}/nl${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: 'Dahab Divers',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: lang,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };
}

export const seoConfig = {
  en: {
    siteName: 'Dahab Divers',
    title: 'Premium Diving Experiences in Dahab, Egypt',
    description: 'Discover the magic of the Red Sea with Dahab Divers. Premium diving experiences, PADI courses, and unforgettable underwater adventures in Dahab.',
    keywords: [
      'diving dahab',
      'red sea diving',
      'padi courses egypt',
      'dahab dive center',
      'scuba diving egypt',
      'blue hole diving',
      'dahab red sea'
    ]
  },
  fr: {
    siteName: 'Dahab Divers',
    title: 'Expériences de Plongée Premium à Dahab, Égypte',
    description: 'Découvrez la magie de la Mer Rouge avec Dahab Divers. Expériences de plongée premium, cours PADI, et aventures sous-marines inoubliables à Dahab.',
    keywords: [
      'plongée dahab',
      'mer rouge plongée',
      'cours padi égypte',
      'centre plongée dahab',
      'plongée sous-marine égypte',
      'blue hole plongée',
      'dahab mer rouge'
    ]
  },
  de: {
    siteName: 'Dahab Divers',
    title: 'Premium Taucherlebnisse in Dahab, Ägypten',
    description: 'Entdecken Sie die Magie des Roten Meeres mit Dahab Divers. Premium-Taucherlebnisse, PADI-Kurse und unvergessliche Unterwasserabenteuer in Dahab.',
    keywords: [
      'tauchen dahab',
      'rotes meer tauchen',
      'padi kurse ägypten',
      'tauchzentrum dahab',
      'schnorcheln ägypten',
      'blue hole tauchen',
      'dahab rotes meer'
    ]
  },
  nl: {
    siteName: 'Dahab Divers',
    title: 'Premium Duikervaringen in Dahab, Egypte',
    description: 'Ontdek de magie van de Rode Zee met Dahab Divers. Premium duikervaringen, PADI-cursussen en onvergetelijke onderwateravonturen in Dahab.',
    keywords: [
      'duiken dahab',
      'rode zee duiken',
      'padi cursussen egypte',
      'duikcentrum dahab',
      'scuba duiken egypte',
      'blue hole duiken',
      'dahab rode zee'
    ]
  }
};
