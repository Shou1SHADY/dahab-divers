import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const languages = ['en', 'fr', 'de', 'nl'];
  const pages = ['', '/diving', '/courses', '/about', '/contact'];
  
  const urls: MetadataRoute.Sitemap = [];
  
  // Generate URLs for all language combinations
  languages.forEach(lang => {
    pages.forEach(page => {
      urls.push({
        url: `${baseUrl}/${lang}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page === '' ? 1 : 0.8,
      });
    });
  });

  return urls;
}
