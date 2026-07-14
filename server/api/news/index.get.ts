import { queryCollection } from '@nuxt/content/server'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const requestedLimit = Number(query.limit)
  const limit = Number.isFinite(requestedLimit)
    ? Math.min(Math.max(requestedLimit, 1), 50)
    : 50

  const items = await queryCollection(event, 'news').order('date', 'DESC').all()

  return items.slice(0, limit).map((item) => ({
    path: item.path,
    title: item.title,
    description: item.description,
    image: item.image,
    date: item.date,
    author: item.author,
  }))
})
