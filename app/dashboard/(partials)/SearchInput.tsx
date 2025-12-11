"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";

  function handleSearch(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("search", value);
      params.set("page", "1");
    } else {
      params.delete("search");
    }

    router.push(`?${params.toString()}`);
  }

  return (
    <Input
      type="search"
      placeholder="Search"
      defaultValue={search}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}
