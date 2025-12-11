import prisma from "../../../src/lib/prisma";

export async function GET() {
  try {
    const data = await prisma.checkpoint.findMany();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Success fetch checkpoints",
        data,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("GET checkpoint error:", err);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to fetch checkpoints",
      }),
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const data = await prisma.checkpoint.create({
      data: body,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Checkpoint created successfully",
        data,
      }),
      { status: 201 }
    );
  } catch (err) {
    console.error("POST checkpoint error:", err);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to create checkpoint",
      }),
      { status: 500 }
    );
  }
}
