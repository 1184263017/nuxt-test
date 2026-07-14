<script setup lang="ts">
const { data: products } = await useFetch('/api/products', {
  key: 'products-index',
})

useSeoMeta({
  title: '产品中心',
  description: '浏览 Northstar 为工作与出行设计的精选产品。',
  ogTitle: 'Northstar 产品中心',
  ogDescription: '浏览为工作与出行设计的精选产品。',
})
</script>

<template>
  <main class="page-main">
    <header class="page-header container">
      <p class="eyebrow">精选产品</p>
      <h1>产品中心</h1>
      <p>为高频的日常使用场景提供清晰、可持续的解决方案。</p>
    </header>

    <section class="container section-content">
      <div v-if="products?.length" class="card-grid card-grid--two">
        <ContentCard
          v-for="product in products"
          :key="product.path"
          :title="product.title"
          :description="product.description"
          :image="product.image"
          :to="product.path"
          :eyebrow="`${product.category} · ${formatCurrency(product.price)}`"
        />
      </div>
      <EmptyState v-else />
    </section>
  </main>
</template>
