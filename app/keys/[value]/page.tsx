"use client";
import { GravityStarsBackground } from "@/src/components/animate-ui/components/backgrounds/gravity-stars";
import { copyContent } from "@/src/lib/copy";
import { getCountdownKeys } from "@/src/lib/countdown";
import { getKeyByValue } from "@/src/services/key";
import { Key } from "@/src/types/key";
import { BadgeCheck, CopyIcon, GlobeIcon, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { value } = useParams<{ value: string }>();
  const [data, setData] = useState<Key | null>(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    getKeyByValue(value).then((res) => setData(res.data));
    setLoading(false);
  }, [value]);

  useEffect(() => {
    if (!data?.expired_at) return;

    const updateCountdown = () => {
      if (data.expired_at) {
        setCountdown(getCountdownKeys(data?.expired_at));
      }
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [data?.created_at]);

  return (
    <div className="-z-20 min-h-screen">
      <div className="w-full">
        <GravityStarsBackground className="-z-10 absolute inset-0 flex items-center justify-center rounded-xl" />
        <div className="container max-w-7xl mx-auto h-screen px-2 sm:px-3 md:px-4 lg:px-5">
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-full sm:w-2/3 md:w-1/2 rounded-2xl border border-neutral-800 bg-neutral-900 p-10">
              <div className="w-full h-full flex flex-col justify-between items-center">
                {loading && !data ? (
                  <LoaderCircle size={40} className="animate-spin z-50" />
                ) : (
                  <>
                    {data && data.value ? (
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
                        <p className="text-lg text-neutral-50 font-semibold mt-4 flex items-center gap-2">
                          <BadgeCheck size={26} />
                          Key Created Successfully!
                        </p>
                        <div className="w-full relative">
                          <textarea
                            name="key"
                            id="key"
                            readOnly={true}
                            className="resize-none rounded-2xl outline-none border-2 border-neutral-600 p-4 h-40 bg-neutral-800 my-3 w-full"
                            value={data?.value || "..."}
                          ></textarea>
                          <button
                            onClick={() => copyContent(data!.value)}
                            className="ml-auto text-neutral-50 text-xs flex items-center gap-2 bg-linear-270/srgb from-orange-600 to-red-600 hover:from-red-600 hover:to-orange-600 rounded-lg py-2 px-3 cursor-pointer hover:bg-neutral-600 transition ease duration-500 z-30 absolute bottom-0 right-4"
                          >
                            <CopyIcon size={15} />
                            Copy
                          </button>
                        </div>
                        <p className="text-md text-neutral-400 mt-4">
                          {countdown}
                        </p>
                      </div>
                    ) : (
                      <p>...</p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
