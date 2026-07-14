<script setup lang="ts">
defineProps<{
  title: string
  description: string
  image: string
  to: string
  eyebrow?: string
}>()
</script>

<template>
  <article class="content-card">
    <NuxtLink class="content-card__image" :to="to" tabindex="-1">
      <NuxtImg
        :src="image"
        :alt="title"
        width="720"
        height="432"
        sizes="100vw sm:50vw lg:33vw"
        loading="lazy"
      />
    </NuxtLink>
    <div class="content-card__body">
      <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
      <h3>
        <NuxtLink :to="to">{{ title }}</NuxtLink>
      </h3>
      <p>{{ description }}</p>
      <NuxtLink class="text-link" :to="to">
        查看详情 <i class="pi pi-arrow-right" aria-hidden="true" />
      </NuxtLink>
    </div>
  </article>
</template>
