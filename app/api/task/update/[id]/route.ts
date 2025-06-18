import { prisma } from "@/lib/handlers/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const body = await request.json();
    const { id } = await params;
    const { title, description, status, priority, dueDate, category } = body;

    await prisma.task.update({
      where: { id: id },
      data: {
        title,
        description,
        status,
        priority,
        dueDate,
        category,
      },
    });

    return NextResponse.json(
      { message: "Task successfully updated", status: 201 },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while updating task:", error);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}
