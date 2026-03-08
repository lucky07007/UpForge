import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://upforge.in',
      lastModified: new Date(),
    },
  ]
}
