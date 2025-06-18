import { prisma } from "@/lib/handlers/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "16", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    const [data, total] = await Promise.all([
      prisma.task.findMany({
        take: limit,
        skip: offset,
        orderBy: { status: "asc" },
      }),
      prisma.task.count(),
    ]);

    return NextResponse.json({
      data,
      total,
    });
  } catch (err) {
    return NextResponse.json({
      error: `Internal Server Error ${err}`,
      status: 500,
    });
  }
}
