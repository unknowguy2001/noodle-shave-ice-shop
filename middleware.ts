import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import * as jose from "jose";

export async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const refreshToken = cookieStore.get("refresh-token");

  if (!token) {
    //* If the token expires.
    if (refreshToken) {
      const secret = new TextEncoder().encode(process.env.PRIVATE_KEY!);

      const { payload, protectedHeader } = await jose.jwtVerify(
        refreshToken.value,
        secret
      );

      if (payload && protectedHeader) {
        const alg = process.env.ALG!;

        const token = await new jose.SignJWT({ id: payload.id })
          .setProtectedHeader({ alg })
          .setExpirationTime("1h")
          .sign(secret);

        cookies().delete("token");
        cookies().set("token", token);

        return NextResponse.next();
      }
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.PRIVATE_KEY!);
    var { payload, protectedHeader } = await jose.jwtVerify(
      token.value,
      secret
    );

    if (payload && protectedHeader) {
      return NextResponse.next();
    }
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export const config = {
  matcher: "/dashboard",
};
