import { createConnection } from "../lib/db";
import { NextRequest, NextResponse } from "next/server";
import Order from "../models/order.schema";
import { orderSchema } from "../validataion/order.schema";

export async function GET() {
  await createConnection();

  try {
    const orders = await Order.find({});

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message });
  }
}

export async function POST(req: NextRequest) {
  await createConnection();
  try {
    const { OrderValue } = await req.json();

    console.log(OrderValue);
    const data = new Order(orderSchema.parse(OrderValue));

    const result = await data.save();

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message });
  }
}
