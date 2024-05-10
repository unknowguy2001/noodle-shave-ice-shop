import { createConnection } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Menu from "@/app/api/models/menu.schema";
import fs from "fs";
import path from "path";

export async function GET() {
  await createConnection();

  try {
    const menus = await Menu.find({});

    return NextResponse.json({ success: true, menus }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await createConnection();
  const UPLOAD_DIR = path.resolve(
    process.env.ROOT_PATH ?? "",
    "public/uploads"
  );

  try {
    const formData = await req.formData();
    const body = Object.fromEntries(formData);

    const file = (body.file as Blob) || null;
    const image = (body.file as File).name;
    const name = body.name;
    const description = body.description;
    const price = body.price;
    const toppings = JSON.parse(body.toppings as string);
    console.log(file);
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR);
      }

      fs.writeFileSync(
        path.resolve(UPLOAD_DIR, (body.file as File).name),
        buffer
      );
    } else {
      return NextResponse.json(
        {
          success: false,
        },
        { status: 500 }
      );
    }
    const newMenu = new Menu({
      name,
      image,
      toppings,
      price,
      description,
    });
    const result = await newMenu.save();
    return NextResponse.json({ result, success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: (error as Error).message,
    });
  }
}

export async function DELETE(req: NextRequest) {
  await createConnection();

  try {
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message });
  }
}
