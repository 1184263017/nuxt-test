import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const baseFields = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string(),
})

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: 'page',
      source: {
        include: 'pages/**/*.md',
        prefix: '/',
      },
      schema: baseFields,
    }),
    news: defineCollection({
      type: 'page',
      source: {
        include: 'news/**/*.md',
        prefix: '/news',
      },
      schema: baseFields.extend({
        date: z.string(),
        author: z.string(),
      }),
    }),
    products: defineCollection({
      type: 'page',
      source: {
        include: 'products/**/*.md',
        prefix: '/products',
      },
      schema: baseFields.extend({
        sku: z.string(),
        price: z.number(),
        category: z.string(),
      }),
    }),
  },
})
