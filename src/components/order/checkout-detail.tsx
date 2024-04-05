"use client";

import { queryClient } from "@/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import CheckoutCard from "./checkout-card";

function CheckoutDetail() {
  return (
    <QueryClientProvider client={queryClient}>
      <CheckoutCard />
    </QueryClientProvider>
  );
}

export default CheckoutDetail;
