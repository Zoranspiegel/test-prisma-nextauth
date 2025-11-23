import { createTaskDto, Task } from "@/app/models/dto/Task";
import { NextRequest, NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const tasks: Task[] = [
      {
        id: Math.random().toString(16).slice(2),
        title: "Play Guitar",
        description: "Practice one jazz standard",
        completed: false,
        createdAt: "",
        updatedAt: "",
      },
      {
        id: Math.random().toString(16).slice(2),
        title: "Study Nextjs",
        description: "Learn how to integrate Next Auth",
        completed: false,
        createdAt: "",
        updatedAt: "",
      },
      {
        id: Math.random().toString(16).slice(2),
        title: "Water Plants",
        description: "Water the monstera and the jade",
        completed: false,
        createdAt: "",
        updatedAt: "",
      },
    ];
    
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

    return NextResponse.json({ msg: "Success", data }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.stack);
      return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown server error" }, { status: 500 });
  }
}
