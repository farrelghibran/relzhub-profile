import prisma from "../../../../src/lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const data = await prisma.checkpoint.findUnique({
      where: { id: Number(id) },
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Success fetch checkpoint detail",
        data,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("GET checkpoint id error:", err);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to fetch checkpoint detail",
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

    const data = await prisma.checkpoint.update({
      where: { id: Number(id) },
      data: body,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Checkpoint updated successfully",
        data,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("PUT checkpoint error:", err);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to update checkpoint",
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

    const data = await prisma.checkpoint.delete({
      where: { id: Number(id) },
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Checkpoint deleted successfully",
        data,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE checkpoint error:", err);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to delete checkpoint",
      }),
      { status: 500 }
    );
  }
}
