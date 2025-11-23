import { createTaskDto } from "@/app/models/dto/TaskDto";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const tasks = await prisma.task.findMany({ orderBy: { createdAt: "asc" } });

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.stack);
      return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.json();
  const zodResponse = createTaskDto.safeParse(body);

  if (!zodResponse.success) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  try {
    const data = zodResponse.data;

    const newTask = await prisma.task.create({ data });

    return NextResponse.json({ msg: "Success", data: newTask }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.stack);
      return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown server error" }, { status: 500 });
  }
}
