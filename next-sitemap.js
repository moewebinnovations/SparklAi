// next-sitemap.js
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://sparkl-ai.vercel.app',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/admin/*', '/login'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/admin' },
    ],
    additionalSitemaps: [
      'https://sparkl-ai.vercel.app/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    }
  },
  additionalPaths: async (config) => {
    return [
      await config.transform(config, '/additional-page'),
    ]
  },
}
