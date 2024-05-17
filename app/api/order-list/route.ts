import { createConnection } from "../../../lib/db";
import { NextRequest, NextResponse } from "next/server";
import Order from "../models/order.schema";
import { orderSchema } from "../validataion/order.schema";
import { socket } from "@/socket";

export async function GET() {
  await createConnection();

  try {
    const orders = await Order.find({ status: false }).populate([
      "menus.menu",
      "menus.toppings",
    ]);

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message });
  }
}

export async function POST(req: NextRequest) {
  await createConnection();
  try {
    const { OrderValue } = await req.json();

    const data = new Order(orderSchema.parse(OrderValue));

    const result = await data.save();

    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
