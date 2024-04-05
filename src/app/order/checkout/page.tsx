import CheckoutDetail from "@/components/order/checkout-detail";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

function Checkout() {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token");

  if (!token) {
    redirect("/auth/signin");
  }

  return (
    <div className="flex-grow flex justify-center items-start container px-4 md:px-8 pt-24">
      <CheckoutDetail />
    </div>
  );
}

export default Checkout;
