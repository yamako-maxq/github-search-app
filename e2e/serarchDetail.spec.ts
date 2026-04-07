import { test, expect } from "@playwright/test";

const pageTitle = "Github Search App"
const targetURL = "/repos/yamako-maxq/github-search-app"

test("検索ワードを入力したら、検索が表示できるか", async ({ page }) => {
  const response = await page.goto(targetURL);
  // responseがNULLではない
  expect(response).not.toBeNull()

  // ステータスコードが404か
  expect(response?.status()).toBe(200);

  // タイトルがGithub Search Appである
  await expect(page).toHaveTitle(pageTitle);

  await expect(page.getByTestId("repository-name"))
    .toHaveText("github-search-app")

  await expect(page.getByText("Star数"))
    .toBeVisible()

  await expect(page.getByText("Watcher数"))
    .toBeVisible()

  await expect(page.getByText("Fork数"))
    .toBeVisible()

  await expect(page.getByText("Issues数"))
    .toBeVisible()
});

test("存在しないURLにアクセスすると404ページへ遷移するか", async ({ page }) => {
  const response = await page.goto(targetURL + "//aaaa");
  // responseがNULLではない
  expect(response).not.toBeNull()

  // ステータスコードが404か
  expect(response?.status()).toBe(404);
});
