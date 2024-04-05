"use client";

import OrderList from "@/components/order/order-list";
import { getToken } from "@/services/auth";
import { redirect } from "next/navigation";
import React, { useLayoutEffect } from "react";

function Order() {
  useLayoutEffect(() => {
    const token = getToken();
    if (token === "") {
      redirect("/");
    }
  }, []);

  return (
    <>
      <OrderList />
    </>
  );
}

export default Order;
