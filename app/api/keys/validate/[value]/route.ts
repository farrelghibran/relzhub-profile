import prisma from "../../../../../src/lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ value: string }> }
) {
  try {
    const { value } = await context.params;

    const data = await prisma.key.findFirst({
      where: { value: value },
    });

    if (!data) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Key not found",
        }),
        { status: 404 }
      );
    }

    function isActiveKey(date: string) {
      const now = new Date();
      const expiredDate = new Date(date);

      return now < expiredDate;
    }

    const keyStatus = isActiveKey(data.expired_at.toString());

    return new Response(
      JSON.stringify({
        success: true,
        active: keyStatus,
        message: `Key found`,
        data,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("GET Key random error", error);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to fetch key",
      }),
      { status: 500 }
    );
  }
}
