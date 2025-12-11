"use client";

import { BadgeCheck, Download, ZapIcon } from "lucide-react";
import CodeEditor from "../partials/CodeEditor";
import GridShape from "./GridShape";
import { AuroraText } from "@/components/ui/aurora-text";
import { SparklesText } from "@/components/ui/sparkles-text";
import { TextAnimate } from "@/components/ui/text-animate";
import { useEffect, useState } from "react";
import { Relzhub } from "@prisma/client";
import { getAllRelzhubData } from "../services/relzhub";

export default function Hero() {
  const codeString = `local relzhub = require("Relz Hub") 

function sendMessage(msg)
    print(msg)
end

while true do
    sendMessage(relzhub.Message)
    wait(0.5)
end`;

  const [data, setData] = useState<Relzhub[]>([]);

  async function getData() {
    try {
      const result = await getAllRelzhubData();
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const discordUrl = data[0]?.discord_url || "";

  return (
    <main className="flex min-h-screen h-full items-center justify-center py-20">
      <GridShape />
      <div className="max-w-7xl container mx-auto px-2 sm:px-3 md:px-4 lg:px-5 z-2">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="col-span-1 flex flex-col justify-center items-center sm:items-start gap-4 sm:gap-6 mt-10 sm:mt-0">
            <div className="rounded-full px-3 py-1 text-xs sm:text-sm text-red-200 bg-linear-180/srgb from-red-500 to-orange-500  w-fit font-semibold flex items-center gap-2">
              <ZapIcon size={17} />
              Fast Execution
            </div>
            <h1 className="text-4xl sm:text-6xl text-neutral-50 font-black text-center sm:text-start">
              Improve Your Gameplay With{" "}
              <SparklesText colors={{ first: "#FFFFFF", second: "#ffd230" }}>
                <AuroraText
                  colors={[
                    "#ff6900",
                    "#c10007",
                    "#ff6900",
                    "#fb2c36",
                    "#ff8904",
                  ]}
                >
                  Relz Hub
                </AuroraText>
              </SparklesText>
            </h1>
            <h1 className="text-md sm:text-xl text-neutral-300 text-center sm:text-start">
              <TextAnimate animation="slideUp" by="word">
                Enjoy a new experience and the best performance with many game
                supported & fast updated
              </TextAnimate>
            </h1>
            <div className="flex items-center gap-2">
              <a
                href="#script"
                className="w-fit px-4 py-2 rounded-lg font-semibold bg-linear-to-r from-red-500 to-orange-500 hover:from-orange-500 hover:to-red-500 ease transition-colors duration-500 text-sm sm:text-md flex items-center justify-center gap-2"
              >
                <Download size={18} />
                Get Script
              </a>
              <a
                href={discordUrl}
                className="w-fit px-4 py-2 rounded-lg font-semibold bg-linear-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 ease transition-colors duration-500 text-sm sm:text-md flex items-center justify-center gap-2"
              >
                <BadgeCheck size={18} />
                Join Discord
              </a>
            </div>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <CodeEditor
              canCopy={false}
              fileName="relzhub.lua"
              codeString={codeString}
              className="h-fit aspect-auto!"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
