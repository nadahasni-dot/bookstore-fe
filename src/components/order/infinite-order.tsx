"use client";

import { getOrders } from "@/services/order";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import OrderListLoading from "./order-list-loading";
import OrderCard from "./order-card";
import Link from "next/link";
import { Button } from "../ui/button";

function InfiniteOrder() {
  const action = getOrders({ perPage: 20 });

  const { data, isLoading, error, status, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      ...action,
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isLoading) {
    return <OrderListLoading />;
  }

  if (status === "error") {
    return (
      <div className="text-center py-10 flex-grow flex flex-col justify-center items-center gap-2">
        <p>
          {error.message.includes("404")
            ? "There is no order yet"
            : error.message}
        </p>
        {error.message.includes("404") && (
          <Link href="/">
            <Button variant="secondary">Browse Books</Button>
          </Link>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4 mt-16">
        {data?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.data.data.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </React.Fragment>
        ))}
      </div>
      <div ref={ref} className="text-center py-10">
        {isFetchingNextPage && "Loading..."}
      </div>
    </>
  );
}

export default InfiniteOrder;
