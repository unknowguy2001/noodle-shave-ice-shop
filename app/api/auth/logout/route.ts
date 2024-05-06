import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = cookies();

  cookieStore.getAll().map((cookie) => {
    cookieStore.delete(cookie);
  });

  return NextResponse.json({ message: "Logedout!" }, { status: 200 });
}
