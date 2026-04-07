import { test, expect } from "@playwright/test";

const targetURL = "/repos/yamako-maxq/github-search-app"

test("存在しないURLにアクセスすると404ページへ遷移するか", async ({ page }) => {
  const response = await page.goto(targetURL + "//aaaa");
  // responseがNULLではない
  expect(response).not.toBeNull()

  // ステータスコードが404か
  expect(response?.status()).toBe(404);

  await page.getByRole('link', { name: 'トップ画面へ戻る' }).click()

  await page.waitForTimeout(500)
  expect(page).toHaveURL("/search/repositories")

});
