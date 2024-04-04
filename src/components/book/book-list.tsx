"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import React, { ChangeEventHandler, Suspense, useState } from "react";
import InfiniteBook from "./infinite-book";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { debounce } from "lodash";
import { queryClient } from "@/lib/query-client";

function BookList() {
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearch = React.useRef(
    debounce(async (criteria) => {
      setSearchQuery(criteria);
    }, 300)
  ).current;

  React.useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    debouncedSearch(e.target.value);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex-grow flex-col container px-4 md:px-8 mt-10">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex w-full max-w-sm items-center space-x-2 mb-6"
        >
          <Input
            name="search"
            placeholder="Search Book"
            onChange={handleSearch}
          />
          <Button type="submit" variant="default" size="icon">
            <MagnifyingGlassIcon />
          </Button>
        </form>
        <Suspense fallback={<></>}>
          <InfiniteBook query={searchQuery} />
        </Suspense>
      </div>
    </QueryClientProvider>
  );
}

export default BookList;
