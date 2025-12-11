import prisma from "../../../../../src/lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ random: string }> }
) {
  try {
    const { random } = await context.params;

    const data = await prisma.checkpoint.findUnique({
      where: { random: random },
    });

    if (!data) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Checkpoint not found",
        }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Checkpoint fetched successfully",
        data,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("GET checkpoint random error", error);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to fetch checkpoint",
      }),
      { status: 500 }
    );
  }
}
