"use client";

import { getBooks } from "@/services/book";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import React, { useEffect } from "react";
import BookCard from "./book-card";
import BookListLoading from "./book-list-loading";
import { GetBooks } from "@/types/response/book";
import { AxiosResponse } from "axios";

interface InfiniteBookParam {
  query?: string;
}

function InfiniteBook({ query }: InfiniteBookParam) {
  const params = useSearchParams();

  const tag = params.get("tag") || undefined;

  const action = getBooks({
    tag,
    query,
    perPage: 20,
  });

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
    return <BookListLoading />;
  }

  if (status === "error") {
    return <p className="text-center py-10">{error.message}</p>;
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 pb-6">
        {data?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.data.data.map((book) => (
              <BookCard key={book.id} book={book} />
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

export default InfiniteBook;
