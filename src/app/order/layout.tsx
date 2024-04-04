import Navbar from "@/components/navbar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Bookstore APP | Orders",
  description: "Trck your orders here",
};

function OrderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      {children}
    </main>
  );
}

export default OrderLayout;
