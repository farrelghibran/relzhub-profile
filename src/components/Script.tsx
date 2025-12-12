"use client";

import { useEffect, useState } from "react";
import CodeEditor from "../partials/CodeEditor";
import { getAllRelzhubData } from "../services/relzhub";
import { Relzhub } from "../types/relzhub";

export default function Script() {
  const [data, setData] = useState<Relzhub[]>([]);
  const [loading, setLoading] = useState(false);

  async function getData() {
    setLoading(true);
    try {
      const result = await getAllRelzhubData();
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  const codeString = data[0]?.loader || "-- Loader script not available";
  return (
    <div
      id="script"
      className="w-full bg-neutral-900 border-t border-neutral-800"
    >
      <div className="container max-w-7xl mx-auto px-2 sm:px-3 md:px-4 lg:px-5">
        <div className="w-full py-10">
          <div className="w-full flex flex-col gap-10 items-center justify-center">
            <div className="flex flex-col gap-4 items-center justify-center">
              <h1 className="text-neutral-50 text-2xl sm:text-3xl font-bold w-fit text-center">
                Loader Script
              </h1>
              <p className="text-md sm:text-lg text-neutral-400 text-center">
                Copy the code below to run in the executor, this code has
                included several games that are automatically registered.
              </p>
            </div>
            <CodeEditor
              canCopy={true}
              fileName="loader.lua"
              codeString={codeString}
              className="h-fit! aspect-auto!"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
