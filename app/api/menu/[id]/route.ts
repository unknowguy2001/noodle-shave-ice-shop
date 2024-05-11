import { NextRequest, NextResponse } from "next/server";
import { createConnection } from "../../../../lib/db";
import Menu from "../../models/menu.schema";
import path from "path";
import fs from "fs";

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "public/uploads");

//GET BY ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await createConnection();

  const id = params.id;
  const response = await Menu.findById(id).populate("toppings");

  return NextResponse.json({ success: true, response }, { status: 200 });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await createConnection();

  try {
    const id = params.id;
    const formData = await req.formData();
    const menu = await Menu.findById(id);

    if (!menu) {
      return NextResponse.json(
        { success: false, message: "Notfound!" },
        { status: 404 }
      );
    }

    const body = Object.fromEntries(formData);
    const file = (body.file as Blob) || null;
    const name = body.name;
    const description = body.description;
    const toppings = JSON.parse(body.toppings as string);
    const price = body.price;

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());

      if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR);
      }

      fs.unlinkSync(path.resolve(UPLOAD_DIR, menu.image));

      fs.writeFileSync(
        path.resolve(UPLOAD_DIR, (body.file as File).name),
        buffer
      );
    } else {
      const result = await Menu.updateOne(
        { _id: id },
        {
          $set: {
            name: name,
            description: description,
            toppings: toppings,
            price: price,
          },
        }
      );
      return NextResponse.json(
        {
          success: true,
          result,
        },
        { status: 200 }
      );
    }

    const image = (body.file as File).name;

    const result = await Menu.updateOne(
      { _id: id },
      {
        $set: {
          name: name,
          image: image,
          description: description,
          toppings: toppings,
          price: price,
        },
      }
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
