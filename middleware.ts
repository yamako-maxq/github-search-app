import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
    const { nextUrl } = request;
    const { pathname } = nextUrl;

    // ルートパスにアクセスした場合、/searchにリダイレクトする
    if (pathname === '/') {
        return NextResponse.redirect(new URL("/search", nextUrl))
    }
    return NextResponse.next();
}
