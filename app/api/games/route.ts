import prisma from "../../../src/lib/prisma";

export async function GET() {
  try {
    const data = await prisma.game.findMany({
      include: {
        Status: true,
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Success fetch games",
        data,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("GET games error:", err);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to fetch games",
      }),
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, image, statusId } = body;

    if (!title || title.trim() === "") {
      return new Response(
        JSON.stringify({
          message: "Title is required",
        }),
        { status: 400 }
      );
    }

    if (!content || content.trim() === "") {
      return new Response(
        JSON.stringify({
          message: "Content is required",
        }),
        { status: 400 }
      );
    }

    if (!image || image.trim() === "") {
      return new Response(
        JSON.stringify({
          message: "Image is required",
        }),
        { status: 400 }
      );
    }

    if (!statusId) {
      return new Response(
        JSON.stringify({
          message: "Status ID is required",
        }),
        { status: 400 }
      );
    }

    const data = await prisma.game.create({
      data: body,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Game created successfully",
        data,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("POST games error:", err);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to create game",
      }),
      { status: 500 }
    );
  }
}
