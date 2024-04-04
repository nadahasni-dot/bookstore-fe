"use client";

import { getBooks } from "@/services/book";
import { GetBooks } from "@/types/response/book";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import BookCard from "./book-card";
import BookListLoading from "./book-list-loading";

type InfiniteBookParam = {
  query?: string;
};

function InfiniteBook({ query }: InfiniteBookParam) {
  const params = useSearchParams();

  const tag = params.get("tag") || undefined;

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);

  const action = getBooks({
    page,
    perPage,
    query,
    tag,
  });

  const { data, isLoading } = useQuery<AxiosResponse<GetBooks>>({
    ...action,
  });

  useEffect(() => {
    setPage(1);
    setPerPage(20);
  }, [tag]);

  if (isLoading) {
    return <BookListLoading />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 pb-16">
      {data?.data.data.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

export default InfiniteBook;
