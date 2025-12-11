"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaginationKeys({
  totalPages,
  currentPage,
  className,
}: {
  totalPages: number;
  currentPage: number;
  className?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";

  function goToPage(p: number) {
    const params = new URLSearchParams();

    params.set("page", String(p));
    if (search) params.set("search", search);

    router.push(`?${params.toString()}`);
    router.refresh();
  }

  return (
    <Pagination className={`my-5 ${className || ""}`}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            }
            onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
          />
        </PaginationItem>

        {Array.from({ length: totalPages })
          .map((_, i) => i + 1)
          .filter((p) => {
            if (p === 1 || p === totalPages) return true;
            if (Math.abs(p - currentPage) <= 1) return true;
            return false;
          })
          .slice(0, 3)
          .map((p) => (
            <PaginationItem key={p}>
              <PaginationLink
                isActive={p === currentPage}
                onClick={() => goToPage(p)}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}

        <PaginationItem>
          <PaginationNext
            className={
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            }
            onClick={() =>
              currentPage < totalPages && goToPage(currentPage + 1)
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
