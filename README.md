# Northstar Nuxt 基础框架

一个面向内容与产品站点的 Nuxt 4 生产基线，内置混合渲染、SEO、图片处理、状态管理、测试、代码质量与可观测性配置。

## 技术基线

- Nuxt 4 + Vue 3 + TypeScript（strict）
- PrimeVue 4 + `@primevue/nuxt-module`
- SCSS + CSS Variables，移动端优先
- `useState` 管理轻量 UI 状态，Pinia 管理跨页面业务状态
- `useFetch` / `$fetch` API 请求边界
- Nuxt Content 作为无后台时的内容源
- Nuxt Image、Sitemap、Robots、Schema.org
- Sentry + Nuxt Scripts（Google Analytics）
- Vitest + Playwright
- ESLint + Prettier + Stylelint

## 运行环境

项目精确锁定 Node.js `22.23.1` 和 pnpm `10.13.1`。

```bash
nvm use
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

开发服务默认运行在 [http://localhost:3000](http://localhost:3000)。

## 常用命令

```bash
pnpm typecheck       # Nuxt / TypeScript 类型检查
pnpm lint            # ESLint + Stylelint + Prettier
pnpm test            # Vitest 单元测试
pnpm test:e2e        # Playwright 桌面与移动端测试
pnpm build           # Node/Nitro 生产构建
pnpm generate        # 纯静态生成
pnpm preview         # 预览生产构建
```

## 渲染策略

| 路由                 | 策略           | 说明               |
| -------------------- | -------------- | ------------------ |
| `/`、`/about`        | SSG            | 构建时预渲染       |
| `/news`、`/products` | SSG            | 稳定列表页预渲染   |
| `/news/**`           | ISR/SWR 300 秒 | 兼顾时效性与缓存   |
| `/products/**`       | ISR/SWR 900 秒 | 产品详情按需再生成 |

`pnpm build` 产生 Node Server，保留新闻/产品的 ISR 能力。`pnpm generate` 适合纯 CDN 静态托管，如果使用该方式，需将所有动态详情路由加入预渲染清单。

## 数据与内容

页面通过 `/api` 边界读取列表，默认数据源是 `content/` 下的 Nuxt Content 集合。接入现有后台或 Directus 时，优先替换 `server/api/` 的实现，保持页面层契约不变。

请求基址由 `NUXT_PUBLIC_API_BASE` 控制。对于外部后台，设置为完整 HTTPS 地址；保持 `/api` 则使用同源 Nitro API。

## 环境变量

从 `.env.example` 开始配置。生产环境至少需要设置 `NUXT_PUBLIC_SITE_URL`。Sentry 需要 DSN；上传 source map 时还需要 `SENTRY_AUTH_TOKEN`、`SENTRY_ORG` 和 `SENTRY_PROJECT`。Google Analytics 只在 `NUXT_PUBLIC_GOOGLE_ANALYTICS_ID` 存在时加载。

## 部署

默认 Nitro preset 为 `node-server`，可直接运行 `.output/server/index.mjs`，也可使用仓库中的 `Dockerfile`。部署到 Vercel、Netlify 或其他 Nitro 平台时，通过 `NITRO_PRESET` 选择对应预设。建议将 `/_nuxt/` 和 `/images/` 放到 CDN，并保留项目中的长缓存头。

## 图片来源

示例图片来自 [Unsplash](https://unsplash.com/)，已下载到 `public/images/` 作为本地开发占位素材。上线前请替换为项目自有素材并核对授权。
