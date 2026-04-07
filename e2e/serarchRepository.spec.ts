import { test, expect } from "@playwright/test";

const pageTitle = "Github Search App"
const targetRepositoryName = "/repos/yamako-maxq/search"
const searchText = "search"

test("検索ワードを入力したら、検索が表示できるか", async ({ page }) => {
  const response = await page.goto("/");

  // リダイレクトが行われたか
  expect(page).toHaveURL("/search/repositories")

  // responseがNULLではない
  expect(response).not.toBeNull()

  // ステータスコードが200か
  expect(response?.status()).toBe(200);

  // タイトルがGithub Search Appである
  await expect(page).toHaveTitle(pageTitle);

  // リポジトリを検索
  await page.getByRole("textbox", { name: "search-input" }).focus()
  await page.keyboard.type(searchText);
  await page.getByRole("button", { name: "検索" }).click()

  // const link = await page.getByRole('link', { name: 'github-search-app' })
  const repoName = await page.getByRole('link', { name: 'search' }).nth(1).innerText()
  expect(repoName).toBe("search")
});

test("クエリパラメータを付与してアクセスしても正常に操作できるか", async ({ page }) => {
  const response = await page.goto("/search/repositories?q=/yamako-maxq/github-search-app&page=1");

  // responseがNULLではない
  expect(response).not.toBeNull()

  // ステータスコードが200か
  expect(response?.status()).toBe(200);

  // タイトルがGithub Search Appである
  await expect(page).toHaveTitle(pageTitle);

  const repoName = await page.getByRole('link', { name: searchText }).nth(1).innerText()
  expect(repoName).toBe(searchText)
});

test("ページネーションが正しく動作するか", async ({ page }) => {
  await page.goto("/");

  // リポジトリを検索
  await page.getByRole("textbox", { name: "search-input" }).focus()
  await page.keyboard.type("search");

  // 検索ボタンクリック
  await page.getByRole("button", { name: "検索" }).click()

  // 結果が表示されるまで待つ
  await page.waitForTimeout(2000)

  // 最後のページへスクロール
  await page.keyboard.press('End')
  await page.waitForTimeout(1000)

  // 2ページ目へ移動
  await page.getByRole('button', { name: '2' }).click()

  // 移動したらURLが変化しているか
  expect(page).toHaveURL("/search/repositories?q=search&page=2")
});

test("検索結果をクリックしたらすると詳細にとべるか", async ({ page }) => {
  await page.goto("/");

  // タイトルがGithub Search Appである
  await expect(page).toHaveTitle(pageTitle);

  // リポジトリを検索
  await page.getByRole("textbox", { name: "search-input" }).focus()
  await page.keyboard.type(searchText);
  await page.getByRole("button", { name: "検索" }).click()

  // 詳細へ遷移
  const link = await page.getByRole('link', { name: searchText }).nth(1)
  await link.click()

  // 詳細画面に移動できたか
  const repoName = await page.getByTestId('repository-name').innerText()
  await expect(repoName).toBe("github-search-app")
});