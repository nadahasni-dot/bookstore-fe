import BookListLoading from "@/components/book/book-list-loading";
import Navbar from "@/components/navbar";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function Loading() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex mt-20 flex-col w-full container pt-6 px-4 md:px-8">
        <h2 className="font-semibold">Search Book by Tags</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 my-4">
          <Skeleton className="h-12 rounded-lg" />
          <Skeleton className="h-12 rounded-lg" />
          <Skeleton className="h-12 rounded-lg" />
          <Skeleton className="h-12 rounded-lg" />
          <Skeleton className="h-12 rounded-lg" />
          <Skeleton className="h-12 rounded-lg" />
          <Skeleton className="h-12 rounded-lg" />
        </div>
      </div>
      <div className="flex-grow flex-col container px-4 md:px-8 mt-10">
        <div className="flex w-full max-w-sm items-center space-x-2 mb-6">
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-10 rounded-lg" />
        </div>
        <BookListLoading />
      </div>
    </main>
  );
}

export default Loading;
