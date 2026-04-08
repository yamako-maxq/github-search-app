

export function verifyBasicAuthCredentials(
    basicAuth: string | undefined,
    authHeader: string | null,
    basicUserName: string | undefined,
    basicPassword: string | undefined
): boolean {
    if (!needsBasicAuth(basicAuth)) {
        return true
    }

    if (authHeader === null) {
        return false
    }

    const authValue = authHeader.split(" ")[1];
    const [username, password] = Buffer.from(authValue, "base64")
        .toString()
        .split(":");
    if (
        username === basicUserName &&
        password === basicPassword
    ) {
        return true
    }
    return false
}

export function needsBasicAuth(
    basicAuth: string | undefined
): boolean {
    return basicAuth === "true"
}