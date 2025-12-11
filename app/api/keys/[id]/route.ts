import prisma from "../../../../src/lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const data = await prisma.key.findUnique({
      where: { id: Number(id) },
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Success fetch key detail",
        data,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("GET key id error:", err);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to fetch key detail",
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
    const { value, expired_at } = body;

    if (!value || value.trim() === "") {
      return new Response(
        JSON.stringify({
          message: "Value is required",
        }),
        { status: 400 }
      );
    }

    if (!expired_at) {
      return new Response(
        JSON.stringify({
          message: "Expired date is required",
        }),
        { status: 400 }
      );
    }

    const data = await prisma.key.update({
      where: { id: Number(id) },
      data: body,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Key updated successfully",
        data,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("PUT key error:", err);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to update key",
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

    const data = await prisma.key.delete({
      where: { id: Number(id) },
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Key deleted successfully",
        data,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE key error:", err);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to delete key",
      }),
      { status: 500 }
    );
  }
}
