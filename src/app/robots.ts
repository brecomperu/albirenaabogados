import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://albirenaabogados.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'], // Protect the command center and APIs from crawlers
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
