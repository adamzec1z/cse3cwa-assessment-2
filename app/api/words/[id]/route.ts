import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const { english, phonemes } = body;

    if (!english || !phonemes) {
      return NextResponse.json(
        { error: "English word and phonemes are required." },
        { status: 400 }
      );
    }

    const word = await prisma.word.update({
      where: {
        id: Number(id),
      },
      data: {
        english,
        phonemes,
      },
    });

    return NextResponse.json(word);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to update word." },
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

    await prisma.word.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      message: "Word deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to delete word." },
      { status: 500 }
    );
  }
}