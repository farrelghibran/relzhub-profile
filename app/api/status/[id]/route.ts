import prisma from "../../../../src/lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const data = await prisma.status.findUnique({
      where: { id: Number(id) },
      include: {
        Game: true,
      },
    });

    if (!data) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Status not found",
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Success fetch status detail",
        data,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("GET detail status error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to fetch status detail",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
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
    const { title, color } = body;

    if (!title || title.trim() === "") {
      return new Response(
        JSON.stringify({
          message: "Title is required",
        }),
        { status: 400 }
      );
    }

    if (!color) {
      return new Response(
        JSON.stringify({
          message: "Color is required",
        }),
        { status: 400 }
      );
    }
    const updated = await prisma.status.update({
      where: { id: Number(id) },
      data: {
        title: body.title,
        color: body.color,
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Status updated successfully",
        data: updated,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("PUT status error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to update status",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await prisma.status.delete({
      where: { id: Number(id) },
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Status deleted successfully",
        data: null,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("DELETE status error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to delete status",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
