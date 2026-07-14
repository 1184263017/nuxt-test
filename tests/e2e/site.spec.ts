import { expect, test } from '@playwright/test'

test('homepage exposes the primary content paths', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Northstar 内容与产品中心',
    }),
  ).toBeVisible()
  await expect(page.getByRole('link', { name: '全部新闻' })).toBeVisible()
  await expect(page.getByRole('link', { name: '全部产品' })).toBeVisible()
})

test('news content renders through the dynamic route', async ({ page }) => {
  await page.goto('/news/platform-release')

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: '新版内容平台正式上线',
      exact: true,
    }),
  ).toBeVisible()
  await expect(page.getByText('本次更新')).toBeVisible()
})

test('product detail renders through the ISR route', async ({ page }) => {
  await page.goto('/products/workspace-kit')

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Focus 桌面套装',
      exact: true,
    }),
  ).toBeVisible()
  await expect(page.getByText('¥1,299', { exact: true })).toBeVisible()
})
