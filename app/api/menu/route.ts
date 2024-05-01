import { createConnection } from "@/app/api/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Menu from "@/app/api/models/menu.schema";
import { menuSchema } from "@/app/api/validataion/menu.schema";

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
    const { MenuValue } = await req.json();

    const data = new Menu(menuSchema.parse(MenuValue));

    const result = await data.save();

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message });
  }
}
