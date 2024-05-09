import { toppingSchema } from "@/app/api/validataion/topping.schema";
import { createConnection } from "../../../lib/db";
import Topping from "../models/topping.schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await createConnection();

  try {
    const toppings = await Topping.find({});

    return NextResponse.json(toppings, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await createConnection();

  try {
    const { ToppingValue } = await req.json();

    console.log(ToppingValue);

    const data = new Topping(toppingSchema.parse(ToppingValue));

    const result = await data.save();

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message });
  }
}
