"use client";

import { queryClient } from "@/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import InfiniteOrder from "./infinite-order";

function OrderList() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex-grow flex flex-col container px-4 md:px-8 mt-10">
        <InfiniteOrder />
      </div>
    </QueryClientProvider>
  );
}

export default OrderList;
