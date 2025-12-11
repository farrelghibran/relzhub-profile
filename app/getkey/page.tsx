"use client";
import { GlobeIcon, Key, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { generateRandomString } from "../../src/lib/generate";
import { createCheckpoint } from "../../src/services/checkpoint";
import { createContentLocker } from "@/src/services/lootlabs";
import { GravityStarsBackground } from "@/src/components/animate-ui/components/backgrounds/gravity-stars";
import Link from "next/link";
import LinkvertiseLink from "@/src/partials/LinkvertiseLink";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function proccessLootlabs(destination: string, title: string) {
    const newLootlabs = await createContentLocker(destination, title);
    if (newLootlabs.type == "created") {
      router.push(newLootlabs.message[0].loot_url);
    }
  }

  async function handleGetkey() {
    setLoading(true);
    const newCheckpoint = await createCheckpoint({
      title: `Checkpoint 1`,
      value: 1,
      random: generateRandomString(100),
      active: true,
      destination: "",
    });
    if (newCheckpoint.success)
      await proccessLootlabs(
        `${process.env.NEXT_PUBLIC_BASE_URL}/getkey/${newCheckpoint.data.random}`,
        newCheckpoint.data.title
      );
    setLoading(false);
  }
  return (
    <div className="-z-20 min-h-screen">
      <div className="w-full">
        <GravityStarsBackground className="-z-10 absolute inset-0 flex items-center justify-center rounded-xl" />
        <div className="container max-w-7xl mx-auto h-screen px-2 sm:px-3 md:px-4 lg:px-5">
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-full sm:w-2/3 md:w-1/2 rounded-2xl border border-neutral-800 bg-neutral-900 p-10 z-50">
              <div className="w-full h-full flex flex-col justify-between items-start">
                <div className="w-full flex flex-col gap-1">
                  <div className="w-full flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-neutral-50">
                      Relz Hub
                    </h1>
                    <div className="flex items-center gap-4 sm:gap-6">
                      <Link
                        href="/"
                        className="py-2 px-4 rounded-xl text-neutral-400 transition ease duration-500 cursor-pointer flex items-center gap-2 border border-neutral-700 hover:bg-neutral-800 ml-auto"
                      >
                        <GlobeIcon size={18} />
                        <span className="hidden sm:block">Website</span>
                      </Link>
                      <div className="w-fit flex items-center gap-2 ml-auto">
                        <div className="w-3 aspect-square rounded-full bg-red-500"></div>
                        <div className="w-3 aspect-square rounded-full bg-yellow-500"></div>
                        <div className="w-3 aspect-square rounded-full bg-green-500"></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-md text-neutral-400 mt-4">
                    Get the key first to access the script, this is a form of
                    support for developers so that they are more enthusiastic
                    about updating scripts and creating scripts in new games.
                  </p>
                </div>
                <div className="w-full h-fit flex items-center mt-20">
                  <div className="w-fit flex items-center gap-2">
                    <button className="py-2 px-4 rounded-xl bg-linear-270/srgb from-neutral-600 to-neutral-800 text-neutral-200 font-medium hover:from-neutral-800 hover:to-neutral-600 transition ease duration-500 cursor-pointer flex items-center gap-2 text-sm">
                      Discord
                    </button>
                    <button
                      disabled={loading}
                      onClick={handleGetkey}
                      className="py-2 px-4 rounded-xl bg-linear-270/srgb from-green-600 to-cyan-600 text-red-200 font-medium hover:from-cyan-600 hover:to-green-600 transition ease duration-500 cursor-pointer flex items-center gap-2 text-sm disabled:opacity-75"
                    >
                      {loading ? (
                        <LoaderCircle size={18} className="animate-spin" />
                      ) : (
                        <Key size={18} />
                      )}
                      Get Key
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
