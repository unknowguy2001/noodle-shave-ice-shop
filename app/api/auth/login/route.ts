import { NextRequest, NextResponse } from "next/server";
import { createConnection } from "../../lib/db";
import admin from "../../models/admin.schema";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
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

    const token = jwt.sign(
      { exp: Math.floor(Date.now() / 1000) + 60 * 60, id: isAppend._id },
      process.env.PRIVATE_KEY!
    );

    const refreshToken = jwt.sign(
      { exp: Math.floor(Date.now() / 1000) + 60 * 60 * 8, id: isAppend._id },
      process.env.PRIVATE_KEY!
    );

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
