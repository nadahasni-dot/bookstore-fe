import { ENDPOINTS } from "@/constants/api";
import { API } from "@/lib/api-client";
import { GetBooksParam } from "@/types/request/book";

export function getBooks({
  page = 1,
  perPage = 10,
  query,
  tag,
}: GetBooksParam) {
  const url = ENDPOINTS.BOOK.DEFAULT;

  const params = new URLSearchParams();
  params.set("page", page.toString());
  params.set("perPage", perPage.toString());

  if (query) {
    params.set("query", query.toString());
  }

  if (tag) {
    params.set("tag", tag.toString());
  }

  return {
    queryKey: [url, page, perPage, query, tag],
    queryFn: () =>
      API.get(url, {
        params,
      }),
  };
}
