<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(
  () => `page:${route.path}`,
  () => queryCollection('pages').path(route.path).first(),
  { watch: [() => route.path] },
)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: '页面不存在',
  })
}

useSeoMeta({
  title: () => page.value?.title,
  description: () => page.value?.description,
  ogTitle: () => page.value?.title,
  ogDescription: () => page.value?.description,
  ogImage: () => page.value?.image,
})
</script>

<template>
  <main v-if="page" class="article-page">
    <header class="article-header container container--narrow">
      <h1>{{ page.title }}</h1>
      <p class="article-lead">{{ page.description }}</p>
    </header>
    <div class="article-cover container">
      <NuxtImg
        :src="page.image"
        :alt="page.title"
        width="1200"
        height="675"
        sizes="100vw lg:1200px"
        preload
      />
    </div>
    <article class="prose container container--narrow">
      <ContentRenderer :value="page" />
    </article>
  </main>
</template>
