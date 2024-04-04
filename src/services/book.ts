import { ENDPOINTS } from "@/constants/api";
import { API } from "@/lib/api-client";
import { GetBooksParam } from "@/types/request/book";
import { GetBooks } from "@/types/response/book";
import { AxiosResponse } from "axios";

export function getBooks({ perPage = 10, query, tag }: GetBooksParam) {
  const url = ENDPOINTS.BOOK.DEFAULT;

  const params = new URLSearchParams();

  params.set("perPage", perPage.toString());

  if (query) {
    params.set("query", query.toString());
  }

  if (tag) {
    params.set("tags", tag);
  }

  return {
    initialPageParam: 1,
    queryKey: [url, query, tag],
    queryFn: async ({ pageParam = 1 }) => {
      params.set("page", pageParam.toString());

      return API.get(url, {
        params,
      });
    },
    getNextPageParam: (lastPage: AxiosResponse<GetBooks>) => {
      const currentPage = Number(lastPage.data.meta?.page || "1");
      const totalPage = lastPage.data.meta?.totalPage || 1;

      if (currentPage < totalPage) return currentPage + 1;

      return undefined;
    },
  };
}
