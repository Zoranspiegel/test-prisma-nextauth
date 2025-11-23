import { updateTaskDto } from "@/app/models/dto/TaskDto";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;
  const body = await request.json();
  const zodResponse = updateTaskDto.safeParse(body);

  if (!zodResponse.success) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const { data } = zodResponse;

  try {
    const updatedTask = await prisma.task.update({
      where: { id },
      data,
    });

    return NextResponse.json({ msg: "Success", data: updatedTask }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.stack);
      return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown server error" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;

  try {
    const deletedTask = await prisma.task.delete({ where: { id } });

    return NextResponse.json({ msg: "Success", data: deletedTask }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.stack);
      return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown server error" }, { status: 500 });
  }
}
