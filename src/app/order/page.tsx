import OrderList from "@/components/order/order-list";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import React from "react";

function Order() {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token");

  if (!token) {
    redirect("/auth/signin");
  }

  return (
    <>
      <OrderList />
    </>
  );
}

export default Order;
