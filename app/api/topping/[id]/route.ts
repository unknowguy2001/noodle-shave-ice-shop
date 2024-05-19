import { NextRequest, NextResponse } from "next/server";
import { createConnection } from "../../../../lib/db";
import Topping from "../../models/topping.schema";
import path from "path";
import fs from "fs";

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "public/uploads");

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await createConnection();

  try {
    if (!params.id) NextResponse.json({ success: false }, { status: 404 });

    const response = await Topping.findById(params.id);

    return NextResponse.json({ success: true, response }, { status: 200 });
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

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await createConnection();

  try {
    const id = params.id;
    const formData = await req.formData();
    const topping = await Topping.findById(id);

    if (!topping) {
      console.log("test1");
      return NextResponse.json(
        { success: false, message: "Notfound!" },
        { status: 404 }
      );
    }

    const body = Object.fromEntries(formData);
    const file = (body.file as Blob) || null;
    const name = body.name;
    const price = body.price;

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());

      if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR);
      }

      fs.unlinkSync(path.resolve(UPLOAD_DIR, topping.icon));

      fs.writeFileSync(
        path.resolve(UPLOAD_DIR, (body.file as File).name),
        buffer
      );
    } else {
      const result = await Topping.updateOne(
        { _id: id },
        { $set: { name: name, price: price } }
      );

      return NextResponse.json(
        {
          success: true,
          result,
        },
        { status: 200 }
      );
    }

    const icon = (body.file as File).name;

    const result = await Topping.updateOne(
      { _id: id },
      { $set: { name: name, icon: icon, price: price } }
    );

    return NextResponse.json(
      {
        success: true,
        result,
      },
      { status: 200 }
    );
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await createConnection();

  try {
    const id = params.id;

    const data = await Topping.findById(id);

    if (!data) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

    fs.unlinkSync(path.resolve(UPLOAD_DIR, data.icon));

    const result = await Topping.deleteOne({ _id: id });

    return NextResponse.json({ success: true, result }, { status: 200 });
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
