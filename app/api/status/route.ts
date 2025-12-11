import prisma from "../../../src/lib/prisma";

export async function GET() {
  try {
    const data = await prisma.status.findMany({
      include: {
        Game: true,
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Success fetch all statuses",
        data,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("GET status error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to fetch statuses",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function POST(req: Request) {
  try {
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

    const created = await prisma.status.create({
      data: {
        title: body.title,
        color: body.color,
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Status created successfully",
        data: created,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("POST status error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to create status",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
