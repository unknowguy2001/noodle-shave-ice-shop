import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import * as jose from "jose";
import {
  RequestCookie,
  RequestCookies,
} from "next/dist/compiled/@edge-runtime/cookies";

export async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const refreshToken = cookieStore.get("refresh-token");

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.PRIVATE_KEY!);
    const { payload, protectedHeader } = await jose.jwtVerify(
      token.value,
      secret
    );

    if (payload) {
      return NextResponse.next();
    }

    //* If the token expires.
  } catch (error) {
    console.log(refreshToken);
    const urlToFetch = "/api/auth/refresh-token";

    const response = await fetch(process.env.URL + urlToFetch, {
      method: "POST",
      body: JSON.stringify({
        token,
        refreshToken,
      }),
    });

    if (response.ok) {
      return NextResponse.next();
    }

    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export const config = {
  matcher: "/dashboard",
};
