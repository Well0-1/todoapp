import { prisma } from "@/lib/handlers/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.task.delete({
      where: { id: id },
    });

    return NextResponse.json(
      { message: "Task deleted successfully", status: 201 },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while deleting task:", error);
    return NextResponse.json({ error: "Failed to delete the task" }, { status: 500 });
  }
}
