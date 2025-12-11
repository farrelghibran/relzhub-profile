import prisma from "../../../src/lib/prisma";

export async function GET() {
  try {
    const data = await prisma.relzhub.findMany();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Success fetch all relzhub data",
        data,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("GET relzhub data error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to fetch relzhub data",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
