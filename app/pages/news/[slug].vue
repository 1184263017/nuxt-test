<script setup lang="ts">
const route = useRoute()
const slug = computed(() => String(route.params.slug))

const { data: article } = await useAsyncData(
  () => `news:${slug.value}`,
  () => queryCollection('news').path(`/news/${slug.value}`).first(),
  { watch: [slug] },
)

if (!article.value) {
  throw createError({
    statusCode: 404,
    statusMessage: '新闻不存在',
  })
}

useSeoMeta({
  title: () => article.value?.title,
  description: () => article.value?.description,
  ogType: 'article',
  ogTitle: () => article.value?.title,
  ogDescription: () => article.value?.description,
  ogImage: () => article.value?.image,
  articlePublishedTime: () => article.value?.date,
})

useSchemaOrg([
  defineArticle({
    headline: () => article.value?.title,
    description: () => article.value?.description,
    image: () => article.value?.image,
    datePublished: () => article.value?.date,
    author: () => ({ name: article.value?.author }),
  }),
])
</script>

<template>
  <main v-if="article" class="article-page">
    <header class="article-header container container--narrow">
      <NuxtLink class="back-link" to="/news">
        <i class="pi pi-arrow-left" aria-hidden="true" /> 返回新闻
      </NuxtLink>
      <p class="eyebrow">
        {{ formatDate(article.date) }} · {{ article.author }}
      </p>
      <h1>{{ article.title }}</h1>
      <p class="article-lead">{{ article.description }}</p>
    </header>

    <div class="article-cover container">
      <NuxtImg
        :src="article.image"
        :alt="article.title"
        width="1200"
        height="675"
        sizes="100vw lg:1200px"
        preload
      />
    </div>

    <article class="prose container container--narrow">
      <ContentRenderer :value="article" />
    </article>
  </main>
</template>
