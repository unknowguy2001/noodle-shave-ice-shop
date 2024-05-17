import { NextRequest, NextResponse } from "next/server";
import { createConnection } from "@/lib/db";
import Order from "../../models/order.schema";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await createConnection();

  try {
    const id = params.id;

    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Notfound!" },
        { status: 404 }
      );
    }

    const result = await Order.updateOne(
      { _id: id },
      {
        $set: {
          status: true,
        },
      }
    );

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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await createConnection();

  try {
    const id = params.id;

    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Notfound!" },
        { status: 404 }
      );
    }

    const result = await Order.deleteOne({ _id: id });

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
