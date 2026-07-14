import { queryCollection } from '@nuxt/content/server'

export default defineEventHandler(async (event) => {
  const [pages, news, products] = await Promise.all([
    queryCollection(event, 'pages').all(),
    queryCollection(event, 'news').all(),
    queryCollection(event, 'products').all(),
  ])

  return [
    { loc: '/', changefreq: 'weekly', priority: 1 },
    { loc: '/news', changefreq: 'daily', priority: 0.8 },
    { loc: '/products', changefreq: 'daily', priority: 0.8 },
    ...pages.map((page) => ({ loc: page.path })),
    ...news.map((article) => ({
      loc: article.path,
      lastmod: article.date,
    })),
    ...products.map((product) => ({ loc: product.path })),
  ]
})
