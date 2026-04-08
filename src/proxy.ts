import { NextRequest, NextResponse } from "next/server";
import { verifyBasicAuthCredentials } from "./utils/auth/basicAuth";

export const proxy = async (request: NextRequest) => {
    const { nextUrl, headers } = request;
    const { pathname } = nextUrl;

    // Basic認証
    if (!verifyBasicAuthCredentials(
        process.env.BASIC_AUTH,
        headers.get("authorization"),
        process.env.BASIC_AUTH_USERNAME,
        process.env.BASIC_AUTH_PASSWORD
    )) {
        return NextResponse.json(
            { error: "Basic Auth Required" },
            {
                headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' },
                status: 401,
            }
        );
    }
    // ルートパスにアクセスした場合、/searchにリダイレクトする
    if (pathname === "/" || pathname === "") {
        return NextResponse.redirect(new URL("/search/repositories", nextUrl))
    }
    return NextResponse.next();
}

// Proxyを実行するパスを指定
export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};