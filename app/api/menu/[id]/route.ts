import { NextRequest, NextResponse } from "next/server";
import { createConnection } from "../../../../lib/db";
import Menu from "../../models/menu.schema";

//GET BY ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await createConnection();

  const id = params.id;
  const response = await Menu.findById(id).populate("toppings");

  return NextResponse.json(response, { status: 200 });
}
