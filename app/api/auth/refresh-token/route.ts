import * as jose from "jose";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const secret = new TextEncoder().encode(process.env.PRIVATE_KEY!);
  const cookieStore = cookies();
  const { token, refreshToken } = await req.json();

  if (refreshToken == undefined) {
    return NextResponse.json(
      { message: "refresh token is undefined" },
      { status: 500 }
    );
  }

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

    cookieStore.set("token", token);
  }
  return NextResponse.json({}, { status: 200 });
}
