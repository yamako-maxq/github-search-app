import { validateGitHubRepositoryDetail } from "./gitHubRepositoryDetail";
import { generateRandomTxt } from "@/utils/tests/random";

describe('validateGitHubRepositoryDetail', () => {
    test("正常系", () => {
        expect(validateGitHubRepositoryDetail("owner", "repo"))
            .toBe(true);
    });

    test("異常系", () => {
        const txt = generateRandomTxt(1200)
        expect(validateGitHubRepositoryDetail(txt, "repo"))
            .toBe(false);

        expect(validateGitHubRepositoryDetail("owner", txt))
            .toBe(false);

        expect(validateGitHubRepositoryDetail("@errorOwner@", "@errorRepo@"))
            .toBe(false);

        expect(validateGitHubRepositoryDetail("owner", "@errorRepo@"))
            .toBe(false);

        expect(validateGitHubRepositoryDetail("@errorOwner@", "repo"))
            .toBe(false);
    });

});