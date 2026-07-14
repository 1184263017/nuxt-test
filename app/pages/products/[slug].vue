<script setup lang="ts">
const route = useRoute()
const slug = computed(() => String(route.params.slug))

const { data: product } = await useAsyncData(
  () => `product:${slug.value}`,
  () => queryCollection('products').path(`/products/${slug.value}`).first(),
  { watch: [slug] },
)

if (!product.value) {
  throw createError({
    statusCode: 404,
    statusMessage: '产品不存在',
  })
}

useSeoMeta({
  title: () => product.value?.title,
  description: () => product.value?.description,
  ogType: 'website',
  ogTitle: () => product.value?.title,
  ogDescription: () => product.value?.description,
  ogImage: () => product.value?.image,
})

useSchemaOrg([
  defineProduct({
    name: () => product.value?.title,
    description: () => product.value?.description,
    image: () => product.value?.image,
    sku: () => product.value?.sku,
    offers: () => ({
      price: product.value?.price,
      priceCurrency: 'CNY',
      availability: 'https://schema.org/InStock',
    }),
  }),
])
</script>

<template>
  <main v-if="product" class="product-page container">
    <NuxtLink class="back-link" to="/products">
      <i class="pi pi-arrow-left" aria-hidden="true" /> 返回产品
    </NuxtLink>

    <div class="product-overview">
      <div class="product-image">
        <NuxtImg
          :src="product.image"
          :alt="product.title"
          width="900"
          height="900"
          sizes="100vw md:50vw"
          preload
        />
      </div>

      <div class="product-info">
        <p class="eyebrow">{{ product.category }} · {{ product.sku }}</p>
        <h1>{{ product.title }}</h1>
        <p class="article-lead">{{ product.description }}</p>
        <p class="product-price">{{ formatCurrency(product.price) }}</p>
      </div>
    </div>

    <article class="prose container--narrow">
      <ContentRenderer :value="product" />
    </article>
  </main>
</template>
