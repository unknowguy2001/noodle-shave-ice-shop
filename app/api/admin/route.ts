import { NextRequest, NextResponse } from "next/server";
import { createConnection } from "../../../lib/db";
import admin from "../models/admin.schema";
import argon2 from "argon2";

export async function POST(req: NextRequest) {
  await createConnection();

  try {
    const { username, password, phone } = await req.json();

    const isAppend = await admin.findOne({ username });

    if (isAppend) {
      return NextResponse.json(
        { message: "This user is append in Database!" },
        { status: 400 }
      );
    }

    const hashedPassword = await argon2.hash(password);

    const newAdmin = new admin({
      username,
      password: hashedPassword,
      phone,
    });

    const result = await newAdmin.save();

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
