import { prisma } from "@/lib/handlers/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, priority, status, dueDate, category } = body;

    if (title == "" || dueDate == "") {
      return NextResponse.json({ error: "Title and due date are required", status: 400 });
    }

    const createdTask = await prisma.task.create({
      data: {
        title,
        description,
        priority,
        status,
        dueDate,
        category,
        createdAt: new Date(),
      },
    });

    return NextResponse.json(
      { message: "Task created successfully", insertedId: createdTask.id, status: 201 },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}
