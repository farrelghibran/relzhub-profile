"use client";
import { ArrowRight, GlobeIcon, LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import {
  createCheckpoint,
  getCheckpointByRandom,
  updateCheckpoint,
} from "@/src/services/checkpoint";
import { useEffect, useState } from "react";
import { Checkpoint } from "@/src/types/checkpoint";
import { generateRandomString } from "@/src/lib/generate";
import { useRouter } from "next/navigation";
import { createKey } from "@/src/services/key";
import { createContentLocker } from "@/src/services/lootlabs";
import { GravityStarsBackground } from "@/src/components/animate-ui/components/backgrounds/gravity-stars";
import { getAllRelzhubData } from "@/src/services/relzhub";
import { RefactorDate } from "@/src/lib/refactor-date";
import Link from "next/link";
import { Relzhub } from "@/src/types/relzhub";

export default function Page() {
  const { random } = useParams<{ random: string }>();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Checkpoint | null>(null);

  const [relzhubData, setRelzhubData] = useState<Relzhub[]>([]);

  async function getRelzhubData() {
    setLoading(true);
    try {
      const result = await getAllRelzhubData();
      setRelzhubData(result.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    getRelzhubData();
  }, []);

  const maxCheckpoint = relzhubData[0]?.max_steps || 3;

  const router = useRouter();

  async function proccessLootlabs(destination: string, title: string) {
    const newLootlabs = await createContentLocker(destination, title);
    if (newLootlabs.type == "created") {
      router.push(newLootlabs.message[0].loot_url);
    }
  }

  useEffect(() => {
    setLoading(true);
    getCheckpointByRandom(random).then((res) => setData(res.data));
    setLoading(false);
  }, [random]);

  async function handleProcess() {
    if (!data) return;
    // if (!data?.active && !(data?.destination == "") && data?.destination) {
    //   router.push(data.destination);
    // }
    if (data?.value < maxCheckpoint) {
      setLoading(true);
      const newCheckpoint = await createCheckpoint({
        title: `Checkpoint ${data?.value + 1}`,
        value: data?.value + 1,
        random: generateRandomString(100),
        active: true,
        destination: "",
      });
      if (newCheckpoint.success) {
        const updatedCheckpoint = await updateCheckpoint(data.id, {
          active: false,
          destination: newCheckpoint.data.random,
        });
        if (updatedCheckpoint.success)
          await proccessLootlabs(
            `${process.env.NEXT_PUBLIC_BASE_URL}/getkey/${updatedCheckpoint.data.destination}`,
            newCheckpoint.data.title
          );
      }
      setLoading(false);
    } else {
      setLoading(true);
      const date = new Date();
      date.setDate(date.getDate() + 1);
      const newKey = await createKey({
        value: generateRandomString(70),
        expired_at: RefactorDate(date).toISOString(),
      });
      if (newKey.success) {
        const updatedCheckpoint = await updateCheckpoint(data.id, {
          active: false,
          destination: `${process.env.NEXT_PUBLIC_BASE_URL}/keys/${newKey.data.value}`,
        });
        if (updatedCheckpoint.success)
          router.push(updatedCheckpoint.data.destination);
      }
      setLoading(false);
    }
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
                  <p className="text-lg text-neutral-400 font-semibold">
                    {data?.title}
                  </p>
                  <p className="text-md text-neutral-400 mt-4">
                    Complete the checkpoint up to 3 to get the key by clicking
                    the process button until it is directed to the linkvertise,
                    if not or an ad appears, please close the ad and return to
                    this page
                  </p>
                </div>
                <div className="w-full h-fit flex items-center mt-20">
                  <div className="w-fit flex items-center gap-2">
                    <button className="py-2 px-4 rounded-xl bg-linear-270/srgb from-neutral-600 to-neutral-800 text-neutral-200 font-medium hover:from-neutral-800 hover:to-neutral-600 transition ease duration-500 cursor-pointer flex items-center gap-2 text-sm">
                      Discord
                    </button>
                    <button
                      disabled={loading}
                      onClick={handleProcess}
                      className="py-2 px-4 rounded-xl bg-linear-270/srgb from-red-600 to-orange-600 text-red-200 font-medium hover:from-orange-600 hover:to-red-600 transition ease duration-500 cursor-pointer flex items-center gap-2 text-sm disabled:opacity-70"
                    >
                      Process
                      {loading ? (
                        <LoaderCircle size={18} className="animate-spin" />
                      ) : (
                        <ArrowRight size={18} />
                      )}
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
