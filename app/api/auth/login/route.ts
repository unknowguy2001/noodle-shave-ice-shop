import { NextRequest, NextResponse } from "next/server";
import { createConnection } from "../../../../lib/db";
import admin from "../../models/admin.schema";
import argon2 from "argon2";
import * as jose from "jose";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  await createConnection();
  try {
    const { username, password } = await req.json();

    const isAppend = await admin.findOne({ username });

    if (!isAppend) {
      return NextResponse.json(
        { message: "User does not exist!" },
        { status: 404 }
      );
    }

    if (!(await argon2.verify(isAppend.password, password))) {
      return NextResponse.json(
        { message: "Username or Password is incorrect!" },
        { status: 400 }
      );
    }

    const secret = new TextEncoder().encode(process.env.PRIVATE_KEY!);
    const alg = process.env.ALG!;

    const token = await new jose.SignJWT({ id: isAppend._id })
      .setProtectedHeader({ alg })
      .setExpirationTime("1h")
      .sign(secret);

    const refreshToken = await new jose.SignJWT({ id: isAppend._id })
      .setProtectedHeader({ alg })
      .setExpirationTime("15d")
      .sign(secret);

    cookies().set("token", token);
    cookies().set("refresh-token", refreshToken);

    return NextResponse.json({ message: "Logedin!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
