import { generateRandomTxt } from "./random";

describe('generateRandomTxt', () => {
    it("正しい長さの文字列が生成されているか", () => {
        expect(generateRandomTxt(1200))
            .toHaveLength(1200)

        expect(generateRandomTxt(1))
            .toHaveLength(1)
    });

});