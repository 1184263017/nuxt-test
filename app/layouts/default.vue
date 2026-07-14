<script setup lang="ts">
const route = useRoute()
const navigationOpen = useState('navigation-open', () => false)

const navigation = [
  { label: '首页', to: '/' },
  { label: '新闻', to: '/news' },
  { label: '产品', to: '/products' },
  { label: '关于', to: '/about' },
]

watch(
  () => route.fullPath,
  () => {
    navigationOpen.value = false
  },
)
</script>

<template>
  <div class="site-shell">
    <header class="site-header">
      <div class="container header-inner">
        <NuxtLink class="brand" to="/" aria-label="Northstar 首页">
          <span class="brand-mark" aria-hidden="true">N</span>
          <span>Northstar</span>
        </NuxtLink>

        <Button
          class="nav-toggle"
          :icon="navigationOpen ? 'pi pi-times' : 'pi pi-bars'"
          severity="secondary"
          text
          rounded
          :aria-label="navigationOpen ? '关闭导航' : '打开导航'"
          :aria-expanded="navigationOpen"
          aria-controls="site-navigation"
          @click="navigationOpen = !navigationOpen"
        />

        <nav
          id="site-navigation"
          class="site-navigation"
          :class="{ 'is-open': navigationOpen }"
          aria-label="主导航"
        >
          <NuxtLink
            v-for="item in navigation"
            :key="item.to"
            :to="item.to"
            :aria-current="route.path === item.to ? 'page' : undefined"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
      </div>
    </header>

    <div class="site-content">
      <slot />
    </div>

    <footer class="site-footer">
      <div class="container footer-inner">
        <p>© {{ new Date().getFullYear() }} Northstar</p>
        <NuxtLink to="/sitemap.xml">站点地图</NuxtLink>
      </div>
    </footer>
  </div>
</template>
