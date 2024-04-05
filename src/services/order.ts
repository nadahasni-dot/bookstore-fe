import { ENDPOINTS } from "@/constants/api";
import { API } from "@/lib/api-client";
import { CancelOrderParam } from "@/types/request/order";
import { GetOrders } from "@/types/response/order";
import { AxiosResponse } from "axios";
import { getToken } from "./auth";
import { CartItem } from "@/types/request/cart";

export function getOrders({ perPage = 10 }) {
  const url = ENDPOINTS.ORDER.DEFAULT;

  const token = getToken();

  const params = new URLSearchParams();
  params.set("perPage", perPage.toString());

  return {
    initialPageParam: 1,
    queryKey: [url],
    queryFn: async ({ pageParam = 1 }) => {
      params.set("page", pageParam.toString());

      return API.get(url, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    getNextPageParam: (lastPage: AxiosResponse<GetOrders>) => {
      const currentPage = Number(lastPage.data.meta?.page || "1");
      const totalPage = lastPage.data.meta?.totalPage || 1;

      if (currentPage < totalPage) return currentPage + 1;

      return undefined;
    },
  };
}

export function cancelOrder() {
  return {
    mutationKey: ["cancel-order"],
    mutationFn: ({ orderId }: CancelOrderParam) => {
      const url = ENDPOINTS.ORDER.DETAIL.replace(":id", orderId.toString());
      const token = getToken();

      return API.put(url, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
  };
}

export function checkout() {
  return {
    mutationKey: ["checkout"],
    mutationFn: (cartItems: CartItem[]) => {
      const url = ENDPOINTS.ORDER.CHECKOUT;
      const token = getToken();

      return API.post(url, cartItems, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
  };
}
