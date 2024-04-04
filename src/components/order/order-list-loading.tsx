import React from "react";
import { Skeleton } from "../ui/skeleton";

function OrderListLoading() {
  return (
    <div className="flex flex-col gap-4 mt-16">
      <Skeleton className="w-full rounded-lg h-56" />
      <Skeleton className="w-full rounded-lg h-56" />
      <Skeleton className="w-full rounded-lg h-56" />
    </div>
  );
}

export default OrderListLoading;
