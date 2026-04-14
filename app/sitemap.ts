import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://albirenaabogados.com';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/admin/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.1, // Don't want robots indexing admin heavily, but it's fine. We use robots.txt to restrict it anyway.
    },
    // We could dynamically map blog posts here if we had a blog structure.
  ];
}
