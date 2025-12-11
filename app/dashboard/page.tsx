export const dynamic = "force-dynamic";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Sidebar from "@/src/dashboard/components/sidebar";
import { compactFormat } from "@/src/lib/formatter";
import Link from "next/link";
import KeysTable from "./(partials)/KeysTable";
import prisma from "@/src/lib/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Relz Hub",
  description: "Best Script Ever",
};

export default async function Page() {
  const totalKey = await prisma.key.count();

  const totalNewKey = await prisma.key.count({
    where: {
      created_at: {
        gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    },
  });

  const totalGame = await prisma.game.count();
  const totalStatus = await prisma.status.count();

  const Statistic = [
    {
      title: "Keys",
      desc: "Total Keys",
      content: totalKey,
      url: "/dashboard/keys",
    },
    {
      title: "Statistic",
      desc: "New Keys",
      content: totalNewKey,
      url: "/dashboard/keys",
    },
    {
      title: "Status",
      desc: "Total Status",
      content: totalStatus,
      url: "/dashboard/status",
    },
    {
      title: "Games",
      desc: "Total Games",
      content: totalGame,
      url: "/dashboard/games",
    },
  ];
  return (
    <Sidebar>
      <div className="w-full h-full">
        <div className="max-w-7xl mx-auto px-1 sm:px-2">
          <div className="p-4 rounded-xl w-full">
            <div className="w-full my-10 rounded-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {Statistic.map((value, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle>{value.title}</CardTitle>
                    <CardDescription>{value.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h1 className="text-muted-foreground">
                      <span className="font-bold text-3xl text-white">
                        {compactFormat(value.content)}
                      </span>
                    </h1>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Link
                      href={value.url}
                      className="text-sm px-3 py-1 rounded-lg bg-neutral-700/70"
                    >
                      View
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <KeysTable />
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
