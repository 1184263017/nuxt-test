<script setup lang="ts">
const { data: articles } = await useFetch('/api/news', {
  key: 'news-index',
})

useSeoMeta({
  title: '新闻动态',
  description: '阅读 Northstar 的最新发布、设计与产品动态。',
  ogTitle: 'Northstar 新闻动态',
  ogDescription: '阅读最新发布、设计与产品动态。',
})
</script>

<template>
  <main class="page-main">
    <header class="page-header container">
      <p class="eyebrow">新闻与观点</p>
      <h1>最新动态</h1>
      <p>了解产品、内容和设计系统的最新进展。</p>
    </header>

    <section class="container section-content">
      <div v-if="articles?.length" class="card-grid">
        <ContentCard
          v-for="article in articles"
          :key="article.path"
          :title="article.title"
          :description="article.description"
          :image="article.image"
          :to="article.path"
          :eyebrow="formatDate(article.date)"
        />
      </div>
      <EmptyState v-else />
    </section>
  </main>
</template>
