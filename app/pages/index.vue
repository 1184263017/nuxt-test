<script setup lang="ts">
const { data: news } = await useFetch('/api/news', {
  key: 'home-news',
  query: { limit: 2 },
})

const { data: products } = await useFetch('/api/products', {
  key: 'home-products',
  query: { limit: 2 },
})

useSeoMeta({
  title: 'Northstar 内容与产品中心',
  description: '获取 Northstar 的最新动态、编辑内容与产品信息。',
  ogTitle: 'Northstar 内容与产品中心',
  ogDescription: '获取最新动态与产品信息。',
  ogImage: '/images/newsroom.jpg',
  twitterCard: 'summary_large_image',
})

useSchemaOrg([
  defineWebPage({
    name: 'Northstar 内容与产品中心',
    description: '获取 Northstar 的最新动态、编辑内容与产品信息。',
  }),
])
</script>

<template>
  <main>
    <section class="hero-band">
      <NuxtImg
        class="hero-band__image"
        src="/images/newsroom.jpg"
        alt="编辑团队正在策划内容"
        width="1600"
        height="900"
        sizes="100vw"
        preload
      />
      <div class="hero-band__overlay" />
      <div class="container hero-band__content">
        <p class="eyebrow">编辑精选 · 持续更新</p>
        <h1>Northstar 内容与产品中心</h1>
        <p>从最新动态到产品细节，在一个清晰、高效的站点中了解所有信息。</p>
        <Button
          as="router-link"
          to="/news"
          label="阅读最新动态"
          icon="pi pi-arrow-right"
          icon-pos="right"
        />
      </div>
    </section>

    <section class="section-band">
      <div class="container">
        <div class="section-heading">
          <div>
            <p class="eyebrow">最新动态</p>
            <h2>正在发生</h2>
          </div>
          <NuxtLink class="text-link" to="/news">
            全部新闻 <i class="pi pi-arrow-right" aria-hidden="true" />
          </NuxtLink>
        </div>

        <div v-if="news?.length" class="card-grid card-grid--two">
          <ContentCard
            v-for="item in news"
            :key="item.path"
            :title="item.title"
            :description="item.description"
            :image="item.image"
            :to="item.path"
            :eyebrow="formatDate(item.date)"
          />
        </div>
        <EmptyState v-else />
      </div>
    </section>

    <section class="section-band section-band--muted">
      <div class="container">
        <div class="section-heading">
          <div>
            <p class="eyebrow">精选产品</p>
            <h2>为日常使用而设计</h2>
          </div>
          <NuxtLink class="text-link" to="/products">
            全部产品 <i class="pi pi-arrow-right" aria-hidden="true" />
          </NuxtLink>
        </div>

        <div v-if="products?.length" class="card-grid card-grid--two">
          <ContentCard
            v-for="item in products"
            :key="item.path"
            :title="item.title"
            :description="item.description"
            :image="item.image"
            :to="item.path"
            :eyebrow="formatCurrency(item.price)"
          />
        </div>
        <EmptyState v-else />
      </div>
    </section>
  </main>
</template>
