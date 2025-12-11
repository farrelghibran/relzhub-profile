import prisma from "../../../../src/lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const data = await prisma.relzhub.findUnique({
      where: { id: Number(id) },
    });

    if (!data) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Relzhub data not found",
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Success fetch relzhub data detail",
        data,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("GET detail relzhub data error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to fetch relzhub data detail",
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
    const { discord_url, loader, max_steps } = body;

    if (!discord_url || discord_url.trim() === "") {
      return new Response(
        JSON.stringify({
          message: "Discord Url is required",
        }),
        { status: 400 }
      );
    }

    if (!loader || loader.trim() === "") {
      return new Response(
        JSON.stringify({
          message: "Loader is required",
        }),
        { status: 400 }
      );
    }

    if (!max_steps) {
      return new Response(
        JSON.stringify({
          message: "Max Steps is required",
        }),
        { status: 400 }
      );
    }

    const updated = await prisma.relzhub.update({
      where: { id: Number(id) },
      data: {
        loader: body.loader,
        discord_url: body.discord_url,
        max_steps: body.max_steps,
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Relzhub data updated successfully",
        data: updated,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("PUT relzhub data error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to update relzhub data",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
