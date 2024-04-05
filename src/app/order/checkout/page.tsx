"use client";

import CheckoutDetail from "@/components/order/checkout-detail";
import { getToken } from "@/services/auth";
import { redirect } from "next/navigation";
import React, { useLayoutEffect } from "react";

function Checkout() {
  useLayoutEffect(() => {
    const token = getToken();
    if (token === "") {
      redirect("/");
    }
  }, []);

  return (
    <div className="flex-grow flex justify-center items-start container px-4 md:px-8 pt-24">
      <CheckoutDetail />
    </div>
  );
}

export default Checkout;
