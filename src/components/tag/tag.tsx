"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

function Tag({ tagName }: { tagName: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const isSelected = searchParams.get("tag") === tagName;

  const handleSelectTag = () => {
    if (isSelected) {
      router.push(`/`, { scroll: true });
    } else {
      const params = new URLSearchParams();
      params.set("tag", tagName);
      router.push(`/?${params.toString()}`, { scroll: true });
    }
  };

  return (
    <Button
      onClick={handleSelectTag}
      className={cn(
        "dark:text-slate-200 text-slate-700 rounded-lg py-6 text-sm hover:opacity-70 font-semibold",
        isSelected
          ? "dark:bg-slate-400 bg-slate-400 hover:bg-slate-400 transition border border-slate-700 dark:border-slate-100"
          : "dark:bg-slate-600 bg-slate-200 hover:bg-slate-200"
      )}
    >
      {tagName.toUpperCase()}
    </Button>
  );
}

export default Tag;
