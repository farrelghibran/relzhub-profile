"use client";
import * as motion from "motion/react-client";
import { useEffect, useState } from "react";
import { Status } from "../types/status";
import { Game } from "../types/game";
import { getAllGames } from "../services/game";
import { getAllStatus } from "../services/status";
import { Highlighter } from "@/components/ui/highlighter";

export default function Games() {
  const [status, setStatus] = useState<Status[]>([]);
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    getAllStatus().then((res) => setStatus(res.data));
    getAllGames().then((res) => setGames(res.data));
    console.log(getAllGames());
  }, []);

  return (
    <div id="games" className="w-full bg-transparent py-20">
      <div className="container max-w-7xl mx-auto px-2 sm:px-3 md:px-4 lg:px-5">
        <div className="w-full">
          <div className="flex flex-col items-start justify-center gap-4">
            <h1 className="text-neutral-50 text-2xl sm:text-3xl font-bold w-fit">
              <Highlighter action="highlight" color="#FF9800">
                Game Status
              </Highlighter>{" "}
            </h1>
            <div className="py-2 rounded-full flex flex-wrap gap-6 items-center">
              {status.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <div
                    style={{ backgroundColor: item.color }}
                    className={`w-3 sm:w-4 aspect-square rounded-full `}
                  ></div>
                  <h1 className="text-neutral-300 font-semibold text-sm sm:text-md">
                    {item.title}
                  </h1>
                </div>
              ))}
            </div>
            <div className="w-full mt-10">
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {games.map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 0.95 }}
                    whileTap={{ scale: 1.0 }}
                  >
                    <div className="w-full h-full overflow-hidden bg-neutral-800 border border-neutral-700 rounded-xl cursor-pointer relative">
                      <div className="absolute right-2 top-2 flex items-center gap-2 py-1 px-2 rounded-full border border-neutral-600 bg-neutral-700">
                        <h1 className="font-semibold text-neutral-300 text-xs">
                          {item.Status.title}
                        </h1>
                        <div
                          style={{ backgroundColor: item.Status.color }}
                          className={`w-3 aspect-square rounded-full`}
                        ></div>
                      </div>
                      <img
                        src={item.image}
                        alt="game"
                        className="w-full aspect-video bg-center bg-cover"
                      />
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <h1 className="text-lg font-semibold text-neutral-50">
                            {item.title}
                          </h1>
                        </div>
                        <div className="flex items center">
                          <p className="text-neutral-400 text-md text-start">
                            {item.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
