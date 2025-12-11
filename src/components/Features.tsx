import { Highlighter } from "@/components/ui/highlighter";
import { CodeIcon, RefreshCw, ZapIcon } from "lucide-react";
import * as motion from "motion/react-client";

export default function Features() {
  return (
    <div
      id="features"
      className="w-full bg-neutral-900 py-20 border-y border-neutral-800"
    >
      <div className="container max-w-7xl mx-auto px-2 sm:px-3 md:px-4 lg:px-5">
        <div className="w-full flex flex-col gap-2 items-center justify-center">
          <h1 className="text-2xl sm:text-3xl font-bold ">
            <Highlighter action="underline" color="#FF9800">
              Powerful Features
            </Highlighter>
          </h1>
          <p className="text-md sm:text-lg text-neutral-400">
            The outstanding features we offer for you.
          </p>
          <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 mt-10">
            <motion.button
              className="w-full h-full rounded-xl relative"
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 1.0 }}
            >
              <div className="cursor-pointer w-full h-full p-8 border border-neutral-700 bg-neutral-800 rounded-xl flex flex-col items-start justify-center gap-2">
                <ZapIcon
                  size={50}
                  className="text-neutral-50 mb-2 p-3 bg-linear-270/srgb from-red-500 to-orange-500 rounded-lg"
                />
                <h1 className="font-bold text-xl text-neutral-50 text-center mt-2">
                  Fast Update
                </h1>
                <p className="text-neutral-400 text-lg text-start">
                  Faster and better script updates than anyone else.
                </p>
              </div>
            </motion.button>
            <motion.button
              className="w-full h-full rounded-xl relative"
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 1.0 }}
            >
              <div className="cursor-pointer w-full h-full p-8 border border-neutral-700 bg-neutral-800 rounded-xl flex flex-col items-start justify-center gap-2">
                <CodeIcon
                  size={50}
                  className="text-neutral-50 mb-2 p-3 bg-linear-270/srgb from-red-500 to-orange-500 rounded-lg"
                />
                <h1 className="font-bold text-xl text-neutral-50 text-center mt-2">
                  Stable & Reliable
                </h1>
                <p className="text-neutral-400 text-lg text-start">
                  Stable performance without causing FPS drop issues.
                </p>
              </div>
            </motion.button>
            <motion.button
              className="w-full h-full rounded-xl relative"
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 1.0 }}
            >
              <div className="cursor-pointer w-full h-full p-8 border border-neutral-700 bg-neutral-800 rounded-xl flex flex-col items-start justify-center gap-2">
                <RefreshCw
                  size={50}
                  className="text-neutral-50 mb-2 p-3 bg-linear-270/srgb from-red-500 to-orange-500 rounded-lg"
                />
                <h1 className="font-bold text-xl text-neutral-50 text-center mt-2">
                  Auto Updates
                </h1>
                <p className="text-neutral-400 text-lg text-start">
                  Always get the latest version automatically.
                </p>
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
