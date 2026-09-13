import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const words = await prisma.word.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(words);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to retrieve words." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { english, phonemes, activityId } = body;

    if (!english || !phonemes || !activityId) {
      return NextResponse.json(
        {
          error:
            "English word, phonemes, and activity ID are required.",
        },
        { status: 400 }
      );
    }

    if (
      typeof english !== "string" ||
      typeof phonemes !== "string"
    ) {
      return NextResponse.json(
        {
          error:
            "English word and phonemes must be text.",
        },
        { status: 400 }
      );
    }

    const phonemeList =
      phonemes.split(" ").filter(Boolean);

    if (phonemeList.length < 1) {
      return NextResponse.json(
        {
          error:
            "At least one phoneme is required.",
        },
        { status: 400 }
      );
    }

    const activity =
      await prisma.activity.findUnique({
        where: {
          id: Number(activityId),
        },
      });

    if (!activity) {
      return NextResponse.json(
        {
          error:
            "The selected activity does not exist.",
        },
        { status: 404 }
      );
    }

    const word =
      await prisma.word.create({
        data: {
          english:
            english.trim().toUpperCase(),
          phonemes: phonemes.trim(),
          activityId: Number(activityId),
        },
      });

    return NextResponse.json(
      word,
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to create word.",
      },
      { status: 500 }
    );
  }
}