import prisma from "../../../src/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 10);
    const search = searchParams.get("search") ?? "";

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.key.findMany({
        skip,
        take: limit,
        where: {
          value: {
            contains: search,
            mode: "insensitive",
          },
        },
        orderBy: {
          created_at: "desc",
        },
      }),

      prisma.key.count({
        where: {
          value: {
            contains: search,
            mode: "insensitive",
          },
        },
      }),
    ]);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Success to fetch keys",
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        data,
      })
    );
  } catch (err) {
    console.error("GET key error:", err);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to fetch keys",
      }),
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
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

    const data = await prisma.key.create({
      data: body,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Key created successfully",
        data,
      }),
      { status: 201 }
    );
  } catch (err) {
    console.error("POST key error:", err);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to create key",
      }),
      { status: 500 }
    );
  }
}
