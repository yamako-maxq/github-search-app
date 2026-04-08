import { verifyBasicAuthCredentials } from "./basicAuth";
const createBasicAuth = (username: string, password: string): string => {
    // 1. ユーザー名とパスワードを「:」で結合
    const credentials = `${username}:${password}`;
    // 2. Base64エンコード
    const encodedCredentials = btoa(credentials);
    return `Basic ${encodedCredentials}`;
}

const testUserName = "hogehoge"
const testPassword = "67.+0xBwG6pyo"
const basicAuthValue = createBasicAuth(testUserName, testPassword)

describe('validateGitHubRepos', () => {

    test("正常に認証が成功する", async () => {
        const result = verifyBasicAuthCredentials("true", basicAuthValue, testUserName, testPassword)
        expect(result).toBe(true)
    });

    test("Basic認証を行わない場合は認証が成功する", async () => {
        const result = verifyBasicAuthCredentials(undefined, null, testUserName, testPassword)
        expect(result).toBe(true)
    });

    test("Basic認証を行う設定だが、パスワードなどの設定がない場合は認証を失敗させる", async () => {
        const result = verifyBasicAuthCredentials("true", null, undefined, undefined)
        expect(result).toBe(false)
    });

    test("Basic認証を行わない設定だが、パスワードなどの設定がある場合は認証を成功させる", async () => {
        const result = verifyBasicAuthCredentials(undefined, basicAuthValue, testUserName, testPassword)
        expect(result).toBe(true)
    });

    test("パスワードが間違っている場合は認証を失敗させる", async () => {
        const result = verifyBasicAuthCredentials("true", basicAuthValue, testUserName, "wrongPassword")
        expect(result).toBe(false)
    });

});