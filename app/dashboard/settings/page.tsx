"use client";

import Sidebar from "@/src/dashboard/components/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Relzhub } from "@/src/types/relzhub";
import { getAllRelzhubData, updateRelzhubData } from "@/src/services/relzhub";

export default function Page() {
  const [data, setData] = useState<Relzhub[]>([]);
  const [loading, setLoading] = useState(false);

  const [loader, setLoader] = useState("");
  const [discordUrl, setDiscordUrl] = useState("");
  const [maxSteps, setMaxSteps] = useState(0);

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

  async function handleUpdate() {
    setLoading(true);
    try {
      await updateRelzhubData(data[0].id, {
        loader: loader || data[0]?.loader,
        discord_url: discordUrl || data[0]?.discord_url,
        max_steps: maxSteps || data[0]?.max_steps,
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Sidebar>
      <div className="w-full h-full mt-10">
        <div className="max-w-7xl mx-auto px-1 sm:px-2">
          <div className="p-4 rounded-xl w-full">
            <div className="w-full">
              <div className="w-full gap-4 grid grid-cols-1 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="loader">Loader Script</label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      id="loader"
                      name="loader"
                      placeholder={"..."}
                      value={loader || data[0]?.loader}
                      onChange={(e) => setLoader(e.target.value)}
                    ></Input>
                    <Button disabled={loading} onClick={handleUpdate}>
                      Save Changes
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="discord_url">Discord Url</label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      id="discord_url"
                      name="discord_url"
                      placeholder={"..."}
                      value={discordUrl || data[0]?.discord_url}
                      onChange={(e) => setDiscordUrl(e.target.value)}
                    ></Input>
                    <Button disabled={loading} onClick={handleUpdate}>
                      Save Changes
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="checkpoints">Max Checkpoints</label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      id="checkpoints"
                      name="checkpoints"
                      placeholder={"..."}
                      value={maxSteps || data[0]?.max_steps}
                      onChange={(e) => setMaxSteps(Number(e.target.value))}
                    ></Input>
                    <Button disabled={loading} onClick={handleUpdate}>
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
