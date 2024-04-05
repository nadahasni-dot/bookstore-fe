"use client";

import { queryClient } from "@/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import InfiniteOrder from "./infinite-order";
import Link from "next/link";

function OrderList() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex-grow flex flex-col container px-4 md:px-8 mt-24">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="font-medium text-xl ">Order History</h2>
          <Link
            href="/"
            className="text-blue-500 font-medium hover:opacity-65 transition"
          >
            Browse More Books
          </Link>
        </div>
        <InfiniteOrder />
      </div>
    </QueryClientProvider>
  );
}

export default OrderList;
