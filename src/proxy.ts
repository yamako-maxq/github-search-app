import { NextRequest, NextResponse } from "next/server";

export const proxy = async (request: NextRequest) => {
    const { nextUrl} = request;
    const { pathname } = nextUrl;

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