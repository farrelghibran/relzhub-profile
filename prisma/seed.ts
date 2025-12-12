import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const statusData: Prisma.StatusUncheckedCreateInput[] = [
  {
    title: "Active",
    color: "green",
    Game: {
      create: [
        {
          title: "Fish It",
          content: "Improve your auto farm with relzhub fishit",
          image:
            "https://tr.rbxcdn.com/180DAY-8d479799a34addd0e58d0ddb53196d78/768/432/Image/Webp/noFilter",
        },
      ],
    },
  },
  {
    title: "Update",
    color: "yellow",
  },
  {
    title: "Discontinue",
    color: "red",
  },
];
const relzhubData: Prisma.RelzhubUncheckedCreateInput[] = [
  {
    loader: `loadstring(game:HttpGet("https://relzhub.farrelghibran.com/loader.lua"))`,
    discord_url: "discord.gg/relzhub",
    max_steps: 3,
  },
];

export async function main() {
  for (const u of statusData) {
    await prisma.status.create({ data: u });
  }
  for (const u of relzhubData) {
    await prisma.relzhub.create({ data: u });
  }
}

main();
