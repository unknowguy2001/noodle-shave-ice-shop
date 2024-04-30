import { createConnection } from "@/app/api/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Menu from "@/app/api/models/menu.schema";

export async function GET() {
  await createConnection();

  try {
    const menus = await Menu.find({});

    return NextResponse.json(menus);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message });
  }
}

export async function POST(req: NextRequest) {
  await createConnection();

  try {
    const menus = await Menu.find({});

    const { MenuValue }: { MenuValue: MenuValue } = await req.json();
    //* implement zod for validate data

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message });
  }
}
