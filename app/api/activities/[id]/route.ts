import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    if (!body.name || !body.activityType || !body.difficulty) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (
      body.activityType !== "WORDLE" &&
      body.activityType !== "WORD_SEARCH"
    ) {
      return NextResponse.json(
        { error: "Invalid activity type" },
        { status: 400 }
      );
    }

    const activity = await prisma.activity.update({
      where: {
        id: Number(id),
      },
      data: {
        name: body.name,
        activityType: body.activityType,
        difficulty: body.difficulty,
        showHints: body.showHints,
        outputSettings: body.outputSettings || null,
      },
    });

    return NextResponse.json(activity);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Could not update activity" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await prisma.activity.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      message: "Activity deleted",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Could not delete activity" },
      { status: 500 }
    );
  }
}