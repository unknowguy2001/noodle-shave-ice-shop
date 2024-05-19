import { createConnection } from "../../../lib/db";
import Topping from "../models/topping.schema";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET() {
  await createConnection();

  try {
    const toppings = await Topping.find({});

    return NextResponse.json({ success: true, toppings }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "public/uploads");

export const POST = async (req: NextRequest) => {
  try {
    await createConnection();

    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const file = (body.file as Blob) || null;

    const name = body.name;
    const icon = (body.file as File).name;

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
    const newTopping = new Topping({
      name,
      icon,
    });

    const result = newTopping.save();
    return NextResponse.json(
      { success: true, name: (body.file as File).name },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: (error as Error).message,
    });
  }
};
