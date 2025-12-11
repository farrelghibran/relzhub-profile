import Sidebar from "@/src/dashboard/components/sidebar";
import GamesTable from "../(partials)/GamesTable";
import { Suspense } from "react";

export default function page() {
  return (
    <Sidebar>
      <div className="w-full h-full mt-10">
        <div className="max-w-7xl mx-auto px-1 sm:px-2">
          <div className="p-4 rounded-xl w-full">
            <Suspense fallback={null}>
              <GamesTable />
            </Suspense>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
