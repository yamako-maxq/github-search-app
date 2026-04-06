// api.test.ts
import { validateGitHubRepos } from "./gitHubRepos";
import { generateRandomTxt } from "@/utils/tests/random";

describe('validateGitHubRepos', () => {
    it("正常系", async () => {
        expect(validateGitHubRepos("正常クエリ", 1))
            .toBe(true);

        expect(validateGitHubRepos("正常クエリ", 1))
            .toBe(true);

        const txt = generateRandomTxt(999)
        expect(validateGitHubRepos(txt, 1))
            .toBe(true);

        expect(validateGitHubRepos("正常クエリ", 999))
            .toBe(true);
    });

    it("異常系", async () => {
        const txt = generateRandomTxt(1200)
        expect(validateGitHubRepos(txt, 1))
            .toBe(false);
        expect(validateGitHubRepos("正常クエリ", 1000))
            .toBe(false);
    });

});