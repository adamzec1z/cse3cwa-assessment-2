import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const activities = await prisma.activity.findMany({
      include: {
        words: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(activities);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to retrieve activities." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      activityType,
      difficulty,
      showHints = true,
      outputSettings,
    } = body;

    if (!name || !activityType || !difficulty) {
      return NextResponse.json(
        {
          error:
            "Name, activity type, and difficulty are required.",
        },
        { status: 400 }
      );
    }

    if (!["WORDLE", "WORD_SEARCH"].includes(activityType)) {
      return NextResponse.json(
        { error: "Activity type must be WORDLE or WORD_SEARCH." },
        { status: 400 }
      );
    }

    const activity = await prisma.activity.create({
      data: {
        name,
        activityType,
        difficulty,
        showHints: Boolean(showHints),
        outputSettings: outputSettings || null,
      },
    });

    return NextResponse.json(activity, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create activity." },
      { status: 500 }
    );
  }
}