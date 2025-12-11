import prisma from "../../../../src/lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const data = await prisma.game.findUnique({
      where: { id: Number(id) },
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Success fetch game detail",
        data,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("GET game by id error:", err);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to fetch game detail",
      }),
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
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

    const data = await prisma.game.update({
      where: { id: Number(id) },
      data: body,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Game updated successfully",
        data,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("PUT game error:", err);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to update game",
      }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const data = await prisma.game.delete({
      where: { id: Number(id) },
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Game deleted successfully",
        data,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE game error:", err);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to delete game",
      }),
      { status: 500 }
    );
  }
}
